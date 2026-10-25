'use client';

import { usePathname } from 'next/navigation';
import { FaRocket } from 'react-icons/fa';

export default function AnnouncementBar({
  title,
  linkText,
  link,
}: {
  title: string;
  linkText?: string;
  link?: string;
}) {
  const pathname = usePathname();

  const isBioPage =
    pathname === '/l' ||
    pathname === '/tree' ||
    pathname === '/links' ||
    pathname?.startsWith('/l/') ||
    pathname?.startsWith('/tree/') ||
    pathname?.startsWith('/links/');

  if (isBioPage) return null;

  return (
    <div className="relative z-50 flex w-full items-center justify-center bg-gradient-to-r from-accent to-indigo-600 px-4 py-2 shadow-md">
      <div className="flex items-center gap-2 type-label text-foreground">
        <FaRocket className="text-foreground/80" />
        <span>{title}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline underline-offset-2 transition-colors hover:text-foreground/80"
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
