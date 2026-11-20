import React from 'react';
import { Shield, Sparkles, Terminal, Code2, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export interface StudioTenet {
  number: string;
  title: string;
  desc: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
}

export const STUDIO_TENETS: StudioTenet[] = [
  {
    number: '01',
    title: 'Zero Technical Hand-Offs',
    desc: 'You interface directly with senior architects who write and test the production code. No junior delegation, no account-manager game of telephone.',
    badge: 'Direct Architect Access',
    icon: Code2,
    color: 'text-cyan-400',
    glow: 'rgba(24, 217, 246, 0.2)',
  },
  {
    number: '02',
    title: 'Offline-First Resilience',
    desc: 'Whether building mobile fitness applications or multi-tenant web tools, we design deterministic local caching so apps never stutter or crash when offline.',
    badge: 'Sub-Second Local Cache',
    icon: Terminal,
    color: 'text-blue-400',
    glow: 'rgba(56, 144, 255, 0.2)',
  },
  {
    number: '03',
    title: 'Tactile Game Feel In Every Product',
    desc: 'Software should feel alive. We borrow responsiveness, physics springs, micro-vibrations, and crisp typographic hierarchy from gaming into utility software.',
    badge: 'Micro-Interaction Polish',
    icon: Sparkles,
    color: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.2)',
  },
  {
    number: '04',
    title: 'Uncompromised Code Sovereignty',
    desc: 'You own 100% of your intellectual property, repository commits, design libraries, and infrastructure configurations from milestone one.',
    badge: 'Full Commercial IP Rights',
    icon: Shield,
    color: 'text-cyan-400',
    glow: 'rgba(24, 217, 246, 0.2)',
  },
];

/**
 * StudioTenets - Foundational principles governing every repository and build.
 * Single Responsibility: Presenting the 4 studio engineering tenets.
 */
export const StudioTenets: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <SectionHeading
          eyebrow="FOUNDATIONAL PRINCIPLES"
          title="The Studio Tenets"
        />
        <p className="text-sm sm:text-base text-text-muted max-w-md">
          We adhere to strict engineering axioms that govern every repository, game build, and neural vector workflow we ship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STUDIO_TENETS.map((tenet) => {
          const Icon = tenet.icon;
          return (
            <div
              key={tenet.number}
              className="p-8 rounded-2xl bg-surface-container/70 border border-border-glass backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl bg-surface-deep flex items-center justify-center border border-border-glass shadow-lg"
                  style={{ boxShadow: `0 0 20px ${tenet.glow}` }}
                >
                  <Icon className={`w-6 h-6 ${tenet.color}`} />
                </div>
                <span className={`text-xs font-mono font-bold ${tenet.color}`}>
                  PILLAR · {tenet.number}
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-white mb-3">
                {tenet.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">
                {tenet.desc}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{tenet.badge}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
