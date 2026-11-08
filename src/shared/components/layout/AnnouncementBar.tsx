import { cn } from '@/shared/lib/utils';
import { Announcement } from '@/shared/models';
import { FaRocket } from 'react-icons/fa';

interface AnnouncementProps {
  announcement: Announcement;
  /** Tighter padding, used when shown above the compact floating header. */
  compact?: boolean;
}

export default function AnnouncementBar({
  announcement,
  compact = false,
}: AnnouncementProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center bg-gradient-to-r from-accent to-indigo-600 px-4',
        compact ? 'py-1' : 'py-2',
      )}
    >
      <div className="flex items-center gap-2 type-label text-foreground">
        <FaRocket className="text-foreground/80" />
        <span>{announcement.title}</span>
        {announcement.link && (
          <a
            href={announcement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline underline-offset-2 transition-colors hover:text-foreground/80"
          >
            {announcement.linkText}
          </a>
        )}
      </div>
    </div>
  );
}
