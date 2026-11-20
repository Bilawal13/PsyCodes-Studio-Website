import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

export interface ProjectCardProps {
  project: Project;
  onInspect: (project: Project) => void;
}

/**
 * ProjectCard - Individual portfolio project card component.
 * Single Responsibility: Rendering project card presentation, tags, and detail action triggers.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onInspect }) => {
  return (
    <div className="flex flex-col rounded-xl bg-surface-container-low overflow-hidden shadow-md hover:bg-surface-container transition-all duration-300 border border-border-glass">
      <div
        className="w-full h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${project.cover_image}')` }}
      >
        <span className="absolute top-space-sm left-space-sm px-space-sm py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-badge text-label-badge text-tertiary border border-border-glass font-mono">
          {project.category_label.split('·')[0].toUpperCase()}
        </span>
        <span className="absolute top-space-sm right-space-sm px-space-sm py-space-xs rounded-full bg-primary/20 backdrop-blur-md font-label-badge text-label-badge text-primary border border-primary/30 font-mono">
          {project.status.toUpperCase()}
        </span>
      </div>
      <div className="p-space-lg flex flex-col flex-1 justify-between text-left">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary mb-space-xs">
            {project.title}
          </h3>
          <p className="font-body-md text-body-md text-text-muted mb-space-md line-clamp-3 leading-relaxed">
            {project.short_description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-space-lg">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-surface-container-high font-label-code text-[11px] text-on-surface-variant font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onInspect(project)}
            className="flex-1 py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-bright text-text-primary font-button-text text-button-text transition-colors flex items-center justify-center gap-space-xs border border-border-glass text-xs"
          >
            <span>Inspect Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <Link
            to={`/projects/${project.slug}`}
            className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-tertiary transition-colors border border-border-glass"
            title="View Details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
