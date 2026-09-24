'use client';

import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { cn } from '@/shared/lib/utils';
import { Project } from '@/shared/types';
import Image from 'next/image';
import {
  FaExternalLinkAlt,
  FaFilePdf,
  FaGithub,
  FaHandshake,
  FaUsers,
} from 'react-icons/fa';

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div className="group flex flex-col bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-3xl transition-all duration-300 relative">
      {/* Image Container */}
      <div
        className={cn(
          'w-full h-[240px] relative overflow-hidden rounded-t-[1.4rem]',
          !project.imageUrl &&
            'bg-gradient-to-br from-[#151a2d] to-[#0a0a0a] flex items-center justify-center',
        )}
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#151a2d] to-[#0a0a0a] flex items-center justify-center">
            <span className="text-foreground/30 font-bold text-4xl tracking-widest">
              PMDS
            </span>
          </div>
        )}
        {/* Status Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 border border-white/10 text-foreground">
          {project.status === 'Recruiting' && (
            <span className="flex items-center gap-2 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Hiring Now
            </span>
          )}
          {project.status === 'Ongoing' && (
            <span className="flex items-center gap-2 text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Ongoing
            </span>
          )}
          {project.status === 'Completed' && (
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-8 flex flex-col flex-1 relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-accent text-xs font-bold uppercase tracking-wider">
            {project.date}
          </span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              title="View Source on GitHub"
            >
              <FaGithub size={18} />
            </a>
          )}
        </div>

        <h3 className="text-foreground text-2xl font-bold mb-2">
          {project.title}
        </h3>

        {/* Partner Info */}
        {project.partner && (
          <div className="flex items-center gap-2 text-muted text-xs font-medium mb-4">
            <FaHandshake className="text-muted" />
            In collaboration with:
            {project.partner.url ? (
              <a
                href={project.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors underline decoration-white/20 underline-offset-2"
              >
                {project.partner.name}
              </a>
            ) : (
              <span className="text-foreground">{project.partner.name}</span>
            )}
          </div>
        )}

        <p className="text-muted text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags and Team */}
        <div className="flex flex-col gap-5 mt-auto mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-muted text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Team Section */}
          {project.team && project.team.length > 0 && (
            <PeopleGroup size="sm" people={project.team} />
          )}
        </div>

        {/* Conditional Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-auto border-t border-white/5 pt-6">
          {/* Recruiting State */}
          {project.status === 'Recruiting' && project.applyUrl && (
            <a
              href={project.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-2 rounded-xl font-medium hover:bg-amber-500/20 transition-colors w-full justify-center"
            >
              <FaUsers size={16} /> Apply for this Project
            </a>
          )}

          {/* Completed State */}
          {project.status === 'Completed' && (
            <div className="flex gap-4 w-full">
              {project.paperUrl && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2 text-sm"
                >
                  <FaFilePdf size={14} /> Paper
                </a>
              )}
              {project.reportUrl && (
                <a
                  href={project.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2 text-sm"
                >
                  <FaExternalLinkAlt size={12} /> Report
                </a>
              )}
            </div>
          )}

          {/* Ongoing State */}
          {project.status === 'Ongoing' && (
            <span className="text-muted text-xs italic flex items-center py-2">
              Currently in development. Check back later for updates.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
