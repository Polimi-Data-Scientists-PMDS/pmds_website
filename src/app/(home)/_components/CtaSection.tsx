'use client';

import { useState } from 'react';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import Button from '@/shared/components/ui/Button';
import NewsletterModal from '@/shared/components/ui/NewsletterModal';

export default function CtaSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <section className="mx-auto mt-20 mb-20 w-full max-w-[850px] px-6">
      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[40px] border border-white/5 bg-[#0a0a0a]/90 px-8 py-12 text-center shadow-[0_0_80px_rgba(75,111,254,0.05)] backdrop-blur-sm md:py-16">
        {/* Glow behind the CTA */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]"></div>

        <h2 className="relative z-10 bg-gradient-to-r from-foreground to-muted bg-clip-text text-3xl leading-tight font-extrabold tracking-tight text-transparent md:text-5xl">
          Ready to dive into Data Science?
        </h2>
        <p className="relative z-10 mt-4 max-w-[450px] text-sm text-muted md:text-base">
          Join a community of students passionate about AI, Machine Learning,
          and everything data.
        </p>

        <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
          <Button
            href="/membership"
            variant="inverted"
            className="w-full sm:w-fit"
          >
            Become a Member{' '}
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={() => setIsNewsletterOpen(true)}
            variant="secondary"
            className="w-full sm:w-fit"
          >
            <FaEnvelope /> Subscribe to Newsletter
          </Button>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </section>
  );
}
