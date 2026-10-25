'use client';

import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
import { formatDate } from '@/shared/lib/utils';
import { Event, Project } from '@/shared/types';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaHandshake,
  FaMapMarkerAlt,
  FaTimes,
} from 'react-icons/fa';

interface PmqcActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  project: Project | null;
}

export default function PmqcActivityModal({
  isOpen,
  onClose,
  event,
  project,
}: PmqcActivityModalProps) {
  if (!isOpen || (!event && !project)) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0e0e12] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="secondary"
          size="icon"
          className="absolute top-5 right-5 text-foreground-secondary hover:text-foreground"
          aria-label="Close modal"
        >
          <FaTimes size={14} />
        </Button>

        {/* EVENT MODAL CONTENT */}
        {event && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Chip color="cyan">{event.type}</Chip>
                  <span className="type-label text-foreground-secondary">
                    {formatDate(event.dateStart, event.dateEnd, 'time')}
                  </span>
                </div>

                <h3 className="type-title text-foreground">{event.title}</h3>
              </div>

              {event.imageUrl && (
                <div className="relative h-[180px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 border-b border-white/10 pb-3 type-label text-foreground-secondary">
                <FaMapMarkerAlt className="text-cyan-400" />
                <span>{event.location}</span>
              </div>

              <p className="type-body whitespace-pre-line text-foreground/90">
                {event.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-3">
              <Button onClick={onClose} variant="ghost" size="sm">
                Close
              </Button>
              {event.registrationUrl && (
                <Button
                  href={event.registrationUrl}
                  variant="cyan"
                  size="sm"
                  className="px-5 py-2.5"
                >
                  <span>Register Now</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* PROJECT MODAL CONTENT */}
        {project && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Chip
                    color={project.status === 'Recruiting' ? 'amber' : 'blue'}
                  >
                    {project.status === 'Recruiting' ? 'Hiring Now' : 'Ongoing'}
                  </Chip>
                  {project.date && (
                    <span className="type-label text-foreground-secondary">
                      {project.date}
                    </span>
                  )}
                </div>

                <h3 className="type-title text-foreground">{project.title}</h3>
              </div>

              {project.imageUrl && (
                <div className="relative h-[180px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {project.partner && (
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 type-label text-foreground-secondary">
                  <FaHandshake className="text-blue-400" />
                  <span>Partner: {project.partner.name}</span>
                </div>
              )}

              <p className="type-body whitespace-pre-line text-foreground/90">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Chip key={tag} color="muted">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-3">
              <Button onClick={onClose} variant="ghost" size="sm">
                Close
              </Button>
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 px-4 py-2.5"
                >
                  <FaGithub size={13} />
                  <span>GitHub</span>
                </Button>
              )}
              {project.applyUrl && project.status === 'Recruiting' && (
                <Button
                  href={project.applyUrl}
                  variant="amber"
                  size="sm"
                  className="px-5 py-2.5"
                >
                  <span>Apply Now</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
