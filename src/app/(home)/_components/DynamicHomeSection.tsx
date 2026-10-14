import EventCard from '@/app/events/_components/EventCard';
import { Event } from '@/shared/types';
import Button from '@/shared/components/ui/Button';
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
    <section className="mx-auto mt-16 flex w-full max-w-[1100px] flex-col gap-24 px-6 md:mt-20">
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <div className="mb-8 flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-2 text-muted">
                Don't miss out on what's happening next.
              </p>
            </div>
            <Button
              href="/events"
              variant="link"
              size="md"
              className="hidden sm:flex"
            >
              View all{' '}
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Button
            href="/events"
            variant="link"
            size="md"
            fullWidth
            className="mt-6 flex sm:hidden"
          >
            View all events{' '}
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}
    </section>
  );
}
