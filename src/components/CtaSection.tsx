import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CtaSection() {
  return (
    <section className="w-full max-w-[850px] mx-auto px-6 mt-20 mb-20">
      <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[40px] px-8 py-12 md:py-16 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow behind the CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#4b6ffe]/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <h2 className="text-[32px] md:text-[42px] font-[800] text-white tracking-tight leading-tight relative z-10">
          Ready to dive into Data Science?
        </h2>
        <p className="text-zinc-400 mt-4 max-w-[450px] text-[15px] md:text-[16px] relative z-10">
          Join a community of students passionate about AI, Machine Learning, and everything data.
        </p>
        
        <div className="mt-8 relative z-10">
          <Link href="/product/membership" className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 text-[15px] font-bold py-3.5 px-8 rounded-full transition-all group">
            Become a Member <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
