import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioLogoMark } from '../brand/StudioLogo';

interface HomeIntroLoaderProps {
  onComplete?: () => void;
}

/**
 * HomeIntroLoader - Cinematic architectural preloader inspired by FarTechDev.
 * Renders the new 2D Psi Monolith mark, then smoothly glides upward while the homepage content fades in.
 */
export const HomeIntroLoader: React.FC<HomeIntroLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loading' | 'sliding' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  // Lock body scroll while intro is playing
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Smooth numeric counter 0 -> 100%
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s load simulation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Brief pause at 100% before smooth slide-up
        setTimeout(() => {
          setPhase('sliding');
          // Signal homepage to start fading in simultaneously
          if (onComplete) onComplete();
        }, 150);

        // Complete unmount after shutter finishes sliding up
        setTimeout(() => {
          setPhase('done');
          document.body.style.overflow = '';
        }, 1100);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="home-intro-shutter"
          initial={{ y: 0 }}
          animate={{
            y: phase === 'sliding' ? '-100%' : 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier for buttery momentum lift
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080C14] pointer-events-auto select-none overflow-hidden"
        >
          {/* Subtle Ambient Blueprint Grid Lines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Central Radial Cyan Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Brand Mark and Title Container (Smoothly floats up and fades out) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{
              opacity: phase === 'sliding' ? 0 : 1,
              scale: 1,
              y: phase === 'sliding' ? -80 : 0,
            }}
            transition={{
              duration: phase === 'sliding' ? 0.6 : 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative z-10 flex flex-col items-center text-center gap-5"
          >
            {/* The 2D Geometric Psi Monolith Mark */}
            <div className="relative flex items-center justify-center">
              <StudioLogoMark size={84} glow={true} />
            </div>

            {/* Typography */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-headline-sm font-bold text-2xl tracking-tight text-white">
                PsyCodes
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-medium">
                STUDIO
              </span>
            </div>

            {/* Sleek Technical Progress Bar & Counter */}
            <div className="flex flex-col items-center gap-2 mt-2 w-48">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_8px_#00F2FE]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between w-full font-mono text-[10px] text-slate-500">
                <span className="tracking-widest uppercase">SYSTEM ENGINE</span>
                <span className="text-cyan-400 font-semibold">{progress}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
