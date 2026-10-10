'use client';

import { Event } from '@/shared/types';
import Image from 'next/image';
import { FaCalendarAlt, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface PmqcActivityEventCardProps {
  event: Event;
  onOpenDetails: (event: Event) => void;
}

export default function PmqcActivityEventCard({
  event,
  onOpenDetails,
}: PmqcActivityEventCardProps) {
  return (
    <div className="w-[290px] sm:w-[330px] md:w-[350px] shrink-0 snap-start bg-[#0e0e12]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] relative">
      <div>
        {/* Badges: Type and Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            {event.type}
          </span>
          <span className="text-[11px] font-semibold text-muted flex items-center gap-1.5">
            <FaCalendarAlt className="text-cyan-400 text-[10px]" />
            <span className="truncate max-w-[150px]">{event.date}</span>
          </span>
        </div>

        {/* Compact Header Image */}
        {event.imageUrl && (
          <div className="relative w-full h-[110px] sm:h-[120px] rounded-xl overflow-hidden mb-3.5 bg-zinc-900 border border-white/5 shrink-0">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="350px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
          {event.title}
        </h4>

        {/* Truncated Description */}
        <p className="text-muted text-xs leading-relaxed line-clamp-3 mb-2.5">
          {event.description}
        </p>

        {event.description && event.description.length > 120 && (
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer inline-block mb-3"
          >
            Read full description &rarr;
          </button>
        )}
      </div>

      {/* Footer: Location & Action */}
      <div className="pt-3 border-t border-white/5 mt-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-muted truncate">
          <FaMapMarkerAlt className="text-cyan-400 shrink-0 text-[10px]" />
          <span className="truncate">{event.location}</span>
        </div>

        {event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-1.5"
          >
            <span>Register</span>
            <FaExternalLinkAlt className="text-[9px]" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-foreground transition-all cursor-pointer"
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
}
