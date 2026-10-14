'use server';

import type { NotionPage } from '@/shared/lib/notion-properties';
import {
  Announcement,
  ANNOUNCEMENT_KEYS,
  BLOG_POST_KEYS,
  BlogPost,
  Event,
  EVENT_KEYS,
  Member,
  parseAnnouncement,
  parseBlogPost,
  parseEvent,
  parseMember,
  parseProject,
  parseWebsiteMember,
  Project,
  PROJECT_KEYS,
  Team,
  WEBSITE_MEMBER_KEYS,
} from '@/shared/models';
import {
  Client,
  collectPaginatedAPI,
  isFullDatabase,
  isFullPage,
  type QueryDataSourceParameters,
} from '@notionhq/client';
import { cacheLife, cacheTag } from 'next/cache';

import { NotionToMarkdown } from 'notion-to-md';

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notionClient });

const PROJECTS_DB = process.env.NOTION_PROJECTS_DB_ID;
const MEMBERS_DB = process.env.NOTION_MEMBERS_DB_ID;
const WEBSITE_MEMBERS_DB = process.env.NOTION_WEBSITE_MEMBERS_DB_ID;
const POSTS_DB = process.env.NOTION_POSTS_DB_ID;
const EVENTS_DB = process.env.NOTION_EVENTS_DB_ID;
const ANNOUNCEMENTS_DB = process.env.NOTION_ANNOUNCEMENTS_DB_ID;

type QueryArgs = Omit<QueryDataSourceParameters, 'data_source_id'>;

/**
 * Queries every page of a database, following pagination.
 * Since Notion API 2025-09-03 rows live in data sources, so the database ID
 * from the env is first resolved to its (single) data source.
 */
async function queryDatabase(
  databaseId: string,
  args: QueryArgs = {},
): Promise<NotionPage[]> {
  const database = await notionClient.databases.retrieve({
    database_id: databaseId,
  });
  if (!isFullDatabase(database) || database.data_sources.length === 0) {
    throw new Error(`Notion database ${databaseId} has no data source`);
  }

  const results = await collectPaginatedAPI(notionClient.dataSources.query, {
    ...args,
    data_source_id: database.data_sources[0].id,
  });
  return results.filter(isFullPage);
}

const toMembersMap = (members: Member[]) =>
  new Map(members.map((m) => [m.id, m]));

export async function getMembers(): Promise<Member[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('members');

  if (!MEMBERS_DB) return [];

  const pages = await queryDatabase(MEMBERS_DB);
  return pages.map(parseMember);
}

export async function getProjects(): Promise<Project[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('projects');

  if (!PROJECTS_DB) return [];

  // Fetch all active members first so we can map relations
  const membersMap = toMembersMap(await getMembers());

  const pages = await queryDatabase(PROJECTS_DB, {
    filter: {
      property: PROJECT_KEYS.published,
      checkbox: {
        equals: true,
      },
    },
  });

  const statusOrder: Record<string, number> = {
    Recruiting: 1,
    Ongoing: 2,
    Completed: 3,
  };

  return pages
    .map((page) => parseProject(page, membersMap))
    .sort(
      (a, b) => (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99),
    );
}

// Predefined Team Display Order
const TEAM_ORDER = [
  'Board',
  'Events',
  'Tech',
  'Social & Brand',
  'Projects',
  'HR',
  'Finance',
  'Startup Relations',
  'Polimi Quantum Computing',
];

// Hardcoded Team Emails
const TEAM_EMAILS: Record<string, string> = {
  Board: 'board@polimidatascientists.it',
  Finance: 'finance@polimidatascientists.it',
  Projects: 'projects@polimidatascientists.it',
  HR: 'hr@polimidatascientists.it',
  Events: 'events@polimidatascientists.it',
  'Social & Brand': 'social@polimidatascientists.it',
  Tech: 'tech@polimidatascientists.it',
  'Polimi Quantum Computing': 'pmqc@polimidatascientists.it',
  'Startup Relations': 'startup-relations@polimidatascientists.it',
};

