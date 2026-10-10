'use client';

import { cn } from '@/shared/lib/utils';
import { Project } from '@/shared/types';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface PmqcActivityProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export default function PmqcActivityProjectCard({
  project,
  onOpenDetails,
}: PmqcActivityProjectCardProps) {
  const isRecruiting = project.status === 'Recruiting';

  return (
    <div className="w-[290px] sm:w-[330px] md:w-[350px] shrink-0 snap-start pmqc-card hover:border-blue-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] relative z-10">
      <div>
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={cn(
              'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
              isRecruiting
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-blue-500/15 text-blue-300 border-blue-500/30',
            )}
          >
            {isRecruiting ? 'Hiring Now' : 'Ongoing'}
          </span>
          {project.date && (
            <span className="text-[11px] font-semibold text-muted">
              {project.date}
            </span>
          )}
        </div>

        {/* Compact Image */}
        {project.imageUrl && (
          <div className="relative w-full h-[110px] sm:h-[120px] rounded-xl overflow-hidden mb-3.5 bg-zinc-900 border border-white/5 shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="350px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug mb-2">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-muted text-xs leading-relaxed line-clamp-3 mb-2.5">
          {project.description}
        </p>

        {project.description && project.description.length > 120 && (
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer inline-block mb-3"
          >
            Read full details &rarr;
          </button>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-muted text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-white/5 mt-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              title="GitHub"
            >
              <FaGithub size={14} />
            </a>
          )}
          {project.partner && (
            <span className="text-[11px] text-muted truncate max-w-[120px]">
              {project.partner.name}
            </span>
          )}
        </div>

        {project.applyUrl && isRecruiting ? (
          <a
            href={project.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center gap-1.5"
          >
            <span>Apply</span>
            <FaExternalLinkAlt className="text-[9px]" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-foreground transition-all cursor-pointer"
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
}
