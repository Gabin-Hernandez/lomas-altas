"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { FIGURA_CORTE, NIVELES, TIPOLOGIAS } from "./espaciosData";

const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7d6731] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfc]";

/** Order of the legend inside the source file — kept so both read the same. */
const ORDEN_LEYENDA = ["a", "ph", "b", "c"] as const;

/**
 * 05 · Where each typology lives.
 *
 * The legend that is burnt into estructura.jpg is rebuilt in HTML: text inside a
 * JPEG does not scale, cannot be selected and is invisible to screen readers.
 * The chips repeat the exact hexes of section 01 so the table and the drawing
 * share one colour code — decorative only, always next to the model's name.
 */
export default function CorteNiveles() {
  const [nivelY, setNivelY] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hint, setHint] = useState(true);

  const leyenda = ORDEN_LEYENDA.map((id) => TIPOLOGIAS.find((t) => t.id === id)).filter(
    (t): t is (typeof TIPOLOGIAS)[number] => Boolean(t)
  );

  return (
    <section
      id="corte"
      className="scroll-mt-[calc(var(--nav-h)+4rem)] bg-[#fcfcfc] py-20 md:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <SafeReveal variant="fade-up" className="col-span-4 mb-14 md:col-span-12 md:mb-20">
            <CabeceraFolio
              folio="05"
              titulo="El edificio"
              acento="en corte"
              tone="blanco"
              bajada="Cinco niveles de vivienda sobre planta baja, tres sótanos de estacionamiento y un jardín en el nivel más bajo. El roof garden ocupa la cubierta, entre los dos penthouses."
            />
          </SafeReveal>

          <div className="col-span-4 md:col-span-12 lg:col-span-3">
            <div className="flex items-start gap-6">
              <div>
                <span className="block font-serif text-[2.75rem] font-light leading-[0.9] text-[#153223] md:text-[3.25rem]">
                  18
                </span>
                <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Unidades
                </span>
              </div>
              <span aria-hidden className="mt-1 h-14 w-px shrink-0 bg-[#5c4a2c]/20" />
              <div>
                <span className="block font-serif text-[2.75rem] font-light leading-[0.9] text-[#153223] md:text-[3.25rem]">
                  5
                </span>
                <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Niveles
                </span>
              </div>
            </div>

            <ul className="mt-10">
              {leyenda.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 border-b border-[#5c4a2c]/15 py-2.5"
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0"
                    style={{ background: t.chip }}
                  />
                  <span className="font-sans text-[13px] font-light text-[#153223]">
                    {t.nombre}
                  </span>
                  <span className="ml-auto font-sans text-[11px] tabular-nums tracking-[0.1em] text-[#5c4a2c]/80">
                    {t.unidades} U
                  </span>
                </li>
              ))}
            </ul>

            <ol className="mt-10">
              {NIVELES.map((n) => (
                <li key={n.codigo}>
                  {/* A real <button>, not a div with tabIndex: the guide thread
                      has to answer to the keyboard too. */}
                  <button
                    type="button"
                    onMouseEnter={() => setNivelY(n.y)}
                    onMouseLeave={() => setNivelY(null)}
                    onFocus={() => setNivelY(n.y)}
                    onBlur={() => setNivelY(null)}
                    className={`group flex w-full items-baseline justify-between gap-4 border-b border-[#5c4a2c]/12 py-2 text-left ${ANILLO}`}
                  >
                    {/* The level code is content, not decoration, at 13px:
                        #8a7238 lands exactly on 4.50:1 over #fcfcfc, which is
                        no margin at all. #7d6731 gives 5.31:1. */}
                    <span className="w-10 shrink-0 font-serif text-[13px] tabular-nums text-[#7d6731]">
                      {n.codigo}
                    </span>
                    <span className="flex-1 font-sans text-[12px] font-light text-[#5c4a2c]/85 transition-colors group-hover:text-[#153223] md:text-[13px]">
                      {n.uso}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 mt-12 md:col-span-12 lg:col-span-8 lg:col-start-5 lg:mt-0"
          >
            {/* The scroller keeps the horizontal overflow inside this box: the
                document body never scrolls sideways. */}
            <div
              onScroll={() => setHint(false)}
              className="no-scrollbar -mx-6 overflow-x-auto px-6 lg:mx-0 lg:overflow-visible lg:px-0"
            >
              {/* CROP, MEASURED — do not round it off. estructura.jpg is
                  1658x933; the ink profile per column shows the burnt-in legend
                  at x=107–409, a completely empty gap at x=410–583 and the
                  drawing starting at x=584 with the N6…N-4 labels. A 1150-wide
                  window anchored right drops the leftmost 508px — the legend
                  plus part of the gap — leaving 76px of air before the first
                  label. aspect-[1000/933] would decapitate those labels.
                  The crop is horizontal only, so the vertical percentages of
                  NIVELES stay valid without conversion. */}
              <div className="relative aspect-[1150/933] min-w-[720px] lg:min-w-0">
                <Image
                  src="/images/estructura.jpg"
                  alt="Corte esquemático del edificio Lomas Altas: penthouses y roof garden en N5 y N6, cuatro departamentos por nivel de N1 a N4, planta baja en N0, tres niveles de estacionamiento de N-1 a N-3 y jardín en N-4."
                  fill
                  // Under lg the drawing is min-w-[720px] INSIDE a horizontal
                  // scroller, so it is 720px wide on a 375px phone — not 100vw.
                  // The old 100vw asked the browser for a 375px-wide file to
                  // paint a 720px box and the level labels turned to mush.
                  sizes="(min-width:1024px) 62vw, (min-width:820px) 92vw, 720px"
                  quality={90}
                  loading="lazy"
                  className="object-cover object-right"
                />
                <div
                  aria-hidden
                  style={{ top: `${nivelY ?? 50}%` }}
                  className={`pointer-events-none absolute left-[6%] right-0 h-px bg-[#a8904f]/50 transition-[top,opacity] duration-300 ${
                    nivelY === null ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              {hint && (
                <span className="font-sans text-[10px] tracking-[0.02em] text-[#5c4a2c]/80 lg:hidden">
                  Desliza el corte →
                </span>
              )}
              <button
                type="button"
                onClick={() => setLightbox(0)}
                // border /65: 1.4.11 wants 3:1 on the outline that identifies
                // the control. #5c4a2c/30 on #fcfcfc is 1.6:1; /65 is 3.4:1.
                className={`ml-auto border border-[#5c4a2c]/65 px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c] transition-colors hover:border-[#153223] hover:text-[#153223] ${ANILLO}`}
              >
                Ampliar
              </button>
            </div>

            <p className="mt-5 border-t border-[#5c4a2c]/20 pt-2.5 text-[10px] leading-[1.6] tracking-[0.02em] text-[#5c4a2c]/80 md:text-[11px]">
              <span className="font-serif text-[11px] text-[#7d6731]">Fig. 08</span> — Corte
              esquemático por niveles, de N-4 a N6. En cada nivel de vivienda el orden es siempre
              Modelo A, B, C y A.
            </p>
          </SafeReveal>
        </div>
      </div>

      <Lightbox
        items={[...FIGURA_CORTE]}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </section>
  );
}
