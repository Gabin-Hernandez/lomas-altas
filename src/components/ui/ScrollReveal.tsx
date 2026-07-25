"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getVariantStyles = () => {
    if (!isVisible) {
      switch (variant) {
        case "fade-up":
          return "opacity-0 translate-y-10";
        case "fade-in":
          return "opacity-0";
        case "scale-up":
          return "opacity-0 scale-95 translate-y-4";
        case "slide-left":
          return "opacity-0 -translate-x-10";
        case "slide-right":
          return "opacity-0 translate-x-10";
        default:
          return "opacity-0 translate-y-10";
      }
    }
    return "opacity-100 translate-y-0 translate-x-0 scale-100";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out duration-700 ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
