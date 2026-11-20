import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Layers,
  Smartphone,
  Globe,
  Sparkles,
  ShieldCheck,
  Flame,
  Code2
} from 'lucide-react';
import { PROJECTS } from '../../data/mockData';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="flex flex-col w-full px-gutter lg:px-margin py-space-xl max-w-7xl mx-auto">
      {/* Back navigation */}
      <div className="mb-space-lg">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-tertiary transition-colors font-button-text text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products & Ecosystem</span>
        </Link>
      </div>

      {/* Main Header Banner */}
      <div className="flex flex-col gap-space-md mb-space-xl">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="px-3 py-1 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/30 font-label-badge text-xs uppercase tracking-wider">
            {project.category_label}
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-label-badge text-xs uppercase">
            STATUS: {project.status}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {project.logo && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-surface-container-high/80 border border-border-glass p-1 shrink-0 shadow-xl backdrop-blur-md">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          )}
          <h1 className="font-display text-headline-lg lg:text-display text-text-primary tracking-tight font-bold">
            {project.title}
          </h1>
        </div>

        <p className="font-body-lg text-body-lg text-text-muted max-w-3xl leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Hero Cover Artwork & Interactive Preview */}
      <ScrollReveal direction="up" delay={0.05} amount={0.1}>
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-surface-container-lowest border border-border-glass shadow-2xl mb-space-xl">
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-text-primary">
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded bg-surface-deep/90 backdrop-blur-md border border-border-glass font-label-code text-xs text-text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-deep/90 backdrop-blur-md border border-border-glass font-button-text text-xs font-semibold text-white hover:text-tertiary transition-all"
                >
                  <Code2 className="w-3.5 h-3.5 text-tertiary" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                </a>
              )}

              {project.project_url && !project.github_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-button-text text-xs font-semibold shadow-md hover:bg-primary-container/80 transition-all"
                >
                  <span>Visit Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start mb-space-xl">
        {/* Left Column: Deep Architecture & Features (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          {/* The Engineering Challenge */}
          {project.engineering_challenge && (
            <ScrollReveal direction="up" delay={0.05} amount={0.1}>
              <div className="p-space-lg rounded-2xl bg-surface-container-low border border-border-glass shadow-md">
                <div className="flex items-center gap-2 text-tertiary mb-space-sm">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-headline-sm text-lg font-bold text-text-primary uppercase tracking-wide">
                    The Engineering Challenge
                  </h3>
                </div>
                <p className="font-body-md text-text-muted leading-relaxed">
                  {project.engineering_challenge}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Key Deliverables & Features */}
          {project.features && (
            <ScrollReveal direction="up" delay={0.08} amount={0.1}>
              <div className="flex flex-col gap-space-md">
                <h3 className="font-headline-sm text-xl font-bold text-text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span>Core Deliverables &amp; System Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-container border border-border-glass/60 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                      <span className="font-body-sm text-text-primary leading-relaxed text-sm">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Additional Screenshots / Gallery if present */}
          {project.screenshots && project.screenshots.length > 0 && (
            <ScrollReveal direction="up" delay={0.1} amount={0.1}>
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-xl font-bold text-text-primary">
                    App Screens &amp; Visual Walkthrough
                  </h3>
                  <span className="text-xs font-mono text-tertiary px-2.5 py-1 rounded bg-surface-container border border-border-glass">
                    {project.screenshots.length} Live App Screens
                  </span>
                </div>

                {project.category === 'mobile' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {project.screenshots.map((shot, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-xl overflow-hidden aspect-[9/19] bg-surface-deep border border-border-glass shadow-lg flex flex-col justify-end"
                      >
                        <img
                          src={shot}
                          alt={`${project.title} screen ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded bg-surface-deep/95 backdrop-blur-md border border-border-glass/60 text-left">
                          <span className="font-label-badge text-[9px] text-tertiary font-mono block">
                            VIEW 0{idx + 1}
                          </span>
                          <span className="font-headline-sm text-[11px] font-semibold text-text-primary truncate block">
                            {idx === 0
                              ? 'Aesthetic Dashboard'
                              : idx === 1
                                ? 'Hydration & Dock'
                                : idx === 2
                                  ? 'Goal Calculator'
                                  : idx === 3
                                    ? 'Food Library'
                                    : 'Daily History'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.screenshots.map((shot, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-deep border border-border-glass shadow-md">
                        <img
                          src={shot}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Column: Specifications & Inquire Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <ScrollReveal direction="up" delay={0.12} amount={0.1}>
            {/* Technical Specs Dossier Box */}
            <div className="p-space-lg rounded-2xl bg-surface-deep border border-border-glass shadow-xl flex flex-col gap-space-md">
              <span className="font-label-badge text-xs uppercase tracking-wider text-tertiary">
                PROJECT SPECIFICATIONS
              </span>

              {/* Dossier Visual Preview */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-border-glass/80 shadow-md bg-surface-container-lowest group">
                <img
                  src={project.cover_image}
                  alt={`${project.title} Preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/80 via-transparent to-transparent pointer-events-none" />
                {project.logo && (
                  <div className="absolute bottom-2 left-2 w-8 h-8 rounded-lg overflow-hidden bg-surface-deep/90 border border-border-glass/80 p-0.5 shadow-md">
                    <img src={project.logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-space-sm divide-y divide-border-glass/50 text-xs">
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">PRIMARY STACK:</span>
                  <span className="font-label-code text-primary font-semibold">
                    {project.technologies[0]}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">TARGET PLATFORMS:</span>
                  <span className="font-label-code text-tertiary font-semibold">
                    {project.runtime_target || 'Universal'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">STATE & ARCHITECTURE:</span>
                  <span className="font-label-code text-secondary font-semibold">
                    {project.state_paradigm || 'Reactive'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">DATABASE & STORAGE:</span>
                  <span className="font-label-code text-on-surface-variant font-semibold">
                    {project.storage_engine || 'Local / Cloud'}
                  </span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-text-muted">RIGHTS &amp; CODE:</span>
                  <span className="font-label-code text-primary font-semibold">100% Owned by Client</span>
                </div>
              </div>

              {project.play_store_url && (
                <div className="pt-3 border-t border-border-glass">
                  <a
                    href={project.play_store_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high hover:bg-surface-bright border border-border-glass text-xs font-body-sm text-text-muted hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-tertiary shrink-0" />
                      <span>Google Play Store Rollout</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-tertiary transition-colors" />
                  </a>
                </div>
              )}

              {project.github_url && (
                <div className="pt-3 border-t border-border-glass">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high hover:bg-surface-bright border border-border-glass text-xs font-body-sm text-text-muted hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-tertiary shrink-0" />
                      <span>GitHub Open-Source Repo</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-tertiary transition-colors" />
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Action Box: Inquire About Similar Architecture */}
          <ScrollReveal direction="up" delay={0.15} amount={0.1}>
            <div className="p-space-lg rounded-2xl bg-gradient-to-br from-surface-container-low via-surface-deep to-surface-container-high border border-border-glass shadow-xl flex flex-col gap-4">
              <span className="font-label-badge text-xs uppercase text-tertiary font-semibold">
                START A SIMILAR PROJECT
              </span>
              <h4 className="font-headline-sm text-lg font-bold text-text-primary">
                Want to build something like this?
              </h4>
              <p className="font-body-sm text-xs text-text-muted leading-relaxed">
                We can design, develop, and launch a tailored version for your business. Reach out to get started.
              </p>
              <Link
                to={`/contact?service=${encodeURIComponent(project.title)}`}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-button-text text-button-text font-bold text-center shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 text-xs"
              >
                <span>Inquire About This Build</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

