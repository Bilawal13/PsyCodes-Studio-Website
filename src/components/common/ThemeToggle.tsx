import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Bright theme' : 'Switch to Dark theme'}
      title={isDark ? 'Switch to Bright theme' : 'Switch to Dark theme'}
      className={`group relative flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-xl border transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
        isDark
          ? 'bg-surface-container-high/80 hover:bg-surface-container-highest border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 shadow-[0_0_14px_rgba(0,242,254,0.12)] hover:shadow-[0_0_20px_rgba(0,242,254,0.25)]'
          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-cyan-500/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(2,132,199,0.15)]'
      } ${className}`}
    >
      {/* Icon with smooth flip & scale transition */}
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-icon"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center text-cyan-400"
            >
              <Moon className="w-4 h-4 fill-cyan-400/20" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-icon"
              initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center text-amber-500"
            >
              <Sun className="w-4 h-4 fill-amber-500/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Optional Mode Label / State Text */}
      {showLabel ? (
        <span className="font-mono text-xs tracking-wider uppercase font-semibold text-text-primary">
          {isDark ? 'Dark' : 'Bright'}
        </span>
      ) : (
        <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase font-medium text-text-muted group-hover:text-text-primary transition-colors">
          {isDark ? 'DARK' : 'BRIGHT'}
        </span>
      )}

      {/* Micro-glow indicator pill */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors ${
          isDark ? 'bg-cyan-400 shadow-[0_0_6px_#00F2FE]' : 'bg-amber-500 shadow-[0_0_6px_#F59E0B]'
        }`}
      />
    </button>
  );
};
