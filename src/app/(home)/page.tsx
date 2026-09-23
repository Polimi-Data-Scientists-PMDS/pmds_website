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
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-12 relative z-10">
      <main className="flex-1 flex flex-col items-center text-left w-full">
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
