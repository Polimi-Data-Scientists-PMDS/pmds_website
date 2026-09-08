export interface Member {
  id: string;
  name: string;
  role?: string;
  team?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  email?: string;
  order?: number;
}

export interface Team {
  id: string;
  name: string;
  email?: string;
  members: Member[];
}

export interface Person {
  name: string;
  avatar?: string;
  linkedinUrl?: string;
  email?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  status: 'Recruiting' | 'Ongoing' | 'Completed';
  date: string;
  team?: Person[];
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
  authors: Person[];
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
