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
    <div className="flex flex-row gap-2 relative z-20">
      <div className={cn(SPACING[size], 'flex group/people relative')}>
        {people.map((person, i) => (
          <div
            key={i}
            className={cn(
              SIZING[size],
              'rounded-full border-2 border-background bg-surface-secondary relative overflow-hidden flex items-center justify-center text-muted text-sm shrink-0',
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
              person.name.charAt(0)
            )}
          </div>
        ))}

        <div
          className={cn(
            'absolute z-50 top-full left-0 pt-2 transition-opacity duration-200 min-w-[240px]',
            mobile
              ? opened
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
              : 'opacity-0 pointer-events-none group-hover/people:opacity-100 group-hover/people:pointer-events-auto',
          )}
        >
          <div
            style={{ backgroundColor: '#0d0e12' }}
            className="flex flex-col gap-2 items-center border border-white/15 p-3 rounded-2xl shadow-2xl shadow-black"
          >
            {people.map((person, i) => (
              <div
                key={i}
                className="flex flex-row justify-between w-full gap-6 items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 relative overflow-hidden shrink-0">
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
                      <span className="w-full h-full flex items-center justify-center text-muted text-xs">
                        {person.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground font-medium text-sm whitespace-nowrap">
                    {person.name}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-foreground hover:bg-white/10 transition-colors"
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
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-foreground hover:bg-[#0A66C2] transition-colors"
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
            'cursor-pointer rounded-full border-2 border-background bg-white/5 relative overflow-hidden flex items-center justify-center text-muted text-sm shrink-0 transition-all',
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
