import { FaGraduationCap, FaLaptopCode, FaNetworkWired } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 mt-10 mb-16 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-accent text-xs font-bold tracking-wider uppercase mb-6 w-fit">
            Since 2019
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            Empowering the next generation of Data Scientists.
          </h2>
          <p className="text-muted text-base leading-relaxed mb-6">
            Born within the walls of Politecnico di Milano, we are the
            university's premier student-led association for AI, Machine
            Learning, and Data Science.
          </p>
          <p className="text-muted text-base leading-relaxed">
            Our mission is to bridge the gap between academic theory and
            real-world application. We gather the brightest minds to learn,
            build, and innovate together.
          </p>
        </div>

        {/* Right: Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-colors">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
              <FaGraduationCap size={20} />
            </div>
            <h3 className="text-foreground font-bold mb-2">Workshops</h3>
            <p className="text-muted text-sm leading-relaxed">
              Hands-on sessions on modern ML frameworks, LLMs, and data
              engineering.
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-colors sm:translate-y-8">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
              <FaLaptopCode size={20} />
            </div>
            <h3 className="text-foreground font-bold mb-2">Projects</h3>
            <p className="text-muted text-sm leading-relaxed">
              Extracurricular open-source projects to build a solid technical
              portfolio.
            </p>
          </div>

          <div className="bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-colors">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
              <FaNetworkWired size={20} />
            </div>
            <h3 className="text-foreground font-bold mb-2">Networking</h3>
            <p className="text-muted text-sm leading-relaxed">
              Connect with top-tier companies, alumni, and passionate peers.
            </p>
          </div>

          {/* Decorative empty block */}
          <div className="hidden sm:block rounded-3xl border border-white/5 border-dashed opacity-50 sm:translate-y-8"></div>
        </div>
      </div>
    </section>
  );
}
