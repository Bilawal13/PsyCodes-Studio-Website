import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  amount?: number | 'some' | 'all';
}

/**
 * ScrollReveal - Smooth, GPU-accelerated scroll-triggered entrance wrapper.
 * Fades elements smoothly into view with a gentle spatial glide as the user scrolls.
 * Respects OS accessibility preferences (prefers-reduced-motion).
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  yOffset = 28,
  direction = 'up',
  once = true,
  amount = 0.1,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: yOffset, x: 0 };
      case 'down':
        return { y: -yOffset, x: 0 };
      case 'left':
        return { x: yOffset, y: 0 };
      case 'right':
        return { x: -yOffset, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount: amount ?? 0.05,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Silky smooth Apple/Linear ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
