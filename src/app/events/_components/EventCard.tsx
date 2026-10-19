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
      <CardHeader className={cn(compact && 'line-clamp-2 text-lg')}>
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

        <div className="flex w-fit items-center gap-2 text-xs text-muted sm:justify-end">
          <FaLocationDot className="size-4 text-muted" size={16} />
          <div className="flex flex-col justify-center">
            {event.location.split(',').map((line, i) => (
              <span key={i} className="w-fit font-medium text-foreground">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <CardDetails className={cn(compact && 'line-clamp-3 text-xs')}>
        {event.description}
      </CardDetails>

      {compact && onOpenDetails && (
        <Button
          onClick={() => onOpenDetails(event)}
          variant="link"
          size="sm"
          className="-mt-2"
        >
          Read more &rarr;
        </Button>
      )}

      <div className="flex-0 grow"></div>

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
          {!compact && event.resourcesUrl && (
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
