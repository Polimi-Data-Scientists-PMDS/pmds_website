import { PageHeading } from '@/shared/components/ui/PageHeading';
import { getProjects } from '@/shared/lib/notion';
import { Metadata } from 'next';
import ProjectCard from './_components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col gap-16 px-6 pt-30">
      {/* Header */}
      <PageHeading
        text="Our"
        highlightedText="Projects."
        description="Discover the hands-on initiatives driven by Polimi Data Scientists. From active research to completed projects."
      />

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
