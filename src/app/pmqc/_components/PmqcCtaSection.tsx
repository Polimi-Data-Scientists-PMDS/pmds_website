'use client';

import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
import NewsletterModal from '@/shared/components/ui/NewsletterModal';
import { useState } from 'react';
import { FaEnvelope, FaExternalLinkAlt, FaWpforms } from 'react-icons/fa';

export default function PmqcCtaSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div
      id="pmqc-cta-anchor"
      className="relative z-10 mx-auto w-full max-w-[850px] px-2 sm:px-4"
    >
      <div
        id="pmqc-cta-card"
        className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl pmqc-card px-5 py-8 text-center shadow-[0_0_80px_rgba(17,9,255,0.12)] sm:rounded-[40px] sm:px-8 sm:py-12 md:py-14"
      >
        {/* Quantum Glow behind the CTA */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#1109FF]/20 via-cyan-500/20 to-indigo-500/15 blur-[100px]" />

        {/* Division pill */}
        <Chip color="cyan" className="relative z-10 mb-4 sm:mb-6">
          Get involved
        </Chip>

        <h2 className="relative z-10 bg-gradient-to-r from-foreground via-slate-100 to-muted bg-clip-text text-2xl leading-tight font-extrabold tracking-tight text-transparent sm:text-3xl md:text-5xl">
          Be part of it from the start
        </h2>
        <p className="relative z-10 mt-3 max-w-[540px] text-xs leading-relaxed text-muted sm:mt-4 sm:text-sm md:text-base">
          Tell us what you&apos;d like to learn, pitch a project idea, or just
          sign up to hear when registrations open. It takes two minutes.
        </p>

        {/* Main Actions */}
        <div className="relative z-10 mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4">
          <Button
            href="https://forms.gle/SJT29NADkTYmPbB97"
            variant="cyan"
            className="w-full sm:w-fit"
          >
            <FaWpforms className="text-sm" />
            <span>Fill out the form</span>
            <FaExternalLinkAlt className="text-xs opacity-75" />
          </Button>

          <Button
            onClick={() => setIsNewsletterOpen(true)}
            variant="secondary"
            className="w-full sm:w-fit"
          >
            <FaEnvelope className="text-cyan-400" />
            <span>Subscribe to the newsletter</span>
          </Button>
        </div>

        <Button
          href="https://pmqc.substack.com"
          variant="ghost"
          size="sm"
          className="relative z-10 mt-5 gap-1.5 hover:text-cyan-300"
        >
          <span>Or read us on pmqc.substack.com</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </Button>
      </div>

      {/* Substack Newsletter Modal configured for PMQC */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        title="PMQC Newsletter"
        description="One email a week with the quantum papers worth your time, explained clearly. Written by PMQC students at Politecnico di Milano."
        embedUrl="https://pmqc.substack.com/embed?transparent=1&light=1"
      />
    </div>
  );
}
