'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import SectionHeader from './SectionHeader';

export default function Collaborators() {
  const partners = [2, 3, 10, 11, 4, 9, 7, 12, 6, 5, 1, 8];

  return (
    <section className="flex w-full flex-col gap-12 px-8 lg:px-10">
      <SectionHeader
        label="Partners"
        title="Past collaborators."
        description={
          <p>
            We are proud to have collaborated with leading companies and
            institutions to bring the best opportunities to our members.
          </p>
        }
      />

      <div className="relative flex flex-row overflow-hidden py-8">
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10 inset-shadow-left"></div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          className="flex flex-row gap-8"
        >
          {partners.map((num) => (
            <div
              key={num}
              className="relative size-30 shrink-0 grow-0 opacity-40 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={`/partners/l${num}.png`}
                alt={`Collaborator ${num}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          className="flex flex-row gap-8"
        >
          {partners.map((num) => (
            <div
              key={num}
              className="relative size-30 shrink-0 grow-0 opacity-40 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={`/partners/l${num}.png`}
                alt={`Collaborator ${num}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
