"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import Lightbox from "@/components/ui/Lightbox";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { FIGURA_CORTE, NIVELES, TIPOLOGIAS } from "./espaciosData";

const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7d6731] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfc]";

export default function CorteNiveles() {
  const [nivelActivo, setNivelActivo] = useState<string>("N0–N1");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const handleSelectNivel = useCallback((codigo: string) => {
    setNivelActivo((prev) => (prev === codigo ? prev : codigo));
  }, []);

  // Mathematical Single-Point Coordinate Tracker: 100% immune to subpixel/zoom jitter
  const handleDiagramPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!diagramRef.current) return;
    const rect = diagramRef.current.getBoundingClientRect();
    if (rect.height <= 0) return;

    const relY = ((e.clientY - rect.top) / rect.height) * 100;
    const matched = NIVELES.find(
      (n) => relY >= n.topPercent && relY < n.bottomPercent
    );

    if (matched) {
      setNivelActivo((prev) => (prev === matched.codigo ? prev : matched.codigo));
    }
  }, []);

  const nivelSeleccionado = NIVELES.find((n) => n.codigo === nivelActivo) || NIVELES[6];

  return (
    <section
      id="corte"
      className="scroll-mt-[calc(var(--nav-h)+4rem)] bg-[#fcfcfc] py-20 md:py-32 select-none"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          <SafeReveal variant="fade-up" className="col-span-4 mb-14 md:col-span-12 md:mb-20">
            <CabeceraFolio
              folio="05"
              titulo="El edificio"
              acento="en corte"
              tone="blanco"
              bajada="Distribución vertical de la torre: penthouses dúplex en la cumbre, niveles de departamentos tipo, residencias Planta Jardín en 2 niveles con jardín privado de 46 m², tres sótanos de estacionamiento y amenidades en el nivel más bajo."
            />
          </SafeReveal>

          {/* Left Column: Stats, Typology Chips & Level Buttons */}
          <div className="col-span-4 md:col-span-12 lg:col-span-4 flex flex-col">
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
                  12
                </span>
                <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Niveles Totales
                </span>
              </div>
            </div>

            {/* Typologies summary list */}
            <ul className="mt-8">
              {TIPOLOGIAS.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 border-b border-[#5c4a2c]/15 py-2"
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-xs"
                    style={{ background: t.chip }}
                  />
                  <span className="font-sans text-[12px] font-light text-[#153223] truncate">
                    {t.nombre}
                  </span>
                  <span className="ml-auto font-sans text-[11px] tabular-nums tracking-[0.1em] text-[#5c4a2c]/80 shrink-0">
                    {t.unidades} U
                  </span>
                </li>
              ))}
            </ul>

            {/* Stable Level Selector Buttons (Zero layout shift, zero jitter) */}
            <div className="mt-8 bg-white rounded-2xl p-3 border border-[#153223]/10 shadow-sm">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-[#5c4a2c]/70 px-2 mb-2 flex items-center justify-between">
                <span>Niveles de la torre</span>
                <span className="text-[#c4a96a]">11 Secciones</span>
              </div>

              <ol className="space-y-1">
                {NIVELES.map((n) => {
                  const isSelected = nivelActivo === n.codigo;

                  return (
                    <li key={n.codigo}>
                      <button
                        type="button"
                        onClick={() => handleSelectNivel(n.codigo)}
                        onMouseEnter={() => handleSelectNivel(n.codigo)}
                        className={`group flex w-full items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-left transition-colors duration-100 cursor-pointer ${
                          isSelected
                            ? "bg-[#153223] text-white shadow-sm"
                            : "hover:bg-cream text-[#153223]"
                        } ${ANILLO}`}
                      >
                        <span
                          className={`w-12 shrink-0 font-serif text-[12px] font-semibold transition-colors ${
                            isSelected ? "text-[#decd98]" : "text-[#7d6731]"
                          }`}
                        >
                          {n.codigo}
                        </span>
                        <span
                          className={`flex-1 font-sans text-[11px] font-light truncate transition-colors ${
                            isSelected ? "text-white font-medium" : "text-[#5c4a2c]/85 group-hover:text-[#153223]"
                          }`}
                        >
                          {n.uso}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 transition-all duration-150 ${
                            isSelected
                              ? "bg-[#decd98] ring-2 ring-[#decd98]/40"
                              : "bg-[#153223]/20 group-hover:bg-[#153223]/40"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Right Column: Building Diagram with Smooth Continuous Mathematical Overlay */}
          <SafeReveal
            variant="fade-up"
            delay={120}
            className="col-span-4 mt-12 md:col-span-12 lg:col-span-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[980px] mx-auto">
              
              {/* Building Container with Single-Point Pointer Tracker */}
              <div
                ref={diagramRef}
                onPointerMove={handleDiagramPointerMove}
                onClick={handleDiagramPointerMove}
                className="relative aspect-[1107/961] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#153223]/10 bg-[#fbfaf8] cursor-pointer touch-none"
              >
                {/* Base Building Image (Updated with Planta Jardín 2 levels) */}
                <Image
                  src="/images/distribucion-plantas.jpg"
                  alt="Corte esquemático del edificio Lomas Altas: penthouses dúplex en N6-N7, departamentos en N2-N5, Planta Jardín en 2 niveles en N0-N1, estacionamientos en N-1 a N-3 y amenidades en N-4."
                  fill
                  sizes="(min-width:1024px) 70vw, 100vw"
                  quality={100}
                  unoptimized
                  priority
                  className="object-contain object-right md:object-center select-none pointer-events-none"
                />

                {/* ACTIVE FLOOR HIGHLIGHT (Smooth Single Element, 100% pointer-events-none) */}
                <div
                  style={{
                    top: `${nivelSeleccionado.topPercent}%`,
                    height: `${nivelSeleccionado.bottomPercent - nivelSeleccionado.topPercent}%`,
                  }}
                  className="absolute left-0 right-0 bg-gradient-to-r from-[#c4a96a]/28 via-[#153223]/18 to-[#c4a96a]/22 border-y border-[#c4a96a]/60 pointer-events-none z-10 transition-all duration-150"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white/40 to-transparent animate-[pulse_1.5s_ease-in-out_infinite]" />
                  </div>
                </div>

                {/* PINS & LABELS LAYER (100% pointer-events-none) */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {NIVELES.map((n) => {
                    const isSelected = nivelActivo === n.codigo;

                    return (
                      <div
                        key={n.codigo}
                        style={{ top: `${n.centerPercent}%` }}
                        className="absolute left-1 sm:left-3 md:left-4 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 select-none pointer-events-none"
                      >
                        {/* Pin Tag */}
                        <div
                          className={`px-2 py-0.5 rounded-md font-serif text-[10px] sm:text-xs font-bold shadow-sm transition-colors duration-100 ${
                            isSelected
                              ? "bg-[#153223] text-[#decd98]"
                              : "bg-white/90 text-[#153223] border border-[#153223]/15"
                          }`}
                        >
                          {n.codigo}
                        </div>

                        {/* Dotted Connecting Line */}
                        <div
                          className={`h-px w-3 sm:w-6 md:w-10 border-b border-dashed transition-colors duration-100 ${
                            isSelected
                              ? "border-[#c4a96a] border-solid"
                              : "border-[#153223]/30"
                          }`}
                        />

                        {/* Glowing Dot Marker */}
                        <div className="relative flex items-center justify-center">
                          {isSelected && (
                            <span className="absolute w-6 h-6 rounded-full bg-[#c4a96a]/40 animate-ping" />
                          )}
                          <span
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-100 ${
                              isSelected
                                ? "bg-[#c4a96a] ring-4 ring-[#c4a96a]/50 shadow-[0_0_12px_#c4a96a]"
                                : "bg-[#153223]/60"
                            }`}
                          />
                        </div>

                        {/* Level Micro-label */}
                        <span
                          className={`hidden md:inline-block text-[11px] font-medium tracking-wide transition-opacity duration-100 ml-1.5 px-2 py-0.5 rounded-md ${
                            isSelected
                              ? "bg-[#153223]/90 text-cream backdrop-blur-sm shadow-md opacity-100"
                              : "opacity-0 bg-white/90 text-[#153223]"
                          }`}
                        >
                          {n.nombre ?? n.uso}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Controls and Caption */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#5c4a2c]/85">
                  <span className="w-2 h-2 rounded-full bg-[#c4a96a] animate-pulse" />
                  <span>
                    Nivel seleccionado:{" "}
                    <strong className="text-[#153223] font-medium">
                      {nivelSeleccionado.codigo} — {nivelSeleccionado.uso}
                    </strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightbox(0)}
                  className={`border border-[#5c4a2c]/65 px-6 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c] transition-colors hover:border-[#153223] hover:text-[#153223] rounded-lg ${ANILLO}`}
                >
                  Ampliar
                </button>
              </div>

              <p className="mt-5 border-t border-[#5c4a2c]/20 pt-2.5 text-[10px] leading-[1.6] tracking-[0.02em] text-[#5c4a2c]/80 md:text-[11px]">
                <span className="font-serif text-[11px] text-[#7d6731]">Fig. 08</span> — Corte
                esquemático por niveles, de N-4 a N7. Residencias Planta Jardín en 2 niveles (N0–N1) con 46 m² de jardín privado, departamentos tipo en N2–N5 y penthouses dúplex en N6–N7.
              </p>
            </div>
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
