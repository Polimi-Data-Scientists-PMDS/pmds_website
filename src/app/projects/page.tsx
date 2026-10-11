import { getProjects } from '@/shared/lib/notion';
import { Metadata } from 'next';
import ProjectCard from './_components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="relative z-10 mx-auto mb-24 flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col px-6 pt-20">
      {/* Header */}
      <div className="mt-10 mb-16">
        <h1 className="text-6xl leading-snug font-bold text-foreground">
          Projects
        </h1>
        <p className="mt-4 max-w-[600px] text-base leading-relaxed text-muted">
          Discover the hands-on initiatives driven by Polimi Data Scientists.
          From active research to completed projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index < 2}
          />
        ))}
      </div>
    </div>
  );
}
