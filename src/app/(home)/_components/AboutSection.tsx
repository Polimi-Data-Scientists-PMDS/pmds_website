'use client';

import { motion, useInView, Variants } from 'motion/react';
import { useRef } from 'react';
import { FaGraduationCap, FaLaptopCode, FaNetworkWired } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const FEATURES = [
  {
    title: 'Workshops',
    details:
      'Hands-on sessions on modern ML frameworks, LLMs, and data engineering.',
    icon: FaGraduationCap,
  },
  {
    title: 'Projects',
    details:
      'Extracurricular open-source projects to build a solid technical portfolio.',
    icon: FaLaptopCode,
  },
  {
    title: 'Networking',
    details: 'Connect with top-tier companies, alumni, and passionate peers.',
    icon: FaNetworkWired,
  },
];

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      id="what-we-do"
      className="flex w-full scroll-mt-24 flex-col gap-12 px-8 lg:px-10"
    >
      <SectionHeader
        label="What we do"
        title="Empowering the next generation of Data Scientists."
        description={
          <>
            <p>
              Born within the walls of Politecnico di Milano, we are the
              university&apos;s premier student-led association for AI, Machine
              Learning, and Data Science.
            </p>
            <p>
              Our mission is to bridge the gap between academic theory and
              real-world application. We gather the brightest minds to learn,
              build, and innovate together.
            </p>
          </>
        }
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col border-b"
      >
        {FEATURES.map(({ title, details, icon: Icon }) => (
          <motion.div
            key={title}
            variants={itemVariants}
            className="group flex flex-row items-center justify-between gap-4 border-t py-8"
          >
            <span className="grid size-11 place-items-center border text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <Icon size={18} />
            </span>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <h3 className="type-heading text-foreground">{title}</h3>
              <p className="type-body text-foreground-secondary md:max-w-[50%]">
                {details}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
