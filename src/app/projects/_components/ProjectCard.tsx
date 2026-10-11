'use client';

import Card from '@/shared/components/ui/Card';
import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { Project } from '@/shared/types';
import {
  FaAtom,
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
  const isPmqc =
    project.departments?.some((d) => d.toUpperCase() === 'PMQC') ||
    project.tags?.some((t) => t.toUpperCase() === 'PMQC');

  return (
    <Card
      title={project.title}
      details={project.description}
      imageUrl={project.imageUrl}
      priority={priority}
      date={project.date}
      chips={[
        isPmqc && (
          <span
            key={1}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 text-xs font-bold tracking-wider text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md"
          >
            <FaAtom className="text-xs text-cyan-300" />
            <span>PMQC</span>
          </span>
        ),
        project.status === 'Recruiting' && (
          <span key={2} className="flex items-center gap-2 text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
            Hiring Now
          </span>
        ),
        project.status === 'Ongoing' && (
          <span key={2} className="flex items-center gap-2 text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent"></span>
            Ongoing
          </span>
        ),
        project.status === 'Completed' && (
          <span key={2} className="flex items-center gap-2 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Completed
          </span>
        ),
      ]}
    >
      {/* Content Container */}
      <div className="relative flex flex-1 flex-col p-8">
        <div className="mb-3 flex items-center justify-between">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
              title="View Source on GitHub"
            >
              <FaGithub size={18} />
            </a>
          )}
        </div>

        {/* Partner Info */}
        {project.partner && (
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-muted">
            <FaHandshake className="text-muted" />
            In collaboration with:
            {project.partner.url ? (
              <a
                href={project.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-white/20 underline-offset-2 transition-colors hover:text-accent"
              >
                {project.partner.name}
              </a>
            ) : (
              <span className="text-foreground">{project.partner.name}</span>
            )}
          </div>
        )}

        {/* Tags and Team */}
        <div className="mt-auto mb-8 flex flex-col gap-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
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
        <div className="mt-auto flex flex-wrap gap-4 border-t border-white/5 pt-6">
          {/* Recruiting State */}
          {project.status === 'Recruiting' && project.applyUrl && (
            <a
              href={project.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 font-medium text-amber-500 transition-colors hover:bg-amber-500/20"
            >
              <FaUsers size={16} /> Apply for this Project
            </a>
          )}

          {/* Completed State */}
          {project.status === 'Completed' && (
            <div className="flex w-full gap-4">
              {project.paperUrl && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <FaFilePdf size={14} /> Paper
                </a>
              )}
              {project.reportUrl && (
                <a
                  href={project.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <FaExternalLinkAlt size={12} /> Report
                </a>
              )}
            </div>
          )}

          {/* Ongoing State */}
          {project.status === 'Ongoing' && (
            <span className="flex items-center py-2 text-xs text-muted italic">
              Currently in development. Check back later for updates.
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
