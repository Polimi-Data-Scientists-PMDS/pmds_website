import type { PageObjectResponse } from '@notionhq/client';

export type NotionPage = PageObjectResponse;
export type NotionProperty = NotionPage['properties'][string] | undefined;

// Utility to get text from Rich Text or Title properties
export const getText = (prop: NotionProperty): string => {
  if (!prop) return '';
  if (prop.type === 'title')
    return prop.title.map((t) => t.plain_text).join('');
  if (prop.type === 'rich_text')
    return prop.rich_text.map((t) => t.plain_text).join('');
  return '';
};

export const formatUrlString = (url: string | null) => {
  if (!url) return null;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const getUrl = (prop: NotionProperty) =>
  formatUrlString(prop?.type === 'url' ? prop.url : null);

export const getEmail = (prop: NotionProperty) =>
  prop?.type === 'email' ? prop.email : null;

export const getNumber = (prop: NotionProperty) =>
  prop?.type === 'number' ? prop.number : null;

export const getDate = (prop: NotionProperty) =>
  prop?.type === 'date' ? prop.date : null;

export const getRelationIds = (prop: NotionProperty): string[] =>
  prop?.type === 'relation' ? prop.relation.map((r) => r.id) : [];

export const getSelect = (prop: NotionProperty) =>
  prop?.type === 'select' ? prop.select?.name || null : null;

export const getMultiSelect = (prop: NotionProperty): string[] =>
  prop?.type === 'multi_select' ? prop.multi_select.map((s) => s.name) : [];

export const getDepartments = (prop: NotionProperty): string[] => {
  if (prop?.type === 'multi_select') {
    return prop.multi_select.map((s) => s.name.trim()).filter(Boolean);
  }
  if (prop?.type === 'select' && prop.select?.name) {
    return [prop.select.name.trim()];
  }
  return [];
};

/**
 * Generates an immutable proxy URL for Notion S3 hosted files.
 * Encodes the Notion page ID, property name, and unique upload path into a base64url token.
 * This prevents AWS S3 temporary presigned signatures from busting Edge CDN caches.
 */
export const getStableImageUrl = (page: NotionPage, propName: string) => {
  const prop = page.properties[propName];
  if (prop?.type !== 'files' || prop.files.length === 0) return null;
  const file = prop.files[0];
  if (file.type === 'external') {
    return file.external.url;
  }

  let version = file.name || 'image';
  try {
    const pathname = new URL(file.file.url).pathname;
    const parts = pathname.split('/');
    if (parts.length >= 3) {
      version = parts.slice(2).join('_');
    }
  } catch {}

  const token = Buffer.from(
    JSON.stringify({ id: page.id, prop: propName, v: version }),
  ).toString('base64url');
  return `/api/image/${token}`;
};
