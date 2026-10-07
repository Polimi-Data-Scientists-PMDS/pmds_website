'use client';

import NewsletterModal from '@/shared/components/ui/NewsletterModal';
import { useState } from 'react';
import { FaEnvelope, FaExternalLinkAlt, FaWpforms } from 'react-icons/fa';

export default function PmqcCtaSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div id="pmqc-cta-anchor" className="w-full max-w-[850px] mx-auto px-2 sm:px-4 relative">
      <div id="pmqc-cta-card" className="w-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-3xl sm:rounded-[40px] px-5 sm:px-8 py-8 sm:py-12 md:py-14 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_80px_rgba(17,9,255,0.12)]">
        {/* Quantum Glow behind the CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-[#1109FF]/20 via-cyan-500/20 to-indigo-500/15 blur-[100px] rounded-full pointer-events-none" />

        {/* Division pill */}
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6 relative z-10">
          Get Involved
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-slate-100 to-muted tracking-tight leading-tight relative z-10">
          Stay in the Quantum Field
        </h2>
        <p className="text-muted mt-3 sm:mt-4 max-w-[540px] text-xs sm:text-sm md:text-base relative z-10 leading-relaxed">
          The PMQC team created a short interest form for PoliMi students and
          quantum enthusiasts. Let us know what topics you&apos;d like to explore,
          propose project ideas, or simply get notified for our first activities!
        </p>

        {/* Main Actions */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full sm:w-auto">
          <a
            href="https://forms.gle/SJT29NADkTYmPbB97"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs sm:text-sm py-3.5 px-7 rounded-full transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]"
          >
            <FaWpforms className="text-sm" />
            <span>Fill the Interest Form</span>
            <FaExternalLinkAlt className="text-xs opacity-75" />
          </a>

          <button
            onClick={() => setIsNewsletterOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-foreground text-xs sm:text-sm font-semibold py-3.5 px-6 rounded-full transition-all"
          >
            <FaEnvelope className="text-cyan-400" />
            <span>Subscribe to Newsletter</span>
          </button>
        </div>

        <a
          href="https://pmqc.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-xs text-muted hover:text-cyan-300 transition-colors flex items-center gap-1.5 relative z-10"
        >
          <span>Or explore articles on pmqc.substack.com</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>

      {/* Substack Newsletter Modal configured for PMQC */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        title="PMQC Newsletter"
        description="Subscribe to get quantum computing insights, research digests, and workshop invites straight from Politecnico di Milano."
        embedUrl="https://pmqc.substack.com/embed?transparent=1&light=1"
      />
    </div>
  );
}
