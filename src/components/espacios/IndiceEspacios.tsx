"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { useSeccionActiva } from "./useSeccionActiva";

/**
 * The six anchors live inside a scroller (`overflow-x-auto`), and an
 * overflow container clips anything a descendant paints OUTSIDE its border box
 * — a `ring` + `ring-offset` sits 3px outside, so the focus indicator was being
 * cut away on every one of them. An INSET indicator is drawn inside the box and
 * survives the clip. #153124 on sand #dbcb98 is 8.7:1.
 */
const ANILLO_INTERNO =
  "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_#153124]";

const ITEMS = [
  { id: "tipologias", n: "01", label: "Tipologías" },
  { id: "planta", n: "02", label: "La planta" },
  { id: "interior", n: "03", label: "El interior" },
  { id: "acabados", n: "04", label: "Acabados" },
  { id: "corte", n: "05", label: "El corte" },
  { id: "visita", n: "06", label: "Visita" },
] as const;

/**
 * The ruler of the page. Six native anchors — they work unhydrated and respect
 * the user's scroll preferences — plus the reading position and a progress rule.
 *
 * z-40: under the navbar (z-50) so the open hamburger menu is never covered,
 * over the content (z-10), under the lightbox (z-60).
 */
export default function IndiceEspacios() {
  const activa = useSeccionActiva();
  const progresoRef = useRef<HTMLSpanElement>(null);

  // The only scroll listener on the whole page: one passive read per frame,
  // written straight to a custom property so React never re-renders for it.
  useEffect(() => {
    let frame = 0;

    const escribir = () => {
      frame = 0;
      const alcance = document.documentElement.scrollHeight - window.innerHeight;
      const p = alcance > 0 ? Math.min(1, Math.max(0, window.scrollY / alcance)) : 0;
      progresoRef.current?.style.setProperty("--p", String(p));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(escribir);
    };

    escribir();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Índice de la página"
      // -mt-px kills the sub-pixel seam between the navbar and this bar.
      // Opaque sand, not a translucent blur: full-bleed photographs pass behind it.
      className="sticky top-[var(--nav-h)] z-40 -mt-px border-y border-[#5c4a2c]/20 bg-[#dbcb98]"
    >
      <span
        ref={progresoRef}
        aria-hidden
        style={{ "--p": 0 } as CSSProperties}
        // #4a3e26 and not #8a7238, for the same reason the labels are brown:
        // gold on this sand is 2.9:1 and the rule was all but invisible.
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[var(--p)] bg-[#4a3e26] transition-transform duration-150"
      />

      <div className="mx-auto flex h-11 max-w-[1440px] items-center px-6 md:px-10 lg:px-16">
        <ol className="no-scrollbar flex h-11 flex-1 snap-x items-center overflow-x-auto">
          {ITEMS.map((item, i) => {
            const activo = activa === item.id;
            // first:/last: would be read against the <li>, whose only child is
            // this anchor — every cell would match and the whole rule of
            // separators would disappear. The position is decided here instead.
            const primero = i === 0;
            const ultimo = i === ITEMS.length - 1;
            return (
              <li key={item.id} className="flex h-11 shrink-0 snap-start">
                <a
                  href={`#${item.id}`}
                  aria-current={activo ? "true" : undefined}
                  className={`relative flex h-11 shrink-0 items-center gap-2 transition-colors ${ANILLO_INTERNO} ${
                    primero ? "pr-4 lg:pr-6" : "px-4 lg:px-6"
                  } ${ultimo ? "" : "border-r border-[#5c4a2c]/20"} ${
                    activo ? "text-[#153124]" : "text-[#4a3e26] hover:text-[#153124]"
                  }`}
                >
                  {/* Brown, never gold, and never faded: this bar rides on sand
                      #dbcb98, where #8a7238 is 2.9:1 and #5c4a2c/60 is 2.5:1.
                      #4a3e26 at full opacity gives 6.7:1 — the active state is
                      carried by the rule underneath and by aria-current, not by
                      a contrast difference that fails AA on both sides. */}
                  <span
                    className={`font-serif text-[11px] tabular-nums ${
                      activo ? "text-[#153124]" : "text-[#4a3e26]"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                  {activo && (
                    <span
                      aria-hidden
                      className={`absolute bottom-0 h-[2px] bg-[#153124] ${
                        primero ? "left-0 right-4" : "inset-x-4"
                      }`}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ol>

        {/* Hidden under sm: that action lives in the fixed mobile bar instead. */}
        <Link
          href="/contacto"
          className="ml-auto hidden h-11 shrink-0 items-center bg-[#153124] px-5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-[#0f2419] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#153124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#dbcb98] sm:flex"
        >
          Agendar visita
        </Link>
      </div>
    </nav>
  );
}
