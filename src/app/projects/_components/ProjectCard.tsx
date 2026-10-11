'use client';

import {
  Card,
  CardDetails,
  CardHeader,
  CardSubHeader,
} from '@/shared/components/ui/Card';
import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { Project } from '@/shared/types';
import { Fragment } from 'react';
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

  const links = [
    {
      url: project.githubUrl,
      label: 'Repository',
      icon: <FaGithub size={14} />,
      title: 'View Source on GitHub',
    },
    { url: project.paperUrl, label: 'Paper', icon: <FaFilePdf size={14} /> },
    {
      url: project.reportUrl,
      label: 'Report',
      icon: <FaExternalLinkAlt size={14} />,
    },
  ].filter((link) => link.url);

  return (
    <Card
      title={project.title}
      imageUrl={project.imageUrl}
      priority={priority}
      chips={[
        isPmqc && (
          <span
            key={1}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 text-xs font-bold tracking-wider text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md"
          >
            <FaAtom className="text-xs text-cyan-300" />
            <span>PMQC</span>
          </span>
        ),
        <div
          key={2}
          className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs font-bold tracking-wider text-foreground uppercase backdrop-blur-md"
        >
          {project.status === 'Recruiting' && (
            <span className="flex items-center gap-2 text-amber-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
              Hiring Now
            </span>
          )}
          {project.status === 'Ongoing' && (
            <span className="flex items-center gap-2 text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent"></span>
              Ongoing
            </span>
          )}
          {project.status === 'Completed' && (
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Completed
            </span>
          )}
        </div>,
      ]}
    >
      <CardHeader>{project.title}</CardHeader>

      <div className="flex flex-row items-center justify-between gap-2">
        <CardSubHeader>{project.date}</CardSubHeader>

        {project.partner && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <FaHandshake className="text-muted" />
            Collaborating with:
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
      </div>

      <CardDetails>{project.description}</CardDetails>

      <div className="flex-1"></div>

      <div className="flex flex-row items-end justify-between gap-2">
        {project.team && project.team.length > 0 && (
          <PeopleGroup size="sm" people={project.team} />
        )}

        <span className="text-xs text-muted uppercase">
          {project.tags?.join(' | ')}
        </span>
      </div>

      {(project.status !== 'Completed' || links.length > 0) && (
        <div className="flex w-full flex-wrap gap-4 border-t border-white/5 pt-4">
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

          {project.status === 'Ongoing' && (
            <span className="w-full py-2 text-center text-sm text-muted italic">
              Currently in development. Check back later for updates.
            </span>
          )}

          {links.length > 0 && (
            <div className="flex w-full items-center justify-evenly gap-2">
              {links.map((link, i) => (
                <Fragment key={link.label}>
                  {i > 0 && <span className="text-sm text-muted">|</span>}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-foreground"
                    title={link.title}
                  >
                    {link.icon} {link.label}
                  </a>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
