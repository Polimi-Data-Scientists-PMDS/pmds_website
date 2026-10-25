'use client';

import { cn } from '@/shared/lib/utils';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountingNumberProps {
  value: number;
  includePlus?: boolean;
}

export default function CountingNumber({
  value,
  includePlus = false,
  className,
  ...props
}: CountingNumberProps & React.ComponentProps<'span'>) {
  const spring = useSpring(0, {
    bounce: 0,
    damping: 40,
    velocity: value / 100,
  });
  const display = useTransform(spring, (current) =>
    Math.round(current).toString(),
  );

  // Count up only once the number scrolls into view
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)} {...props}>
      <motion.span>{display}</motion.span>
      {includePlus && <span className="text-accent">+</span>}
    </span>
  );
}
