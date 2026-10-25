import EventCard from '@/app/events/_components/EventCard';
import { Event } from '@/shared/types';
import ArrowLink from './ArrowLink';
import SectionHeader from './SectionHeader';

export default function DynamicHomeSection({
  upcomingEvents,
}: {
  upcomingEvents: Event[];
}) {
  return (
    <section className="flex w-full flex-col gap-12 px-8 lg:px-10">
      <SectionHeader
        index="003"
        label="Upcoming events"
        title="What's happening next."
        description={
          <p>
            Workshops, talks and hackathons open to every student at PoliMi.
            Don&apos;t miss out.
          </p>
        }
      />

      {upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="border p-6 type-label text-foreground-secondary lg:p-8">
          No upcoming events right now, check back soon.
        </p>
      )}

      <ArrowLink href="/events" className="self-end">
        View all events
      </ArrowLink>
    </section>
  );
}
