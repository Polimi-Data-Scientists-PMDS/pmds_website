'use client';

import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';
import { FaRocket } from 'react-icons/fa';
import { startTransition, useEffect, useState } from 'react';
import { getAnnouncements } from '@/shared/lib/notion';
import type { Announcement } from '@/shared/models/announcement';

export default function AnnouncementBar({
  docked = false,
  onVisibilityChange,
}: {
  docked?: boolean;
  onVisibilityChange: (visible: boolean) => void;
}) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnnouncement() {
      try {
        const announcements = await getAnnouncements();

        if (cancelled) return;

        const firstAnnouncement = announcements[0] ?? null;

        setAnnouncement(firstAnnouncement);
        onVisibilityChange(firstAnnouncement !== null);
      } catch (error) {
        if (cancelled) return;

        console.error('Failed to load announcements:', error);
        onVisibilityChange(false);
      }
    }

    startTransition(loadAnnouncement);

    return () => {
      cancelled = true;
    };
  }, [onVisibilityChange]);

  if (!announcement) return null;

  const { title, linkText, link } = announcement;

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
