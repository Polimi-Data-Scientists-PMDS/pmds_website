import {
  getDate,
  getDepartments,
  getSelect,
  getStableImageUrl,
  getText,
  getUrl,
  type NotionPage,
} from '@/shared/lib/notion-properties';

export const EVENT_KEYS = {
  title: 'Name (mandatory)',
  date: 'Date & Time (mandatory)',
  location: 'Location (mandatory)',
  type: 'Type (mandatory)',
  description: 'Description (mandatory)',
  image: 'Image (optional)',
  registrationUrl: 'Registration URL (optional)',
  resourcesUrl: 'Resources URL (optional)',
  department: 'Department',
  departmentOptional: 'Department (optional)',
  published: 'Published',
} as const;

export interface Event {
  id: string;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  location: string;
  type: string;
  description: string;
  imageUrl?: string;
  registrationUrl?: string;
  resourcesUrl?: string;
  upcoming: boolean;
  departments?: string[];
}

function parseDates(
  dateStart?: string,
  dateEnd?: string | null,
): { startDate: Date; endDate: Date } {
  const startDate = dateStart ? new Date(dateStart) : new Date(NaN);
  if (isNaN(startDate.getTime())) {
    const fallback = new Date(0);
    return { startDate: fallback, endDate: fallback };
  }

  const rawEndDate = dateEnd ? new Date(dateEnd) : null;
  const endDate =
    rawEndDate && !isNaN(rawEndDate.getTime()) ? rawEndDate : startDate;

  return { startDate, endDate };
}

/**
 * Date-only values (all-day events) are compared by Europe/Rome calendar day,
 * so an event is still upcoming for the whole day it ends on.
 */
function isUpcoming(
  dateStart: string | undefined,
  dateEnd: string | null | undefined,
  now: Date,
): boolean {
  const last = dateEnd || dateStart;
  if (!last) return false;
  if (last.includes('T')) return new Date(last) >= now;

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
  }).format(now);
  return last >= today;
}

export function parseEvent(page: NotionPage, now: Date = new Date()): Event {
  const props = page.properties;

  const date = getDate(props[EVENT_KEYS.date]);
  const { startDate, endDate } = parseDates(date?.start, date?.end);

  return {
    id: page.id,
    title: getText(props[EVENT_KEYS.title]) || 'Untitled Event',
    dateStart: startDate,
    dateEnd: endDate,
    location:
      getText(props[EVENT_KEYS.location]) ||
      getSelect(props[EVENT_KEYS.location]) ||
      'TBA',
    type: getSelect(props[EVENT_KEYS.type]) || 'Event',
    description: getText(props[EVENT_KEYS.description]),
    imageUrl: getStableImageUrl(page, EVENT_KEYS.image) || undefined,
    registrationUrl: getUrl(props[EVENT_KEYS.registrationUrl]) || undefined,
    resourcesUrl: getUrl(props[EVENT_KEYS.resourcesUrl]) || undefined,
    upcoming: isUpcoming(date?.start, date?.end, now),
    departments: getDepartments(
      props[EVENT_KEYS.department] || props[EVENT_KEYS.departmentOptional],
    ),
  };
}
