'use client';

import { cn } from '@/shared/lib/utils';
import { Person } from '@/shared/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaEnvelope, FaLinkedinIn } from 'react-icons/fa';

export default function PeopleGroup({
  people,
  size = 'md',
}: {
  people: Person[];
  size?: 'sm' | 'md';
}) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setMobile(window.innerWidth <= 768);
    };

    // Set initial value on client side only (after hydration)
    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const [opened, setOpened] = useState(false);

  const SPACING = {
    sm: '-space-x-2',
    md: '-space-x-2 md:-space-x-3',
  };

  const SIZING = {
    sm: 'size-7',
    md: 'size-10 md:size-12',
  };

  return (
    <div className="relative z-20 flex flex-row gap-2">
      <div className={cn(SPACING[size], 'group/people relative flex')}>
        {people.map((person, i) => (
          <div
            key={i}
            style={{ zIndex: i }}
            className={cn(
              SIZING[size],
              'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-surface-secondary text-sm text-muted',
            )}
          >
            {person.avatar ? (
              <Image
                src={person.avatar}
                alt={person.name}
                fill
                sizes="48px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="inset-0 flex items-center justify-center">
                {person.name.charAt(0)}
              </div>
            )}
          </div>
        ))}

        <div
          className={cn(
            'absolute top-full left-0 z-50 min-w-[240px] pt-2 transition-opacity duration-200',
            mobile
              ? opened
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
              : 'pointer-events-none opacity-0 group-hover/people:pointer-events-auto group-hover/people:opacity-100',
          )}
        >
          <div
            style={{ backgroundColor: '#0d0e12' }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 p-3 shadow-2xl shadow-black"
          >
            {people.map((person, i) => (
              <div
                key={i}
                className="flex w-full flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    {person.avatar ? (
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-xs text-muted">
                        {person.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap text-foreground">
                    {person.name}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                      title={`Email ${person.name}`}
                    >
                      <FaEnvelope size={14} />
                    </a>
                  )}
                  {person.linkedinUrl && (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 text-muted transition-colors hover:bg-[#0A66C2] hover:text-foreground"
                      title={`LinkedIn ${person.name}`}
                    >
                      <FaLinkedinIn size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {mobile && (
        <div
          className={cn(
            SIZING[size],
            'relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-background bg-white/5 text-sm text-muted transition-all',
            opened ? 'rotate-180' : 'rotate-0',
          )}
          onClick={() => {
            setOpened(!opened);
          }}
        >
          <FaChevronDown size={14} />
        </div>
      )}
    </div>
  );
}
