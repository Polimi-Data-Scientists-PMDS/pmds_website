import {
  formatUrlString,
  getEmail,
  getMultiSelect,
  getNumber,
  getRelationIds,
  getSelect,
  getStableImageUrl,
  getText,
  type NotionPage,
} from '@/shared/lib/notion-properties';

export const MEMBER_KEYS = {
  name: 'Name',
  role: 'Role ',
  team: 'Team',
  photo: 'Photo (if necessary)',
  linkedin: 'Linkedin',
  email: 'PMDS Email',
} as const;

export const WEBSITE_MEMBER_KEYS = {
  name: 'Name and Surname (mandatory)',
  section: 'Section (mandatory)',
  displayedRole: 'Displayed role (optional)',
  email: 'Email (if different from personal)',
  order: 'Order (optional)',
  member: 'Our People link (mandatory)',
} as const;

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

/** Maps a page of the "Our People" database. */
export function parseMember(page: NotionPage): Member {
  const props = page.properties;

  // We map Role array to a single string for display, taking the first one
  const roles = getMultiSelect(props[MEMBER_KEYS.role]);

  return {
    id: page.id,
    name: getText(props[MEMBER_KEYS.name]),
    role: roles[0] || 'Member',
    team: getMultiSelect(props[MEMBER_KEYS.team])[0] || 'Other', // Using first team
    imageUrl: getStableImageUrl(page, MEMBER_KEYS.photo) || undefined,
    linkedinUrl:
      formatUrlString(getText(props[MEMBER_KEYS.linkedin])) || undefined,
    email: getEmail(props[MEMBER_KEYS.email]) || undefined,
  };
}

/** Maps a page of the "Website Directory" database, enriched with its linked "Our People" member. */
export function parseWebsiteMember(
  page: NotionPage,
  membersMap: Map<string, Member>,
): Member {
  const props = page.properties;

  const [baseMemberId] = getRelationIds(props[WEBSITE_MEMBER_KEYS.member]);
  const baseMember = baseMemberId ? membersMap.get(baseMemberId) : undefined;
  const rawOrder = getNumber(props[WEBSITE_MEMBER_KEYS.order]);

  return {
    id: page.id,
    name: getText(props[WEBSITE_MEMBER_KEYS.name]) || 'Unknown',
    role: getText(props[WEBSITE_MEMBER_KEYS.displayedRole]) || undefined,
    team: getSelect(props[WEBSITE_MEMBER_KEYS.section]) || 'Other',
    imageUrl: baseMember?.imageUrl,
    linkedinUrl: baseMember?.linkedinUrl,
    email:
      getEmail(props[WEBSITE_MEMBER_KEYS.email]) ||
      baseMember?.email ||
      undefined,
    order:
      typeof rawOrder === 'number' && !isNaN(rawOrder) ? rawOrder : undefined,
  };
}
