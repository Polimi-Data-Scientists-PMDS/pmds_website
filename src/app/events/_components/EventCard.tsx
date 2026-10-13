import {
  Card,
  CardDetails,
  CardHeader,
  CardSubHeader,
} from '@/shared/components/ui/Card';
import Chip, { ChipDot } from '@/shared/components/ui/Chip';
import { formatDate } from '@/shared/lib/utils';
import { Event } from '@/shared/types';
import { FaAtom, FaLocationDot } from 'react-icons/fa6';

export default function EventCard({
  event,
  priority = false,
}: {
  event: Event;
  priority?: boolean;
}) {
  const isPmqc = event.departments?.some((d) => d.toUpperCase() === 'PMQC');

  return (
    <Card
      title={event.title}
      priority={priority}
      imageUrl={event.imageUrl}
      chips={[
        <Chip key={2} color={event.upcoming ? 'highlight' : 'muted'}>
          {event.type}
        </Chip>,
        isPmqc && (
          <Chip key={1} color="cyan" icon={<FaAtom />}>
            PMQC
          </Chip>
        ),
      ]}
    >
      <CardHeader>{event.title}</CardHeader>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardSubHeader>
          {formatDate(event.dateStart, event.dateEnd, 'time')}
        </CardSubHeader>

        <div className="flex items-center gap-2 text-xs text-muted sm:justify-end">
          <FaLocationDot className="size-4 text-muted" size={16} />
          <span className="text-foreground">{event.location}</span>
        </div>
      </div>

      <CardDetails>{event.description}</CardDetails>

      <div className="flex-1"></div>

      {((event.upcoming && event.registrationUrl) || event.resourcesUrl) && (
        <div className="flex w-full flex-col gap-4 border-t border-white/5 pt-4">
          {event.upcoming && event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 font-medium text-foreground transition-all hover:bg-accent-secondary"
            >
              Register Now
            </a>
          )}
          {event.resourcesUrl && (
            <a
              href={event.resourcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-foreground transition-all hover:bg-white/10"
            >
              View Resources
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
