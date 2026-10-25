import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const chipVariants = tv({
  base: 'inline-flex w-fit shrink-0 items-center gap-1.5 border px-3 py-1 type-label [&_svg]:size-3 [&_svg]:shrink-0',
  variants: {
    color: {
      muted: 'border-border bg-background-secondary text-foreground-secondary',
      accent: 'border-accent/40 bg-background-secondary text-accent-light',
      highlight: 'border-accent bg-accent text-white',
      cyan: 'border-cyan-400/40 bg-cyan-500/20 text-cyan-300 color-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
      blue: 'border-blue-400/30 bg-blue-500/15 text-blue-300 color-blue-300',
      amber:
        'border-amber-400/30 bg-amber-500/15 text-amber-400 color-amber-400',
      emerald:
        'border-emerald-400/30 bg-emerald-500/15 text-emerald-400 color-emerald-400',
    },
  },
  defaultVariants: {
    color: 'accent',
  },
});

type ChipProps = VariantProps<typeof chipVariants> &
  Omit<React.ComponentProps<'span'>, 'color'> & {
    icon?: ReactNode;
  };

export default function Chip({
  color,
  icon,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span className={chipVariants({ color, className })} {...props}>
      {icon}
      {children}
    </span>
  );
}

/** Small dot meant to be used as a Chip icon, inherits the chip text color. */
export function ChipDot({ pulse = false }: { pulse?: boolean }) {
  return <span className={cn('size-2 bg-current', pulse && 'animate-pulse')} />;
}