export async function getTeams(): Promise<Team[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('teams');

  if (!WEBSITE_MEMBERS_DB) return [];

  // 1. Fetch all members from "Our People" as a dictionary to extract avatars/linkedin
  const membersMap = toMembersMap(await getMembers());

  // 2. Fetch and map the "Website Directory"
  const pages = await queryDatabase(WEBSITE_MEMBERS_DB, {
    sorts: [
      {
        property: WEBSITE_MEMBER_KEYS.order,
        direction: 'ascending',
      },
    ],
  });
  const websiteMembers = pages.map((page) =>
    parseWebsiteMember(page, membersMap),
  );

  // 3. Group by Section (team string)
  const grouped: Record<string, Member[]> = {};
  for (const member of websiteMembers) {
    const teamName = member.team || 'Other';
    (grouped[teamName] ??= []).push(member);
  }

  // 4. Convert to Team[] array with fixed team ordering and intra-team member sorting
  return Object.entries(grouped)
    .sort(([teamA], [teamB]) => {
      const indexA = TEAM_ORDER.indexOf(teamA);
      const indexB = TEAM_ORDER.indexOf(teamB);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return teamA.localeCompare(teamB, 'it');
    })
    .map(([teamName, teamMembers]) => {
      teamMembers.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : Infinity;
        const orderB = typeof b.order === 'number' ? b.order : Infinity;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return a.name.localeCompare(b.name, 'it', { sensitivity: 'base' });
      });

      return {
        id: teamName.toLowerCase().replace(/\s+/g, '-'),
        name: teamName,
        email: TEAM_EMAILS[teamName] || undefined,
        members: teamMembers,
      };
    });
}

export async function getPosts(): Promise<BlogPost[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('posts');

  if (!POSTS_DB) return [];

  const membersMap = toMembersMap(await getMembers());

  const pages = await queryDatabase(POSTS_DB, {
    filter: {
      property: BLOG_POST_KEYS.published,
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: BLOG_POST_KEYS.date,
        direction: 'descending',
      },
    ],
  });

  return pages.map((page) => parseBlogPost(page, membersMap));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  'use cache';
  cacheLife('days');
  cacheTag('post');

  // 1. Fetch the page properties
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  // 2. Fetch the page content blocks and convert to markdown
  try {
    const mdblocks = await n2m.pageToMarkdown(post.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    post.content = mdString.parent;
  } catch (e) {
    console.error('Error fetching post content:', e);
    post.content = 'Failed to load content.';
  }

  return post;
}

export async function getEvents(): Promise<Event[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('events');

  if (!EVENTS_DB) return [];

  const pages = await queryDatabase(EVENTS_DB, {
    filter: {
      property: EVENT_KEYS.published,
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: EVENT_KEYS.date,
        direction: 'descending',
      },
    ],
  });

  const now = new Date();
  const events = pages.map((page) => parseEvent(page, now));
  const byStart = (a: Event, b: Event) =>
    a.dateStart.getTime() - b.dateStart.getTime();

  const upcomingEvents = events.filter((e) => e.upcoming).sort(byStart);
  const pastEvents = events
    .filter((e) => !e.upcoming)
    .sort((a, b) => byStart(b, a));

  return [...upcomingEvents, ...pastEvents];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('announcements');

  if (!ANNOUNCEMENTS_DB) return [];

  const pages = await queryDatabase(ANNOUNCEMENTS_DB, {
    filter: {
      and: [
        {
          or: [
            {
              property: ANNOUNCEMENT_KEYS.displayedFrom,
              date: {
                is_not_empty: true,
                on_or_before: 'today',
              },
            },
            {
              property: ANNOUNCEMENT_KEYS.displayedFrom,
              date: {
                is_empty: true,
              },
            },
          ],
        },
        {
          property: ANNOUNCEMENT_KEYS.displayedTo,
          date: {
            is_not_empty: true,
            on_or_after: 'today',
          },
        },
      ],
    },
    sorts: [
      {
        property: ANNOUNCEMENT_KEYS.displayedTo,
        direction: 'ascending',
      },
    ],
  });

  return pages.map(parseAnnouncement);
}
