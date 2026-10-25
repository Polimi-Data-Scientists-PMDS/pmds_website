'use client';

import EventCard from '@/app/events/_components/EventCard';
import ProjectCard from '@/app/projects/_components/ProjectCard';
import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
import { Event, Project } from '@/shared/types';
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaFolderOpen,
} from 'react-icons/fa';
import { tv } from 'tailwind-variants';
import PmqcActivityModal from './PmqcActivityModal';

const emptySubscribe = () => () => {};

type Tab = 'events' | 'projects';

const tabVariants = tv({
  base: 'flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 type-label transition-all',
  variants: {
    active: {
      true: 'border-cyan-500/30 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
      false:
        'border-transparent text-foreground-secondary hover:bg-white/5 hover:text-foreground',
    },
  },
});

const TAB_CONTENT = {
  events: {
    tabLabel: 'Upcoming events',
    icon: <FaCalendarAlt size={12} />,
    header: 'Upcoming Quantum Sessions',
    empty: 'Nothing scheduled yet. Our first events are coming in November.',
    otherHeader: 'Looking for past events?',
    otherLinkText: 'All PMDS events',
    otherLink: '/events',
  },
  projects: {
    tabLabel: 'Active projects',
    icon: <FaFolderOpen size={12} />,
    header: 'Active & Recruiting Initiatives',
    empty:
      'Projects start next semester. Fill out the interest form to hear when applications open.',
    otherHeader: 'Looking for other projects?',
    otherLinkText: 'All PMDS projects',
    otherLink: '/projects',
  },
} satisfies Record<Tab, Record<string, ReactNode>>;

interface CarouselProps {
  items: Project[] | Event[];
  isProjects: boolean;
  onClick?: (value: Project | Event) => void;
}

function Carousel({ items, isProjects, onClick }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const content = TAB_CONTENT[isProjects ? 'projects' : 'events'];

  const scrollCarousel = (direction: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: direction === 'left' ? -360 : 360,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {items.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 type-label text-foreground">
              <span className="size-2 animate-pulse rounded-full bg-cyan-400" />
              <span>
                {content.header} ({items.length})
              </span>
            </div>

            {items.length > 2 && (
              <div className="hidden items-center gap-2 sm:flex">
                <Button
                  onClick={() => scrollCarousel('left')}
                  variant="secondary"
                  size="icon"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft size={11} />
                </Button>
                <Button
                  onClick={() => scrollCarousel('right')}
                  variant="secondary"
                  size="icon"
                  aria-label="Scroll right"
                >
                  <FaChevronRight size={11} />
                </Button>
              </div>
            )}
          </div>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto p-1 sm:gap-5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-72.5 shrink-0 snap-start sm:w-82.5 md:w-87.5"
              >
                {isProjects ? (
                  <ProjectCard
                    project={item as Project}
                    compact
                    onOpenDetails={() => onClick?.(item)}
                  />
                ) : (
                  <EventCard
                    event={item as Event}
                    compact
                    onOpenDetails={() => onClick?.(item)}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center gap-4 rounded-3xl pmqc-card p-8 text-center sm:p-12">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 [&_svg]:size-4.5">
            {content.icon}
          </div>
          <p className="max-w-125 type-body text-foreground/90">
            {content.empty}
          </p>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-4 type-label text-foreground-secondary/70 sm:flex-row">
        <span>{content.otherHeader}</span>
        <Button href={content.otherLink} variant="link" size="sm">
          <span>{content.otherLinkText}</span>
          <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}

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
  const tabItems = { events: upcomingEvents, projects: activeProjects };

  const [activeTab, setActiveTab] = useState<Tab>('events');

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

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedProject(null);
  };

  return (
    <section
      id="pmqc-activities-anchor"
      className="relative mx-auto flex w-full max-w-300 flex-col gap-6 px-2 sm:px-4"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <Chip color="cyan">Events &amp; Projects</Chip>
          <h2 className="type-heading text-foreground">What&apos;s on</h2>
          <p className="type-body text-foreground-secondary">
            Lessons, talks and projects run by PMQC.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex items-center self-start rounded-2xl pmqc-card p-1 shadow-sm md:self-auto">
          {(['events', 'projects'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={tabVariants({ active: activeTab === tab })}
            >
              {TAB_CONTENT[tab].icon}
              <span>{TAB_CONTENT[tab].tabLabel}</span>
              {tabItems[tab].length > 0 && (
                <span className="rounded-full bg-cyan-500/20 px-1.5 type-label text-cyan-300">
                  {tabItems[tab].length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Carousel
        isProjects={activeTab === 'projects'}
        items={tabItems[activeTab]}
        onClick={(item) =>
          activeTab === 'projects'
            ? setSelectedProject(item as Project)
            : setSelectedEvent(item as Event)
        }
      />

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
