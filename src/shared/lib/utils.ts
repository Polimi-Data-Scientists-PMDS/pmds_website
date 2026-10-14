import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export type DateDetail = 'time' | 'day' | 'month' | 'year';

const TIME_ZONE = 'Europe/Rome';

const getDateParts = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';

  return {
    day: get('day'),
    month: get('month'),
    year: get('year'),
    time: `${get('hour')}:${get('minute')}`,
  };
};

/**
 * Formats a date or a date range in the Europe/Rome timezone, collapsing
 * the parts shared by start and end.
 *
 * - time:  "12:00 20 Oct 2022", "12:00-13:00 20 Oct 2022"; ranges spanning
 *          multiple days drop the time and are formatted as "day"
 * - day:   "20 Oct 2022", "20-22 Oct 2022", "20 Oct - 22 Nov 2022",
 *          "20 Oct 2022 - 3 Jan 2023"
 * - month: "Oct 2022", "Oct - Nov 2022", "Oct 2022 - Jan 2023"
 * - year:  "2022", "2022 - 2023"
 */
export const formatDate = (
  start: Date,
  end?: Date,
  detail: DateDetail = 'time',
): string => {
  const s = getDateParts(start);
  const e = end ? getDateParts(end) : s;

  const sameYear = s.year === e.year;
  const sameMonth = sameYear && s.month === e.month;
  const sameDay = sameMonth && s.day === e.day;

  switch (detail) {
    case 'year':
      return sameYear ? s.year : `${s.year} - ${e.year}`;
    case 'month':
      if (sameMonth) return `${s.month} ${s.year}`;
      if (sameYear) return `${s.month} - ${e.month} ${s.year}`;
      return `${s.month} ${s.year} - ${e.month} ${e.year}`;
    case 'time':
      if (sameDay) {
        const time = s.time === e.time ? s.time : `${s.time}-${e.time}`;
        return `${time} ${s.day} ${s.month} ${s.year}`;
      }
    case 'day':
      if (sameDay) return `${s.day} ${s.month} ${s.year}`;
      if (sameMonth) return `${s.day}-${e.day} ${s.month} ${s.year}`;
      if (sameYear)
        return `${s.day} ${s.month} - ${e.day} ${e.month} ${s.year}`;
      return `${s.day} ${s.month} ${s.year} - ${e.day} ${e.month} ${e.year}`;
  }
};
