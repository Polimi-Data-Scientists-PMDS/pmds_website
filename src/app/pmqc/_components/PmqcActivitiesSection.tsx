'use client';

import EventCard from '@/app/events/_components/EventCard';
import ProjectCard from '@/app/projects/_components/ProjectCard';
import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
import { Event, Project } from '@/shared/types';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaFolderOpen,
} from 'react-icons/fa';
import PmqcActivityModal from './PmqcActivityModal';

const emptySubscribe = () => () => {};

const CAROUSEL_ITEM = 'w-72.5 shrink-0 snap-start sm:w-82.5 md:w-87.5';

interface PmqcActivitiesSectionProps {
  events: Event[];
  projects: Project[];
}

export default function PmqcActivitiesSection({
  events,
  projects,
}: PmqcActivitiesSectionProps) {
  // 1. Filter upcoming events and active projects
  const upcomingEvents = events.filter((e) => e.upcoming);
  const activeProjects = projects.filter(
    (p) => p.status === 'Recruiting' || p.status === 'Ongoing',
  );

  const [activeTab, setActiveTab] = useState<'events' | 'projects'>('events');

  // Modal details state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedEvent && !selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, selectedProject]);

  // Carousel refs for smooth horizontal scroll
  const eventsCarouselRef = useRef<HTMLDivElement>(null);
  const projectsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right',
  ) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedProject(null);
  };

  return (
    <section
      id="pmqc-activities-anchor"
      className="relative mx-auto w-full max-w-[1200px] px-2 sm:px-4"
    >
      {/* Section Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end">
        <div>
          <Chip color="cyan" className="mb-2">
            Events &amp; Projects
          </Chip>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            What&apos;s on
          </h2>
          <p className="mt-1.5 max-w-[620px] text-xs leading-relaxed text-muted sm:text-sm">
            Lessons, talks and projects run by PMQC.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex items-center self-start rounded-2xl pmqc-card p-1 shadow-sm md:self-auto">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === 'events'
                ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'border border-transparent text-muted hover:bg-white/5 hover:text-foreground'
            }`}
          >
            <FaCalendarAlt
              size={12}
              className={
                activeTab === 'events' ? 'text-cyan-400' : 'text-muted'
              }
            />
            <span>Upcoming events</span>
            {upcomingEvents.length > 0 && (
              <span className="py-0.2 ml-1 rounded-full bg-cyan-500/20 px-1.5 text-[10px] font-bold text-cyan-300">
                {upcomingEvents.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === 'projects'
                ? 'border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                : 'border border-transparent text-muted hover:bg-white/5 hover:text-foreground'
            }`}
          >
            <FaFolderOpen
              size={12}
              className={
                activeTab === 'projects' ? 'text-blue-400' : 'text-muted'
              }
            />
            <span>Active projects</span>
            {activeProjects.length > 0 && (
              <span className="py-0.2 ml-1 rounded-full bg-blue-500/20 px-1.5 text-[10px] font-bold text-blue-300">
                {activeProjects.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* UPCOMING EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="w-full">
          {upcomingEvents.length > 0 ? (
            <>
              {/* Subheader with carousel controls */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-foreground/90 uppercase">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                  <span>
                    Upcoming Quantum Sessions ({upcomingEvents.length})
                  </span>
                </div>

                {upcomingEvents.length > 2 && (
                  <div className="hidden items-center gap-2 sm:flex">
                    <Button
                      onClick={() => scrollCarousel(eventsCarouselRef, 'left')}
                      variant="secondary"
                      size="icon"
                      className="text-muted hover:border-cyan-500/40 hover:text-cyan-300"
                      aria-label="Scroll left"
                    >
                      {' '}
                      <FaChevronLeft size={11} />{' '}
                    </Button>
                    <Button
                      onClick={() => scrollCarousel(eventsCarouselRef, 'right')}
                      variant="secondary"
                      size="icon"
                      className="text-muted hover:border-cyan-500/40 hover:text-cyan-300"
                      aria-label="Scroll right"
                    >
                      {' '}
                      <FaChevronRight size={11} />{' '}
                    </Button>
                  </div>
                )}
              </div>

              {/* Cards Carousel Container */}
              <div
                ref={eventsCarouselRef}
                className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-1 pt-1 pb-4 sm:gap-5"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {upcomingEvents.map((event) => (
                  <div key={event.id} className={CAROUSEL_ITEM}>
                    <EventCard
                      event={event}
                      compact
                      onOpenDetails={setSelectedEvent}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="my-2 flex w-full flex-col items-center justify-center rounded-3xl pmqc-card p-8 text-center sm:p-12">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                <FaCalendarAlt size={18} />
              </div>
              <p className="max-w-[460px] text-sm leading-relaxed font-medium text-foreground/90 sm:text-base">
                Nothing scheduled yet. Our first events are coming in November.
              </p>
            </div>
          )}

          {/* Bottom link to view ALL events */}
          <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-3 text-xs text-muted sm:flex-row">
            <span className="text-muted/70">Looking for past events?</span>
            <Button
              href="/events"
              variant="link"
              size="sm"
              className="gap-1.5 text-cyan-400 hover:text-cyan-300"
            >
              <span>All PMDS events</span>
              <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ACTIVE PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="w-full">
          {activeProjects.length > 0 ? (
            <>
              {/* Subheader with carousel controls */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-foreground/90 uppercase">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  <span>
                    Active &amp; Recruiting Initiatives ({activeProjects.length}
                    )
                  </span>
                </div>

                {activeProjects.length > 2 && (
                  <div className="hidden items-center gap-2 sm:flex">
                    <Button
                      onClick={() =>
                        scrollCarousel(projectsCarouselRef, 'left')
                      }
                      variant="secondary"
                      size="icon"
                      className="text-muted hover:border-blue-500/40 hover:text-blue-300"
                      aria-label="Scroll left"
                    >
                      {' '}
                      <FaChevronLeft size={11} />{' '}
                    </Button>
                    <Button
                      onClick={() =>
                        scrollCarousel(projectsCarouselRef, 'right')
                      }
                      variant="secondary"
                      size="icon"
                      className="text-muted hover:border-blue-500/40 hover:text-blue-300"
                      aria-label="Scroll right"
                    >
                      {' '}
                      <FaChevronRight size={11} />{' '}
                    </Button>
                  </div>
                )}
              </div>

              {/* Cards Carousel Container */}
              <div
                ref={projectsCarouselRef}
                className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-1 pt-1 pb-4 sm:gap-5"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {activeProjects.map((project) => (
                  <div key={project.id} className={CAROUSEL_ITEM}>
                    <ProjectCard
                      project={project}
                      compact
                      onOpenDetails={setSelectedProject}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State for Projects */
            <div className="my-2 flex w-full flex-col items-center justify-center rounded-3xl pmqc-card p-8 text-center sm:p-12">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <FaFolderOpen size={18} />
              </div>
              <p className="mb-4 max-w-[500px] text-sm leading-relaxed font-medium text-foreground/90 sm:text-base">
                Projects start next semester. Fill out the interest form to hear
                when applications open.
              </p>
              <Button
                href="https://forms.gle/SJT29NADkTYmPbB97"
                variant="secondary"
                size="sm"
                className="px-4 py-2 text-blue-300 hover:border-blue-500/40 sm:text-sm"
              >
                <span>Fill out the interest form</span>
                <FaArrowRight className="text-[10px]" />
              </Button>
            </div>
          )}

          {/* Bottom link to view ALL projects */}
          <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-3 text-xs text-muted sm:flex-row">
            <span className="text-muted/70">Looking for other projects?</span>
            <Button
              href="/projects"
              variant="link"
              size="sm"
              className="gap-1.5 text-blue-400 hover:text-blue-300"
            >
              <span>All PMDS projects</span>
              <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      )}

      {/* MODAL PORTAL */}
      {mounted && (
        <PmqcActivityModal
          isOpen={Boolean(selectedEvent || selectedProject)}
          onClose={closeModal}
          event={selectedEvent}
          project={selectedProject}
        />
      )}
    </section>
  );
}
