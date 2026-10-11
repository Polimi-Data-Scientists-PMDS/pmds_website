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
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-surface/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/10">
      <div className="relative aspect-square w-full shrink-0 bg-[#151a2d]">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted uppercase">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="line-clamp-2 text-xs leading-tight font-bold text-foreground sm:text-base">
          {member.name}
        </h3>
        {member.role && (
          <p className="mt-1 mb-2 line-clamp-2 text-xs font-medium text-accent sm:text-xs">
            {member.role}
          </p>
        )}

        <div className="mt-auto flex gap-2 pt-3">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted transition-colors hover:bg-[#0A66C2] hover:text-white"
              title="LinkedIn"
            >
              <FaLinkedinIn size={14} />
            </a>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted transition-all hover:bg-zinc-700 hover:text-white"
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
