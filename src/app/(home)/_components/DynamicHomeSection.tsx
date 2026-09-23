import EventCard from '@/app/events/_components/EventCard';
import { Event } from '@/shared/types';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function DynamicHomeSection({
  upcomingEvents,
}: {
  upcomingEvents: Event[];
}) {
  if (!upcomingEvents || upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 mt-16 md:mt-20 flex flex-col gap-24">
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-8 border-b pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-muted mt-2">
                Don't miss out on what's happening next.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-foreground transition-colors group"
            >
              View all{' '}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Link
            href="/events"
            className="sm:hidden mt-6 flex items-center justify-center gap-2 text-accent font-semibold hover:text-foreground transition-colors group"
          >
            View all events{' '}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  );
}
