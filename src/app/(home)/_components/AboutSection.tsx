import { ReactNode } from 'react';
import { FaGraduationCap, FaLaptopCode, FaNetworkWired } from 'react-icons/fa';

interface FeatureCardProps {
  title: string;
  details?: string;
  icon: ReactNode;
}

function FeatureCard({ title, details, icon }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-surface/80 p-6 backdrop-blur-sm transition-colors hover:border-white/10">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mb-2 font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{details}</p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="mx-auto mt-10 mb-16 w-full max-w-[1100px] px-6 md:mb-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Left: Text Content */}
        <div className="flex flex-col">
          <div className="mb-6 inline-block w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold tracking-wider text-accent uppercase">
            Since 2019
          </div>
          <h2 className="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-foreground md:text-4xl">
            Empowering the next generation of Data Scientists.
          </h2>
          <p className="mb-6 text-base leading-relaxed text-muted">
            Born within the walls of Politecnico di Milano, we are the
            university's premier student-led association for AI, Machine
            Learning, and Data Science.
          </p>
          <p className="text-base leading-relaxed text-muted">
            Our mission is to bridge the gap between academic theory and
            real-world application. We gather the brightest minds to learn,
            build, and innovate together.
          </p>
        </div>

        {/* Right: Feature grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FeatureCard
            title="Workshops"
            details="Hands-on sessions on modern ML frameworks, LLMs, and data engineering."
            icon={<FaGraduationCap size={20} />}
          />
          <FeatureCard
            title="Projects"
            details="Extracurricular open-source projects to build a solid technical portfolio."
            icon={<FaLaptopCode size={20} />}
          />
          <FeatureCard
            title="Networking"
            details="Connect with top-tier companies, alumni, and passionate peers."
            icon={<FaNetworkWired size={20} />}
          />

          <div className="hidden"></div>
        </div>
      </div>
    </section>
  );
}
