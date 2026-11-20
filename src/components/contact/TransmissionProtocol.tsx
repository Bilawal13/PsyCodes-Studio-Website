import React from 'react';
import { Sparkles, MessageSquare, Compass, Rocket } from 'lucide-react';

export interface ProtocolStep {
  step: string;
  title: string;
  description: string;
}

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    step: '1',
    title: 'Review & Discovery',
    description: 'We review your idea, understand your target audience, and outline the fastest, most cost-effective way to build it.',
  },
  {
    step: '2',
    title: 'Clear Plan & Fixed Quote',
    description: 'You receive a straightforward proposal with exact deliverables, milestones, and costs—no hidden fees or technical jargon.',
  },
  {
    step: '3',
    title: 'Build & Weekly Updates',
    description: 'We sign an NDA if you wish, begin development immediately, and share live test builds and progress demos every week.',
  },
];

/**
 * TransmissionProtocol - 3-step project onboarding workflow.
 * Single Responsibility: Presenting the steps that happen after a client submits an inquiry in friendly, human terms.
 */
export const TransmissionProtocol: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-surface-container/60 border border-border-glass text-left shadow-md">
      <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-5 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-tertiary" />
        <span>What Happens Next?</span>
      </h3>

      <div className="space-y-4 text-xs">
        {PROTOCOL_STEPS.map((s) => (
          <div key={s.step} className="flex gap-3.5 items-start">
            <span className="w-6 h-6 rounded-full font-bold flex items-center justify-center flex-shrink-0 bg-tertiary/15 text-tertiary border border-tertiary/30 font-mono text-[11px] mt-0.5">
              {s.step}
            </span>
            <div>
              <span className="font-bold text-white text-[13px] block mb-0.5">{s.title}</span>
              <p className="text-text-muted leading-relaxed font-body-sm text-[12px]">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
