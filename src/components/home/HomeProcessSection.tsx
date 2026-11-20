import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export interface ProcessPhase {
  number: string;
  phaseLabel: string;
  step: string;
  title: string;
  description: string;
  deliverable: string;
  accentColor: string;
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    number: '01',
    phaseLabel: 'Step 1',
    step: 'Plan',
    title: 'Discovery & Planning',
    description: 'We map out your goals, target audience, and key features so we build exactly what you and your users need.',
    deliverable: 'Clear Project Roadmap',
    accentColor: 'text-tertiary',
  },
  {
    number: '02',
    phaseLabel: 'Step 2',
    step: 'Design',
    title: 'Design & Prototyping',
    description: 'Interactive screen prototypes in Figma, custom brand styling, and polished user flows you can preview on your phone.',
    deliverable: 'Clickable Prototype',
    accentColor: 'text-primary',
  },
  {
    number: '03',
    phaseLabel: 'Step 3',
    step: 'Build',
    title: 'Development & Testing',
    description: 'Milestone builds with weekly test links on your phone or desktop so you can see and test real progress every week.',
    deliverable: 'Weekly Live Demos',
    accentColor: 'text-secondary',
  },
  {
    number: '04',
    phaseLabel: 'Step 4',
    step: 'Launch',
    title: 'Launch & Support',
    description: 'Publishing to the App Store and Google Play, connecting your domain, launching your site, and post-launch support.',
    deliverable: 'Official Live Release',
    accentColor: 'text-tertiary',
  },
];

/**
 * HomeProcessSection - 4-stage engineering delivery process.
 * Single Responsibility: Presenting the structured development workflow milestones.
 */
export const HomeProcessSection: React.FC = () => {
  return (
    <section className="w-full px-gutter lg:px-margin py-24 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionHeading
          eyebrow="DEVELOPMENT PROCESS"
          title="Our Development Process"
          description="A predictable, transparent pathway from napkin sketch to global production deployment."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_PHASES.map((phase) => (
            <div
              key={phase.number}
              className="bg-surface-deep/90 rounded-2xl p-6 shadow-md flex flex-col justify-between relative group hover:bg-surface-container-high transition-all border border-border-glass"
            >
              <div className="flex flex-col gap-3">
                <span className="font-display text-display font-extrabold text-outline-variant/30 group-hover:text-tertiary/40 transition-colors">
                  {phase.number}
                </span>
                <div className={`flex items-center gap-2 ${phase.accentColor} font-label-badge text-label-badge uppercase tracking-wider font-mono`}>
                  <span>{phase.phaseLabel}</span>
                  <span>•</span>
                  <span>{phase.step}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">
                  {phase.title}
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                  {phase.description}
                </p>
              </div>
              <div className="mt-4 pt-4 text-[12px] font-label-code text-on-surface-variant flex items-center gap-1.5 border-t border-border-glass/30 font-mono">
                <CheckCircle2 className={`w-4 h-4 ${phase.accentColor}`} />
                <span>{phase.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
