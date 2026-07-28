"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type Variant = "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";

interface SafeRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}

const HIDDEN: Record<Variant, string> = {
  "fade-up": "opacity-0 translate-y-10",
  "fade-in": "opacity-0",
  "scale-up": "opacity-0 scale-95 translate-y-4",
  "slide-left": "opacity-0 -translate-x-10",
  "slide-right": "opacity-0 translate-x-10",
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True when animating would be wrong or impossible, so the content must start visible. */
function getSnapshot() {
  return (
    window.matchMedia(REDUCED_MOTION).matches || typeof IntersectionObserver === "undefined"
  );
}

/** The server has no media queries; it always renders the pre-animation state. */
function getServerSnapshot() {
  return false;
}

/**
 * Scroll reveal that can never strand its content invisible.
 *
 * ScrollReveal starts at opacity-0 and only clears once IntersectionObserver fires.
 * If the observer never runs - no IO support, JS error upstream, or an element that
 * was already on screen when the page landed on a deep anchor - the content stays
 * hidden forever. That is survivable for decoration and unacceptable for a form or a
 * phone number, so this variant skips the animation outright when it would be wrong,
 * and keeps a timer as a last-resort release.
 */
export default function SafeReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
}: SafeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const skipAnimation = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (skipAnimation) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(element);

    // Safety net: whatever happened, the content is on screen after 1.2s.
    const release = window.setTimeout(() => setRevealed(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(release);
    };
  }, [skipAnimation]);

  const visible = revealed || skipAnimation;

  return (
    <div
      ref={ref}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
      className={`transition-all ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
