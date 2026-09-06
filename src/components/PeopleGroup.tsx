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
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768,
  );

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const [opened, setOpened] = useState(false);

  const SPACING = {
    sm: '-space-x-2',
    md: '-space-x-3',
  };

  const SIZING = {
    sm: 'size-7',
    md: 'size-12',
  };

  const PX_SIZING = {
    sm: 28,
    md: 48,
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
                height={PX_SIZING[size]}
                width={PX_SIZING[size]}
                quality={70}
                className="object-cover"
              />
            ) : (
              person.name.charAt(0)
            )}
          </div>
        ))}

        <div
          className={`absolute z-10 top-full ${mobile ? (opened ? 'opacity-100' : 'opacity-0') : 'group-hover/people:opacity-100 opacity-0'} transition-all items-center bg-zinc-800 p-2 rounded-3xl flex flex-col gap-2`}
        >
          {people.map((person, i) => (
            <div
              key={i}
              className="flex flex-row justify-between w-full gap-4 items-center"
            >
              <p className="text-white font-medium text-sm text-nowrap">
                {person.name}
              </p>
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
