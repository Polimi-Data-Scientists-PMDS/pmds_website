'use client';

import {
  Card,
  CardDetails,
  CardHeader,
  CardSubHeader,
} from '@/shared/components/ui/Card';
import Button from '@/shared/components/ui/Button';
import Chip, { ChipDot } from '@/shared/components/ui/Chip';
import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { cn } from '@/shared/lib/utils';
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

const STATUS_CHIP = {
  Recruiting: { label: 'Hiring Now', color: 'amber' },
  Ongoing: { label: 'Ongoing', color: 'accent' },
  Completed: { label: 'Completed', color: 'emerald' },
} as const;

export default function ProjectCard({
  project,
  priority = false,
  compact = false,
  onOpenDetails,
}: {
  project: Project;
  priority?: boolean;
  /** Smaller card with clamped text, for carousels and dense layouts. */
  compact?: boolean;
  /** Shown as a "Read more" link in compact mode, to reveal the full text. */
  onOpenDetails?: (project: Project) => void;
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
      compact={compact}
      chips={[
        isPmqc && (
          <Chip key={1} color="cyan" icon={<FaAtom />}>
            PMQC
          </Chip>
        ),
        <Chip
          key={2}
          color={STATUS_CHIP[project.status].color}
          icon={<ChipDot pulse={project.status !== 'Completed'} />}
        >
          {STATUS_CHIP[project.status].label}
        </Chip>,
      ]}
    >
      <CardHeader className={cn(compact && 'line-clamp-2 text-lg')}>
        {project.title}
      </CardHeader>

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

      <CardDetails className={cn(compact && 'line-clamp-3 text-xs')}>
        {project.description}
      </CardDetails>

      {compact && onOpenDetails && (
        <Button
          onClick={() => onOpenDetails(project)}
          variant="link"
          size="sm"
          className="-mt-2"
        >
          Read more &rarr;
        </Button>
      )}

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
