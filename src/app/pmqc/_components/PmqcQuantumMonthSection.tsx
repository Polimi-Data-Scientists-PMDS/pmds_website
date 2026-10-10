'use client';

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
      className="w-full max-w-[1100px] mx-auto mt-6 sm:mt-12 mb-20 scroll-mt-24 relative z-10"
    >
      {/* Ambient background glow for Quantum Month */}
      <div className="absolute -top-10 left-1/4 w-[400px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-left mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>QUANTUM MONTH · NOVEMBER and DECEMBER 2026</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          November and December are Quantum Month
        </h2>

        <p className="text-muted mt-3 text-sm sm:text-base md:text-lg max-w-[700px] leading-relaxed">
          A month to get started with quantum computing. Here&apos;s what&apos;s
          coming.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid grid-cols-1 ${
          SHOW_LAUNCH_EVENT ? 'md:grid-cols-3' : 'md:grid-cols-2'
        } gap-5 sm:gap-6`}
      >
        {/* Card 1: Quantum Error Correction Course */}
        <div className="relative z-10 group pmqc-card hover:border-cyan-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <FaGraduationCap size={18} />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-muted">
                <FaCalendarAlt className="text-[10px] text-cyan-400" />
                <span>4 hands-on lessons</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-cyan-300 transition-colors">
              Quantum Error Correction course.
            </h3>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Four hands-on lessons on how quantum computers detect and fix their
              own errors. Dates coming soon.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-cyan-400/90 font-medium">Dates coming soon</span>
          </div>
        </div>

        {/* Card 2: PMQC Newsletter */}
        <div className="relative z-10 group pmqc-card hover:border-blue-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <FaEnvelope size={18} />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-400/20 text-blue-300">
                <span>First issue in November</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-blue-300 transition-colors">
              PMQC Newsletter.
            </h3>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Each week, the quantum papers worth reading, explained in plain
              words. First issue in November.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
            <button
              onClick={() => setIsNewsletterOpen(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <span>Subscribe for free</span>
              <FaArrowRight className="text-[10px]" />
            </button>
            <a
              href="https://pmqc.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors"
            >
              <span>pmqc.substack.com</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </a>
          </div>
        </div>

        {/* Card 3: PMQC Launch - 12 December (Hidden until approval from PoliMi) */}
        {SHOW_LAUNCH_EVENT && (
          <div className="relative z-10 group pmqc-card hover:border-indigo-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <FaRocket size={18} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-muted">
                  <FaMapMarkerAlt className="text-[10px] text-indigo-400" />
                  <span>Campus Leonardo</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-indigo-300 transition-colors">
                PMQC Launch - 12 December.
              </h3>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Talks and panels at Campus Leonardo. Details soon.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted">
              <span className="text-indigo-400/90 font-medium">12 December 2026</span>
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
