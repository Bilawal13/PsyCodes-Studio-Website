import React from 'react';
import { X, ArrowRight, CheckCircle2, Cpu, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../../types';
import { Link } from 'react-router-dom';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative bg-surface-deep border border-border-glass rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border-glass pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-tertiary/20 text-tertiary font-label-badge text-[11px] uppercase tracking-wider">
              {project.category_label || 'PRODUCT ARCHITECTURE'}
            </span>
            <span className="font-label-code text-[12px] text-text-muted">
              {project.technologies.slice(0, 3).join(' · ')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-text-primary transition-colors border border-border-glass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Desc */}
        <div className="flex items-start gap-3.5">
          {project.logo && (
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-high border border-border-glass p-0.5 shrink-0 shadow-md">
              <img src={project.logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
          )}
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-text-primary">
              {project.title}
            </h3>
            <p className="font-body-md text-body-md text-text-muted mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Screenshots Preview Strip if available */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {project.screenshots.map((s, idx) => (
              <div
                key={idx}
                className="w-20 shrink-0 aspect-[9/16] rounded-lg overflow-hidden border border-border-glass bg-surface-deep shadow-sm hover:border-tertiary/60 transition-all cursor-pointer"
              >
                <img src={s} alt={`screen ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Engineering Challenge Box */}
        {project.engineering_challenge && (
          <div className="p-4 rounded-xl bg-surface-container-low border border-border-glass shadow-inner flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-primary">
              <Cpu className="w-4 h-4" />
              <h4 className="font-button-text text-[13px] text-text-primary uppercase tracking-wider font-semibold">
                The Engineering Challenge
              </h4>
            </div>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              {project.engineering_challenge}
            </p>
          </div>
        )}

        {/* Architecture Spec Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-surface-container-high/50 border border-border-glass">
            <div className="font-label-badge text-[10px] text-tertiary uppercase">CORE ARCHITECTURE</div>
            <div className="font-body-sm text-[13px] font-semibold text-text-primary mt-0.5">
              {project.core_architecture || project.technologies[0]}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-high/50 border border-border-glass">
            <div className="font-label-badge text-[10px] text-secondary uppercase">DEPLOYMENT STATUS</div>
            <div className="font-body-sm text-[13px] font-semibold text-text-primary mt-0.5">
              {project.status}
            </div>
          </div>
        </div>

        {/* Deliverables / Features List */}
        {project.features && (
          <div className="flex flex-col gap-2">
            <span className="font-label-code text-xs text-tertiary uppercase tracking-wider font-semibold">
              KEY FEATURES &amp; HIGHLIGHTS
            </span>
            <ul className="flex flex-col gap-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-body-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-glass">
          <div className="flex items-center gap-2 flex-wrap">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-text-primary font-button-text text-button-text transition-colors border border-border-glass text-xs"
              >
                <Code2 className="w-3.5 h-3.5 text-tertiary" />
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-text-muted" />
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-text-primary font-button-text text-button-text transition-colors border border-border-glass text-xs"
            >
              <span>View Full Case Study</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              to={`/contact?service=${encodeURIComponent(project.title)}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text hover:bg-primary-container/80 transition-colors shadow-sm text-xs font-semibold"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface-variant font-button-text text-button-text hover:text-text-primary text-xs cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

