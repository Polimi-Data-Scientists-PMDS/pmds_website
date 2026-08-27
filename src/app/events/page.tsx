import { getEvents } from "@/lib/notion";
import EventCard from "@/components/EventCard";

export const revalidate = 3600;

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter(e => e.upcoming);
  const pastEvents = events.filter(e => !e.upcoming);

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-20 relative z-10 w-full max-w-[1100px] mx-auto px-6 mb-24">
      
      {/* Header */}
      <div className="mb-16 mt-10">
        <h1 className="text-[56px] font-[700] text-white leading-snug">Events</h1>
        <p className="text-[16px] text-zinc-400 max-w-[600px] mt-4 leading-relaxed">
          Join our upcoming workshops, seminars, and networking events. 
          Whether you're a beginner or an expert, there's always something new to discover.
        </p>
      </div>

      {upcomingEvents.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Past Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
