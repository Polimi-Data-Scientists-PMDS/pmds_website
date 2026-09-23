'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Collaborators() {
  const partners = [2, 3, 10, 11, 4, 9, 7, 12, 6, 5, 1, 8];

  return (
    <section className="mt-20 w-full max-w-[1100px] mx-auto px-6 pt-12 mb-10">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Past Collaborators
        </h2>
        <p className="text-muted mt-3 text-center max-w-[600px]">
          We are proud to have collaborated with leading companies and
          institutions to bring the best opportunities to our members.
        </p>
      </div>

      <div className="relative flex flex-row overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 right-0 inset-shadow-left z-10"></div>
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
              className="relative size-30 grow-0 shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-opacity"
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
              className="relative size-30 grow-0 shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-opacity"
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
