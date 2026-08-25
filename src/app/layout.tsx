import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "PMDS – Polimi Data Scientists",
  description: "Student-led association at Politecnico di Milano dedicated to Data Science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased text-white`}
      >
        <Header />
        {children}
        
        <footer className="w-full border-t border-white/10 bg-[#050505] pt-20 pb-10 mt-24">
          <div className="w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex flex-col gap-6 md:w-1/3">
              <Link href="/" className="relative block w-[200px] h-[55px]">
                 <Image src="/assets/logo.svg" alt="PMDS Logo" fill className="object-contain object-left" />
              </Link>
              <p className="text-zinc-400 text-[14px] leading-relaxed">
                Student-led association at Politecnico di Milano dedicated to exploring the latest in Data Science.
              </p>
              <div className="flex gap-5 mt-2">
                 <a href="https://www.instagram.com/polimidatascientists/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-[22px]"><FaInstagram /></a>
                 <a href="https://t.me/joinchat/A-DRFUb1ovIh2nlH6q55Pw" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-[22px]"><FaTelegramPlane /></a>
                 <a href="https://www.linkedin.com/company/polimi-data-scientists/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-[22px]"><FaLinkedinIn /></a>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:w-1/3 md:pl-16">
              <h4 className="text-white text-[15px] font-semibold mb-2 tracking-wide">Explore</h4>
              <Link href="/blog" className="text-zinc-400 hover:text-white text-[14px] transition-colors">Blog</Link>
              <Link href="/projects" className="text-zinc-400 hover:text-white text-[14px] transition-colors">Projects</Link>
              <Link href="/events" className="text-zinc-400 hover:text-white text-[14px] transition-colors">Events</Link>
              <Link href="/product/membership" className="text-zinc-400 hover:text-white text-[14px] transition-colors">Become a Member</Link>
              <Link href="/members" className="text-zinc-400 hover:text-white text-[14px] transition-colors">Members</Link>
            </div>
            
            <div className="flex flex-col gap-4 md:w-1/3">
              <h4 className="text-white text-[15px] font-semibold mb-2 tracking-wide">Contact</h4>
              <a href="mailto:info@polimidatascientists.it" className="text-zinc-400 hover:text-white text-[14px] transition-colors">info@polimidatascientists.it</a>
            </div>
          </div>
          
          <div className="w-full max-w-[1100px] mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-[13px] gap-4">
            <p>&copy; 2026 Polimi Data Scientists. All rights reserved.</p>
            <p>Politecnico di Milano</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
