"use client";

import { Fragment, useEffect, useState } from "react";
import { CUADERNOS, TOTAL_LAMINAS, type CuadernoId } from "@/lib/galeria";
import { useVisor } from "./VisorProvider";

/**
 * The page's only persistent chrome. It is placed in the flow after the Sumario, so it
 * only pins under the navbar once the reader has already scrolled — no stacked bars on
 * first paint, no sentinel needed. The items are real anchors: scroll-spy is highlight
 * only and the navigation survives with JavaScript disabled.
 */
export default function BarraCuadernos() {
  const [activo, setActivo] = useState<CuadernoId>("01");
  const { abrir } = useVisor();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const secciones = CUADERNOS.map((cuaderno) =>
      document.getElementById(`cuaderno-${cuaderno.id}`)
    ).filter((elemento): elemento is HTMLElement => elemento !== null);

    if (secciones.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        // When nothing intersects we keep the last active one: notebook 04 is short and
        // with this rootMargin it could otherwise never light up.
        if (!visible) return;
        setActivo(visible.target.id.replace("cuaderno-", "") as CuadernoId);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    secciones.forEach((seccion) => observer.observe(seccion));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Cuadernos"
      className="sticky top-[var(--nav-h)] z-30 border-y border-[#c4a96a]/25 bg-[#153124]/95 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
    >
      <div className="relative mx-auto flex h-12 max-w-[1600px] items-center justify-between px-6 md:h-14 md:px-10 lg:px-16">
        <div
          tabIndex={-1}
          className="no-scrollbar -mx-6 flex snap-x items-center overflow-x-auto px-6 md:mx-0 md:px-0"
        >
          {CUADERNOS.map((cuaderno, indice) => {
            const esActivo = cuaderno.id === activo;
            return (
              <Fragment key={cuaderno.id}>
                {indice > 0 && <span aria-hidden className="h-4 w-px shrink-0 bg-white/[0.12]" />}
                <a
                  href={`#cuaderno-${cuaderno.id}`}
                  aria-current={esActivo ? "true" : undefined}
                  className="relative flex min-h-11 shrink-0 snap-start items-center gap-2 px-3 py-3.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#153124] md:px-5"
                >
                  <span
                    className={`font-serif text-[11px] tracking-[0.12em] transition-colors duration-300 ${
                      // /70 read 3.8:1 on #153124. /85 still dims the inactive item and
                      // clears 4.5:1 — the active one is carried by the label and the rule.
                      esActivo ? "text-[#c4a96a]" : "text-[#c4a96a]/85"
                    }`}
                  >
                    {cuaderno.id}
                  </span>
                  <span
                    className={`whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:text-[11px] ${
                      esActivo ? "text-white" : "text-white/60"
                    }`}
                  >
                    {cuaderno.titulo}
                  </span>
                  {esActivo && (
                    <span aria-hidden className="absolute inset-x-3 -bottom-px h-[2px] bg-[#c4a96a]" />
                  )}
                </a>
              </Fragment>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/60">
            {TOTAL_LAMINAS} láminas
          </span>
          {/* The rule hugs the label, but the hit area fills the bar: a 20px-tall
              target is too small for the tablets that see this md+ branch. */}
          <button
            type="button"
            onClick={() => abrir("01")}
            aria-haspopup="dialog"
            // "Ver todas" alone says nothing out of context; the visible text stays the
            // prefix of the name so Label in Name still holds.
            aria-label={`Ver todas las ${TOTAL_LAMINAS} láminas en el visor`}
            className="group/todas inline-flex min-h-11 items-center font-sans text-[10px] uppercase tracking-[0.2em] text-[#decd98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#153124]"
          >
            <span className="border-b border-[#c4a96a]/50 pb-0.5 transition-colors group-hover/todas:border-[#c4a96a]">
              Ver todas
            </span>
          </button>
        </div>

        {/* Cut-off hint for the horizontal scroller on phones */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#153124] to-transparent md:hidden"
        />
      </div>
    </nav>
  );
}
