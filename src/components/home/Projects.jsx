import React from 'react';
import SectionHeader from '../common/SectionHeader';
import ProjectCard from './ProjectCard';
import Button from '../common/Button';
import { Github } from 'lucide-react';
import { projectsData, personalInfo } from '../../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Featured Work"
          titlePrefix="Recent"
          gradientWord="Projects &amp; Builds"
          subtitle="A showcase of web applications engineered with emphasis on clean code, modern UX, and real-world utility."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub Call to action */}
        <div className="text-center max-w-lg mx-auto">
          <p className="text-sm text-gray-400 mb-4">
            Looking for more code repositories or specialized experiments?
          </p>
          <Button
            variant="secondary"
            size="md"
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Github className="w-4 h-4" />}
          >
            Explore My GitHub Profile
          </Button>
        </div>
      </div>
    </section>
  );
}

