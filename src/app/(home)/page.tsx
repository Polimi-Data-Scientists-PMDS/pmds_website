import { getEvents } from '@/shared/lib/notion';
import AboutSection from './_components/AboutSection';
import Collaborators from './_components/Collaborators';
import CtaSection from './_components/CtaSection';
import DynamicHomeSection from './_components/DynamicHomeSection';
import Hero from './_components/Hero';
import Stats from './_components/Stats';

export default async function Home() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => e.upcoming).slice(0, 2);

  return (
    <div className="relative z-10 flex min-h-[calc(100vh-200px)] flex-col">
      <main className="page-container flex flex-1 flex-col gap-24 pt-6 text-left md:gap-32">
        <Hero />
        <Stats />
        <AboutSection />
        <DynamicHomeSection upcomingEvents={upcomingEvents} />
        <Collaborators />
        <CtaSection />
      </main>
    </div>
  );
}
