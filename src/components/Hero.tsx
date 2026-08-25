import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between mt-6 md:mt-10 relative min-h-[350px]">
      
      {/* Mobile background glow */}
      <style>{`
        @keyframes float {
          0%   { transform: translate(0, 0) scale(1); }
          10%  { transform: translate(100px, -80px) scale(1.3); }
          20%  { transform: translate(160px, 40px) scale(1.1); }
          30%  { transform: translate(40px, 80px) scale(0.9); }
          40%  { transform: translate(-100px, 120px) scale(0.8); }
          50%  { transform: translate(-160px, -20px) scale(1); }
          60%  { transform: translate(-60px, -120px) scale(1.4); }
          70%  { transform: translate(120px, -60px) scale(1.2); }
          80%  { transform: translate(60px, 120px) scale(0.9); }
          90%  { transform: translate(-80px, 40px) scale(0.7); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-float {
          animation: float 25s ease-in-out infinite;
        }
      `}</style>
      <div className="md:hidden absolute top-[-20px] left-[10%] w-[250px] h-[250px] bg-[#4b6ffe]/40 blur-[80px] rounded-full pointer-events-none -z-10 animate-float"></div>

      <div className="w-full md:w-[65%] flex flex-col justify-center z-10 py-8">
        <div className="mb-2">
          <h1 className="text-[44px] font-[700] text-white leading-snug">Data Science Club</h1>
        </div>
        <div className="-mt-3">
          <h1 className="text-[44px] font-[700] text-[#4b6ffe] leading-snug">Politecnico di Milano</h1>
        </div>
        
        <p className="text-[14px] text-zinc-300 w-full max-w-[850px] leading-[1.8] mt-4 font-normal">
          Student-led association at Politecnico di Milano dedicated to Data Science. We host events, share insights, and foster a vibrant community for exploring the latest in data science.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/product/membership" className="w-fit bg-[#4b6ffe]/20 border border-[#4b6ffe]/50 backdrop-blur-md hover:bg-[#4b6ffe]/40 text-white text-[15px] font-medium py-3 px-8 rounded-full transition-all text-center">
            Join the Club
          </Link>
          <Link href="/events" className="w-fit bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white text-[15px] font-medium py-3 px-8 rounded-full transition-all text-center">
            Discover Events
          </Link>
        </div>
      </div>

      <div className="hidden md:flex absolute right-[-10rem] top-1/2 -translate-y-1/2 mt-[1rem] z-0 pointer-events-none">
        <div style={{ width: '500px', height: '340px', position: 'relative', overflow: 'hidden' }}>
          <iframe
            src="https://my.spline.design/cubic-b604e5d1abc60b01e8ef13aa8b67f44b"
            frameBorder="0"
            style={{ width: '500px', height: '400px', position: 'absolute', top: 0, left: 0, overflow: 'hidden', background: 'transparent', pointerEvents: 'auto' }}
            title="PMDS Cubes 3D"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
