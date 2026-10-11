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

  if (isBioPage) return null;

  return (
    <header className="relative z-50 w-full">
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-8',
          isOpen && 'bg-background/70 backdrop-blur-xl',
        )}
      >
        <Link href="/" className="relative block h-[55px] w-[200px]">
          <Image
            src="/assets/logo.svg"
            alt="PMDS Logo"
            fill
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-12 text-sm font-normal text-muted md:flex">
          <HeaderLink text="Blog" href="/blog" />
          <HeaderLink text="Projects" href="/projects" />
          <HeaderLink text="Events" href="/events" />
          <HeaderLink text="Become a Member" href="/membership" />
          <HeaderLink text="Members" href="/members" />
          <a
            href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-[-1rem] rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Donate
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center space-y-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={cn(
              'block h-0.5 w-6 bg-foreground transition-transform duration-300',
              isOpen && 'translate-y-2 rotate-45',
            )}
          ></span>
          <span
            className={cn(
              'block h-0.5 w-6 bg-foreground transition-opacity duration-300',
              isOpen ? 'opacity-0' : 'opacity-100',
            )}
          ></span>
          <span
            className={cn(
              'block h-0.5 w-6 bg-foreground transition-transform duration-300',
              isOpen && '-translate-y-2 -rotate-45',
            )}
          ></span>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 flex w-full flex-col gap-4 border-b bg-background/70 px-6 py-6 text-sm font-medium text-muted shadow-2xl backdrop-blur-xl md:hidden">
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
            className="py-2 font-semibold text-accent hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Support Us (Donate)
          </a>
        </div>
      )}
    </header>
  );
}
