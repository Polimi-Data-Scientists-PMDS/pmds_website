import { getEvents, getProjects } from '@/shared/lib/notion';
import type { Metadata } from 'next';
import LinksView from './LinksView';

export const metadata: Metadata = {
  title: 'Links | Polimi Data Scientists',
  description:
    'Quick links, open applications, and upcoming events for Polimi Data Scientists.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LinksPage() {
  const [projects, events] = await Promise.all([getProjects(), getEvents()]);

  const recruitingProjects = projects.filter(
    (project) => project.status === 'Recruiting' && Boolean(project.applyUrl),
  );

  const upcomingEvents = events.filter(
    (event) => event.upcoming && Boolean(event.registrationUrl),
  );

  return (
    <LinksView
      recruitingProjects={recruitingProjects}
      upcomingEvents={upcomingEvents}
    />
  );
}
