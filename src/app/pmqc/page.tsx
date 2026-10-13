import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
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
  title: 'PMQC - Polimi Quantum Computing | PoliMi Data Scientists',
  description:
    'The quantum computing department of PoliMi Data Scientists. Lessons, talks and projects at Politecnico di Milano, no background needed.',
  openGraph: {
    title: 'PMQC - Polimi Quantum Computing | PoliMi Data Scientists',
    description:
      'The quantum computing department of PoliMi Data Scientists. Lessons, talks and projects at Politecnico di Milano, no background needed.',
  },
};

export default async function PMQCPage() {
  // Fetch Notion events & projects with dynamic filter for Department = PMQC
  const allEvents = await getEvents();
  const allProjects = await getProjects();

  const pmqcEvents = allEvents.filter((e) => e.departments?.includes('PMQC'));
  const pmqcProjects = allProjects.filter((p) =>
    p.departments?.includes('PMQC'),
  );

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-6 pt-4 pb-16 md:pt-8">
      {/* Top Ambient Glow Overlays */}
      <div className="pointer-events-none absolute top-[2%] left-1/2 -z-10 h-[400px] w-[85vw] max-w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-[#1109FF]/15 to-indigo-500/10 blur-[140px]" />

      {/* Reactive 3D Quantum Canvas smoothly reacting to page scroll (Desktop Only) */}
      <QuantumVisualizer />

      {/* Style for mobile ambient glow float animation */}
      <style>{`
        @keyframes float-glow {
          0%   { transform: translate(0, 0) scale(1); }
          10%  { transform: translate(30px, -20px) scale(1.1); }
          20%  { transform: translate(40px, 10px) scale(1.05); }
          30%  { transform: translate(10px, 20px) scale(0.95); }
          40%  { transform: translate(-25px, 30px) scale(0.9); }
          50%  { transform: translate(-35px, -10px) scale(1); }
          60%  { transform: translate(-15px, -30px) scale(1.1); }
          70%  { transform: translate(30px, -15px) scale(1.05); }
          80%  { transform: translate(15px, 25px) scale(0.95); }
          90%  { transform: translate(-20px, 10px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .pmqc-animate-glow {
          animation: float-glow 20s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Hero Section: PMQC Department Presentation */}
      <section className="relative z-10 mt-4 mb-16 flex w-full flex-col items-center justify-between gap-12 sm:mb-24 md:mt-8 lg:flex-row">
        <div className="relative z-10 flex w-full flex-col text-left lg:w-[54%]">
          {/* Spotlight ombre colorate (solo mobile/tablet: su desktop c'è la Quantum Sphere e zero cropping) */}
          <div className="pmqc-animate-glow pointer-events-none absolute top-[-10px] left-[0px] -z-10 h-[220px] w-[220px] rounded-full bg-cyan-500/20 blur-[80px] sm:h-[320px] sm:w-[320px] lg:hidden" />
          <div
            className="pmqc-animate-glow pointer-events-none absolute top-[40px] left-[30px] -z-10 h-[200px] w-[200px] rounded-full bg-[#1109FF]/15 blur-[85px] sm:h-[280px] sm:w-[280px] lg:hidden"
            style={{ animationDelay: '-5s' }}
          />

          {/* Badge sopra il titolo */}
          <a
            href="#quantum-month"
            className="group mb-4 inline-flex w-fit cursor-pointer items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 py-1.5 pr-2 pl-3.5 text-xs font-semibold tracking-wide text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] sm:mb-5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span>November &amp; December are Quantum Month</span>
            <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/20 text-cyan-200 transition-all duration-300 group-hover:bg-cyan-400 group-hover:text-black">
              <FaArrowRightLong className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>

          <h1 className="mb-3 text-4xl leading-tight font-extrabold tracking-tight text-foreground sm:mb-4 sm:text-5xl lg:text-6xl">
            PMQC
          </h1>

          <p className="mb-4 max-w-[580px] bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-base leading-snug font-bold tracking-tight text-transparent sm:mb-5 sm:text-xl lg:text-2xl">
            Quantum computing at Politecnico di Milano, starting from zero.
          </p>

          <p className="mb-8 max-w-[540px] text-sm leading-relaxed font-normal text-muted sm:text-base">
            The quantum computing department of PoliMi Data Scientists. We learn
            the field together, from qubits and algorithms to quantum machine
            learning and error correction - no background needed.
          </p>

          {/* Quick CTAs: I'm interested · PMQC Substack */}
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Button
              href="https://forms.gle/SJT29NADkTYmPbB97"
              variant="cyan"
              className="w-full sm:w-fit"
            >
              <FaWpforms className="text-sm" />
              <span>I&apos;m interested</span>
              <FaExternalLinkAlt className="text-[10px] opacity-75" />
            </Button>
            <Button
              href="https://pmqc.substack.com"
              variant="secondary"
              className="w-full sm:w-fit"
            >
              <span>PMQC Substack</span>
              <FaExternalLinkAlt className="text-[10px] opacity-70" />
            </Button>
          </div>
        </div>

        {/* 3D Visualizer Spatial Reserve in Hero (Desktop only; on mobile sphere is atmospheric background) */}
        <div
          id="pmqc-hero-anchor"
          className="pointer-events-none hidden min-h-[440px] w-full items-center justify-center lg:flex lg:w-[46%]"
        />
      </section>

      {/* 2. Quantum Month Section: November & December 2026 */}
      <PmqcQuantumMonthSection />

      {/* 3. About PMQC Section: Zero Prerequisites + 4 Quantum Visualizers */}
      <section className="relative z-10 mx-auto mt-6 mb-24 w-full max-w-[1100px] sm:mt-12">
        <div id="pmqc-about-anchor" className="mb-12 text-left">
          <Chip color="cyan" className="mb-3.5">
            About PMQC
          </Chip>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Quantum, from scratch
          </h2>
          <p className="mt-3.5 max-w-[780px] text-xs leading-relaxed text-muted sm:text-base">
            Quantum computing is moving out of physics labs and into
            engineering, computer science and industry. PMQC is where PoliMi
            students learn it together, whatever they study. You don&apos;t need
            any quantum mechanics to start.
          </p>
        </div>

        {/* 4 Mini Quantum Visualizers Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {/* Mini 1: Quantum Algorithms */}
          <div className="group relative z-10 flex flex-col justify-between rounded-2xl pmqc-card p-6 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] sm:p-7">
            <div>
              <div className="mb-3">
                <SuperpositionWaveMini />
              </div>
              <h3 className="mb-1 text-sm font-bold text-foreground transition-colors group-hover:text-cyan-300 sm:text-base">
                Quantum Algorithms
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                Qubits, superposition, entanglement, and the algorithms built on
                them.
              </p>
            </div>
          </div>

          {/* Mini 2: Quantum ML */}
          <div className="group relative z-10 flex flex-col justify-between rounded-2xl pmqc-card p-6 transition-all hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] sm:p-7">
            <div>
              <div className="mb-3">
                <QmlLandscapeMini />
              </div>
              <h3 className="mb-1 text-sm font-bold text-foreground transition-colors group-hover:text-blue-300 sm:text-base">
                Quantum ML
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                Hybrid quantum-classical models, and what they can actually do
                today.
              </p>
            </div>
          </div>

          {/* Mini 3: Error Correction & Hardware */}
          <div className="group relative z-10 flex flex-col justify-between rounded-2xl pmqc-card p-6 transition-all hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] sm:p-7">
            <div>
              <div className="mb-3">
                <TransmonQubitMini />
              </div>
              <h3 className="mb-1 text-sm font-bold text-foreground transition-colors group-hover:text-indigo-300 sm:text-base">
                Error Correction &amp; Hardware
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                Why real qubits fail, and how we protect them.
              </p>
            </div>
          </div>

          {/* Mini 4: Papers & Newsletter */}
          <div className="group relative z-10 flex flex-col justify-between rounded-2xl pmqc-card p-6 transition-all hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] sm:p-7">
            <div>
              <div className="mb-3">
                <EntangledPairMini />
              </div>
              <h3 className="mb-1 text-sm font-bold text-foreground transition-colors group-hover:text-purple-300 sm:text-base">
                Papers &amp; Newsletter
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                We read recent papers and break them down on our Substack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PMQC Activities: Dynamic Notion Events & Projects in Tabbed Format */}
      <section className="relative z-10 mb-24 w-full">
        <PmqcActivitiesSection events={pmqcEvents} projects={pmqcProjects} />
      </section>

      {/* 5. Bottom CTA Banner: Interest form + Substack newsletter modal */}
      <section className="relative z-10 mt-6 mb-10 w-full">
        <PmqcCtaSection />
      </section>

      {/* Nota in fondo pagina */}
      <p className="relative z-10 mt-12 mb-4 text-center text-xs tracking-wide text-muted/60">
        This page is new and still growing. More soon.
      </p>
    </div>
  );
}
