'use client';

import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';
import { FaRocket } from 'react-icons/fa';

export default function AnnouncementBar({
  title,
  linkText,
  link,
  docked = false,
}: {
  title: string;
  linkText?: string;
  link?: string;
  docked?: boolean;
}) {
  return (
    <motion.div
      layout
      className={cn(
        'relative z-50 flex w-full items-center justify-center rounded-t-3xl bg-gradient-to-r from-accent to-indigo-600 px-4 py-2 shadow-md',
        !docked && 'md:rounded-full',
      )}
    >
      <motion.div
        layout="position"
        className="flex min-w-0 items-center justify-center gap-2 text-sm font-semibold text-foreground"
      >
        <FaRocket className="shrink-0 text-foreground/80" />
        <span className="min-w-0 wrap-anywhere">{title}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 shrink-0 whitespace-nowrap underline underline-offset-2 transition-colors hover:text-foreground/80"
          >
            {linkText}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
