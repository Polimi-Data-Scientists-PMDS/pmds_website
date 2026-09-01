import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Confetti from "@/components/Confetti";

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Celebration Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#4b6ffe]/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      
      <Confetti />

      <div className="w-full max-w-[600px] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 md:p-16 text-center flex flex-col items-center shadow-[0_0_80px_rgba(75,111,254,0.15)] relative z-10">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#4b6ffe] blur-[20px] opacity-40 rounded-full animate-pulse"></div>
          <FaHeart className="text-[#4b6ffe] text-7xl relative z-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-[800] text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-4 tracking-tight">
          Thank you so much!
        </h1>
        <p className="text-zinc-400 text-[16px] leading-relaxed mb-8">
          Your generous donation has been processed successfully. Contributions like yours allow PMDS to keep organizing amazing workshops, projects, and events for our community.
        </p>

        <Link 
          href="/"
          className="bg-[#4b6ffe] hover:bg-[#3f5fdf] text-white font-semibold py-3.5 px-8 rounded-full transition-colors shadow-[0_0_20px_rgba(75,111,254,0.3)]"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
