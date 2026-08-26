"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  src: string;
  alt: string;
  /** Shown above the frame, in serif gold. */
  title?: string;
  /** Caption line under the frame — the plate/epigraph of an architecture monograph. */
  caption?: string;
  /**
   * Backdrop painted behind the frame. `cream` is for cut-out PNGs (edif1) and
   * light diagrams (render, estructura) that would otherwise float on black.
   */
  plate?: "dark" | "cream";
}

interface LightboxProps {
  items: LightboxItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}

/** Keeps Tab inside the dialog while it is open. */
const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export default function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = index !== null && index >= 0 && index < items.length;
  const total = items.length;

  const goTo = useCallback(
    (delta: number) => {
      if (index === null || total < 2) return;
      onIndexChange((index + delta + total) % total);
    },
    [index, total, onIndexChange]
  );

  // Scroll lock + focus handover. Restores whatever the page had before opening.
  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, goTo, onClose]);

  if (!isOpen) return null;

  const item = items[index];
  const onCream = item.plate === "cream";
  const position = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b1710]/95 backdrop-blur-md px-4 py-6 sm:px-8 sm:py-10 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.title ?? item.alt}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative flex w-full max-w-6xl flex-col items-center outline-none"
      >
        {/* Top bar: counter, title, close */}
        <div className="mb-4 flex w-full items-center gap-4 sm:gap-6">
          <span className="font-sans text-[11px] tracking-[0.25em] text-white/45 tabular-nums">
            {position} <span className="text-white/25">/ {count}</span>
          </span>
          <span aria-hidden className="h-px flex-1 bg-white/15" />
          {item.title && (
            <span className="hidden font-serif text-base tracking-wide text-gold-light sm:block">
              {item.title}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar (Esc)"
            className="shrink-0 border border-white/20 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Cerrar
          </button>
        </div>

        {/* Frame */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-sm border shadow-2xl",
            "h-[58vh] sm:h-[68vh]",
            onCream ? "border-[#5c4a2c]/15 bg-cream" : "border-white/10 bg-black/40"
          )}
        >
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            unoptimized
            className="object-contain animate-fade-in"
            priority
          />
        </div>

        {/* Caption + navigation */}
        <div className="mt-4 flex w-full items-start gap-4 sm:gap-6">
          <div className="min-h-[2.5rem] flex-1">
            {item.title && (
              <p className="font-serif text-base text-gold-light sm:hidden">{item.title}</p>
            )}
            {item.caption && (
              <p className="max-w-xl font-sans text-xs font-light leading-relaxed text-white/60">
                {item.caption}
              </p>
            )}
          </div>

          {total > 1 && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Imagen anterior"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5 7.5 12l7.5-7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="Imagen siguiente"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
