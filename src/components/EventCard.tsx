import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "@/types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-[32px] overflow-hidden transition-all duration-300 group h-full">
      {/* Image Section */}
      {event.imageUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/5 shrink-0">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
          
          {/* Floating Badge on Image */}
          <div className="absolute top-4 right-4 z-10">
            <div className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${
              event.upcoming 
                ? 'bg-[#4b6ffe]/20 text-white border-[#4b6ffe]/40 shadow-[0_0_20px_rgba(75,111,254,0.3)]' 
                : 'bg-black/50 text-zinc-300 border-white/10'
            }`}>
              {event.type}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-8">
        
        {/* Title without line-clamp */}
        <h3 className="text-[22px] font-bold text-white mb-3 leading-snug">
          {event.title}
        </h3>

        {/* Description without line-clamp */}
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
          {event.description}
        </p>

        {/* Info & Actions */}
        <div className="mt-auto space-y-6">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[14px] text-zinc-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <FaCalendarAlt className="text-[#4b6ffe]" size={14} />
              </div>
              <span className="font-medium">{event.date} {event.time ? `• ${event.time}` : ''}</span>
            </div>
            
            <div className="flex items-center gap-3 text-[14px] text-zinc-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-[#4b6ffe]" size={14} />
              </div>
              <span className="font-medium">{event.location}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          {((event.upcoming && event.registrationUrl) || event.resourcesUrl) && (
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              {event.upcoming && event.registrationUrl && (
                <a 
                  href={event.registrationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-[#4b6ffe] hover:bg-[#3f5fdf] text-white text-[14px] font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(75,111,254,0.2)]"
                >
                  Register Now
                </a>
              )}
              {event.resourcesUrl && (
                <a 
                  href={event.resourcesUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-white/5 hover:bg-white/10 text-white text-[14px] font-semibold rounded-xl transition-all border border-white/10"
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
