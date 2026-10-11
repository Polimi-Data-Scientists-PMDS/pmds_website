import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

export interface CardProps {
  title: string;
  date?: string;
  details: string;
  imageUrl?: string;
  chips?: ReactNode[];
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  date,
  details,
  imageUrl,
  chips = [],
  priority = false,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-surface/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/10',
        className,
      )}
    >
      {/* Image with chips overlaid on top */}
      {imageUrl && (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-white/5 bg-zinc-900">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent opacity-80" />
          {chips.length > 0 && (
            <div className="absolute top-4 right-4 left-4 z-10 flex flex-1 flex-row-reverse justify-between">
              {chips}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-8">
        {!imageUrl && chips.length > 0 && <div className="mb-4">{chips}</div>}

        {date && (
          <span className="mb-3 text-xs font-bold tracking-wider text-accent uppercase">
            {date}
          </span>
        )}

        <h3 className="mb-3 text-2xl leading-snug font-bold text-foreground">
          {title}
        </h3>

        <p className="mb-8 text-sm leading-relaxed text-muted">{details}</p>

        {children && (
          <div className="mt-auto flex flex-col border-t border-white/5">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
