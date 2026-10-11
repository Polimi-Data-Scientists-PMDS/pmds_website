import {
  Card,
  CardDetails,
  CardHeader,
  CardSubHeader,
} from '@/shared/components/ui/Card';
import { cn, formatDate } from '@/shared/lib/utils';
import { Event } from '@/shared/types';
import { FaAtom } from 'react-icons/fa6';

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
        <div
          key={2}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md',
            event.upcoming
              ? 'border-accent/40 bg-accent/20 text-foreground shadow-[0_0_20px_rgba(75,111,254,0.3)]'
              : 'border border-white/10 bg-black/50 text-muted',
          )}
        >
          {event.type}
        </div>,
        isPmqc && (
          <span
            key={1}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 text-xs font-bold tracking-wider text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md"
          >
            <FaAtom className="text-xs text-cyan-300" />
            <span>PMQC</span>
          </span>
        ),
      ]}
    >
      <CardHeader>{event.title}</CardHeader>

      <CardSubHeader>
        {formatDate(event.dateStart, event.dateEnd, 'time')}
      </CardSubHeader>

      

      <CardDetails>{event.description}</CardDetails>
    </Card>
  );
}
