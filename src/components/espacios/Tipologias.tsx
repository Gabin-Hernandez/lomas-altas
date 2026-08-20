"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { TIPOLOGIAS, type Tipologia } from "./espaciosData";

type Campo =
  | "unidades"
  | "niveles"
  | "superficieInterior"
  | "exterior"
  | "superficie"
  | "estacionamiento";

const FILAS: readonly { etiqueta: string; campo: Campo; serif: boolean }[] = [
  { etiqueta: "Unidades", campo: "unidades", serif: true },
  { etiqueta: "Niveles", campo: "niveles", serif: false },
  { etiqueta: "Área Interior", campo: "superficieInterior", serif: false },
  { etiqueta: "Exterior", campo: "exterior", serif: false },
  { etiqueta: "Superficie Total", campo: "superficie", serif: true },
  { etiqueta: "Estacionamiento", campo: "estacionamiento", serif: false },
];

const TH_FILA =
  "py-5 pr-6 text-left align-top font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]/80";
const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7d6731] focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const ENLACE_PROTOTIPO =
  "inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#153223] bg-gold/30 hover:bg-gold px-3.5 py-2 transition-all border border-[#7d6731]/40 hover:border-forest shadow-xs";

function valorCelda(t: Tipologia, campo: Campo, serif: boolean) {
  const valor = t[campo];
  const destacar = serif;
  return (
    <span
      className={
        destacar
          ? "font-serif text-lg font-normal text-[#153223]"
          : "font-sans text-[13px] font-light text-[#153223]"
      }
    >
      {valor}
    </span>
  );
}

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
              titulo="Cuatro prototipos residenciales"
              acento="espacios diseñados a medida"
              tone="cream"
              bajada="18 residencias exclusivas distribuidas con rigor arquitectónico: 2 residencias Nivel Jardín con áreas exteriores de 87 m², 14 departamentos de tres recámaras en los niveles 1 al 4, y 2 penthouses majestuosos con roof garden y terrazas privadas."
            />
          </SafeReveal>

          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 md:col-span-12"
          >
            {/* Desktop: a real comparison table */}
            <table className="hidden w-full border-collapse md:table">
              <caption className="sr-only">
                Comparativa de las cuatro tipologías de Lomas Altas: unidades, niveles, superficie interior, exterior, superficie total y estacionamiento.
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
                      <span
                        aria-hidden
                        className="mb-5 block h-[3px] w-10"
                        style={{ background: t.chip }}
                      />
                      <span
                        className={`block font-serif font-light leading-[0.8] text-[#153223] ${
                          t.letra.length > 3 ? "text-[2.2rem]" : "text-[2.8rem] lg:text-[3.4rem]"
                        }`}
                      >
                        {t.letra}
                      </span>
                      <span className="mt-3 block font-sans text-base font-light tracking-[0.01em] text-[#153223] md:text-lg">
                        {t.nombre}
                      </span>
                      <span className="mt-1 block font-sans text-xs uppercase tracking-widest text-[#7d6731]">
                        {t.codigo}
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
                    <span className="sr-only">Ficha individual</span>
                  </th>
                  {TIPOLOGIAS.map((t) => (
                    <td
                      key={t.id}
                      onMouseEnter={() => setColActiva(t.id)}
                      onMouseLeave={() => setColActiva(null)}
                      className={`px-5 py-5 align-top transition-colors first:pl-0 ${resalte(t.id)}`}
                    >
                      <Link
                        href={`/espacios/${t.slug}`}
                        onFocus={() => setColActiva(t.id)}
                        onBlur={() => setColActiva(null)}
                        className={`${ENLACE_PROTOTIPO} ${ANILLO}`}
                      >
                        Ver renders y ficha
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* Mobile: cards on a snap rail */}
            <div className="md:hidden">
              <div
                ref={carruselRef}
                className="no-scrollbar -mx-6 -my-1 flex snap-x snap-mandatory gap-0 overflow-x-auto px-6 py-1"
              >
                {TIPOLOGIAS.map((t, i) => (
                  <article
                    key={t.id}
                    data-ficha={i}
                    className="min-w-[80vw] shrink-0 snap-start border-l border-[#5c4a2c]/15 px-5 first:border-l-0 first:pl-0 sm:min-w-[48vw]"
                  >
                    <span
                      aria-hidden
                      className="mb-4 block h-[3px] w-10"
                      style={{ background: t.chip }}
                    />
                    <span
                      className={`block font-serif font-light leading-[0.8] text-[#153223] ${
                        t.letra.length > 3 ? "text-[2.2rem]" : "text-[2.75rem]"
                      }`}
                    >
                      {t.letra}
                    </span>
                    <h3 className="mt-3 font-sans text-base font-light tracking-[0.01em] text-[#153223]">
                      {t.nombre}
                    </h3>
                    <span className="block font-sans text-[11px] uppercase tracking-widest text-[#7d6731]">
                      {t.codigo}
                    </span>

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

                    <Link
                      href={`/espacios/${t.slug}`}
                      className={`mt-6 inline-flex items-center gap-2 ${ENLACE_PROTOTIPO} ${ANILLO}`}
                    >
                      Ver renders y ficha
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </article>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-4">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]/80">
                  Desliza para comparar los cuatro
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
            Superficies arquitectónicas expresadas en metros cuadrados computables. Cada prototipo cuenta con planos ejecutivos detallados, estacionamientos techados y acabados premium.
          </p>
        </div>
      </div>
    </section>
  );
}
