import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StudioLogoMark } from '../brand/StudioLogo';

interface HomeIntroLoaderProps {
  onComplete?: () => void;
}

/**
 * HomeIntroLoader - Single-pass architectural shutter preloader inspired by FarTechDev.
 * Renders the 2D Psi Monolith mark, then smoothly lifts up once to reveal the homepage.
 * Guaranteed zero scrollbar layout-shift and zero double-animation.
 */
export const HomeIntroLoader: React.FC<HomeIntroLoaderProps> = ({ onComplete }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const startTime = Date.now();
    const duration = 1000; // Snappy 1s simulated loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Small pause at 100% then slide up smoothly
        setTimeout(() => {
          setIsSliding(true);
          if (onComplete) onComplete();
        }, 120);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Once dismissed, do not render anything
  if (isDismissed) return null;

  return (
    <motion.div
      key="home-intro-curtain"
      initial={{ y: 0 }}
      animate={{ y: isSliding ? '-100%' : 0 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Smooth momentum shutter lift
      }}
      onAnimationComplete={() => {
        if (isSliding) {
          setIsDismissed(true);
        }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080C14] select-none overflow-hidden touch-none pointer-events-auto"
      style={{ willChange: 'transform' }}
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

      {/* Brand Mark and Title Container */}
      <motion.div
        animate={{
          opacity: isSliding ? 0 : 1,
          y: isSliding ? -60 : 0,
        }}
        transition={{
          duration: 0.5,
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
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_8px_#00F2FE] transition-all duration-75"
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
  );
};
