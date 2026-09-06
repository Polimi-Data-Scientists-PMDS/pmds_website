'use client';

import { Person } from '@/types';
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
    <div className="flex flex-row gap-2">
      <div className={`${SPACING[size]} flex group/people relative`}>
        {people.map((person, i) => (
          <div
            key={i}
            className={`${SIZING[size]} rounded-full border-2 border-black bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-400 text-sm shrink-0`}
          >
            {person.avatar ? (
              <Image
                src={person.avatar}
                alt={person.name}
                fill
                className="object-cover"
              />
            ) : (
              person.name.charAt(0)
            )}
          </div>
        ))}

        <div
          className={`absolute z-10 top-full pt-2 ${mobile ? (opened ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none') : 'opacity-0 pointer-events-none group-hover/people:opacity-100 group-hover/people:pointer-events-auto'} transition-all`}
        >
          <div className="flex flex-col gap-2 items-center bg-[#0a0a0a] border border-white/10 p-3 rounded-2xl shadow-xl">
          {people.map((person, i) => (
            <div
              key={i}
              className="flex flex-row justify-between w-full gap-6 items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/10 bg-zinc-800 relative overflow-hidden shrink-0">
                  {person.avatar ? (
                    <Image src={person.avatar} alt={person.name} fill className="object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">{person.name.charAt(0)}</span>
                  )}
                </div>
                <p className="text-white font-medium text-[14px] whitespace-nowrap">
                  {person.name}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#4b6ffe] transition-colors"
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
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#0A66C2] transition-colors"
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
          className={`${SIZING[size]} cursor-pointer rounded-full border-2 border-black bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-400 text-sm shrink-0 transition-all ${opened ? 'rotate-180' : 'rotate-0'}`}
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
