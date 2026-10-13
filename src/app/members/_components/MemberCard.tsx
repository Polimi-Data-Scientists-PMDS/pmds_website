import SocialLink from '@/shared/components/ui/SocialLink';
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
      <div className="relative aspect-[4/3] w-full shrink-0 bg-[#151a2d]">
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

      <div className="relative flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-xs leading-tight font-bold text-foreground sm:text-base">
          {member.name}
        </h3>
        {member.role && (
          <p className="line-clamp-2 text-xs font-medium text-accent sm:text-xs">
            {member.role}
          </p>
        )}

        <div className="mt-auto flex justify-evenly gap-2 pt-3">
          {member.linkedinUrl && (
            <SocialLink
              icon={FaLinkedinIn}
              title="Linkedin"
              className="flex-1"
              href={member.linkedinUrl}
            />
          )}

          {member.email && (
            <SocialLink
              icon={FaEnvelope}
              title="Send Email"
              className="flex-1"
              href={`mailto:${member.email}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
