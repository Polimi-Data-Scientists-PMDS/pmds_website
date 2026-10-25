import DynamicLink from '@/shared/components/ui/DynamicLink';
import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Text link followed by a square accent block with an arrow, as in the Hero. */
export default function ArrowLink({
  href,
  children,
  className,
}: ArrowLinkProps) {
  return (
    <DynamicLink
      href={href}
      className={cn(
        'group flex w-fit items-center gap-10 type-title text-foreground',
        className,
      )}
    >
      {children}
      <span className="grid size-11 shrink-0 place-items-center bg-accent text-white transition-transform group-hover:translate-x-1">
        <FaArrowRight />
      </span>
    </DynamicLink>
  );
}
