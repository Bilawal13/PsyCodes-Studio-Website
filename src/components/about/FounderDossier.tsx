import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Github, Linkedin, Instagram, Sparkles } from 'lucide-react';

/**
 * FounderDossier - Lead Architect profile and engineering manifesto.
 * Single Responsibility: Presenting Bilawal Feroze's background, credentials, and studio philosophy.
 */
export const FounderDossier: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDegrees, setSpinDegrees] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAvatarClick = () => {
    // 1. Maintain or immediately activate enlarged scale while user presses
    setIsSpinning(true);

    // 2. Add 4 full rapid 3D revolutions left-to-right (-1440deg) on every click
    setSpinDegrees((prev) => prev - 1440);

    // 3. Reset debounced timer so size remains enlarged while button is clicked repeatedly
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 4. Smoothly scale back to normal only after pressing stops
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="rounded-3xl bg-gradient-to-br from-surface-container/90 via-surface-deep/95 to-surface-container/90 border border-border-glass p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden text-left shadow-2xl">
        {/* Subtle Ambient background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Founder Avatar & Details */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div 
              className={`relative mb-6 [perspective:1200px] transition-transform duration-300 ease-out ${
                isSpinning ? 'scale-110 sm:scale-115' : 'scale-100'
              }`}
            >
              {/* Ambient Radial Cyan Glow Layer - amplifies while active */}
              <div 
                className={`absolute -inset-2 rounded-[28px] bg-gradient-to-r from-cyan-400/35 via-primary/25 to-tertiary/35 blur-xl pointer-events-none transition-opacity duration-300 ${
                  isSpinning ? 'opacity-100' : 'opacity-80'
                }`} 
              />

              {/* 360° Rotating Perimeter Light Frame with Continuous 3D Left-to-Right Spin */}
              <div 
                onClick={handleAvatarClick}
                role="button"
                tabIndex={0}
                title="Click to spin!"
                aria-label="Click to 3D spin Bilawal Feroze profile photo"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAvatarClick();
                  }
                }}
                style={{
                  transform: `perspective(1000px) rotateY(${spinDegrees}deg)`,
                  transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                className="relative p-[2.5px] rounded-[26px] overflow-hidden shadow-[0_0_35px_rgba(24,217,246,0.35)] group bg-surface-deep cursor-pointer select-none active:scale-95 hover:shadow-[0_0_45px_rgba(24,217,246,0.5)] transition-shadow"
              >
                {/* Continuous 360° Rotating Electric Cyan Light Beam */}
                <div 
                  className="absolute top-1/2 left-1/2 w-[300%] h-[300%] pointer-events-none animate-border-beam"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg 180deg, rgba(24,217,246,0.15) 240deg, rgba(24,217,246,0.55) 290deg, #18d9f6 330deg, #a4eeff 355deg, #ffffff 360deg)'
                  }}
                />

                {/* Underlying subtle border track */}
                <div className="absolute inset-0 rounded-[26px] border border-cyan-400/25 pointer-events-none" />

                {/* Inner Portrait Canvas */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[23px] bg-surface-deep overflow-hidden">
                  <img
                    src="/assets/founder/bilawal_feroze.jpg"
                    alt="Bilawal Feroze · Founder & Principal Architect"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Founder Verified Badge - Positioned cleanly on top without interrupting the beam's 360° path */}
              <div className="absolute -bottom-2 -right-2 z-20 px-3 py-1 rounded-full bg-surface-deep/95 border border-cyan-400 text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(24,217,246,0.4)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                FOUNDER
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Karachi, Pakistan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Bilawal Feroze
            </h2>
            <p className="text-sm font-mono text-text-muted mt-1 mb-4">
              Software Architect · Game Systems Engineer · Autonomous AI Builder
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/bilawalferoze"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-surface-deep border border-border-glass hover:border-cyan-400 text-text-muted hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/bilawalferoze"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-surface-deep border border-border-glass hover:border-blue-400 text-text-muted hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/psycodestudio"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-surface-deep border border-border-glass hover:border-purple-400 text-text-muted hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Founder Ethos & Quote */}
          <div className="lg:col-span-7 space-y-6">
            <blockquote className="text-lg sm:text-xl font-medium text-blue-200 italic leading-relaxed border-l-2 border-cyan-400/50 pl-5">
              “No account managers, no layers of bureaucratic telephone. You collaborate directly with senior
              architects who translate ambitious vision into robust, scalable, production-grade applications.”
            </blockquote>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              As an engineer who has bridged the worlds of low-latency game engines, deterministic state machines, and
              high-throughput cloud microservices, I established PsyCodes Studio to provide founders and businesses
              with direct, senior-level architectural execution. Every system we ship is built for production resilience,
              flawless tactile responsiveness, and sustainable long-term scale.
            </p>

            {/* Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-surface-deep/60 border border-border-glass">
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                  2026.Q2 · FLAGSHIP APPS
                </span>
                <span className="text-sm font-bold text-white block">
                  FitLyfe &amp; Hot Cocoa Run
                </span>
                <span className="text-xs text-text-muted block mt-1">
                  Shipped offline-first workout tracking suite and instant browser WebGL endless runner.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-deep/60 border border-border-glass">
                <span className="text-[10px] font-mono text-purple-400 block mb-1">
                  2026.Q3 · ENTERPRISE AI
                </span>
                <span className="text-sm font-bold text-white block">
                  Autonomous Client Deployments
                </span>
                <span className="text-xs text-text-muted block mt-1">
                  Commissioned multi-agent RAG workflow pipelines and bespoke SaaS platforms with zero tech debt.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
