import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  imageUrl?: string;
  chips?: ReactNode[];
  priority?: boolean;
  /** Shorter image, for carousels and dense layouts. */
  compact?: boolean;
  className?: string;
  children?: ReactNode;
}

function Card({
  title,
  imageUrl,
  chips = [],
  priority = false,
  compact = false,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'group relative z-0 flex h-full flex-col border bg-background-secondary',
        // Lift card above siblings so overflowing popups (e.g. PeopleGroup) aren't covered
        'hover:z-30 has-data-[people-open=true]:z-30',
        'transition-colors duration-300 hover:border-accent',
        className,
      )}
    >
      {/* Image with chips overlaid on top */}
      {imageUrl && (
        <div
          className={cn(
            'relative w-full shrink-0 overflow-hidden border-b bg-background-secondary',
            compact ? 'h-32' : 'aspect-video',
          )}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes={compact ? '350px' : '(max-width: 1024px) 100vw, 50vw'}
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
            priority={priority}
          />
          {chips.length > 0 && (
            <div className="absolute top-4 right-4 left-4 z-10 flex flex-1 flex-row-reverse justify-between">
              {chips}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        {!imageUrl && chips.length > 0 && (
          <div className="flex flex-row gap-2">{chips}</div>
        )}

        {children && (
          <div className="flex flex-1 flex-col gap-4">{children}</div>
        )}
      </div>
    </div>
  );
}

function CardHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <h3 className={cn('type-title text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

function CardSubHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <span className={cn('type-label text-accent', className)} {...props}>
      {children}
    </span>
  );
}

function CardDetails({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <p
      className={cn('type-body text-foreground-secondary', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { Card, CardDetails, CardHeader, CardSubHeader };
