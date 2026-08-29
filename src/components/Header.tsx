"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full relative z-50">
      <div className="w-full max-w-[1100px] mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="relative block w-[200px] h-[55px]">
          <Image src="/assets/logo.svg" alt="PMDS Logo" fill className="object-contain object-left" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 text-[15px] font-normal text-zinc-200">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/events" className="hover:text-white transition-colors">Events</Link>
          <Link href="/membership" className="hover:text-white transition-colors">Become a Member</Link>
          <Link href="/members" className="hover:text-white transition-colors">Members</Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="cursor-pointer md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505]/70 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-4 text-[15px] font-medium text-zinc-200 shadow-2xl">
          <Link href="/blog" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/projects" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/events" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Events</Link>
          <Link href="/membership" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Become a Member</Link>
          <Link href="/members" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Members</Link>
        </div>
      )}
    </header>
  );
}
