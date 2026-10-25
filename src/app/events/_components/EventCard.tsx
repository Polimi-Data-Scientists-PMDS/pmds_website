import Button from '@/shared/components/ui/Button';
import {
  Card,
  CardDetails,
  CardHeader,
  CardSubHeader,
} from '@/shared/components/ui/Card';
import Chip from '@/shared/components/ui/Chip';
import { cn, formatDate } from '@/shared/lib/utils';
import { Event } from '@/shared/types';
import { FaAtom, FaLocationDot } from 'react-icons/fa6';

export default function EventCard({
  event,
  priority = false,
  compact = false,
  onOpenDetails,
}: {
  event: Event;
  priority?: boolean;
  /** Smaller card with clamped text, for carousels and dense layouts. */
  compact?: boolean;
  /** Shown as a "Read more" link in compact mode, to reveal the full text. */
  onOpenDetails?: (event: Event) => void;
}) {
  const isPmqc = event.departments?.some((d) => d.toUpperCase() === 'PMQC');

  return (
    <Card
      title={event.title}
      priority={priority}
      imageUrl={event.imageUrl}
      compact={compact}
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
      <CardHeader className={cn(compact && 'line-clamp-2')}>
        {event.title}
      </CardHeader>

      <div
        className={cn(
          'flex flex-col gap-1',
          !compact && 'sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <CardSubHeader>
          {formatDate(event.dateStart, event.dateEnd, 'time')}
        </CardSubHeader>

        <div className="flex w-fit items-center gap-2 type-label text-foreground-secondary sm:justify-end">
          <FaLocationDot className="size-4 text-accent" size={16} />
          <div className="flex flex-col justify-center">
            {event.location.split(',').map((line, i) => (
              <span key={i} className="w-fit text-foreground">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <CardDetails className={cn(compact && 'line-clamp-3')}>
          {event.description}
        </CardDetails>

        {compact && onOpenDetails && (
          <Button onClick={() => onOpenDetails(event)} variant="link" size="sm">
            Read more &rarr;
          </Button>
        )}
      </div>

      <div className="flex-0 grow"></div>

      {((event.upcoming && event.registrationUrl) || event.resourcesUrl) && (
        <div className="flex w-full flex-col gap-4 border-t pt-4">
          {event.upcoming && event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 bg-accent px-4 py-3 type-label text-white transition-colors hover:bg-accent-dark"
            >
              Register Now
            </a>
          )}
          {!compact && event.resourcesUrl && (
            <a
              href={event.resourcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border px-4 py-3 text-center type-label text-foreground transition-colors hover:border-accent"
            >
              View Resources
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
