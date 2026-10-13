'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FooterSection } from './FooterSection';

export default function Footer() {
  const pathname = usePathname();

  const isBioPage =
    pathname === '/l' ||
    pathname === '/tree' ||
    pathname === '/links' ||
    pathname?.startsWith('/l/') ||
    pathname?.startsWith('/tree/') ||
    pathname?.startsWith('/links/');

  const isPmqc = pathname === '/pmqc' || pathname?.startsWith('/pmqc/');

  if (isBioPage) return null;

  return (
    <footer className="mt-24 w-full border-t bg-background pt-20 pb-10">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-start justify-between gap-12 px-6 md:flex-row">
        <div className="flex flex-col gap-6 md:w-1/3">
          <Link href={isPmqc ? '/pmqc' : '/'} className="relative block w-[200px] h-[55px]">
            <Image
              src={isPmqc ? '/assets/pmqc/logo-pmqc.svg' : '/assets/logo.svg'}
              alt={isPmqc ? 'PMQC Logo' : 'PMDS Logo'}
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-muted text-sm leading-relaxed">
            {isPmqc
              ? 'The quantum computing department of PoliMi Data Scientists, at Politecnico di Milano.'
              : 'Student-led association at Politecnico di Milano dedicated to exploring the latest in Data Science.'}
          </p>
          {isPmqc && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-all w-fit -mt-2 group"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                <FaArrowLeftLong className="text-[10px] group-hover:-translate-x-0.5 transition-transform duration-300" />
              </span>
              <span>Back to PMDS Home</span>
            </Link>
          )}
          <div className="flex gap-5 mt-2">
            <a
              href="https://www.instagram.com/polimidatascientists/"
              icon={FaInstagram}
            />
            <SocialLink
              title="Telegram"
              href="https://t.me/joinchat/A-DRFUb1ovIh2nlH6q55Pw"
              icon={FaTelegramPlane}
            />
            <SocialLink
              title="LinkedIn"
              href="https://www.linkedin.com/company/polimi-data-scientists/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors text-2xl"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/Polimi-Data-Scientists-PMDS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors text-2xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <FooterSection
          title="Explore"
          links={[
            ...(isPmqc ? [{ text: 'PMDS Home', href: '/' }] : []),
            { text: 'Blog', href: '/blog' },
            { text: 'Projects', href: '/projects' },
            { text: 'Events', href: '/events' },
            ...(isPmqc ? [] : [{ text: 'PMQC', href: '/pmqc' }]),
            { text: 'Become a Member', href: '/membership' },
            {
              text: 'Support Us (Donate)',
              href: 'https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00',
              accent: true,
            },
            { text: 'Members', href: '/members' },
          ]}
        />

        <FooterSection
          title="Contact & Legal"
          links={[
            {
              text: 'info@polimidatascientists.it',
              href: 'mailto:info@polimidatascientists.it',
            },
            {
              text: 'startup-relations@polimidatascientists.it',
              href: 'mailto:startup-relations@polimidatascientists.it',
            },
            { text: 'Legal & Privacy Policy', href: '/legal' },
          ]}
        />
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-[1100px] flex-col items-center justify-between gap-6 border-t px-6 pt-8 text-xs text-muted md:flex-row md:items-start">
        <p className="shrink-0">
          &copy; 2026 Polimi Data Scientists. All rights reserved.
        </p>
        <p className="max-w-[500px] text-center leading-relaxed md:text-right">
          Polimi Data Scientists is an independent student association
          recognized by Politecnico di Milano. This website is independently
          managed and is not an official publication of the university.
        </p>
      </div>
    </footer>
  );
}
