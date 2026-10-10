import { cn } from '@/shared/lib/utils';
import { Event } from '@/shared/types';
import Image from 'next/image';
import { FaCalendarAlt, FaDatabase, FaMapMarkerAlt } from 'react-icons/fa';
import { FaAtom } from 'react-icons/fa6';

function DepartmentBadge({ isPmqc }: { isPmqc: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md w-fit',
        isPmqc
          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
          : 'bg-accent/20 text-foreground border-accent/40 shadow-[0_0_15px_rgba(75,111,254,0.25)]',
      )}
    >
      {isPmqc ? (
        <FaAtom className="text-cyan-300 text-xs" />
      ) : (
        <FaDatabase className="text-accent text-xs" />
      )}
      <span>{isPmqc ? 'PMQC' : 'PMDS'}</span>
    </span>
  );
}

export default function EventCard({
  event,
  priority = false,
}: {
  event: Event;
  priority?: boolean;
}) {
  const isPmqc = event.departments?.some((d) => d.toUpperCase() === 'PMQC');

  return (
    <div className="flex flex-col bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-[32px] overflow-hidden transition-colors duration-300 group h-full">
      {/* Image Section */}
      {event.imageUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/5 shrink-0">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />

          {/* PMQC Badge */}
          {isPmqc && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                <FaAtom className="text-cyan-300 text-xs" />
                <span>PMQC</span>
              </span>
            </div>
          )}

          {/* Floating Badge on Image */}
          <div className="absolute top-4 right-4 z-10">
            <div
              className={cn(
                'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md',
                event.upcoming
                  ? 'bg-accent/20 text-foreground border-accent/40 shadow-[0_0_20px_rgba(75,111,254,0.3)]'
                  : 'bg-black/50 text-muted border border-white/10',
              )}
            >
              {event.type}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-8">
        {/* PMQC Badge if no image */}
        {!event.imageUrl && isPmqc && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)] w-fit">
              <FaAtom className="text-cyan-300 text-xs" />
              <span>PMQC</span>
            </span>
          </div>
        )}
        {/* Title without line-clamp */}
        <h3 className="text-2xl font-bold text-foreground mb-3 leading-snug">
          {event.title}
        </h3>

        {/* Description without line-clamp */}
        <p className="text-muted text-sm leading-relaxed mb-8">
          {event.description}
        </p>

        {/* Info & Actions */}
        <div className="mt-auto space-y-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-muted">
              <div className="size-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <FaCalendarAlt className="text-accent" size={14} />
              </div>
              <span className="font-medium">
                {event.date} {event.time ? `• ${event.time}` : ''}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted">
              <div className="size-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-accent" size={14} />
              </div>
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {((event.upcoming && event.registrationUrl) ||
            event.resourcesUrl) && (
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              {event.upcoming && event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-accent hover:bg-accent-secondary text-foreground text-sm font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(75,111,254,0.2)]"
                >
                  Register Now
                </a>
              )}
              {event.resourcesUrl && (
                <a
                  href={event.resourcesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-white/5 hover:bg-white/10 text-foreground text-sm font-semibold rounded-xl transition-all border border-white/10"
                >
                  View Resources
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
