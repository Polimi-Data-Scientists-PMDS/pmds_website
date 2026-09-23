import { Member } from '@/shared/types';
import Image from 'next/image';
import { FaEnvelope, FaLinkedinIn } from 'react-icons/fa';

export default function MemberCard({
  member,
  priority = false,
}: {
  member: Member;
  priority?: boolean;
}) {
  return (
    <div className="flex flex-col bg-surface border rounded-3xl overflow-hidden transition-all duration-300 group">
      <div className="aspect-square w-full bg-surface-accent relative shrink-0">
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
          <div className="absolute inset-0 flex items-center justify-center text-muted font-bold text-4xl uppercase">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-5 relative flex flex-col flex-1">
        <h3 className="text-foreground text-xs sm:text-base font-bold leading-tight line-clamp-2">
          {member.name}
        </h3>
        {member.role && (
          <p className="text-accent text-xs sm:text-xs font-medium mt-1 mb-2 line-clamp-2">
            {member.role}
          </p>
        )}

        <div className="flex gap-2 mt-auto pt-3">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-muted hover:text-foreground hover:bg-accent-secondary transition-colors"
              title="LinkedIn"
            >
              <FaLinkedinIn size={14} />
            </a>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-muted hover:text-foreground hover:bg-muted/30 transition-all"
              title="Send Email"
            >
              <FaEnvelope size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
