'use client';

import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaEnvelope, FaTimes } from "react-icons/fa";

export default function CtaSection() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <section className="w-full max-w-[850px] mx-auto px-6 mt-20 mb-20">
      <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[40px] px-8 py-12 md:py-16 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_80px_rgba(75,111,254,0.05)]">

        {/* Glow behind the CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#4b6ffe]/20 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className="text-[32px] md:text-[42px] font-[800] text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 tracking-tight leading-tight relative z-10">
          Ready to dive into Data Science?
        </h2>
        <p className="text-zinc-300 mt-4 max-w-[450px] text-[15px] md:text-[16px] relative z-10">
          Join a community of students passionate about AI, Machine Learning, and everything data.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
          <Link href="/membership" className="cursor-pointer flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 text-[15px] font-bold py-3.5 px-8 rounded-full transition-all group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Become a Member <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => setIsNewsletterOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[15px] font-semibold py-3.5 px-8 rounded-full transition-all"
          >
            <FaEnvelope /> Subscribe to Newsletter
          </button>
        </div>
      </div>

      {/* Newsletter Modal */}
      {isNewsletterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative flex flex-col items-center shadow-2xl"
          >
            <button
              onClick={() => setIsNewsletterOpen(false)}
              className="cursor-pointer absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2 mt-4 text-center">Newsletter</h3>
            <p className="text-zinc-300 text-sm mb-6 text-center">Get our latest insights straight to your inbox.</p>

            <div className="w-full flex justify-center">
              <iframe
                src="https://pmds.substack.com/embed?transparent=1&light=1"
                width="100%"
                height="320"
                style={{ border: 0, background: 'transparent' }}
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
