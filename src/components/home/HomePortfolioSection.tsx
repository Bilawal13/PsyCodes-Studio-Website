import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/mockData';
import { Project } from '../../types';
import { SectionHeading } from '../common/SectionHeading';

export interface HomePortfolioSectionProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Releases' },
  { id: 'mobile', label: 'App Development' },
  { id: 'web', label: 'Web & SaaS' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'games', label: 'Game Titles' },
];

/**
 * HomePortfolioSection - Filterable studio portfolio showcase.
 * Single Responsibility: Portfolio presentation, category filtering, and item quick-view triggering.
 */
export const HomePortfolioSection: React.FC<HomePortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS.slice(0, 4)
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full px-gutter lg:px-margin py-24 bg-surface-container-lowest/60 relative border-t border-border-glass" id="work">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="From Concepts To Real-World Products"
          />
          <p className="font-body-md text-body-md text-text-muted max-w-md">
            Explore curated studio deliveries across cross-platform mobile apps, bespoke game builds, intelligent automation, and modern web architectures.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-button-text text-button-text transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-surface-deep/80 hover:bg-surface-container-high/60 rounded-2xl p-6 shadow-md transition-all duration-300 flex flex-col justify-between border border-border-glass"
            >
              <div className="flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-surface-container-lowest">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-deep/90 text-tertiary font-label-badge text-[11px] backdrop-blur-md border border-border-glass font-mono">
                    {project.category_label}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">
                      {project.title}
                    </h3>
                    <span className="font-label-badge text-tertiary text-[11px] uppercase font-mono">
                      ● {project.status}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-text-muted mt-2 leading-relaxed">
                    {project.short_description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between border-t border-border-glass/40">
                <div className="flex items-center gap-2 flex-wrap">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="font-label-code text-[11px] px-2 py-0.5 rounded bg-surface-container-low text-text-muted border border-border-glass/50 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-on-surface-variant hover:text-text-primary font-button-text text-button-text text-xs"
                  >
                    <span>Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1 text-tertiary font-button-text text-button-text hover:underline text-xs"
                  >
                    <span>Quick View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
