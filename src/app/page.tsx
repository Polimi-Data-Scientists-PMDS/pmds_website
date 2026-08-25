import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Collaborators from "@/components/Collaborators";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-12 relative z-10">
      <main className="flex-1 flex flex-col items-center text-left w-full">
        <Hero />
        <Stats />
        <Collaborators />
      </main>
    </div>
  );
}
