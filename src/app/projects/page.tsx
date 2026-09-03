import { getProjects } from "@/lib/notion";
import ProjectCard from "@/components/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export const revalidate = 3600; // Cache the page for 1 hour in production

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-20 relative z-10 w-full max-w-[1100px] mx-auto px-6 mb-24">

      {/* Header */}
      <div className="mb-16 mt-10">
        <h1 className="text-[56px] font-[700] text-white leading-snug">Projects</h1>
        <p className="text-[16px] text-zinc-400 max-w-[600px] mt-4 leading-relaxed">
          Discover the hands-on initiatives driven by Polimi Data Scientists.
          From active research to completed projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} priority={index < 2} />
        ))}
      </div>
    </div>
  );
}
