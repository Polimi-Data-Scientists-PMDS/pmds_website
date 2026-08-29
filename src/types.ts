export interface Member {
  id: string;
  name: string;
  role?: string;
  team?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export interface Team {
  id: string;
  name: string;
  email?: string;
  members: Member[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  status: "Recruiting" | "Ongoing" | "Completed";
  date: string;
  team?: { name: string; avatar?: string; linkedinUrl?: string }[];
  partner?: { name: string; url?: string };
  applyUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
  reportUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  externalUrl?: string;
  imageUrl: string;
  date: string;
  authors: { name: string; avatar?: string; linkedinUrl?: string; email?: string }[];
  tags: string[];
  linkedinUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  type: string;
  description: string;
  imageUrl?: string;
  registrationUrl?: string;
  resourcesUrl?: string;
  upcoming: boolean;
}
