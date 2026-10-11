import {
  formatUrlString,
  getText,
  type NotionPage,
} from '@/shared/lib/notion-properties';

export const ANNOUNCEMENT_KEYS = {
  title: 'Text (mandatory)',
  linkText: 'Link text (optional)',
  linkUrl: 'Link URL (optional)',
  displayedFrom: 'Displayed from (optional)',
  displayedTo: 'Displayed to (mandatory)',
} as const;

export interface Announcement {
  id: string;
  title: string;
  linkText?: string;
  link?: string;
}

export function parseAnnouncement(page: NotionPage): Announcement {
  const props = page.properties;

  return {
    id: page.id,
    title: getText(props[ANNOUNCEMENT_KEYS.title]),
    linkText: getText(props[ANNOUNCEMENT_KEYS.linkText]) || 'Learn more',
    link:
      formatUrlString(getText(props[ANNOUNCEMENT_KEYS.linkUrl])) || undefined,
  };
}
