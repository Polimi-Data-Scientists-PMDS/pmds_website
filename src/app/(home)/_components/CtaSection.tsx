'use client';

import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Button from '@/shared/components/ui/Button';
import NewsletterModal from '@/shared/components/ui/NewsletterModal';
import ArrowLink from './ArrowLink';

export default function CtaSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <section className="flex w-full flex-col px-8 lg:px-10">
      <div className="grid border md:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 p-6 lg:p-8">
          <p className="type-label text-accent">005 — Join us</p>
          <h2 className="type-display text-foreground">
            <span className="block">Ready to dive</span>
            <span className="block text-accent italic">in?</span>
          </h2>
        </div>

        <div className="flex flex-col justify-between gap-12 border-t p-6 md:border-t-0 md:border-l lg:p-8">
          <p className="max-w-[450px] border-l border-accent pl-5 type-body text-foreground-secondary">
            Join a community of students passionate about AI, Machine Learning,
            and everything data.
          </p>

          <div className="flex flex-col gap-6 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ArrowLink href="/membership">Become a member</ArrowLink>
            <Button
              onClick={() => setIsNewsletterOpen(true)}
              variant="ghost"
              size="md"
            >
              <FaEnvelope /> Newsletter
            </Button>
          </div>
        </div>
      </div>

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </section>
  );
}
