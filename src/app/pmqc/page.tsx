import { getEvents, getProjects } from '@/shared/lib/notion';
import { Metadata } from 'next';
import { FaExternalLinkAlt, FaWpforms } from 'react-icons/fa';
import PmqcActivitiesSection from './_components/PmqcActivitiesSection';
import PmqcCtaSection from './_components/PmqcCtaSection';
import {
  EntangledPairMini,
  QmlLandscapeMini,
  SuperpositionWaveMini,
  TransmonQubitMini,
} from './_components/QuantumMiniVisualizers';
import QuantumVisualizer from './_components/QuantumVisualizer';

export const metadata: Metadata = {
  title: 'PMQC | PoliMi Quantum Computing',
  description:
    'PMQC is the dedicated quantum computing department of PoliMi Data Scientists at Politecnico di Milano. Exploring quantum computing from algorithms to physical hardware.',
  openGraph: {
    title: 'PMQC | PoliMi Quantum Computing',
    description:
      'Exploring the quantum frontier at Politecnico di Milano. From foundational mathematics to real NISQ hardware.',
  },
};

export default async function PMQCPage() {
  // Fetch Notion events & projects with dynamic filter for Department = PMQC
  const allEvents = await getEvents();
  const allProjects = await getProjects();

  const pmqcEvents = allEvents.filter((e) =>
    e.departments?.includes('PMQC'),
  );
  const pmqcProjects = allProjects.filter((p) =>
    p.departments?.includes('PMQC'),
  );

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 pb-16 relative z-10 w-full max-w-[1100px] mx-auto px-6 overflow-x-clip">
      {/* Top Ambient Glow Overlays */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[85vw] max-w-[850px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-[#1109FF]/15 to-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[45%] right-[-120px] w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Reactive 3D Quantum Canvas smoothly reacting to page scroll */}
      <QuantumVisualizer />

      {/* 1. Hero Section: PMQC Department Presentation */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 mt-2 md:mt-6 mb-12 sm:mb-20 relative">
        <div className="w-full lg:w-[54%] flex flex-col text-left z-10">
          {/* Department Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3 w-fit backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>PoliMi Data Scientists</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            PMQC – Polimi Quantum Computing
          </h1>

          <div className="mt-3 mb-4 sm:mb-5">
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 tracking-tight leading-snug">
              Exploring the quantum frontier at Politecnico di Milano.
            </p>
          </div>

          <p className="text-muted text-sm sm:text-base leading-relaxed font-normal max-w-[580px] mb-4">
            PMQC is the dedicated student-led quantum computing division of PMDS.
            We explore the field from the ground up: from foundational mathematics
            and qubits to quantum machine learning, error correction, and physical
            hardware.
          </p>

          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-[580px] mb-8">
            Curious about quantum computing or want to participate in our activities?{' '}
            <span className="text-cyan-300 font-semibold">
              Fill out the interest form
            </span>{' '}
            to stay in the loop, propose ideas, and be the first to know when registrations open.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
            <a
              href="https://forms.gle/SJT29NADkTYmPbB97"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs sm:text-sm py-3.5 px-7 rounded-full transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] cursor-pointer"
            >
              <FaWpforms className="text-sm" />
              <span>I&apos;m interested</span>
              <FaExternalLinkAlt className="text-[10px] opacity-75" />
            </a>
            <a
              href="https://pmqc.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-foreground text-xs sm:text-sm font-semibold py-3.5 px-6 rounded-full transition-all backdrop-blur-md cursor-pointer"
            >
              <span>PMQC Substack</span>
              <FaExternalLinkAlt className="text-[10px] opacity-70" />
            </a>
          </div>
        </div>

        {/* 3D Visualizer Spatial Reserve in Hero (Desktop only; on mobile sphere is atmospheric background) */}
        <div
          id="pmqc-hero-anchor"
          className="hidden lg:flex w-full lg:w-[46%] min-h-[440px] items-center justify-center pointer-events-none"
        />
      </section>

      {/* 2. About PMQC Section: Zero Prerequisites + 4 Quantum Visualizers */}
      <section className="w-full max-w-[1100px] mx-auto mt-4 mb-20 relative">
        <div id="pmqc-about-anchor" className="text-left mb-10">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3">
            About PMQC
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Demystifying Quantum from Scratch
          </h2>
          <p className="text-muted mt-3 text-xs sm:text-base max-w-[780px] leading-relaxed">
            PMQC is the dedicated quantum computing department of PoliMi Data
            Scientists. We explore quantum computing from the ground up: from the
            foundational mathematics and qubits to quantum algorithms and physical
            NISQ architectures.{' '}
            <strong className="text-foreground">
              Absolutely zero prerequisites are required
            </strong>{' '}
            — open to all curious minds at Politecnico di Milano.
          </p>
        </div>

        {/* 4 Mini Quantum Visualizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Mini 1: Superposition */}
          <div className="bg-[#0e0e12]/85 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] relative z-10">
            <div className="mb-3">
              <SuperpositionWaveMini />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-cyan-300 transition-colors">
              Quantum Algorithms
            </h3>
            <p className="text-muted text-xs leading-relaxed">
              Superposition, entanglement, Grover search, and phase estimation.
            </p>
          </div>

          {/* Mini 2: QML */}
          <div className="bg-[#0e0e12]/85 backdrop-blur-md border border-white/10 hover:border-blue-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] relative z-10">
            <div className="mb-3">
              <QmlLandscapeMini />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-blue-300 transition-colors">
              Quantum ML
            </h3>
            <p className="text-muted text-xs leading-relaxed">
              Variational quantum algorithms and hybrid optimization with PennyLane.
            </p>
          </div>

          {/* Mini 3: Hardware */}
          <div className="bg-[#0e0e12]/85 backdrop-blur-md border border-white/10 hover:border-indigo-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] relative z-10">
            <div className="mb-3">
              <TransmonQubitMini />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-indigo-300 transition-colors">
              Hardware & NISQ
            </h3>
            <p className="text-muted text-xs leading-relaxed">
              Superconducting transmon qubits, decoherence, and noise mitigation.
            </p>
          </div>

          {/* Mini 4: Entanglement */}
          <div className="bg-[#0e0e12]/85 backdrop-blur-md border border-white/10 hover:border-purple-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] relative z-10">
            <div className="mb-3">
              <EntangledPairMini />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-purple-300 transition-colors">
              Research & Papers
            </h3>
            <p className="text-muted text-xs leading-relaxed">
              Reading groups and editorial literature breakdowns on our Substack.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PMQC Activities: Dynamic Notion Events & Projects in Tabbed Format */}
      <section className="w-full mb-20 relative">
        <PmqcActivitiesSection events={pmqcEvents} projects={pmqcProjects} />
      </section>

      {/* 4. Bottom CTA Banner: Interest form + Substack newsletter modal */}
      <section className="w-full relative mt-4">
        <PmqcCtaSection />
      </section>
    </div>
  );
}
