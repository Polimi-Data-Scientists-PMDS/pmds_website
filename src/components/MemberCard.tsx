import Image from "next/image";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { Member } from "@/types";

export default function MemberCard({ member, priority = false }: { member: Member; priority?: boolean }) {
  return (
    <div className="flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group">
      <div className="aspect-square w-full bg-[#151a2d] relative shrink-0">
        {member.imageUrl ? (
          <Image 
            src={member.imageUrl} 
            alt={member.name} 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={priority}
            
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold text-4xl uppercase">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-5 relative flex flex-col flex-1">
        <h3 className="text-white text-[13px] sm:text-[16px] font-bold leading-tight line-clamp-2">{member.name}</h3>
        {member.role && (
          <p className="text-[#4b6ffe] text-[11px] sm:text-[13px] font-medium mt-1 mb-2 line-clamp-2">{member.role}</p>
        )}
        
        <div className="flex gap-2 mt-auto pt-3">
          {member.linkedinUrl && (
            <a 
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#0A66C2] transition-colors"
              title="LinkedIn"
            >
              <FaLinkedinIn size={14} />
            </a>
          )}
          
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              title="Send Email"
            >
              <FaEnvelope size={12} className="sm:w-[14px] sm:h-[14px]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
