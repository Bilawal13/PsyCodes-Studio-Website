import React from 'react';
import { SectionHeading } from '../common/SectionHeading';

export interface PhilosophyPillar {
  tag: string;
  title: string;
  description: string;
  colorClass: string;
}

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    tag: '01 · CRAFTSMANSHIP',
    title: 'Code Precision',
    description: 'Clean architectural patterns, zero bloated dependencies, 60fps animations, and exhaustive automated test suites.',
    colorClass: 'text-primary',
  },
  {
    tag: '02 · RESILIENCE',
    title: 'Offline-First Core',
    description: 'Our applications maintain full local read-write integrity so users never hit blocking network loaders or stalled screens.',
    colorClass: 'text-tertiary',
  },
  {
    tag: '03 · DELIGHT',
    title: 'Playful Engineering',
    description: 'Infusing game design loops, tactile micro-feedback, and sensory physics into everyday utility software.',
    colorClass: 'text-secondary',
  },
  {
    tag: '04 · AUTONOMY',
    title: 'Total IP Ownership',
    description: 'Independent skunkworks development unburdened by corporate venture bloat, driven strictly by engineering passion.',
    colorClass: 'text-primary',
  },
];

/**
 * ProductPhilosophy - Presents studio engineering tenets behind every product build.
 * Single Responsibility: Presenting the 4 core product philosophy pillars.
 */
export const ProductPhilosophy: React.FC = () => {
  return (
    <section className="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl bg-surface-container-lowest border-t border-border-glass">
      <div className="max-w-7xl mx-auto flex flex-col">
        <SectionHeading
          eyebrow="OUR PILLARS"
          title="Engineering Tenets Behind Every Product"
          className="mb-space-xl text-left"
        />

        {/* 4-Column Editorial Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.tag}
              className="flex flex-col p-space-lg rounded-xl bg-surface-container-low text-left shadow-sm border border-border-glass"
            >
              <span className={`font-label-code text-label-code ${pillar.colorClass} font-bold mb-space-sm font-mono`}>
                {pillar.tag}
              </span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary mb-space-xs">
                {pillar.title}
              </h3>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
