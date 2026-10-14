'use client';

import Button from '@/shared/components/ui/Button';
import NewsletterModal from '@/shared/components/ui/NewsletterModal';
import SocialLink from '@/shared/components/ui/SocialLink';
import { formatDate } from '@/shared/lib/utils';
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
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaUserPlus,
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
    <main className="relative flex min-h-screen w-full flex-col items-center px-4 pt-16 pb-20 selection:bg-accent selection:text-white sm:px-6 sm:pt-20">
      {/* Rich ambient background glows for depth and atmosphere */}
      <div className="pointer-events-none absolute top-[-40px] left-[35%] -z-10 h-[350px] w-[340px] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] sm:w-[500px]" />
      <div className="pointer-events-none absolute top-[80px] right-[10%] -z-10 h-[280px] w-[260px] rounded-full bg-emerald-500/10 blur-[120px] sm:w-[360px]" />
      <div className="pointer-events-none absolute bottom-[-40px] left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[120px] sm:w-[450px]" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[480px] flex-col items-center gap-7 sm:gap-8">
        {/* Profile / Header with Official PMDS Logo */}
        <header className="flex w-full flex-col items-center text-center">
          <Link
            href="/"
            className="relative block h-[58px] w-[210px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:h-[65px] sm:w-[240px]"
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

          <p className="mt-3.5 text-xs font-medium tracking-wide text-muted sm:text-sm">
            Student Association @ Politecnico di Milano
          </p>

          {/* Social Row */}
          <nav
            aria-label="Social links"
            className="mt-5 flex items-center gap-3.5"
          >
            <SocialLink
              title="Instagram"
              href="https://www.instagram.com/polimidatascientists/"
              icon={FaInstagram}
            />
            <SocialLink
              title="LinkedIn"
              href="https://www.linkedin.com/company/polimi-data-scientists/"
              icon={FaLinkedinIn}
            />
            <SocialLink
              title="Telegram"
              href="https://t.me/joinchat/A-DRFUb1ovIh2nlH6q55Pw"
              icon={FaTelegramPlane}
            />
            <SocialLink
              title="GitHub"
              href="https://github.com/polimi-data-scientists"
              icon={FaGithub}
            />
            <SocialLink title="Official Website" href="/" icon={FaGlobe} />
          </nav>
        </header>

        {/* Contact Email Pill */}
        <section aria-label="Contact Email" className="w-full">
          <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-surface/80 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all hover:border-white/20">
            <a
              href="mailto:info@polimidatascientists.it"
              className="flex items-center gap-2.5 truncate text-muted transition-colors hover:text-foreground"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <FaEnvelope size={12} />
              </div>
              <span className="truncate font-mono text-xs tracking-tight sm:text-sm">
                info@polimidatascientists.it
              </span>
            </a>

            <Button
              onClick={copyEmail}
              aria-label="Copy email address"
              variant="secondary"
              size="sm"
              className="ml-2 shrink-0 gap-1.5 font-medium text-muted hover:text-foreground active:scale-95"
            >
              {copiedEmail ? (
                <>
                  <FaCheck size={10} className="text-emerald-400" />
                  <span className="text-[11px] font-semibold text-emerald-400">
                    Copied
                  </span>
                </>
              ) : (
                <>
                  <FaCopy size={10} />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </Button>
          </div>
        </section>

        {/* Dynamic Section: Open Projects (Super-compact) */}
        {recruitingProjects.length > 0 && (
          <section
            aria-label="Open Projects"
            className="flex w-full flex-col gap-3"
          >
            <div className="flex w-full items-center justify-between px-1">
              <span className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
                </span>
                Open Projects
              </span>
              <Link
                href="/projects"
                className="group/link flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-emerald-400"
              >
                <span>View all</span>
                <FaArrowRight
                  size={10}
                  className="transition-transform group-hover/link:translate-x-0.5"
                />
              </Link>
            </div>

            {recruitingProjects.map((project) => (
              <a
                key={project.id}
                href={project.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface/80 p-3.5 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] sm:p-4"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-emerald-300 sm:text-base">
                    {project.title}
                  </h3>
                  {project.partner && (
                    <span className="text-xs text-muted">
                      with {project.partner.name}
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all group-hover:bg-emerald-500 group-hover:text-white">
                  <span>Apply</span>
                  <FaArrowRight
                    size={10}
                    className="transition-transform group-hover:translate-x-0.5"
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
            className="flex w-full flex-col gap-3"
          >
            <div className="flex w-full items-center justify-between px-1">
              <span className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-accent uppercase">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-accent"></span>
                </span>
                Register for Events
              </span>
              <Link
                href="/events"
                className="group/link flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-accent"
              >
                <span>View all</span>
                <FaArrowRight
                  size={10}
                  className="transition-transform group-hover/link:translate-x-0.5"
                />
              </Link>
            </div>

            {upcomingEvents.map((event) => (
              <a
                key={event.id}
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-surface/80 p-3.5 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.03] sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-accent sm:text-base">
                    {event.title}
                  </h3>
                  <div className="mt-0.5 flex shrink-0 items-center gap-1 rounded-xl border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-all group-hover:bg-accent group-hover:text-white">
                    <span>Register</span>
                    <FaArrowRight
                      size={10}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                {/* Two Distinct Rows: Date & Time, then Location */}
                <div className="flex flex-col gap-1 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt size={11} className="shrink-0 text-accent" />
                    <span className="font-medium text-foreground/90">
                      {formatDate(event.dateStart, event.dateEnd, 'time')}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt
                        size={11}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span className="leading-snug">{event.location}</span>
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
          className="flex w-full flex-col gap-3.5"
        >
          {/* Become a Member (Featured Card: Electric Blue to Indigo) */}
          <Link
            href="/membership"
            className="group flex w-full items-center justify-between rounded-2xl border border-accent/45 bg-gradient-to-r from-accent/25 via-indigo-600/20 to-purple-600/15 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-accent/75"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-indigo-600 text-foreground shadow-md">
                <FaUserPlus size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                  Become a Member
                </span>
                <span className="text-[11px] text-muted">
                  Join the PMDS student association
                </span>
              </div>
            </div>
            <FaArrowRight
              size={13}
              className="mr-1 shrink-0 text-muted transition-all group-hover:translate-x-1.5 group-hover:text-foreground"
            />
          </Link>

          {/* Subscribe to Newsletter (Substack Warm Coral/Orange Accent) */}
          <button
            onClick={() => setIsNewsletterOpen(true)}
            className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-surface/80 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-orange-500/30 hover:bg-orange-500/[0.02]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition-colors group-hover:border-orange-500/40">
                <FaEnvelope size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-orange-300">
                  Subscribe to Newsletter
                </span>
                <span className="text-[11px] text-muted">
                  Articles & updates in your inbox
                </span>
              </div>
            </div>
            <FaArrowRight
              size={13}
              className="mr-1 shrink-0 text-muted transition-all group-hover:translate-x-1.5 group-hover:text-foreground"
            />
          </button>

          {/* Official Website (Sky/Cyan Accent) */}
          <Link
            href="/"
            className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-surface/80 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-sky-500/30 hover:bg-sky-500/[0.02]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400 transition-colors group-hover:border-sky-500/40">
                <FaGlobe size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-sky-300">
                  Official Website
                </span>
                <span className="text-[11px] text-muted">
                  Explore projects, team & events
                </span>
              </div>
            </div>
            <FaArrowRight
              size={13}
              className="mr-1 shrink-0 text-muted transition-all group-hover:translate-x-1.5 group-hover:text-foreground"
            />
          </Link>

          {/* Support Us (Donate) (Rose/Pink Accent) */}
          <a
            href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-surface/80 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-pink-500/30 hover:bg-pink-500/[0.02]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-pink-500/20 bg-pink-500/10 text-pink-400 transition-colors group-hover:border-pink-500/40">
                <FaHeart size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-pink-300">
                  Support Us (Donate)
                </span>
                <span className="text-[11px] text-muted">
                  Support student-run AI initiatives
                </span>
              </div>
            </div>
            <FaExternalLinkAlt
              size={12}
              className="mr-1 shrink-0 text-muted transition-all group-hover:text-foreground"
            />
          </a>
        </section>

        {/* Footer with Official Non-Affiliation Disclaimer */}
        <footer className="mt-6 flex w-full flex-col items-center gap-2.5 border-t border-white/5 pt-6 text-center text-xs leading-relaxed text-muted">
          <p className="text-xs text-muted/80">
            &copy; 2026 Polimi Data Scientists. All rights reserved.
          </p>
          <p className="max-w-[420px] text-[11px] leading-relaxed text-muted/60">
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
