import React from 'react';
import { Clock, ShieldCheck, Users } from 'lucide-react';
import { useLiveClock } from '../../hooks/useLiveClock';

/**
 * ContactHero - Intake hero with friendly, welcoming messaging and live response guarantee.
 * Single Responsibility: Presenting the contact hero and clear response promises.
 */
export const ContactHero: React.FC = () => {
  const karachiTime = useLiveClock('Asia/Karachi');

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-10 max-w-7xl mx-auto w-full text-left">
      <div className="flex flex-col items-start gap-4">
        
        {/* Eyebrow Pill with Live Clock */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-deep/80 border border-tertiary/30 text-xs font-mono text-tertiary backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
          <span className="font-semibold">READY TO BUILD · DIRECT DEVELOPER CONTACT</span>
          <span className="text-outline-variant">|</span>
          <span className="text-text-primary font-bold">PKT {karachiTime || 'LIVE'}</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight max-w-4xl">
          Let’s Build Something{' '}
          <span className="bg-gradient-to-r from-tertiary via-primary to-accent-violet bg-clip-text text-transparent">
            Great Together.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
          Have an app idea, need a high-performance website, or want to explore AI automation? Share your vision below or message us directly. We review every request and reply within 24 hours.
        </p>

        {/* Reassurance Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-4">
          <div className="p-4 rounded-xl bg-surface-deep/60 border border-border-glass flex items-center gap-3">
            <Clock className="w-5 h-5 text-tertiary shrink-0" />
            <div>
              <span className="text-[11px] text-text-muted block uppercase font-mono">Response Time</span>
              <span className="text-xs font-bold text-white">Guaranteed within 24 Hours</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-deep/60 border border-border-glass flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <div>
              <span className="text-[11px] text-text-muted block uppercase font-mono">Privacy First</span>
              <span className="text-xs font-bold text-white">NDA Available on Request</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-deep/60 border border-border-glass flex items-center gap-3">
            <Users className="w-5 h-5 text-accent-violet shrink-0" />
            <div>
              <span className="text-[11px] text-text-muted block uppercase font-mono">No Middlemen</span>
              <span className="text-xs font-bold text-white">Direct Lead Developer Access</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
