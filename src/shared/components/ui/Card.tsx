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
        'group flex flex-col h-full bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden transition-colors duration-300',
        className,
      )}
    >
      {/* Image with chips overlaid on top */}
      {imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-900 border-b border-white/5 shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
            priority={priority}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent opacity-80" />
          {chips.length > 0 && (
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-row-reverse justify-between flex-1">
              {chips}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-8">
        {!imageUrl && chips.length > 0 && <div className="mb-4">{chips}</div>}

        {date && (
          <span className="text-accent text-xs font-bold uppercase tracking-wider mb-3">
            {date}
          </span>
        )}

        <h3 className="text-2xl font-bold text-foreground mb-3 leading-snug">
          {title}
        </h3>

        <p className="text-muted text-sm leading-relaxed mb-8">{details}</p>

        {children && (
          <div className="mt-auto flex flex-col border-t border-white/5">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
