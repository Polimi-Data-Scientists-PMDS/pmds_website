import {
  formatUrlString,
  getDepartments,
  getMultiSelect,
  getRelationIds,
  getSelect,
  getStableImageUrl,
  getText,
  getUrl,
  type NotionPage,
} from '@/shared/lib/notion-properties';
import type { Member } from './member';
import { resolvePeople, type Person } from './person';

export const PROJECT_KEYS = {
  title: 'Displayed title (mandatory)',
  name: 'Project',
  description: 'Description (mandatory)',
  image: 'Image (optional)',
  tags: 'Tags (mandatory)',
  status: 'Status (mandatory)',
  date: 'Date (mandatory)',
  members: 'Members (optional)',
  partnerName: 'Partner name (optional)',
  partnerUrl: 'Partner link (optional)',
  applyUrl: 'Application url (optional, mandatory if recruiting)',
  githubUrl: 'GitHub url (optional)',
  paperUrl: 'Paper url (optional)',
  reportUrl: 'Report url (optional)',
  department: 'Department',
  departmentOptional: 'Department (optional)',
  published: 'Published',
} as const;

export type ProjectStatus = 'Recruiting' | 'Ongoing' | 'Completed';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  status: ProjectStatus;
  date: string;
  team?: Person[];
  partner?: { name: string; url?: string };
  applyUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
  reportUrl?: string;
  departments?: string[];
}

export function parseProject(
  page: NotionPage,
  membersMap: Map<string, Member>,
): Project {
  const props = page.properties;

  const partnerName = getText(props[PROJECT_KEYS.partnerName]);
  const partnerUrl = formatUrlString(getText(props[PROJECT_KEYS.partnerUrl]));

  const team = resolvePeople(
    getRelationIds(props[PROJECT_KEYS.members]),
    membersMap,
  ).map(({ name, avatar, linkedinUrl }) => ({ name, avatar, linkedinUrl }));

  return {
    id: page.id,
    title:
      getText(props[PROJECT_KEYS.title]) ||
      getText(props[PROJECT_KEYS.name]) ||
      'Untitled Project',
    description: getText(props[PROJECT_KEYS.description]),
    imageUrl: getStableImageUrl(page, PROJECT_KEYS.image) || undefined,
    tags: getMultiSelect(props[PROJECT_KEYS.tags]),
    status:
      (getSelect(props[PROJECT_KEYS.status]) as ProjectStatus | null) ||
      'Ongoing',
    date: getText(props[PROJECT_KEYS.date]),
    team: team.length > 0 ? team : undefined,
    partner: partnerName
      ? { name: partnerName, url: partnerUrl || undefined }
      : undefined,
    applyUrl: getUrl(props[PROJECT_KEYS.applyUrl]) || undefined,
    githubUrl: getUrl(props[PROJECT_KEYS.githubUrl]) || undefined,
    paperUrl: getUrl(props[PROJECT_KEYS.paperUrl]) || undefined,
    reportUrl: getUrl(props[PROJECT_KEYS.reportUrl]) || undefined,
    departments: getDepartments(
      props[PROJECT_KEYS.department] || props[PROJECT_KEYS.departmentOptional],
    ),
  };
}
