"use client";

import { useEffect, useRef, useState } from "react";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { TIPOLOGIAS, type Tipologia } from "./espaciosData";

type Campo = "unidades" | "niveles" | "superficie" | "exterior" | "estacionamiento";

/** `serif` marks the figures that carry the comparison and deserve display type. */
const FILAS: readonly { etiqueta: string; campo: Campo; serif: boolean }[] = [
  { etiqueta: "Unidades", campo: "unidades", serif: true },
  { etiqueta: "Niveles", campo: "niveles", serif: false },
  { etiqueta: "Superficie", campo: "superficie", serif: true },
  { etiqueta: "Exterior", campo: "exterior", serif: false },
  { etiqueta: "Estacionamiento", campo: "estacionamiento", serif: false },
];

const TH_FILA =
  "py-5 pr-6 text-left align-top font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]/80";
const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7d6731] focus-visible:ring-offset-2 focus-visible:ring-offset-cream";
/**
 * The "ver la planta" link is 10px, i.e. normal text under WCAG, so it needs
 * 4.5:1. #8a7238 is 4.31:1 on cream and drops to 3.98:1 over the #f5ede3 tint
 * this very table paints on column hover — it failed on both. #7d6731 is 5.08:1
 * on cream and 4.69:1 on the tint.
 */
const ENLACE_PLANTA =
  "font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d6731] border-b border-[#7d6731]/50 hover:border-[#7d6731]";

function valorCelda(t: Tipologia, campo: Campo, serif: boolean) {
  const valor = t[campo];
  // "Consultar" is an honest gap, not a figure: it never gets display type.
  const destacar = serif && valor !== "Consultar";
  return (
    <span
      className={
        destacar
          ? "font-serif text-lg text-[#153223]"
          : "font-sans text-[13px] font-light text-[#153223]"
      }
    >
      {valor}
    </span>
  );
}

/**
 * 01 · The buying section: four products, one surface area, explicit
 * differences and verified data only.
 *
 * Client only because of the column highlight and the mobile carousel dots.
 */
