import { Project, Member, Team, BlogPost } from "@/types";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notionClient });

const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const PROJECTS_DB = process.env.NOTION_PROJECTS_DB_ID!;
const MEMBERS_DB = process.env.NOTION_MEMBERS_DB_ID!;
const WEBSITE_MEMBERS_DB = process.env.NOTION_WEBSITE_MEMBERS_DB_ID!;
const POSTS_DB = process.env.NOTION_POSTS_DB_ID!;

const fetchNotion = async (url: string, body: any) => {
  const res = await fetch(`https://api.notion.com/v1${url}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 } // Cache data for 1 hour
  });
  if (!res.ok) {
    throw new Error(`Notion API Error: ${await res.text()}`);
  }
  return res.json();
};

// Utility to get text from Rich Text or Title properties
const getText = (prop: any) => {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t: any) => t.plain_text).join("");
  return "";
};

const formatUrlString = (url: string | null) => {
  if (!url) return null;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const getUrl = (prop: any) => formatUrlString(prop?.url || null);

const getFileUrl = (prop: any) => {
  if (!prop || !prop.files || prop.files.length === 0) return null;
  const file = prop.files[0];
  return file.type === "external" ? file.external.url : file.file.url;
};

const getSelect = (prop: any) => prop?.select?.name || null;
const getMultiSelect = (prop: any) => prop?.multi_select?.map((s: any) => s.name) || [];
const getCheckbox = (prop: any) => prop?.checkbox || false;

export async function getMembers(): Promise<Member[]> {
  if (!MEMBERS_DB) return [];

  const response = await fetchNotion(`/databases/${MEMBERS_DB}/query`, {});

  return response.results.map((page: any) => {
    const props = page.properties;

    // We map Role array to a single string for display, taking the first one
    const roles = getMultiSelect(props["Role "]);
    const roleString = roles.length > 0 ? roles[0] : "Member";

    // Try to get photo from Files, fallback to Person avatar if they are linked
    let avatar = getFileUrl(props["Photo (if necessary)"]);
    if (!avatar && props["Person"]?.people?.length > 0) {
      avatar = props["Person"].people[0].avatar_url || null;
    }

    return {
      id: page.id,
      name: getText(props["Name"]),
      role: roleString,
      team: getMultiSelect(props["Team"])[0] || "Other", // Using first team
      imageUrl: avatar,
      linkedinUrl: formatUrlString(getText(props["Linkedin"])),
      email: props["PMDS Email"]?.email || null,
    };
  });
}

export async function getProjects(): Promise<Project[]> {
  if (!PROJECTS_DB) return [];

  // 1. Fetch all active members first so we can map relations
  const allMembers = await getMembers();
  const membersMap = new Map(allMembers.map(m => [m.id, m]));

  // 2. Fetch projects
  const response = await fetchNotion(`/databases/${PROJECTS_DB}/query`, {
    filter: {
      property: "Published",
      checkbox: {
        equals: true
      }
    }
  });

  const projects = response.results.map((page: any) => {
    const props = page.properties;

    // Resolve Partner
    const partnerName = getText(props["Partner name (optional)"]);
    const partnerUrl = formatUrlString(getText(props["Partner link (optional)"]));
    const partner = partnerName ? { name: partnerName, url: partnerUrl } : undefined;

    // Resolve Team Members via relation
    const relationIds = props["Members (optional)"]?.relation?.map((r: any) => r.id) || [];
    const team = relationIds.map((id: string) => {
      const member = membersMap.get(id);
      if (member) {
        return { name: member.name, avatar: member.imageUrl || undefined, linkedinUrl: member.linkedinUrl };
      }
      return null;
    }).filter(Boolean) as { name: string; avatar?: string; linkedinUrl?: string }[];

    // Display title vs slug project name
    const displayedTitle = getText(props["Displayed title (mandatory)"]);
    const fallbackTitle = getText(props["Project"]);

    return {
      id: page.id,
      title: displayedTitle || fallbackTitle || "Untitled Project",
      description: getText(props["Description (mandatory)"]),
      imageUrl: getFileUrl(props["Image (optional)"]) || undefined,
      tags: getMultiSelect(props["Tags (mandatory)"]),
      status: (getSelect(props["Status (mandatory)"]) as "Recruiting" | "Ongoing" | "Completed") || "Ongoing",
      date: getText(props["Date (mandatory)"]),
      team: team.length > 0 ? team : undefined,
      partner: partner,
      applyUrl: getUrl(props["Application url (optional, mandatory if recruiting)"]),
      githubUrl: getUrl(props["GitHub url (optional)"]),
      paperUrl: getUrl(props["Paper url (optional)"]),
      reportUrl: getUrl(props["Report url (optional)"]),
    };
  });

  const statusOrder: Record<string, number> = {
    "Recruiting": 1,
    "Ongoing": 2,
    "Completed": 3
  };

  return projects.sort((a: Project, b: Project) => {
    const orderA = statusOrder[a.status] || 99;
    const orderB = statusOrder[b.status] || 99;
    return orderA - orderB;
  });
}

export async function getTeams(): Promise<Team[]> {
  if (!WEBSITE_MEMBERS_DB) return [];
  
  // 1. Fetch all members from "Our People" as a dictionary to extract avatars/linkedin
  const allMembers = await getMembers();
  const membersMap = new Map(allMembers.map(m => [m.id, m]));

  // 2. Fetch the "Website Directory"
  const response = await fetchNotion(`/databases/${WEBSITE_MEMBERS_DB}/query`, {
    sorts: [
      {
        property: "Order (optional)",
        direction: "ascending"
      }
    ]
  });

  // 3. Map the data
  const websiteMembers = response.results.map((page: any) => {
    const props = page.properties;
    
    // The link to the "Our People" database
    const relationIds = props["Our People link (mandatory)"]?.relation?.map((r: any) => r.id) || [];
    const baseMember = relationIds.length > 0 ? membersMap.get(relationIds[0]) : null;

    const name = getText(props["Name and Surname (mandatory)"]);
    const section = getSelect(props["Section (mandatory)"]) || "Other";
    const displayedRole = getText(props["Displayed role (optional)"]);
    const overrideEmail = props["Email (if different from personal)"]?.email;

    return {
      id: page.id,
      name: name || "Unknown",
      role: displayedRole || undefined,
      team: section,
      imageUrl: baseMember?.imageUrl,
      linkedinUrl: baseMember?.linkedinUrl,
      email: overrideEmail || baseMember?.email || null,
    };
  });

  // 4. Group by Section (team string)
  const grouped = websiteMembers.reduce((acc: Record<string, Member[]>, member: Member) => {
    const teamName = member.team || "Other";
    if (!acc[teamName]) {
      acc[teamName] = [];
    }
    acc[teamName].push(member);
    return acc;
  }, {} as Record<string, Member[]>);

  // Hardcoded Team Emails
  const TEAM_EMAILS: Record<string, string> = {
    "Board": "board@polimidatascience.it",
    "Finance": "finance@polimidatascience.it",
    "Projects": "projects@polimidatascience.it",
    "HR": "hr@polimidatascience.it",
    "Events": "events@polimidatascience.it",
    "Social & Brand": "social@polimidatascience.it",
    "Tech": "tech@polimidatascience.it",
  };

  // 5. Convert to Team[] array
  return Object.entries(grouped).map(([teamName, teamMembers]) => ({
    id: teamName.toLowerCase().replace(/\s+/g, '-'),
    name: teamName,
    email: TEAM_EMAILS[teamName] || undefined,
    members: teamMembers as Member[]
  }));
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!POSTS_DB) return [];

  const allMembers = await getMembers();
  const membersMap = new Map(allMembers.map(m => [m.id, m]));

  const response = await fetchNotion(`/databases/${POSTS_DB}/query`, {
    filter: {
      property: "Published",
      checkbox: {
        equals: true
      }
    },
    sorts: [
      {
        property: "Date (mandatory)",
        direction: "descending"
      }
    ]
  });

  return response.results.map((page: any) => {
    const props = page.properties;

    // Resolve Authors
    const relationIds = props["Authors (optional)"]?.relation?.map((r: any) => r.id) || [];
    const authors = relationIds.map((id: string) => {
      const member = membersMap.get(id);
      return member ? { 
        name: member.name, 
        avatar: member.imageUrl,
        linkedinUrl: member.linkedinUrl,
        email: member.email
      } : null;
    }).filter(Boolean) as { name: string; avatar?: string; linkedinUrl?: string; email?: string }[];

    const dateProp = props["Date (mandatory)"]?.date?.start;
    const formattedDate = dateProp ? new Date(dateProp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown date";

    const externalUrl = getUrl(props["External url (ONLY FOR LEGACY POSTS)"]);
    const title = getText(props["Title (mandatory)"]) || "Untitled Post";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    return {
      id: page.id,
      slug: slug,
      title: title,
      excerpt: getText(props["Excerpt (mandatory)"]),
      date: formattedDate,
      tags: [getSelect(props["Tag (mandatory)"]) || "General"],
      imageUrl: getFileUrl(props["Cover image (optional)"]) || "/placeholder.jpg",
      externalUrl: externalUrl || undefined,
      authors: authors,
      content: "" // We don't fetch content for the list
    };
  });
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  // 1. Fetch the page properties
  const posts = await getPosts();
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;

  // 2. Fetch the page content blocks and convert to markdown
  try {
    const mdblocks = await n2m.pageToMarkdown(post.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    post.content = mdString.parent;
  } catch (e) {
    console.error("Error fetching post content:", e);
    post.content = "Failed to load content.";
  }

  return post;
}

const EVENTS_DB = process.env.NOTION_EVENTS_DB_ID;

export async function getEvents(): Promise<import("@/types").Event[]> {
  if (!EVENTS_DB) return [];

  const response = await fetchNotion(`/databases/${EVENTS_DB}/query`, {
    filter: {
      property: "Published",
      checkbox: {
        equals: true
      }
    },
    sorts: [
      {
        property: "Date & Time (mandatory)",
        direction: "ascending" // Upcoming first!
      }
    ]
  });

  const now = new Date();

  return response.results.map((page: any) => {
    const props = page.properties;

    const dateProp = props["Date & Time (mandatory)"]?.date?.start;
    const eventDate = dateProp ? new Date(dateProp) : new Date(0);
    const upcoming = eventDate >= now;

    // Format date and time
    const formattedDate = dateProp ? eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Unknown date";
    const formattedTime = dateProp && dateProp.includes('T') ? eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : undefined;

    return {
      id: page.id,
      title: getText(props["Name (mandatory)"]) || "Untitled Event",
      date: formattedDate,
      time: formattedTime,
      location: getText(props["Location (mandatory)"]) || getSelect(props["Location (mandatory)"]) || "TBA",
      type: getSelect(props["Type (mandatory)"]) || "Event",
      description: getText(props["Description (mandatory)"]),
      imageUrl: getFileUrl(props["Image (optional)"]) || undefined,
      registrationUrl: getUrl(props["Registration URL (optional)"]),
      resourcesUrl: getUrl(props["Resources URL (optional)"]),
      upcoming
    };
  });
}
