'use client';

import { cn } from '@/shared/lib/utils';
import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

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

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <span className={cn('tabular-nums', className)} {...props}>
      <motion.span>{display}</motion.span>
      {includePlus && <span className="text-accent">+</span>}
    </span>
  );
}
