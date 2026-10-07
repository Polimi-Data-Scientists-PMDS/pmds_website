'use client';

import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import HeaderLink from './HeaderLink';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
    <header className="w-full relative z-50">
      <div
        className={cn(
          'w-full max-w-[1100px] mx-auto px-6 py-4 sm:py-6 lg:py-8 flex items-center justify-between',
          isOpen && 'bg-background/70 backdrop-blur-xl',
        )}
      >
        <Link href="/" className="relative block w-[200px] h-[55px]">
          <Image
            src={isPmqc ? '/assets/pmqc/logo-pmqc.svg' : '/assets/logo.svg'}
            alt={isPmqc ? 'PMQC Logo' : 'PMDS Logo'}
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 xl:gap-12 text-sm font-normal text-muted items-center">
          <HeaderLink text="Blog" href="/blog" />
          <HeaderLink text="Projects" href="/projects" />
          <HeaderLink text="Events" href="/events" />
          <HeaderLink text="PMQC" href="/pmqc" />
          <HeaderLink text="Become a Member" href="/membership" />
          <HeaderLink text="Members" href="/members" />
          <a
            href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-full transition-colors text-white font-medium text-sm ml-[-0.5rem] lg:ml-[-1rem]"
          >
            Donate
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="cursor-pointer md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={cn(
              'block w-6 h-0.5 bg-foreground transition-transform duration-300',
              isOpen && 'rotate-45 translate-y-2',
            )}
          ></span>
          <span
            className={cn(
              'block w-6 h-0.5 bg-foreground transition-opacity duration-300',
              isOpen ? 'opacity-0' : 'opacity-100',
            )}
          ></span>
          <span
            className={cn(
              'block w-6 h-0.5 bg-foreground transition-transform duration-300',
              isOpen && '-rotate-45 -translate-y-2',
            )}
          ></span>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/70 backdrop-blur-xl border-b py-6 px-6 flex flex-col gap-4 text-sm font-medium text-muted shadow-2xl">
          <Link
            href="/blog"
            className="py-2 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className="py-2 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/events"
            className="py-2 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/pmqc"
            className="py-2 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            PMQC
          </Link>
          <Link
            href="/membership"
            className="py-2 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Become a Member
          </Link>
          <Link
            href="/members"
            className="py-2 hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Members
          </Link>
          <a
            href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 hover:text-foreground text-accent font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Support Us (Donate)
          </a>
        </div>
      )}
    </header>
  );
}
