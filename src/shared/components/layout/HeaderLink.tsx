'use client';

import DynamicLink from '@/shared/components/ui/DynamicLink';
import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';

export interface HeaderLinkProps {
  text: string;
  href: string;
}

const outgoingVariants = {
  rest: { transform: 'translateY(0%)', color: 'var(--color-muted)' },
  active: { transform: 'translateY(100%)', color: 'var(--color-foreground)' },
};

const incomingVariants = {
  rest: { transform: 'translateY(-100%)', color: 'var(--color-muted)' },
  active: { transform: 'translateY(0%)', color: 'var(--color-foreground)' },
};

const transition = {
  duration: 0.3,
  ease: [0.338, 0.015, 0.395, 0.959] as const,
};

export default function HeaderLink({ text, href }: HeaderLinkProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const animating = useRef(false);
  const pendingRequest = useRef<boolean | null>(null);
  const hovered = useRef(false);
  const focused = useRef(false);

  const updateActive = (next: boolean) => {
    activeRef.current = next;
    setActive(next);
  };

  const requestActive = (next: boolean) => {
    if (reduceMotion) return;

    if (next === activeRef.current) {
      pendingRequest.current = null;
      return;
    }

    if (animating.current) {
      pendingRequest.current = next;
      return;
    }

    animating.current = true;
    updateActive(next);
  };

  const completeAnimation = () => {
    if (!animating.current) return;
    animating.current = false;

    if (
      pendingRequest.current !== null &&
      pendingRequest.current !== activeRef.current
    ) {
      const next = pendingRequest.current;
      pendingRequest.current = null;
      animating.current = true;
      updateActive(next);
    } else {
      pendingRequest.current = null;
    }
  };

  return (
    <DynamicLink
      href={href}
      className="flex w-fit items-center justify-center"
      aria-label={text}
    >
      <motion.div
        className="relative block h-fit overflow-hidden whitespace-nowrap"
        onHoverStart={() => {
          hovered.current = true;
          requestActive(true);
        }}
        onHoverEnd={() => {
          hovered.current = false;
          requestActive(focused.current);
        }}
        onFocus={() => {
          focused.current = true;
          requestActive(true);
        }}
        onBlur={() => {
          focused.current = false;
          requestActive(hovered.current);
        }}
        aria-hidden
      >
        <motion.span
          className="relative block"
          variants={outgoingVariants}
          initial="rest"
          animate={active ? 'active' : 'rest'}
          onAnimationComplete={completeAnimation}
          transition={transition}
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute top-0 block whitespace-nowrap"
          variants={incomingVariants}
          initial="rest"
          animate={active ? 'active' : 'rest'}
          transition={transition}
        >
          {text}
        </motion.span>
      </motion.div>
    </DynamicLink>
  );
}
