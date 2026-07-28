"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { ESTANCIAS, FIGURA_PLANTA } from "./espaciosData";
import { useReducedMotion } from "./useReducedMotion";

const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#153124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#dbcb98]";

/**
 * 02 · The floor plan, walked point by point.
 *
 * THERE IS NO MODEL SELECTOR HERE, ON PURPOSE. The four typologies share a
 * single drawing file. Four tabs showing the same image is the easiest lie on
 * the page to catch, and it would happen at the exact moment of decision. The
 * plan is presented as what it is — the type plan, common to all four — and the
 * differences live in the table of section 01 and the section drawing of 05,
 * where the data actually exists. If per-model plans ever arrive, add an `img`
 * field to TIPOLOGIAS and a tablist over this column; nothing else changes.
 *
 * The sand paper is structural, not decorative: #dbcb98 is the sampled
 * background of render.jpg, so the drawing becomes continuous surface instead
 * of a pasted rectangle. No frame, no shadow, no border.
 *
 * NOTE: neither this section, the plan block nor the sticky column may ever be
 * wrapped in a reveal or given overflow-hidden — a transformed or scroll-clipped
 * ancestor silently kills position:sticky underneath it.
 */
export default function PlantaTipo() {
  const [activa, setActiva] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reducido = useReducedMotion();
  const filasRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const resaltada = hover ?? activa;
  const foco = ESTANCIAS.find((e) => e.n === resaltada) ?? null;
  const detalle = ESTANCIAS.find((e) => e.n === activa) ?? null;

  const alternar = (n: string) => setActiva((previa) => (previa === n ? null : n));

  return (
    <section
      id="planta"
      className="relative w-full scroll-mt-[calc(var(--nav-h)+4rem)] bg-[#dbcb98] py-20 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <SafeReveal variant="fade-up" className="col-span-4 mb-12 md:col-span-12 md:mb-16">
            <CabeceraFolio
              folio="02"
              titulo="La planta"
              acento="recorrida por dentro"
              tone="sand"
              bajada="Una sola planta tipo de 105 m², común a las cuatro tipologías. Toca cualquier punto del plano —o elige una estancia de la lista— para leer de qué se trata."
            />
          </SafeReveal>
        </div>

        <div className="grid grid-cols-4 items-start gap-x-5 md:grid-cols-12 md:gap-x-6">
          {/* SOURCE ORDER = READING ORDER ON PHONES. The plan is the first thing
              on screen under lg, so it is also the first thing in the DOM: with
              the list written first, Tab jumped from the header down past the
              whole drawing to the list and then back up to the markers — a focus
              order that contradicted the visual one (WCAG 2.4.3). On lg the list
              moves back to the left column with lg:order-1 and sticks; both
              columns are on screen at once there, so no jump is involved. */}
          <div className="col-span-4 md:col-span-12 lg:order-2 lg:col-span-8">
            <div className="mx-auto w-full max-w-[560px] lg:max-w-none">
              {/* Frame: this wrapper is exactly the plan box, so the dimension
                  line can hang off its edge without touching the drawing. */}
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute bottom-[8%] left-0 top-[8%] hidden w-px bg-[#a8904f]/50 lg:block"
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-[8%] hidden h-px w-2 -translate-x-1/2 bg-[#a8904f]/50 lg:block"
                />
                <span
                  aria-hidden
                  className="absolute bottom-[8%] left-0 hidden h-px w-2 -translate-x-1/2 bg-[#a8904f]/50 lg:block"
                />
                <span className="absolute -left-1 top-1/2 hidden -translate-y-1/2 rotate-180 bg-[#dbcb98] py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a3e26] [writing-mode:vertical-rl] lg:block">
                  105 m² construidos
                </span>

                {/* THE STRUCTURAL FIX: the positioning box has the file's native
                    ratio (907x1143), so object-contain fills it exactly and every
                    left/top percentage lands on the drawing at any width. This is
                    what replaces the old scale-[1.35] + counter-scale hacks. */}
                <div className="relative aspect-[907/1143] w-full">
                  <Image
                    src="/images/render.jpg"
                    alt="Planta tipo de 105 m² en vista isométrica, con terraza, estancia, comedor, cocina, tres recámaras, estudio, baños, cuarto de lavado, cuarto de servicio y balcón posterior"
                    fill
                    // Measured against the real box, not guessed. From lg the
                    // plan is col-span-8 of the 1440 grid, i.e. 866px at 1440 =
                    // 60vw — the old 46vw made the browser pick a 750px file for
                    // an 866px box and the drawing came out soft. Between 640 and
                    // 1024 the max-w-[560px] cap, not the viewport, sets the size.
                    sizes="(min-width:1024px) 61vw, (min-width:640px) 560px, 92vw"
                    quality={90}
                    loading="lazy"
                    className="object-contain"
                  />

                  {/* Crosshair: geometry, not movement — safe under reduced motion. */}
                  <span
                    aria-hidden
                    style={{ top: `${foco?.y ?? 50}%` }}
                    className={`pointer-events-none absolute inset-x-0 h-px bg-[#a8904f]/45 transition-opacity duration-200 ${
                      foco ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden
                    style={{ left: `${foco?.x ?? 50}%` }}
                    className={`pointer-events-none absolute inset-y-0 w-px bg-[#a8904f]/45 transition-opacity duration-200 ${
                      foco ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {ESTANCIAS.map((e) => {
                    const activo = activa === e.n;
                    const marcado = resaltada === e.n;
                    return (
                      <button
                        key={e.n}
                        type="button"
                        style={{ left: `${e.x}%`, top: `${e.y}%` }}
                        aria-pressed={activo}
                        aria-label={`${e.nombre} — ver detalle`}
                        aria-describedby="epigrafe-planta"
                        onClick={() => alternar(e.n)}
                        onMouseEnter={() => setHover(e.n)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(e.n)}
                        onBlur={() => setHover(null)}
                        onKeyDown={(event) => {
                          if (event.key !== "Escape") return;
                          event.preventDefault();
                          setActiva(null);
                          filasRef.current[e.n]?.focus();
                        }}
                        // p-2.5 around a 24px disc gives a real 44x44 target.
                        // No negative margin: on an absolutely positioned element a
                        // negative margin would shift the anchor and pull the marker
                        // off its room by exactly 10px.
                        className={`group absolute z-20 -translate-x-1/2 -translate-y-1/2 p-2.5 ${ANILLO}`}
                      >
                        <span className="relative flex h-6 w-6 items-center justify-center">
                          {activo && !reducido && (
                            <span
                              aria-hidden
                              className="absolute inset-0 animate-ping border border-[#153223]/60"
                            />
                          )}
                          <span
                            className={`relative flex h-6 w-6 items-center justify-center border font-serif text-[11px] tabular-nums backdrop-blur-[2px] transition-all duration-200 ${
                              activo
                                ? "border-[#153223] bg-[#153223] text-[#decd98]"
                                : `bg-[#fcfcfc]/85 text-[#153223] ${
                                    marcado ? "border-[#153223]" : "border-[#153223]/45"
                                  }`
                            }`}
                          >
                            {e.n}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horizontal dimension line, 3rd and last of the motif. */}
              <div className="mt-5 flex items-center gap-4">
                <span aria-hidden className="h-2.5 w-px bg-[#a8904f]/60" />
                <span aria-hidden className="h-px flex-1 bg-[#a8904f]/60" />
                <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a3e26]">
                  Terraza incluida
                </span>
                <span aria-hidden className="h-px flex-1 bg-[#a8904f]/60" />
                <span aria-hidden className="h-2.5 w-px bg-[#a8904f]/60" />
              </div>

              {/* The old popover is gone: the detail is now the fixed caption panel
                  of the figure. A reserved min-height is mandatory — without it the
                  page jumps on every change of point. */}
              <div
                id="epigrafe-planta"
                aria-live="polite"
                className="mt-6 grid min-h-[168px] grid-cols-1 gap-4 border-t border-[#4a3e26]/30 pt-4 md:min-h-[112px] md:grid-cols-12"
              >
                {detalle ? (
                  <>
                    <div className="md:col-span-4">
                      <span
                        aria-hidden
                        className="block font-serif text-[3.5rem] font-light leading-none text-[#4a3e26]/35"
                      >
                        {detalle.n}
                      </span>
                      <span className="mt-3 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a3e26]">
                        {detalle.tag}
                      </span>
                      <span className="mt-1 block font-sans text-lg font-light text-[#153124] md:text-xl">
                        {detalle.nombre}
                      </span>
                    </div>
                    <p className="font-sans text-[13px] font-light leading-[1.8] text-[#4a3e26] md:col-span-7 md:col-start-6">
                      {detalle.desc}
                    </p>
                  </>
                ) : (
                  <p className="font-sans text-[13px] font-light leading-[1.8] text-[#4a3e26] md:col-span-7 md:col-start-6">
                    Elige un punto del plano, o una estancia de la lista, para leer su descripción.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setLightbox(0)}
                // border /60 and not /40: the outline is the only thing that
                // makes this read as a button, and 1.4.11 asks 3:1 for it.
                // #153124/40 on sand is 2.1:1; /60 is 3.3:1.
                className={`mt-8 border border-[#153124]/60 px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#153124] transition-colors hover:border-[#153124] hover:bg-[#153124] hover:text-[#dbcb98] ${ANILLO}`}
              >
                Ver el plano a pantalla completa
              </button>

              <p className="mt-6 border-t border-[#4a3e26]/30 pt-2.5 text-[10px] leading-[1.6] text-[#4a3e26] md:text-[11px]">
                <span className="font-serif">Fig. 02</span> — Planta tipo del proyecto, común a las
                cuatro tipologías. Imagen ilustrativa: superficies, mobiliario y acabados pueden
                variar respecto al proyecto ejecutivo. Las medidas definitivas se entregan en la
                ficha técnica.
              </p>
            </div>
          </div>

          <div className="col-span-4 mt-14 md:col-span-12 lg:sticky lg:top-[calc(var(--nav-h)+4rem)] lg:order-1 lg:col-span-4 lg:mt-0 lg:self-start">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4a3e26]">
              Las doce estancias
            </p>

            <ol className="mt-5">
              {ESTANCIAS.map((e) => {
                const activo = activa === e.n;
                return (
                  <li key={e.n}>
                    <button
                      type="button"
                      ref={(node) => {
                        filasRef.current[e.n] = node;
                      }}
                      onClick={() => alternar(e.n)}
                      onMouseEnter={() => setHover(e.n)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(e.n)}
                      onBlur={() => setHover(null)}
                      aria-pressed={activo}
                      aria-describedby="epigrafe-planta"
                      className={`group -ml-3 flex w-[calc(100%+0.75rem)] items-baseline gap-4 border-b border-l-2 border-[#4a3e26]/15 py-3 pl-3 text-left transition-colors duration-200 hover:bg-[#4a3e26]/[0.05] ${ANILLO} ${
                        activo ? "border-l-[#153223]" : "border-l-transparent"
                      }`}
                    >
                      {/* The number darkens on activation, like the name beside
                          it. It used to do the opposite — the pressed row got
                          LIGHTER than the rest — which read as the row being
                          disabled and left aria-pressed without a visual echo. */}
                      <span
                        className={`font-serif text-[11px] font-light tabular-nums lg:text-[12px] ${
                          activo ? "text-[#153223]" : "text-[#4a3e26]"
                        }`}
                      >
                        {e.n}
                      </span>
                      <span
                        className={`font-sans text-[13px] tracking-[0.01em] md:text-sm ${
                          activo ? "font-normal text-[#153124]" : "font-light text-[#4a3e26]"
                        }`}
                      >
                        {e.nombre}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <Lightbox
        items={[...FIGURA_PLANTA]}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </section>
  );
}
