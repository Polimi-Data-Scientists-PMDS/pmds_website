'use client';

import { cn } from '@/shared/lib/utils';
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[85vh] bg-[#0e0e12] border border-white/15 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FaTimes size={14} />
        </button>

        {/* EVENT MODAL CONTENT */}
        {event && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {event.type}
              </span>
              <span className="text-xs text-muted font-medium">
                {event.date}
                {event.time ? ` • ${event.time}` : ''}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
              {event.title}
            </h3>

            {event.imageUrl && (
              <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-4 bg-zinc-900 border border-white/10">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-muted mb-4 pb-3 border-b border-white/10">
              <FaMapMarkerAlt className="text-cyan-400" />
              <span>{event.location}</span>
            </div>

            <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line mb-6">
              {event.description}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                Close
              </button>
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <span>Register Now</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              )}
            </div>
          </>
        )}

        {/* PROJECT MODAL CONTENT */}
        {project && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border',
                  project.status === 'Recruiting'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-blue-500/15 text-blue-300 border-blue-500/30',
                )}
              >
                {project.status === 'Recruiting' ? 'Hiring Now' : 'Ongoing'}
              </span>
              {project.date && (
                <span className="text-xs text-muted font-medium">
                  {project.date}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
              {project.title}
            </h3>

            {project.imageUrl && (
              <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-4 bg-zinc-900 border border-white/10">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {project.partner && (
              <div className="flex items-center gap-2 text-xs text-muted mb-4 pb-3 border-b border-white/10">
                <FaHandshake className="text-blue-400" />
                <span>Partner: {project.partner.name}</span>
              </div>
            )}

            <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line mb-4">
              {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                Close
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-foreground transition-colors"
                >
                  <FaGithub size={13} />
                  <span>GitHub</span>
                </a>
              )}
              {project.applyUrl && project.status === 'Recruiting' && (
                <a
                  href={project.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                >
                  <span>Apply Now</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
