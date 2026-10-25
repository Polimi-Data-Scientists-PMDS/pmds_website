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
      className="relative z-10 mx-auto flex w-full max-w-[1100px] scroll-mt-28 flex-col gap-8"
    >
      {/* Ambient background glow for Quantum Month */}
      <div className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-[300px] w-[400px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-[110px]" />

      {/* Header */}
      <div className="flex flex-col gap-2 text-left">
        <Chip color="cyan" icon={<ChipDot pulse />}>
          Quantum Month
        </Chip>

        <div>
          <h2 className="type-heading text-foreground">
            November and December are Quantum Month
          </h2>

          <p className="max-w-[700px] type-body text-foreground-secondary">
            A month to get started with quantum computing. Here&apos;s
            what&apos;s coming.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid grid-cols-1 ${
          SHOW_LAUNCH_EVENT ? 'md:grid-cols-3' : 'md:grid-cols-2'
        } gap-6 sm:gap-8`}
      >
        {/* Card 1: Quantum Error Correction Course */}
        <div className="group relative z-10 flex flex-col justify-between gap-6 overflow-hidden rounded-3xl pmqc-card p-7 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:p-9">
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-all group-hover:bg-cyan-500/20" />

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <FaGraduationCap size={18} />
              </div>
              <Chip color="muted" icon={<FaCalendarAlt />}>
                4 hands-on lessons
              </Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="type-title text-foreground transition-colors group-hover:text-cyan-300">
                Quantum Error Correction course.
              </h3>

              <p className="type-body text-foreground-secondary">
                Four hands-on lessons on how quantum computers detect and fix
                their own errors. Dates coming soon.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="type-label text-cyan-400">Dates coming soon</span>
          </div>
        </div>

        {/* Card 2: PMQC Newsletter */}
        <div className="group relative z-10 flex flex-col justify-between gap-6 overflow-hidden rounded-3xl pmqc-card p-7 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] sm:p-9">
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/15 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <FaEnvelope size={18} />
              </div>
              <Chip color="blue">First issue in November</Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="type-title text-foreground transition-colors group-hover:text-blue-300">
                PMQC Newsletter.
              </h3>

              <p className="type-body text-foreground-secondary">
                Each week, the quantum papers worth reading, explained in plain
                words. First issue in November.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
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
          <div className="group relative z-10 flex flex-col justify-between gap-6 overflow-hidden rounded-3xl pmqc-card p-6 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] sm:p-8">
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:bg-indigo-500/20" />

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/15 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <FaRocket size={18} />
                </div>
                <Chip color="muted" icon={<FaMapMarkerAlt />}>
                  Campus Leonardo
                </Chip>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="type-title text-foreground transition-colors group-hover:text-indigo-300">
                  PMQC Launch - 12 December.
                </h3>

                <p className="type-body text-foreground-secondary">
                  Talks and panels at Campus Leonardo. Details soon.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4 type-label text-foreground-secondary">
              <span className="text-indigo-400/90">12 December 2026</span>
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
