import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * useLenisScroll - Delivers responsive, high-performance momentum scrolling.
 * - Instant frame-0 response via lerp (zero input lag).
 * - Authoritative speed limit on mouse wheel impulses via virtualScroll clamp.
 * - Zero scrollbar disappearing or glitching: seamlessly synchronizes with native scrollbar drags without stopping or clipping overflow.
 * - Native 120Hz gesture passthrough on touch devices.
 */
export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis with lerp for immediate response (no sluggish duration lag)
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1, // Responsive linear interpolation (frame-0 instant response)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.75, // Governed multiplier for controlled, refined scroll speed
      touchMultiplier: 1, // 1:1 touch
      syncTouch: false, // Let mobile touch gestures run at native 120Hz without artificial interception
      infinite: false,
      autoResize: true,
      virtualScroll: (data) => {
        // Enforce strict speed limit on mouse wheel ticks (caps rapid flings)
        const MAX_WHEEL_DELTA = 75; // Pixels per wheel impulse limit
        if (Math.abs(data.deltaY) > MAX_WHEEL_DELTA) {
          data.deltaY = Math.sign(data.deltaY) * MAX_WHEEL_DELTA;
        }
        return true;
      },
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Seamless Native Scrollbar Sync:
    // When the user drags the native scrollbar, clicks the scrollbar track, or uses keyboard navigation,
    // immediately synchronize Lenis so it never fights native scroll and NEVER hides or clips the scrollbar.
    const handleNativeScroll = () => {
      if (Math.abs(window.scrollY - lenis.animatedScroll) > 15) {
        lenis.scrollTo(window.scrollY, { immediate: true });
      }
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleNativeScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Instant scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return lenisRef;
}
