import EventCard from '@/app/events/_components/EventCard';
import { PageHeading } from '@/shared/components/ui/PageHeading';
import { getEvents } from '@/shared/lib/notion';

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col gap-16 px-6 pt-30">
      {/* Header */}
      <PageHeading
        text="Our"
        highlightedText="Events."
        description="Join our upcoming workshops, seminars, and networking events. Whether you're a beginner or an expert, there's always something new to discover."
      />

      {upcomingEvents.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} priority={index < 2} />
          ))}
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="border-b pb-4 type-heading text-foreground">
            Past Events
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {pastEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                priority={upcomingEvents.length === 0 && index < 2}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
