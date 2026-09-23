import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { FooterSection } from './FooterSection';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-20 pb-10 mt-24">
      <div className="w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6 md:w-1/3">
          <Link href="/" className="relative block w-[200px] h-[55px]">
            <Image
              src="/assets/logo.svg"
              alt="PMDS Logo"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-muted text-sm leading-relaxed">
            Student-led association at Politecnico di Milano dedicated to
            exploring the latest in Data Science.
          </p>
          <div className="flex gap-5 mt-2">
            <a
              href="https://www.instagram.com/polimidatascientists/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://t.me/joinchat/A-DRFUb1ovIh2nlH6q55Pw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors text-2xl"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://www.linkedin.com/company/polimi-data-scientists/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <FooterSection
          title="Explore"
          links={[
            { text: 'Blog', href: '/blog' },
            { text: 'Projects', href: '/projects' },
            { text: 'Events', href: '/events' },
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

      <div className="w-full max-w-[1100px] mx-auto px-6 mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center md:items-start text-muted text-xs gap-6">
        <p className="shrink-0">
          &copy; 2026 Polimi Data Scientists. All rights reserved.
        </p>
        <p className="text-center md:text-right max-w-[500px] leading-relaxed">
          Polimi Data Scientists is an independent student association
          recognized by Politecnico di Milano. This website is independently
          managed and is not an official publication of the university.
        </p>
      </div>
    </footer>
  );
}
