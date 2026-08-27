import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AboutSection from "@/components/AboutSection";
import Collaborators from "@/components/Collaborators";
import DynamicHomeSection from "@/components/DynamicHomeSection";
import CtaSection from "@/components/CtaSection";
import { getEvents } from "@/lib/notion";

export const revalidate = 3600;

export default async function Home() {
  const events = await getEvents();

  const upcomingEvents = events.filter(e => e.upcoming).slice(0, 2);

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
