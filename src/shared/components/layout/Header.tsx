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
import { useRef, useState } from 'react';
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

interface NavBarProps {
  compact: boolean;
  isPmqc: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

/**
 * Logo, links and mobile menu. Rendered twice: in the page flow at the top,
 * and as the compact fixed bar revealed once the first one scrolls away.
 */
function NavBar({ compact, isPmqc, isOpen, setIsOpen }: NavBarProps) {
  return (
    <div className="page-container flex flex-col px-8 lg:px-10">
      <div
        className={cn(
          'flex items-center justify-between gap-6',
          compact ? 'h-14' : 'h-20 md:h-24',
        )}
      >
        <Link
          href="/"
          className={cn(
            'relative block shrink-0',
            compact ? 'h-7 w-26' : 'h-9.5 w-35 md:h-12 md:w-44',
          )}
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={isPmqc ? '/assets/pmqc/logo-pmqc.svg' : '/assets/logo.svg'}
            alt={isPmqc ? 'PMQC Logo' : 'PMDS Logo'}
            fill
            className="object-contain object-left"
            priority={!compact}
          />
        </Link>

        <nav className="hidden items-center gap-8 type-label text-foreground-secondary md:flex lg:gap-10">
          {NAV_LINKS.map((link) => (
            <HeaderLink key={link.href} {...link} />
          ))}
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent px-4 py-2 text-white transition-colors hover:bg-accent-dark"
          >
            Donate
          </a>
        </nav>

        <button
          className="flex size-8 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={cn(BAR_CLASS, isOpen && 'translate-y-2 rotate-45')}
          ></span>
          <span className={cn(BAR_CLASS, isOpen && 'opacity-0')}></span>
          <span
            className={cn(BAR_CLASS, isOpen && '-translate-y-2 -rotate-45')}
          ></span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col overflow-hidden type-label text-foreground-secondary md:hidden"
          >
            <div className="flex flex-col border-t py-4">
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
                className="py-2 text-accent"
                onClick={() => setIsOpen(false)}
              >
                Support Us (Donate)
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHeader, setIsPastHeader] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const header = headerRef.current;
    if (!header) return;

    const past = y > header.offsetTop + header.offsetHeight;
    if (past !== isPastHeader) {
      setIsPastHeader(past);
      setIsOpen(false);
    }
  });

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
    <MotionConfig reducedMotion="user">
      <header ref={headerRef} className="relative z-40 border-b">
        <NavBar
          compact={false}
          isPmqc={isPmqc}
          isOpen={isOpen && !isPastHeader}
          setIsOpen={setIsOpen}
        />
      </header>

      <AnimatePresence>
        {isPastHeader && (
          <motion.header
            key="compact-header"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: [0.338, 0.015, 0.395, 0.959] }}
            className="fixed inset-x-0 top-0 z-50 border-b bg-background"
          >
            <NavBar
              compact
              isPmqc={isPmqc}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </motion.header>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
