import { getEvents, getProjects } from '@/shared/lib/notion';
import { Metadata } from 'next';
import { FaExternalLinkAlt, FaWpforms } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import PmqcActivitiesSection from './_components/PmqcActivitiesSection';
import PmqcCtaSection from './_components/PmqcCtaSection';
import PmqcQuantumMonthSection from './_components/PmqcQuantumMonthSection';
import {
  EntangledPairMini,
  QmlLandscapeMini,
  SuperpositionWaveMini,
  TransmonQubitMini,
} from './_components/QuantumMiniVisualizers';
import QuantumVisualizer from './_components/QuantumVisualizer';

export const metadata: Metadata = {
  title: 'PMQC – Polimi Quantum Computing | PoliMi Data Scientists',
  description:
    'The quantum computing department of PoliMi Data Scientists. Lessons, talks and projects at Politecnico di Milano, no background needed.',
  openGraph: {
    title: 'PMQC – Polimi Quantum Computing | PoliMi Data Scientists',
    description:
      'The quantum computing department of PoliMi Data Scientists. Lessons, talks and projects at Politecnico di Milano, no background needed.',
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
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 mt-2 md:mt-6 mb-12 sm:mb-20 relative z-10">
        <div className="w-full lg:w-[54%] flex flex-col text-left z-10">
          {/* Badge sopra il titolo */}
          <a
            href="#quantum-month"
            className="inline-flex items-center gap-2.5 pl-3.5 pr-2 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-400/60 rounded-full text-cyan-300 text-xs font-semibold tracking-wide mb-4 w-fit backdrop-blur-md transition-all duration-300 group cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>November is Quantum Month</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 ml-0.5">
              <FaArrowRightLong className="text-[10px] group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
          </a>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
            PMQC – Polimi Quantum Computing
          </h1>

          <div className="mt-3 mb-4 sm:mb-5">
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 tracking-tight leading-snug">
              Quantum computing at Politecnico di Milano, starting from zero.
            </p>
          </div>

          <p className="text-muted text-sm sm:text-base leading-relaxed font-normal max-w-[580px] mb-3">
            PMQC is the quantum computing department of PoliMi Data Scientists.
            We learn the field together, from qubits and algorithms to quantum
            machine learning and error correction. No background needed.
          </p>

          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-[580px] mb-8">
            November is our Quantum Month. Fill out the interest form to hear
            about it first.
          </p>

          {/* Quick CTAs: I'm interested · PMQC Substack */}
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

      {/* 2. Quantum Month Section: November & December 2026 */}
      <PmqcQuantumMonthSection />

      {/* 3. About PMQC Section: Zero Prerequisites + 4 Quantum Visualizers */}
      <section className="w-full max-w-[1100px] mx-auto mt-4 mb-20 relative z-10">
        <div id="pmqc-about-anchor" className="text-left mb-10">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3">
            ABOUT PMQC
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Quantum, from scratch
          </h2>
          <p className="text-muted mt-3 text-xs sm:text-base max-w-[780px] leading-relaxed">
            Quantum computing is moving out of physics labs and into
            engineering, computer science and industry. PMQC is where PoliMi
            students learn it together, whatever they study. You don&apos;t
            need any quantum mechanics to start.
          </p>
        </div>

        {/* 4 Mini Quantum Visualizers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Mini 1: Quantum Algorithms */}
          <div className="pmqc-card hover:border-cyan-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] relative z-10 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <SuperpositionWaveMini />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-cyan-300 transition-colors">
                Quantum Algorithms
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Qubits, superposition, entanglement, and the algorithms built on
                them.
              </p>
            </div>
          </div>

          {/* Mini 2: Quantum ML */}
          <div className="pmqc-card hover:border-blue-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] relative z-10 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <QmlLandscapeMini />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-blue-300 transition-colors">
                Quantum ML
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Hybrid quantum-classical models, and what they can actually do
                today.
              </p>
            </div>
          </div>

          {/* Mini 3: Error Correction & Hardware */}
          <div className="pmqc-card hover:border-indigo-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] relative z-10 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <TransmonQubitMini />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-indigo-300 transition-colors">
                Error Correction &amp; Hardware
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                Why real qubits fail, and how we protect them.
              </p>
            </div>
          </div>

          {/* Mini 4: Papers & Newsletter */}
          <div className="pmqc-card hover:border-purple-500/40 p-5 sm:p-6 rounded-2xl transition-all group hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] relative z-10 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <EntangledPairMini />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 group-hover:text-purple-300 transition-colors">
                Papers &amp; Newsletter
              </h3>
              <p className="text-muted text-xs leading-relaxed">
                We read recent papers and break them down on our Substack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PMQC Activities: Dynamic Notion Events & Projects in Tabbed Format */}
      <section className="w-full mb-20 relative z-10">
        <PmqcActivitiesSection events={pmqcEvents} projects={pmqcProjects} />
      </section>

      {/* 5. Bottom CTA Banner: Interest form + Substack newsletter modal */}
      <section className="w-full relative z-10 mt-4">
        <PmqcCtaSection />
      </section>

      {/* Nota in fondo pagina */}
      <p className="text-center text-xs text-muted/60 mt-12 mb-4 tracking-wide relative z-10">
        This page is new and still growing. More soon.
      </p>
    </div>
  );
}
