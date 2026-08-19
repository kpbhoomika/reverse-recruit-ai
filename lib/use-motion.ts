"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Checks if the user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}

/**
 * Scroll reveal hook that attaches an IntersectionObserver directly to an element.
 * Fires strictly ONCE per element, unobserves immediately to prevent ghosting/re-triggering,
 * and respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if already in viewport on mount
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Crucial root-cause fix: unobserve immediately so it fires exactly ONCE
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, prefersReduced]);

  return { ref, isVisible };
}

/**
 * Animated counter that counts from 0 to target value once when scrolled into view.
 * Over ~800ms with cubic ease-out.
 */
export function useCounter(
  target: number,
  isVisible: boolean,
  duration = 800
): number {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }

    if (!isVisible || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, isVisible, duration, prefersReduced]);

  return prefersReduced ? target : count;
}
