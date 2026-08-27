import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "@/types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="group flex flex-col sm:flex-row bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden transition-all duration-300">
      {event.imageUrl && (
        <div className="relative w-full sm:w-[240px] h-[200px] sm:h-auto shrink-0 border-b sm:border-b-0 sm:border-r border-white/5 overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent sm:via-transparent opacity-80 sm:opacity-0" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 sm:p-8">
        <div className="mb-4">
          <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            event.upcoming 
              ? 'bg-[#4b6ffe]/10 text-[#4b6ffe] border-[#4b6ffe]/20' 
              : 'bg-white/5 text-zinc-400 border-white/10'
          }`}>
            {event.type}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <FaCalendarAlt className="text-[#4b6ffe]" />
              <span>{event.date} {event.time ? `• ${event.time}` : ''}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <FaMapMarkerAlt className="text-[#4b6ffe]" />
              <span>{event.location}</span>
            </div>
          </div>
          
          {((event.upcoming && event.registrationUrl) || event.resourcesUrl) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {event.upcoming && event.registrationUrl && (
                <a 
                  href={event.registrationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#4b6ffe] hover:bg-[#4b6ffe]/90 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Register Now
                </a>
              )}
              {event.resourcesUrl && (
                <a 
                  href={event.resourcesUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-lg transition-colors border border-white/5"
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
