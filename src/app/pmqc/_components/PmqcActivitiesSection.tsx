'use client';

import { Event, Project } from '@/shared/types';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaFolderOpen,
} from 'react-icons/fa';
import PmqcActivityEventCard from './PmqcActivityEventCard';
import PmqcActivityModal from './PmqcActivityModal';
import PmqcActivityProjectCard from './PmqcActivityProjectCard';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      className="w-full max-w-[1200px] mx-auto relative px-2 sm:px-4"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-xs font-bold tracking-wider uppercase mb-2">
            EVENTS &amp; PROJECTS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            What&apos;s on
          </h2>
          <p className="text-muted mt-1.5 text-xs sm:text-sm max-w-[620px] leading-relaxed">
            Lessons, talks and projects run by PMQC.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex items-center p-1 bg-[#0e0e12]/90 border border-white/10 rounded-2xl backdrop-blur-xl self-start md:self-auto shadow-sm">
          <button
            onClick={() => setActiveTab('events')}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'text-muted hover:text-foreground hover:bg-white/5 border border-transparent'
            }`}
          >
            <FaCalendarAlt
              size={12}
              className={activeTab === 'events' ? 'text-cyan-400' : 'text-muted'}
            />
            <span>Upcoming events</span>
            {upcomingEvents.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-bold">
                {upcomingEvents.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                : 'text-muted hover:text-foreground hover:bg-white/5 border border-transparent'
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
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/20 text-blue-300 font-bold">
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground/90 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Upcoming Quantum Sessions ({upcomingEvents.length})</span>
                </div>

                {upcomingEvents.length > 2 && (
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => scrollCarousel(eventsCarouselRef, 'left')}
                      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-muted hover:text-cyan-300 transition-all cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <FaChevronLeft size={11} />
                    </button>
                    <button
                      onClick={() => scrollCarousel(eventsCarouselRef, 'right')}
                      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-muted hover:text-cyan-300 transition-all cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <FaChevronRight size={11} />
                    </button>
                  </div>
                )}
              </div>

              {/* Cards Carousel Container */}
              <div
                ref={eventsCarouselRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {upcomingEvents.map((event) => (
                  <PmqcActivityEventCard
                    key={event.id}
                    event={event}
                    onOpenDetails={(ev) => setSelectedEvent(ev)}
                  />
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="w-full bg-[#0e0e12]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center my-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <FaCalendarAlt size={18} />
              </div>
              <p className="text-foreground/90 font-medium text-sm sm:text-base max-w-[460px] leading-relaxed">
                Nothing scheduled yet. Our first events are coming in November.
              </p>
            </div>
          )}

          {/* Bottom link to view ALL events */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
            <span className="text-muted/70">Looking for past events?</span>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
            >
              <span>All PMDS events</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* ACTIVE PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="w-full">
          {activeProjects.length > 0 ? (
            <>
              {/* Subheader with carousel controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground/90 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>
                    Active &amp; Recruiting Initiatives ({activeProjects.length})
                  </span>
                </div>

                {activeProjects.length > 2 && (
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => scrollCarousel(projectsCarouselRef, 'left')}
                      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 text-muted hover:text-blue-300 transition-all cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <FaChevronLeft size={11} />
                    </button>
                    <button
                      onClick={() => scrollCarousel(projectsCarouselRef, 'right')}
                      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 text-muted hover:text-blue-300 transition-all cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <FaChevronRight size={11} />
                    </button>
                  </div>
                )}
              </div>

              {/* Cards Carousel Container */}
              <div
                ref={projectsCarouselRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {activeProjects.map((project) => (
                  <PmqcActivityProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetails={(proj) => setSelectedProject(proj)}
                  />
                ))}
              </div>
            </>
          ) : (
            /* Empty State for Projects */
            <div className="w-full bg-[#0e0e12]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center my-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <FaFolderOpen size={18} />
              </div>
              <p className="text-foreground/90 font-medium text-sm sm:text-base max-w-[500px] mb-4 leading-relaxed">
                Projects start next semester. Fill out the interest form to hear when
                applications open.
              </p>
              <a
                href="https://forms.gle/SJT29NADkTYmPbB97"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 hover:bg-blue-500/25 text-blue-300 font-medium text-xs sm:text-sm py-2 px-4 rounded-full transition-all cursor-pointer"
              >
                <span>Fill out the interest form</span>
                <FaArrowRight className="text-[10px]" />
              </a>
            </div>
          )}

          {/* Bottom link to view ALL projects */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
            <span className="text-muted/70">Looking for other projects?</span>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors group"
            >
              <span>All PMDS projects</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
            </Link>
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
