import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between mt-6 md:mt-16 relative min-h-[400px]">
      
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
      <div className="w-full md:w-[60%] flex flex-col justify-center z-10 py-8 relative">
        <div className="absolute top-[-20px] left-[10px] md:top-[-60px] md:left-[-40px] w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-[#4b6ffe]/30 blur-[90px] rounded-full pointer-events-none -z-10 animate-glow"></div>
        <div className="hidden md:block absolute top-[20px] left-[50px] md:top-[80px] md:left-[100px] w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none -z-10 animate-glow" style={{ animationDelay: '-5s' }}></div>

        <div className="mb-2">
          <h1 className="text-[48px] md:text-[64px] font-[800] text-white leading-tight tracking-tight">
            Data Science Club
          </h1>
        </div>
        <div className="-mt-2 md:-mt-4 mb-6">
          <h1 className="text-[36px] md:text-[48px] font-[800] text-transparent bg-clip-text bg-gradient-to-r from-[#4b6ffe] to-indigo-400 leading-tight tracking-tight">
            Politecnico di Milano
          </h1>
        </div>
        
        <p className="text-[14px] md:text-[15px] text-zinc-400 w-full max-w-[550px] leading-relaxed font-medium relative z-10">
          The largest student-led association dedicated to Data Science and AI at PoliMi. 
          We host workshops, build real-world projects, and foster a vibrant tech community.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/membership" className="w-fit bg-[#4b6ffe] hover:bg-[#3f5fdf] text-white text-[15px] font-bold py-3.5 px-8 rounded-full transition-all text-center shadow-[0_0_20px_rgba(75,111,254,0.3)] hover:shadow-[0_0_30px_rgba(75,111,254,0.5)]">
            Join the Club
          </Link>
          <Link href="/events" className="w-fit bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white text-[15px] font-semibold py-3.5 px-8 rounded-full transition-all text-center">
            Explore Events
          </Link>
        </div>
      </div>

      <div className="hidden md:flex absolute right-[-14rem] top-1/2 -translate-y-1/2 mt-[1rem] z-0 pointer-events-none">
        <div style={{ width: '600px', height: '450px', position: 'relative', overflow: 'hidden' }}>
          <iframe
            src="https://my.spline.design/cubic-b604e5d1abc60b01e8ef13aa8b67f44b"
            frameBorder="0"
            style={{ width: '600px', height: '520px', position: 'absolute', top: 0, left: 0, overflow: 'hidden', background: 'transparent', pointerEvents: 'auto' }}
            title="PMDS Cubes 3D"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
