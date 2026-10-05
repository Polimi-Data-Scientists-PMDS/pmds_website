'use client';

import NewsletterModal from '@/shared/components/ui/NewsletterModal';
import { Event, Project } from '@/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaHandshake,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';

interface LinksViewProps {
  recruitingProjects: Project[];
  upcomingEvents: Event[];
}

export default function LinksView({
  recruitingProjects,
  upcomingEvents,
}: LinksViewProps) {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('info@polimidatascientists.it');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-20 pb-20 selection:bg-accent selection:text-white">
      {/* Rich ambient background glows for depth and atmosphere */}
      <div className="absolute top-[-40px] left-[35%] -translate-x-1/2 w-[340px] sm:w-[500px] h-[350px] bg-accent/15 blur-[110px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[80px] right-[10%] w-[260px] sm:w-[360px] h-[280px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] h-[300px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-[480px] mx-auto flex flex-col items-center gap-7 sm:gap-8 relative z-10">
        {/* Profile / Header with Official PMDS Logo */}
        <header className="flex flex-col items-center text-center w-full">
          <Link
            href="/"
            className="relative block w-[210px] sm:w-[240px] h-[58px] sm:h-[65px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            title="Go to PMDS Homepage"
          >
            <Image
              src="/assets/logo.svg"
              alt="PMDS - Polimi Data Scientists"
              fill
              className="object-contain object-center"
              priority
            />
          </Link>

          <p className="text-xs sm:text-sm text-muted font-medium mt-3.5 tracking-wide">
            Student Association @ Politecnico di Milano
          </p>

          {/* Social Row */}
          <nav
            aria-label="Social links"
            className="flex items-center gap-3.5 mt-5"
          >
            <a
              href="https://www.instagram.com/polimidatascientists/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="size-9.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/20 hover:bg-white/10 text-muted hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/company/polimi-data-scientists/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="size-9.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/20 hover:bg-white/10 text-muted hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
            >
              <FaLinkedinIn size={15} />
            </a>
            <a
              href="https://t.me/joinchat/A-DRFUb1ovIh2nlH6q55Pw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="size-9.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/20 hover:bg-white/10 text-muted hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
            >
              <FaTelegramPlane size={15} />
            </a>
            <a
              href="https://github.com/polimi-data-scientists"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="size-9.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/20 hover:bg-white/10 text-muted hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
            >
              <FaGithub size={16} />
            </a>
            <Link
              href="/"
              aria-label="Official Website"
              className="size-9.5 rounded-full bg-surface/80 border border-white/10 hover:border-white/20 hover:bg-white/10 text-muted hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
            >
              <FaGlobe size={15} />
            </Link>
          </nav>
        </header>

        {/* Contact Email Pill */}
        <section aria-label="Contact Email" className="w-full">
          <div className="w-full py-2.5 px-4 rounded-2xl bg-surface/80 border border-white/10 hover:border-white/20 backdrop-blur-md flex items-center justify-between transition-all shadow-sm">
            <a
              href="mailto:info@polimidatascientists.it"
              className="flex items-center gap-2.5 text-muted hover:text-foreground transition-colors truncate"
            >
              <div className="size-7 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
                <FaEnvelope size={12} />
              </div>
              <span className="font-mono text-xs sm:text-sm tracking-tight truncate">
                info@polimidatascientists.it
              </span>
            </a>

            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="cursor-pointer shrink-0 ml-2 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-muted hover:text-foreground transition-all flex items-center gap-1.5 active:scale-95"
            >
              {copiedEmail ? (
                <>
                  <FaCheck size={10} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold text-[11px]">
                    Copied
                  </span>
                </>
              ) : (
                <>
                  <FaCopy size={10} />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Dynamic Section: Open Projects (Super-compact) */}
        {recruitingProjects.length > 0 && (
          <section
            aria-label="Open Projects"
            className="w-full flex flex-col gap-3"
          >
            <div className="w-full flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-400"></span>
                </span>
                Open Projects
              </span>
              <Link
                href="/projects"
                className="text-xs text-muted hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium group/link"
              >
                <span>View all</span>
                <FaArrowRight
                  size={10}
                  className="group-hover/link:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>

            {recruitingProjects.map((project) => (
              <a
                key={project.id}
                href={project.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-all duration-200 group flex items-center justify-between gap-3 backdrop-blur-md shadow-sm"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-emerald-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.partner && (
                    <span className="text-xs text-muted">
                      with {project.partner.name}
                    </span>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <span>Apply</span>
                  <FaArrowRight
                    size={10}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </a>
            ))}
          </section>
        )}

        {/* Dynamic Section: Register for Events (Super-compact) */}
        {upcomingEvents.length > 0 && (
          <section
            aria-label="Register for Events"
            className="w-full flex flex-col gap-3"
          >
            <div className="w-full flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-accent"></span>
                </span>
                Register for Events
              </span>
              <Link
                href="/events"
                className="text-xs text-muted hover:text-accent transition-colors flex items-center gap-1 font-medium group/link"
              >
                <span>View all</span>
                <FaArrowRight
                  size={10}
                  className="group-hover/link:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>

            {upcomingEvents.map((event) => (
              <a
                key={event.id}
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-white/10 hover:border-accent/40 hover:bg-accent/[0.03] transition-all duration-200 group flex flex-col gap-2 backdrop-blur-md shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {event.title}
                  </h3>
                  <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/25 text-accent text-xs font-semibold group-hover:bg-accent group-hover:text-white transition-all mt-0.5">
                    <span>Register</span>
                    <FaArrowRight
                      size={10}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>

                {/* Two Distinct Rows: Date & Time, then Location */}
                <div className="flex flex-col gap-1 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt size={11} className="text-accent shrink-0" />
                    <span className="font-medium text-foreground/90">
                      {event.date} {event.time ? `· ${event.time}` : ''}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt
                        size={11}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">
                        {event.location}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </section>
        )}

        {/* Core Links Section with Distinctive Accents */}
        <section
          aria-label="Core Navigation Links"
          className="w-full flex flex-col gap-3.5"
        >
          {/* Become a Member (Featured Card: Electric Blue to Indigo) */}
          <Link
            href="/membership"
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-accent/25 via-indigo-600/20 to-purple-600/15 border border-accent/45 hover:border-accent/75 transition-all duration-200 flex items-center justify-between group shadow-sm backdrop-blur-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-9 rounded-xl bg-gradient-to-br from-accent to-indigo-600 text-foreground flex items-center justify-center shrink-0 shadow-md">
                <FaUserPlus size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">
                  Become a Member
                </span>
                <span className="text-[11px] text-muted">
                  Join the PMDS student association
                </span>
              </div>
            </div>
            <FaArrowRight
              size={13}
              className="text-muted group-hover:text-foreground group-hover:translate-x-1.5 transition-all shrink-0 mr-1"
            />
          </Link>

          {/* Subscribe to Newsletter (Substack Warm Coral/Orange Accent) */}
          <button
            onClick={() => setIsNewsletterOpen(true)}
            className="cursor-pointer w-full p-4 rounded-2xl bg-surface/80 border border-white/10 hover:border-orange-500/30 hover:bg-orange-500/[0.02] transition-all duration-200 flex items-center justify-between group backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 group-hover:border-orange-500/40 transition-colors">
                <FaEnvelope size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-foreground text-sm group-hover:text-orange-300 transition-colors">
                  Subscribe to Newsletter
                </span>
                <span className="text-[11px] text-muted">
                  Articles & updates in your inbox
                </span>
              </div>
            </div>
            <FaArrowRight
              size={13}
              className="text-muted group-hover:text-foreground group-hover:translate-x-1.5 transition-all shrink-0 mr-1"
            />
          </button>

          {/* Official Website (Sky/Cyan Accent) */}
          <Link
            href="/"
            className="w-full p-4 rounded-2xl bg-surface/80 border border-white/10 hover:border-sky-500/30 hover:bg-sky-500/[0.02] transition-all duration-200 flex items-center justify-between group backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:border-sky-500/40 transition-colors">
                <FaGlobe size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-foreground text-sm group-hover:text-sky-300 transition-colors">
                  Official Website
                </span>
                <span className="text-[11px] text-muted">
                  Explore projects, team & events
                </span>
              </div>
            </div>
            <FaArrowRight
              size={13}
              className="text-muted group-hover:text-foreground group-hover:translate-x-1.5 transition-all shrink-0 mr-1"
            />
          </Link>

          {/* Support Us (Donate) (Rose/Pink Accent) */}
          <a
            href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-2xl bg-surface/80 border border-white/10 hover:border-pink-500/30 hover:bg-pink-500/[0.02] transition-all duration-200 flex items-center justify-between group backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-9 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 group-hover:border-pink-500/40 transition-colors">
                <FaHeart size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-foreground text-sm group-hover:text-pink-300 transition-colors">
                  Support Us (Donate)
                </span>
                <span className="text-[11px] text-muted">
                  Support student-run AI initiatives
                </span>
              </div>
            </div>
            <FaExternalLinkAlt
              size={12}
              className="text-muted group-hover:text-foreground transition-all shrink-0 mr-1"
            />
          </a>
        </section>

        {/* Footer with Official Non-Affiliation Disclaimer */}
        <footer className="w-full mt-6 pt-6 border-t border-white/5 flex flex-col items-center text-center text-xs text-muted gap-2.5 leading-relaxed">
          <p className="text-muted/80 text-xs">
            &copy; 2026 Polimi Data Scientists. All rights reserved.
          </p>
          <p className="max-w-[420px] text-[11px] text-muted/60 leading-relaxed">
            Polimi Data Scientists is an independent student association
            recognized by Politecnico di Milano. This website is independently
            managed and is not an official publication of the university.
          </p>
        </footer>
      </div>

      {/* Reusable Substack Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </main>
  );
}