export default function Tipologias() {
  const [colActiva, setColActiva] = useState<string | null>(null);
  const [fichaActiva, setFichaActiva] = useState(0);
  const carruselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = carruselRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const fichas = Array.from(scroller.querySelectorAll<HTMLElement>("[data-ficha]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number(entry.target.getAttribute("data-ficha"));
          if (!Number.isNaN(i)) setFichaActiva(i);
        }
      },
      { root: scroller, threshold: 0.6 }
    );

    fichas.forEach((f) => observer.observe(f));
    return () => observer.disconnect();
  }, []);

  const resalte = (id: string) => (colActiva === id ? "bg-[#f5ede3]" : "");

  return (
    <section
      id="tipologias"
      className="relative scroll-mt-[calc(var(--nav-h)+4rem)] bg-cream py-20 md:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <SafeReveal
            variant="fade-up"
            className="col-span-4 mb-14 md:col-span-12 md:mb-20"
          >
            <CabeceraFolio
              folio="01"
              titulo="Cuatro tipologías"
              acento="una misma superficie"
              tone="cream"
              bajada="Los modelos A, B y C se reparten los niveles 1 al 4, cuatro departamentos por planta y siempre en el mismo orden: A, B, C, A. Los dos penthouses ocupan los niveles 5 y 6, y comparten el roof garden entre ellos."
            />
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 md:col-span-12"
          >
            {/* Desktop: a real comparison table, navigable by row and column. */}
            <table className="hidden w-full border-collapse md:table">
              <caption className="sr-only">
                Comparativa de las cuatro tipologías de Lomas Altas: unidades, niveles, superficie,
                exterior y estacionamiento.
              </caption>
              <thead>
                <tr>
                  <td className="w-[18%]" />
                  {TIPOLOGIAS.map((t) => (
                    <th
                      key={t.id}
                      scope="col"
                      onMouseEnter={() => setColActiva(t.id)}
                      onMouseLeave={() => setColActiva(null)}
                      className={`border-b border-[#5c4a2c]/30 px-5 pb-6 text-left align-bottom transition-colors first:pl-0 ${resalte(
                        t.id
                      )}`}
                    >
                      {/* Decorative: sampled from estructura.jpg so the table and
                          the section drawing speak the same colour code. Never
                          the sole carrier of meaning — the name is always there. */}
                      <span
                        aria-hidden
                        className="mb-5 block h-[3px] w-10"
                        style={{ background: t.chip }}
                      />
                      <span
                        className={`block font-serif font-light leading-[0.8] text-[#153223] ${
                          t.letra.length > 1 ? "text-[2.75rem]" : "text-[3rem] lg:text-[3.75rem]"
                        }`}
                      >
                        {t.letra}
                      </span>
                      <span className="mt-4 block font-sans text-base font-light tracking-[0.01em] text-[#153223] md:text-lg">
                        {t.nombre}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#5c4a2c]/15">
                {FILAS.map((fila) => (
                  <tr key={fila.campo}>
                    <th scope="row" className={TH_FILA}>
                      {fila.etiqueta}
                    </th>
                    {TIPOLOGIAS.map((t) => (
                      <td
                        key={t.id}
                        onMouseEnter={() => setColActiva(t.id)}
                        onMouseLeave={() => setColActiva(null)}
                        className={`px-5 py-5 align-top transition-colors first:pl-0 ${resalte(
                          t.id
                        )}`}
                      >
                        {valorCelda(t, fila.campo, fila.serif)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <th scope="row" className={TH_FILA}>
                    <span className="sr-only">Descripción</span>
                  </th>
                  {TIPOLOGIAS.map((t) => (
                    <td
                      key={t.id}
                      onMouseEnter={() => setColActiva(t.id)}
                      onMouseLeave={() => setColActiva(null)}
                      className={`px-5 py-5 align-top text-[13px] font-light leading-[1.75] text-[#5c4a2c]/85 transition-colors first:pl-0 ${resalte(
                        t.id
                      )}`}
                    >
                      {t.parrafo}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th scope="row" className={TH_FILA}>
                    <span className="sr-only">Plano</span>
                  </th>
                  {TIPOLOGIAS.map((t) => (
                    <td
                      key={t.id}
                      onMouseEnter={() => setColActiva(t.id)}
                      onMouseLeave={() => setColActiva(null)}
                      className={`px-5 py-5 align-top transition-colors first:pl-0 ${resalte(t.id)}`}
                    >
                      {/* Native anchor: the plan has no model selector, so there
                          is no state to hand over and no reason for JS here. */}
                      <a
                        href="#planta"
                        onFocus={() => setColActiva(t.id)}
                        onBlur={() => setColActiva(null)}
                        className={`inline-block pb-1 transition-colors ${ENLACE_PLANTA} ${ANILLO}`}
                      >
                        Ver la planta
                        <span className="sr-only"> de {t.nombre}</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* Mobile: four cards on a snap rail. Horizontally scrolling a table
                is hostile on a phone, so the comparison becomes a definition list. */}
            <div className="md:hidden">
              <div
                ref={carruselRef}
                // -my-1/py-1: the scroller clips whatever its children paint
                // outside it, and the focus ring of "Ver la planta" sits 3px
                // beyond the link. Those 4px of bleed keep it visible.
                className="no-scrollbar -mx-6 -my-1 flex snap-x snap-mandatory gap-0 overflow-x-auto px-6 py-1"
              >
                {TIPOLOGIAS.map((t, i) => (
                  <article
                    key={t.id}
                    data-ficha={i}
                    // 76vw so card 2 peeks in and reveals the gesture.
                    className="min-w-[76vw] shrink-0 snap-start border-l border-[#5c4a2c]/15 px-5 first:border-l-0 first:pl-0 sm:min-w-[46vw]"
                  >
                    <span
                      aria-hidden
                      className="mb-5 block h-[3px] w-10"
                      style={{ background: t.chip }}
                    />
                    <span
                      className={`block font-serif font-light leading-[0.8] text-[#153223] ${
                        t.letra.length > 1 ? "text-[2.75rem]" : "text-[3rem]"
                      }`}
                    >
                      {t.letra}
                    </span>
                    <h3 className="mt-4 font-sans text-base font-light tracking-[0.01em] text-[#153223]">
                      {t.nombre}
                    </h3>

                    <dl className="mt-5">
                      {FILAS.map((fila) => (
                        <div
                          key={fila.campo}
                          className="flex items-baseline justify-between gap-4 border-b border-[#5c4a2c]/10 py-2"
                        >
                          <dt className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]/80">
                            {fila.etiqueta}
                          </dt>
                          <dd className="text-right">{valorCelda(t, fila.campo, fila.serif)}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-5 text-[13px] font-light leading-[1.75] text-[#5c4a2c]/85">
                      {t.parrafo}
                    </p>

                    <a
                      href="#planta"
                      className={`mt-6 inline-block pb-1 ${ENLACE_PLANTA} ${ANILLO}`}
                    >
                      Ver la planta
                      <span className="sr-only"> de {t.nombre}</span>
                    </a>
                  </article>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-4">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]/80">
                  Desliza para comparar las cuatro
                </span>
                <span aria-hidden className="ml-auto flex items-center gap-1.5">
                  {TIPOLOGIAS.map((t, i) => (
                    <span
                      key={t.id}
                      className={`h-px w-6 transition-colors ${
                        i === fichaActiva ? "bg-[#153223]" : "bg-[#5c4a2c]/25"
                      }`}
                    />
                  ))}
                </span>
              </div>
            </div>
          </SafeReveal>

          <p className="col-span-4 mt-10 max-w-[70ch] border-t border-[#5c4a2c]/20 pt-4 font-sans text-[10px] font-light leading-[1.6] text-[#5c4a2c]/80 md:col-span-12">
            Las cuatro tipologías comparten la misma planta tipo de 105 m²: lo que cambia es su
            posición dentro de la torre y, con ella, la orientación y el exterior. Los datos
            marcados «Consultar» se confirman por unidad; solicítanos la ficha técnica vigente.
          </p>
        </div>
      </div>
    </section>
  );
}
