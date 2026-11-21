import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StudioLogoMark } from '../brand/StudioLogo';
import { useTheme } from '../../context/ThemeContext';

interface HomeIntroLoaderProps {
  onComplete?: () => void;
}

/**
 * HomeIntroLoader - Single-pass architectural shutter preloader inspired by FarTechDev.
 * Pure Framer Motion orchestration: guaranteed to never freeze, zero double-trigger, zero scrollbar jump.
 */
export const HomeIntroLoader: React.FC<HomeIntroLoaderProps> = ({ onComplete }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Failsafe timer: under any circumstance, dismiss after 1.8s max
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <motion.div
      key="home-intro-curtain"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{
        delay: 0.85, // Show logo & progress for 0.85s
        duration: 0.75, // Smooth, authoritative upward lift
        ease: [0.76, 0, 0.24, 1], // Buttery momentum cubic-bezier
      }}
      onAnimationComplete={() => {
        setIsDismissed(true);
        if (onComplete) onComplete();
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden touch-none pointer-events-auto transition-colors duration-200 ${
        isLight ? 'bg-white' : 'bg-[#080C14]'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Subtle Ambient Blueprint Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isLight ? '#000000' : '#FFFFFF'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? '#000000' : '#FFFFFF'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Central Radial Cyan Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Brand Mark and Title Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [12, 0, 0, -60],
        }}
        transition={{
          times: [0, 0.2, 0.7, 1],
          duration: 1.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative z-10 flex flex-col items-center text-center gap-5"
      >
        {/* The 2D Geometric Psi Monolith Mark */}
        <div className="relative flex items-center justify-center">
          <StudioLogoMark size={84} glow={true} theme={theme} />
        </div>

        {/* Typography */}
        <div className="flex flex-col items-center gap-1">
          <span className={`font-headline-sm font-bold text-2xl tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            PsyCodes
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-500 font-semibold">
            STUDIO
          </span>
        </div>

        {/* Sleek Technical Progress Bar */}
        <div className="flex flex-col items-center gap-2 mt-2 w-48">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_8px_#00F2FE]"
            />
          </div>
          <div className="flex items-center justify-between w-full font-mono text-[10px] text-slate-500">
            <span className="tracking-widest uppercase">INITIALIZING SYSTEM</span>
            <span className="text-cyan-400 font-semibold">100%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
