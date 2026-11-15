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
import { useLayoutEffect, useRef, useState } from 'react';
import HeaderLink from './HeaderLink';
import type { Announcement } from '@/shared/models/announcement';
import AnnouncementBar from './AnnouncementBar';

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

export default function Header({
  announcement,
}: {
  announcement?: Announcement;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>();
  const headerContentRef = useRef<HTMLDivElement>(null);
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

  // Reserve the closed header's height at the top of the page. Freeze that
  // space while scrolling or opening the menu so the page does not jump.
  useLayoutEffect(() => {
    const content = headerContentRef.current;
    if (!content || isBioPage || isScrolled || isOpen) return;

    const updateHeight = () => {
      setHeaderHeight(content.offsetHeight);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => observer.disconnect();
  }, [isBioPage, isScrolled, isOpen, pathname, announcement]);

  if (isBioPage) return null;

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        type: 'tween',
        duration: 0.25,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* In-flow spacer keeps page layout stable while the bar is fixed */}
      <header
        className="relative z-50 h-22 md:h-30"
        style={{ height: headerHeight }}
      >
        <motion.div
          ref={headerContentRef}
          layoutRoot
          className="fixed inset-x-0 top-0 p-4 md:p-6"
        >
          {/*
           * Pill on mobile, and on desktop once scrolled. On desktop at the top
           * of the page the group expands to fit the full navigation bar.
           * This wrapper controls the shared width of announcement and navigation;
           * backgrounds, borders and padding are handled by the child components.
           * Spacing: outer gutter p-4 mobile / p-6 desktop.
           */}
          <motion.div
            layout
            className={cn(
              'mx-auto flex w-full flex-col gap-0 md:max-w-[420px]',
              announcement && !isScrolled && 'md:gap-3',
              isOpen && 'md:max-w-[560px]',
              !isScrolled && 'md:max-w-[1000px]',
            )}
          >
            {announcement && (
              <AnnouncementBar
                title={announcement.title}
                linkText={announcement.linkText}
                link={announcement.link}
                docked={isScrolled}
              />
            )}
            <motion.div
              layout
              className={cn(
                'w-full rounded-3xl border border-white/10 bg-background/70 p-4 shadow-2xl backdrop-blur-xl',
                announcement && 'rounded-t-none',
                announcement && !isScrolled && 'md:rounded-t-3xl',
                !isScrolled &&
                  'md:border-transparent md:bg-transparent md:shadow-none',
              )}
            >
              <motion.div
                layout="position"
                className="flex items-center justify-between gap-6"
              >
                <motion.div
                  layout
                  className={cn(
                    'relative h-9.5 w-35',
                    !isScrolled && 'md:h-13.75 md:w-50',
                  )}
                >
                  <Link
                    href="/"
                    className="absolute inset-0 block"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={
                        isPmqc
                          ? '/assets/pmqc/logo-pmqc.svg'
                          : '/assets/logo.svg'
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
                      className="hidden items-center gap-10 text-sm text-muted md:flex"
                    >
                      {NAV_LINKS.map((link) => (
                        <HeaderLink key={link.href} {...link} />
                      ))}
                      <a
                        href={DONATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-ml-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-medium text-foreground transition-colors hover:bg-white/10"
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
                    'flex size-8 cursor-pointer flex-col items-center justify-center gap-1.5',
                    !isScrolled && 'md:hidden',
                  )}
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      BAR_CLASS,
                      isOpen && 'translate-y-2 rotate-45',
                    )}
                  ></span>
                  <span className={cn(BAR_CLASS, isOpen && 'opacity-0')}></span>
                  <span
                    className={cn(
                      BAR_CLASS,
                      isOpen && '-translate-y-2 -rotate-45',
                    )}
                  ></span>
                </motion.button>
              </motion.div>

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
                        className="py-2 transition-colors hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.text}
                      </Link>
                    ))}
                    <a
                      href={DONATE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 font-semibold text-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Support Us (Donate)
                    </a>
                  </motion.nav>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>
    </MotionConfig>
  );
}
