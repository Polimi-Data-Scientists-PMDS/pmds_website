import EventCard from '@/app/events/_components/EventCard';
import { getEvents } from '@/shared/lib/notion';

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-20 relative z-10 w-full max-w-[1100px] mx-auto px-6 mb-24">
      {/* Header */}
      <div className="mb-16 mt-10">
        <h1 className="text-6xl font-bold text-foreground leading-snug">
          Events
        </h1>
        <p className="text-base text-muted max-w-[600px] mt-4 leading-relaxed">
          Join our upcoming workshops, seminars, and networking events. Whether
          you're a beginner or an expert, there's always something new to
          discover.
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} priority={index < 2} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b pb-4">
            Past Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
