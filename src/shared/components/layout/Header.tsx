'use client';

import { cn } from '@/shared/lib/utils';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import HeaderLink from './HeaderLink';

const NAV_LINKS = [
  { text: 'Blog', href: '/blog' },
  { text: 'Projects', href: '/projects' },
  { text: 'Events', href: '/events' },
  { text: 'PMQC', href: '/pmqc' },
  { text: 'Become a Member', href: '/membership' },
  { text: 'Members', href: '/members' },
];

const DONATE_URL = 'https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00';

const BAR_CLASS = 'w-6 h-0.5 bg-foreground transition duration-300';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setIsScrolled(y > 0));

  const isBioPage =
    pathname === '/l' ||
    pathname === '/tree' ||
    pathname === '/links' ||
    pathname?.startsWith('/l/') ||
    pathname?.startsWith('/tree/') ||
    pathname?.startsWith('/links/');

  const isPmqc = pathname === '/pmqc' || pathname?.startsWith('/pmqc/');

  if (isBioPage) return null;

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
    >
      {/* In-flow spacer keeps page layout stable while the bar is fixed */}
      <header className="relative z-50 h-22 md:h-30">
        <div
          className={cn(
            'inset-x-0 top-0 p-4 md:p-6',
            isScrolled ? 'fixed' : 'absolute',
          )}
        >
          {/*
           * Pill on mobile, and on desktop once scrolled. On desktop at the top
           * of the page the md: overrides turn it back into the full nav bar
           * (no background or border, so the radius is invisible there).
           * Spacing: gutter p-4 mobile / p-6 desktop, pill padding px-4 py-2.
           */}
          <motion.div
            layout
            className={cn(
              'w-full rounded-3xl md:max-w-75 mx-auto p-4 flex flex-col border border-white/10 bg-background/70 backdrop-blur-xl shadow-2xl',
              isOpen && 'md:max-w-125',
              !isScrolled &&
                'md:max-w-250 md:border-transparent md:bg-transparent md:shadow-none',
            )}
          >
            <div className="flex items-center justify-between gap-6">
              <motion.div
                layout
                className={cn(
                  'relative w-35 h-9.5',
                  !isScrolled && 'md:w-50 md:h-13.75',
                )}
              >
                <Link
                  href="/"
                  className="absolute inset-0 block"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={
                      isPmqc ? '/assets/pmqc/logo-pmqc.svg' : '/assets/logo.svg'
                    }
                    alt={isPmqc ? 'PMQC Logo' : 'PMDS Logo'}
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </Link>
              </motion.div>

              {/* Desktop Nav */}
              <AnimatePresence mode="popLayout" initial={false}>
                {!isScrolled && (
                  <motion.nav
                    key="desktop-nav"
                    layout
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:flex items-center gap-10 text-sm text-muted"
                  >
                    {NAV_LINKS.map((link) => (
                      <HeaderLink key={link.href} {...link} />
                    ))}
                    <a
                      href={DONATE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-ml-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-medium transition-colors"
                    >
                      Donate
                    </a>
                  </motion.nav>
                )}
              </AnimatePresence>

              {/* Nav Toggle (mobile, and desktop once scrolled) */}
              <motion.button
                layout
                className={cn(
                  'size-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer',
                  !isScrolled && 'md:hidden',
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(BAR_CLASS, isOpen && 'rotate-45 translate-y-2')}
                ></span>
                <span className={cn(BAR_CLASS, isOpen && 'opacity-0')}></span>
                <span
                  className={cn(
                    BAR_CLASS,
                    isOpen && '-rotate-45 -translate-y-2',
                  )}
                ></span>
              </motion.button>
            </div>

            {/* Pill Menu */}
            <AnimatePresence initial={false} mode="popLayout">
              {isOpen && (
                <motion.nav
                  key="pill-menu"
                  layout
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex flex-col pt-6 text-sm font-medium text-muted',
                    !isScrolled && 'md:hidden',
                  )}
                >
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-2 hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.text}
                    </Link>
                  ))}
                  <a
                    href={DONATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 text-accent font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Support Us (Donate)
                  </a>
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>
    </MotionConfig>
  );
}
