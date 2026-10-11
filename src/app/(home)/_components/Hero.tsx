import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative mx-auto mt-6 flex min-h-[400px] w-full max-w-[1100px] flex-col items-center justify-between px-6 md:mt-16 md:flex-row">
      {/* Background glow effects */}
      <style>{`
        @keyframes float {
          0%   { transform: translate(0, 0) scale(1); }
          10%  { transform: translate(50px, -40px) scale(1.2); }
          20%  { transform: translate(80px, 20px) scale(1.1); }
          30%  { transform: translate(20px, 40px) scale(0.9); }
          40%  { transform: translate(-50px, 60px) scale(0.8); }
          50%  { transform: translate(-80px, -10px) scale(1); }
          60%  { transform: translate(-30px, -60px) scale(1.3); }
          70%  { transform: translate(60px, -30px) scale(1.1); }
          80%  { transform: translate(30px, 60px) scale(0.9); }
          90%  { transform: translate(-40px, 20px) scale(0.8); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .animate-glow {
          animation: float 20s ease-in-out infinite;
        }
        @media (min-width: 768px) {
          .animate-glow {
            animation: pulse-slow 10s ease-in-out infinite;
          }
        }
      `}</style>

      {/* Ambient Glows moved INSIDE the text container for perfect alignment */}
      <div className="relative z-10 flex w-full flex-col justify-center py-8 md:w-[60%]">
        <div className="animate-glow pointer-events-none absolute top-[-20px] left-[10px] -z-10 h-[250px] w-[250px] rounded-full bg-accent/30 blur-[90px] md:top-[-60px] md:left-[-40px] md:h-[450px] md:w-[450px]"></div>
        <div
          className="animate-glow pointer-events-none absolute top-[20px] left-[50px] -z-10 hidden h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[100px] md:top-[80px] md:left-[100px] md:block md:h-[400px] md:w-[400px]"
          style={{ animationDelay: '-5s' }}
        ></div>

        <div className="mb-2">
          <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-foreground md:text-6xl">
            Data Science Club
          </h1>
        </div>
        <div className="-mt-2 mb-6 md:-mt-4">
          <h1 className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-4xl leading-tight font-extrabold tracking-tight text-transparent md:text-5xl">
            Politecnico di Milano
          </h1>
        </div>

        <p className="relative z-10 w-full max-w-[550px] text-sm leading-relaxed font-medium text-muted md:text-sm">
          The largest student-led association dedicated to Data Science and AI
          at PoliMi. We host workshops, build real-world projects, and foster a
          vibrant tech community.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/membership"
            className="w-fit rounded-full bg-accent px-8 py-3.5 text-center text-sm font-bold text-foreground shadow-[0_0_20px_--alpha(var(--color-accent)/30%)] transition-all hover:bg-accent-secondary hover:shadow-[0_0_30px_--alpha(var(--color-accent)/50%)]"
          >
            Join the Club
          </Link>
          <Link
            href="/events"
            className="w-fit rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-center text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-white/10"
          >
            Explore Events
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-[-14rem] z-0 mt-[1rem] hidden -translate-y-1/2 md:flex">
        <div
          style={{
            width: '600px',
            height: '450px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://my.spline.design/cubic-b604e5d1abc60b01e8ef13aa8b67f44b"
            frameBorder="0"
            style={{
              width: '600px',
              height: '520px',
              position: 'absolute',
              top: 0,
              left: 0,
              overflow: 'hidden',
              background: 'transparent',
              pointerEvents: 'auto',
            }}
            title="PMDS Cubes 3D"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
