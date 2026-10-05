import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

import AnnouncementBar from '@/shared/components/layout/AnnouncementBar';
import Footer from '@/shared/components/layout/Footer';
import Header from '@/shared/components/layout/Header';
import { getAnnouncements } from '@/shared/lib/notion';
import { cn } from '@/shared/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://polimidatascientists.it'),
  title: {
    template: '%s | PMDS',
    default: 'PMDS - Polimi Data Scientists',
  },
  description:
    'Student-led association at Politecnico di Milano dedicated to Data Science',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://polimidatascientists.it',
    siteName: 'PMDS - Polimi Data Scientists',
    title: 'PMDS - Polimi Data Scientists',
    description:
      'Student-led association at Politecnico di Milano dedicated to Data Science',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Polimi Data Scientists',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PMDS - Polimi Data Scientists',
    description:
      'Student-led association at Politecnico di Milano dedicated to Data Science',
    images: ['/assets/og-image.png'],
  },
};

async function Announcements() {
  const announcements = await getAnnouncements();

  const firstAnnouncement = announcements[0];

  return firstAnnouncement && <AnnouncementBar {...firstAnnouncement} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased text-foreground overflow-x-clip',
          inter.className,
        )}
      >
        <Announcements />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
