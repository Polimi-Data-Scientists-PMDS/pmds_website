'use client';

import Button from '@/shared/components/ui/Button';
import Chip, { ChipDot } from '@/shared/components/ui/Chip';
import NewsletterModal from '@/shared/components/ui/NewsletterModal';
import { useState } from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRocket,
} from 'react-icons/fa';

export default function PmqcQuantumMonthSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // Set to true once the event is approved by Politecnico di Milano
  const SHOW_LAUNCH_EVENT = false;

  return (
    <section
      id="quantum-month"
      className="relative z-10 mx-auto mt-8 mb-24 w-full max-w-[1100px] scroll-mt-28 sm:mt-16"
    >
      {/* Ambient background glow for Quantum Month */}
      <div className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-[300px] w-[400px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-[110px]" />

      {/* Header */}
      <div className="mb-10 text-left sm:mb-14">
        <Chip color="cyan" icon={<ChipDot pulse />} className="mb-3.5">
          Quantum Month
        </Chip>

        <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-foreground sm:text-3xl md:text-5xl">
          November and December are Quantum Month
        </h2>

        <p className="mt-3.5 max-w-[700px] text-sm leading-relaxed text-muted sm:text-base md:text-lg">
          A month to get started with quantum computing. Here&apos;s what&apos;s
          coming.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid grid-cols-1 ${
          SHOW_LAUNCH_EVENT ? 'md:grid-cols-3' : 'md:grid-cols-2'
        } gap-6 sm:gap-8`}
      >
        {/* Card 1: Quantum Error Correction Course */}
        <div className="group relative z-10 flex flex-col justify-between overflow-hidden rounded-3xl pmqc-card p-7 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:p-9">
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-all group-hover:bg-cyan-500/20" />

          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <FaGraduationCap size={18} />
              </div>
              <Chip color="muted" icon={<FaCalendarAlt />}>
                4 hands-on lessons
              </Chip>
            </div>

            <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-cyan-300 sm:text-2xl">
              Quantum Error Correction course.
            </h3>

            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Four hands-on lessons on how quantum computers detect and fix
              their own errors. Dates coming soon.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
            <span className="font-medium text-cyan-400/90">
              Dates coming soon
            </span>
          </div>
        </div>

        {/* Card 2: PMQC Newsletter */}
        <div className="group relative z-10 flex flex-col justify-between overflow-hidden rounded-3xl pmqc-card p-7 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] sm:p-9">
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />

          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/15 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <FaEnvelope size={18} />
              </div>
              <Chip color="blue">First issue in November</Chip>
            </div>

            <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-blue-300 sm:text-2xl">
              PMQC Newsletter.
            </h3>

            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Each week, the quantum papers worth reading, explained in plain
              words. First issue in November.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
            <Button
              onClick={() => setIsNewsletterOpen(true)}
              variant="link"
              size="sm"
              className="gap-1.5 text-blue-400 hover:text-blue-300"
            >
              <span>Subscribe for free</span>
              <FaArrowRight className="text-[10px]" />
            </Button>
            <Button
              href="https://pmqc.substack.com"
              variant="ghost"
              size="sm"
              className="gap-1"
            >
              <span>pmqc.substack.com</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </Button>
          </div>
        </div>

        {/* Card 3: PMQC Launch - 12 December (Hidden until approval from PoliMi) */}
        {SHOW_LAUNCH_EVENT && (
          <div className="group relative z-10 flex flex-col justify-between overflow-hidden rounded-3xl pmqc-card p-6 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] sm:p-8">
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:bg-indigo-500/20" />

            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/15 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <FaRocket size={18} />
                </div>
                <Chip color="muted" icon={<FaMapMarkerAlt />}>
                  Campus Leonardo
                </Chip>
              </div>

              <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-indigo-300 sm:text-2xl">
                PMQC Launch - 12 December.
              </h3>

              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Talks and panels at Campus Leonardo. Details soon.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-muted">
              <span className="font-medium text-indigo-400/90">
                12 December 2026
              </span>
              <span>Details soon</span>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        title="PMQC Newsletter"
        description="One email a week with the quantum papers worth your time, explained clearly. Written by PMQC students at Politecnico di Milano."
        embedUrl="https://pmqc.substack.com/embed?transparent=1&light=1"
      />
    </section>
  );
}
