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
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setFichaActiva((prev) => (prev + 1) % TIPOLOGIAS.length);
    } else if (diff < -40) {
      setFichaActiva((prev) => (prev - 1 + TIPOLOGIAS.length) % TIPOLOGIAS.length);
    }
    touchStartX.current = null;
  };

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

            {/* Mobile: Interactive Tabbed Card with Swipe */}
            <div className="md:hidden">
              {/* Tab Selector Buttons */}
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-3 mb-4">
                {TIPOLOGIAS.map((t, i) => {
                  const esActiva = i === fichaActiva;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFichaActiva(i)}
                      className={`flex shrink-0 items-center gap-2 rounded-xs px-3.5 py-2 font-sans text-xs font-medium transition-all ${
                        esActiva
                          ? "bg-[#153223] text-[#decd98] shadow-sm font-semibold"
                          : "bg-white/70 text-[#5c4a2c] hover:bg-white border border-[#5c4a2c]/10"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ background: t.chip }}
                      />
                      <span>{t.letra}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tipología Card */}
              {(() => {
                const t = TIPOLOGIAS[fichaActiva];
                return (
                  <article
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="relative w-full rounded-sm border border-[#5c4a2c]/20 bg-white/80 p-5 shadow-md transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 border-b border-[#5c4a2c]/15 pb-4">
                      <div>
                        <span
                          aria-hidden
                          className="mb-2 block h-[3px] w-10 rounded-full"
                          style={{ background: t.chip }}
                        />
                        <h3 className="font-serif text-2xl font-normal text-[#153223]">
                          {t.nombre}
                        </h3>
                        <span className="mt-0.5 block font-sans text-[11px] uppercase tracking-widest text-[#7d6731]">
                          {t.codigo} • {t.unidades} UNIDADES
                        </span>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="block font-serif text-lg font-medium text-[#153223]">
                          {t.superficie}
                        </span>
                        <span className="block font-sans text-[9px] uppercase tracking-wider text-[#5c4a2c]/70">
                          Totales
                        </span>
                      </div>
                    </div>

                    {/* Metric Grid (2 Columns) */}
                    <div className="my-4 grid grid-cols-2 gap-2">
                      <div className="border border-[#5c4a2c]/10 bg-cream/50 p-2.5">
                        <span className="block font-sans text-[9px] font-semibold uppercase tracking-wider text-[#5c4a2c]/75">
                          Área Interior
                        </span>
                        <span className="font-serif text-base text-[#153223]">
                          {t.superficieInterior}
                        </span>
                      </div>
                      <div className="border border-[#5c4a2c]/10 bg-cream/50 p-2.5">
                        <span className="block font-sans text-[9px] font-semibold uppercase tracking-wider text-[#5c4a2c]/75">
                          Niveles
                        </span>
                        <span className="font-sans text-xs font-medium text-[#153223]">
                          {t.niveles}
                        </span>
                      </div>
                      <div className="col-span-2 border border-[#5c4a2c]/10 bg-cream/50 p-2.5">
                        <span className="block font-sans text-[9px] font-semibold uppercase tracking-wider text-[#5c4a2c]/75">
                          Exterior
                        </span>
                        <span className="font-sans text-xs font-medium text-[#153223]">
                          {t.exterior}
                        </span>
                      </div>
                      <div className="col-span-2 border border-[#5c4a2c]/10 bg-cream/50 p-2.5">
                        <span className="block font-sans text-[9px] font-semibold uppercase tracking-wider text-[#5c4a2c]/75">
                          Estacionamiento
                        </span>
                        <span className="font-sans text-xs font-medium text-[#153223]">
                          {t.estacionamiento}
                        </span>
                      </div>
                    </div>

                    {/* Paragraph */}
                    <p className="mb-5 font-sans text-xs font-light leading-relaxed text-[#5c4a2c]/90">
                      {t.parrafo}
                    </p>

                    {/* Action Button */}
                    <Link
                      href={`/espacios/${t.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#153223] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#decd98] transition-all hover:bg-forest hover:text-white shadow-sm"
                    >
                      Ver renders y ficha completa
                      <ArrowRight className="h-3.5 w-3.5 text-[#decd98]" />
                    </Link>

                    {/* Swipe & Indicator Footer */}
                    <div className="mt-4 flex items-center justify-between pt-2 text-[10px] text-[#5c4a2c]/70 border-t border-[#5c4a2c]/10">
                      <span className="font-sans tracking-wide">
                        Desliza ← → para cambiar
                      </span>
                      <div className="flex items-center gap-1.5">
                        {TIPOLOGIAS.map((_, i) => (
                          <span
                            key={i}
                            className={`h-1 rounded-full transition-all ${
                              i === fichaActiva ? "w-5 bg-[#153223]" : "w-1.5 bg-[#5c4a2c]/25"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })()}
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
