import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * useLenisScroll - Delivers responsive, high-performance momentum scrolling.
 * - Zero input latency (instant response via lerp instead of laggy duration curve).
 * - Authoritative speed limit on mouse wheel impulses via virtualScroll clamp.
 * - Zero scrollbar dragging glitch: detects scrollbar interaction and syncs instantly without fighting native thumbs.
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
      lerp: prefersReducedMotion ? 1 : 0.09, // Instant frame-0 response with buttery smooth deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.85, // Refined multiplier preventing uncontrolled runaway jumps
      touchMultiplier: 1, // Native touch feeling
      syncTouch: false, // Let mobile touch gestures run at native 120Hz
      infinite: false,
      autoResize: true,
      virtualScroll: (data) => {
        // Enforce strict speed limit on mouse wheel ticks
        const MAX_WHEEL_DELTA = 90; // Pixels per wheel impulse limit
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

    // Prevent Scrollbar Dragging Jitter/Glitch:
    // When the user clicks or drags on the right scrollbar track/thumb,
    // temporarily pause smoothing so the browser native scrollbar moves instantly without fighting Lenis.
    let isDraggingScrollbar = false;

    const handlePointerDown = (e: PointerEvent) => {
      // If click happens on or near the native scrollbar (right margin of window)
      const isNearScrollbar = e.clientX >= document.documentElement.clientWidth - 16;
      if (isNearScrollbar) {
        isDraggingScrollbar = true;
        lenis.stop();
        lenis.scrollTo(window.scrollY, { immediate: true });
      }
    };

    const handlePointerUp = () => {
      if (isDraggingScrollbar) {
        isDraggingScrollbar = false;
        lenis.scrollTo(window.scrollY, { immediate: true });
        lenis.start();
      }
    };

    // If native scroll deviates significantly (e.g., page-up/down key, scrollbar jump),
    // sync Lenis immediately so it doesn't fight back
    const handleNativeScroll = () => {
      if (isDraggingScrollbar || (lenis.isScrolling && lenis.isScrolling !== 'native')) {
        const diff = Math.abs(window.scrollY - lenis.animatedScroll);
        if (diff > 25) {
          lenis.scrollTo(window.scrollY, { immediate: true });
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
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
