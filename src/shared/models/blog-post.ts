import {
  getDate,
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

export const BLOG_POST_KEYS = {
  title: 'Title (mandatory)',
  excerpt: 'Excerpt (mandatory)',
  date: 'Date (mandatory)',
  tag: 'Tag (mandatory)',
  coverImage: 'Cover image (optional)',
  externalUrl: 'External url (ONLY FOR LEGACY POSTS)',
  authors: 'Authors (optional)',
  published: 'Published',
} as const;

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

export function parseBlogPost(
  page: NotionPage,
  membersMap: Map<string, Member>,
): BlogPost {
  const props = page.properties;

  const dateStart = getDate(props[BLOG_POST_KEYS.date])?.start;
  const formattedDate = dateStart
    ? new Date(dateStart).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown date';

  const title = getText(props[BLOG_POST_KEYS.title]) || 'Untitled Post';
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const tagProp = props[BLOG_POST_KEYS.tag];
  const rawTags =
    tagProp?.type === 'multi_select'
      ? getMultiSelect(tagProp)
      : [getSelect(tagProp)].filter((t): t is string => Boolean(t));

  return {
    id: page.id,
    slug,
    title,
    excerpt: getText(props[BLOG_POST_KEYS.excerpt]),
    date: formattedDate,
    tags: rawTags.length > 0 ? rawTags : ['General'],
    imageUrl:
      getStableImageUrl(page, BLOG_POST_KEYS.coverImage) || '/placeholder.jpg',
    externalUrl: getUrl(props[BLOG_POST_KEYS.externalUrl]) || undefined,
    authors: resolvePeople(
      getRelationIds(props[BLOG_POST_KEYS.authors]),
      membersMap,
    ),
    content: '', // We don't fetch content for the list
  };
}
