import EventCard from '@/app/events/_components/EventCard';
import { getEvents } from '@/shared/lib/notion';

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div className="relative z-10 mx-auto mb-24 flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col px-6 pt-20">
      {/* Header */}
      <div className="mt-10 mb-16">
        <h1 className="text-6xl leading-snug font-bold text-foreground">
          Events
        </h1>
        <p className="mt-4 max-w-[600px] text-base leading-relaxed text-muted">
          Join our upcoming workshops, seminars, and networking events. Whether
          you're a beginner or an expert, there's always something new to
          discover.
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} priority={index < 2} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="mb-6 border-b pb-4 text-2xl font-bold text-foreground">
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
