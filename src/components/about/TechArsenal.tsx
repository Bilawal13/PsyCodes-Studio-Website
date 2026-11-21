import React from 'react';
import { Gamepad2, Smartphone, Globe, Cpu } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export interface TechDiscipline {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  color: string;
}

export const TECH_DISCIPLINES: TechDiscipline[] = [
  {
    id: '01 · APP ENGINEERING',
    title: 'Mobile App Development',
    desc: 'Silky 60/120 FPS iOS and Android mobile apps engineered across modern native and cross-platform frameworks, offline caching, and intuitive interfaces.',
    icon: Smartphone,
    tags: ['Kotlin', 'Swift', 'Flutter', 'React Native', 'Firebase'],
    color: 'text-cyan-400',
  },
  {
    id: '02 · CLOUD & WEB',
    title: 'Web & Cloud Platforms',
    desc: 'Sub-second modern web applications, SaaS platforms, and distributed APIs backed by high-concurrency databases, edge caching, and scalable architectures.',
    icon: Globe,
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    color: 'text-blue-400',
  },
  {
    id: '03 · NEURAL AI',
    title: 'AI Solutions & Autonomous Agents',
    desc: 'Bespoke multi-agent pipelines and vector indexing workflows that convert generative models into predictable, high-value business assets.',
    icon: Cpu,
    tags: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'Pinecone', 'vLLM'],
    color: 'text-secondary',
  },
  {
    id: '04 · GAMING & 3D',
    title: 'Game Development & Interactive',
    desc: 'Engaging 2D/3D games and interactive WebGL experiences with responsive physics, custom shaders, and cross-platform deployment.',
    icon: Gamepad2,
    tags: ['Unity', 'Unreal Engine', 'C# / C++', 'Universal RP', 'WebGL 2.0'],
    color: 'text-cyan-400',
  },
];

/**
 * TechArsenal - Curated high-velocity engineering stacks.
 * Single Responsibility: Presenting the studio's technical stack disciplines.
 */
export const TechArsenal: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
      <SectionHeading
        eyebrow="LAB INFRASTRUCTURE"
        title="Studio Tech Arsenal"
        description="Curated high-velocity engineering stacks calibrated for deterministic execution, extreme runtime speeds, and rock-solid maintainability."
        align="center"
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TECH_DISCIPLINES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-surface-container-low/70 border border-border-glass flex flex-col justify-between hover:bg-surface-container hover:border-cyan-400/30 transition-all text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-bold ${item.color}`}>{item.id}</span>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-base font-bold font-display text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted mb-6 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-glass/40">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-surface-deep text-text-primary text-[10px] font-mono border border-border-glass"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
