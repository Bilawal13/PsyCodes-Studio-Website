import React, { useState, useRef, useEffect } from 'react';
import { Bolt, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

/**
 * HomeEthosSection - Editorial piece outlining studio philosophy and engineering standards.
 * Single Responsibility: Presenting the founder manifesto, credentials, and studio ethos pillars.
 */
export const HomeEthosSection: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDegrees, setSpinDegrees] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAvatarClick = () => {
    setIsSpinning(true);
    setSpinDegrees((prev) => prev - 1440);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsSpinning(false);
    }, 850);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return (
    <section className="w-full px-gutter lg:px-margin py-24 bg-surface-container-lowest/40 relative border-t border-border-glass" id="ethos">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Manifesto & Founder Quote Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SectionHeading
            eyebrow="STUDIO ETHOS"
            title={
              <>
                Calculated Precision.<br />
                <span className="bg-gradient-to-r from-tertiary to-secondary bg-clip-text text-transparent">
                  No Bureaucracy.
                </span>
              </>
            }
            description="Traditional digital agencies drown projects in account managers, prolonged committee meetings, and inflated overhead. At PsyCodes Studio, you collaborate directly with the software engineers and designers who write the code and ship the pixels."
          />

          {/* Studio Founder Quote Card */}
          <div className="p-5 rounded-2xl bg-surface-deep/90 shadow-md border border-border-glass">
            <p className="font-body-sm text-body-sm italic text-on-surface-variant">
              "We treat software engineering like modern craftsmanship. Whether it is a mathematical calorie tracker, a cozy indie game, or an autonomous AI agent, every edge is honed."
            </p>
            <div className="mt-4 flex items-center gap-3 [perspective:1000px]">
              <div 
                onClick={handleAvatarClick}
                role="button"
                tabIndex={0}
                title="Click to spin!"
                aria-label="Click to 3D spin Bilawal Feroze profile photo"
                style={{
                  transform: `perspective(1000px) rotateY(${spinDegrees}deg) scale(${isSpinning ? 1.15 : 1})`,
                  transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                className="relative p-[1.5px] rounded-full overflow-hidden shadow-[0_0_15px_rgba(24,217,246,0.35)] flex-shrink-0 bg-surface-deep cursor-pointer select-none active:scale-95"
              >
                <div 
                  className="absolute top-1/2 left-1/2 w-[300%] h-[300%] pointer-events-none animate-border-beam"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg 180deg, rgba(24,217,246,0.2) 240deg, #18d9f6 320deg, #ffffff 360deg)'
                  }}
                />
                <div className="relative w-11 h-11 rounded-full overflow-hidden">
                  <img
                    src="/assets/founder/bilawal_feroze.jpg"
                    alt="Bilawal Feroze"
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </div>
              </div>
              <div>
                <div className="font-button-text text-button-text text-text-primary">Bilawal Feroze</div>
                <div className="font-label-code text-[11px] text-tertiary font-mono">Founder &amp; Principal Architect · Karachi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 4 Ethos Value Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-surface-deep/70 shadow-sm flex flex-col gap-3 border border-border-glass">
            <Bolt className="w-8 h-8 text-tertiary" />
            <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">Innovation First</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              We don't settle for legacy, sluggish workflows. We engineer across modern native and cross-platform mobile frameworks, next-gen game engines, sovereign AI architectures, and scalable cloud patterns for decades of longevity.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-deep/70 shadow-sm flex flex-col gap-3 border border-border-glass">
            <Sparkles className="w-8 h-8 text-secondary" />
            <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">User-Centered Craft</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              Every interaction is tuned to human intuition. We prioritize haptic responsiveness, micro-feedback, and razor-sharp typographic hierarchy.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-deep/70 shadow-sm flex flex-col gap-3 border border-border-glass">
            <Cpu className="w-8 h-8 text-primary" />
            <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">Scalable Architecture</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              Codebases built modularly. You own 100% of your intellectual property, repository commits, design libraries, and infrastructure configurations.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-deep/70 shadow-sm flex flex-col gap-3 border border-border-glass">
            <ShieldCheck className="w-8 h-8 text-tertiary" />
            <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">Direct Senior Access</h3>
            <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
              Zero game of telephone. You receive direct Slack / WhatsApp channels, clear weekly staging builds, and transparent milestone reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
