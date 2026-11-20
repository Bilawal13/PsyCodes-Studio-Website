import React, { useState } from 'react';
import { PROJECTS } from '../../data/mockData';
import { Project } from '../../types';
import { ProjectModal } from '../../components/modals/ProjectModal';
import { ProjectsHero } from '../../components/projects/ProjectsHero';
import { ProjectsFlagshipShowcase } from '../../components/projects/ProjectsFlagshipShowcase';
import { ProjectFilterBar, FilterOption } from '../../components/projects/ProjectFilterBar';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProductPhilosophy } from '../../components/projects/ProductPhilosophy';
import { CallToActionStrip } from '../../components/common/CallToActionStrip';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ScrollReveal } from '../../components/common/ScrollReveal';

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: `All Products (${PROJECTS.length})` },
  { id: 'ai', label: `AI & Automation (${PROJECTS.filter((p) => p.category === 'ai').length})` },
  { id: 'mobile', label: `Mobile App (${PROJECTS.filter((p) => p.category === 'mobile').length})` },
  { id: 'gaming', label: `Interactive Game (${PROJECTS.filter((p) => p.category === 'games').length})` },
  { id: 'web', label: `Web Platform (${PROJECTS.filter((p) => p.category === 'web').length})` },
];

/**
 * ProjectsPage - Modular orchestrator for studio proprietary IP and client deliveries.
 * Adheres strictly to SOLID principles:
 * - SRP: High-level page orchestration, view layout, and selection state.
 * - OCP: Composes independent presentational blocks.
 * - DIP: Relies on abstractions and isolated components for presentation.
 */
export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mobile') return p.category === 'mobile';
    if (activeFilter === 'web') return p.category === 'web';
    if (activeFilter === 'ai') return p.category === 'ai';
    if (activeFilter === 'gaming') return p.category === 'games';
    return true;
  });

  const handleOpenModalBySlug = (projectSlug: string) => {
    const proj = PROJECTS.find((p) => p.slug === projectSlug);
    if (proj) {
      setSelectedProject(proj);
      setIsModalOpen(true);
    }
  };

  const handleInspectProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient Backdrop Lighting Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary-container/15 rounded-full blur-[140px]" />
        <div className="absolute top-[880px] left-10 w-[480px] h-[380px] bg-tertiary/10 rounded-full blur-[130px]" />
        <div className="absolute top-[1650px] right-8 w-[540px] h-[400px] bg-accent-violet/10 rounded-full blur-[160px]" />
      </div>

      {/* SECTION A: ECOSYSTEM HERO */}
      <ProjectsHero />

      {/* SECTION B: PROPRIETARY IP SPOTLIGHT (DEEP DIVES) */}
      <ScrollReveal>
        <ProjectsFlagshipShowcase onOpenModal={handleOpenModalBySlug} />
      </ScrollReveal>

      {/* SECTION C: PORTFOLIO & WORK SHOWCASE (INTERACTIVE CATEGORY FILTER) */}
      <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl border-t border-border-glass">
        <div className="max-w-7xl mx-auto flex flex-col">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
              <SectionHeading
                eyebrow="STUDIO PRODUCTS"
                title="Featured Software & Interactive Builds"
              />
              <p className="font-body-md text-body-md text-text-muted max-w-md mt-space-sm md:mt-0 text-left md:text-right">
                Curated studio products engineered and deployed directly from our laboratory.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter Navigation */}
          <ScrollReveal delay={0.08}>
            <ProjectFilterBar
              options={FILTER_OPTIONS}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </ScrollReveal>

          {/* Dynamic Interactive Project Cards Grid */}
          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onInspect={handleInspectProject}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION D: OUR PRODUCT PHILOSOPHY */}
      <ScrollReveal>
        <ProductPhilosophy />
      </ScrollReveal>

      {/* SECTION E: BOTTOM CALL TO ACTION */}
      <ScrollReveal>
        <CallToActionStrip
          eyebrow="START A BUILD"
          title="Have An Idea Or Want A Custom Product Built?"
          description="We design, engineer, and deploy high-performance web applications, mobile platforms, and games for ambitious partners worldwide."
          primaryButtonText="Start A Project"
          primaryButtonLink="/contact"
          secondaryButtonText="Explore Services"
          secondaryButtonLink="/services"
        />
      </ScrollReveal>

      {/* Project Spec Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
