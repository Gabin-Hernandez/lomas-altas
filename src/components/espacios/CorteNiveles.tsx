"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import Lightbox from "@/components/ui/Lightbox";
import SafeReveal from "@/components/ui/SafeReveal";
import CabeceraFolio from "./CabeceraFolio";
import { FIGURA_CORTE, NIVELES, TIPOLOGIAS } from "./espaciosData";

const ANILLO =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7d6731] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfc]";

// Diagonal perspective slope across the axonometric drawing
const SLANT_HALF = 2.25;

export default function CorteNiveles() {
  const [nivelActivo, setNivelActivo] = useState<string>("N0–N1");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const handleSelectNivel = useCallback((codigo: string) => {
    setNivelActivo((prev) => (prev === codigo ? prev : codigo));
  }, []);

  // Diagonal Mathematical Coordinate Tracker: matches the 3D axonometric slab slope
  const handleDiagramPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!diagramRef.current) return;
    const rect = diagramRef.current.getBoundingClientRect();
    if (rect.height <= 0 || rect.width <= 0) return;

    const relY = ((e.clientY - rect.top) / rect.height) * 100;
    const relX = (e.clientX - rect.left) / rect.width;
    
    // Compensate for the axonometric slant so hit-testing follows the slanted floors
    const normalizedY = relY - (relX - 0.5) * (SLANT_HALF * 2);

    const matched = NIVELES.find(
      (n) => normalizedY >= n.topPercent && normalizedY < n.bottomPercent
    );

    if (matched) {
      setNivelActivo((prev) => (prev === matched.codigo ? prev : matched.codigo));
    }
  }, []);

  const nivelSeleccionado = NIVELES.find((n) => n.codigo === nivelActivo) || NIVELES[5];

  // SVG viewBox is 1000 x 811.3 (aspect 1150 / 933)
  const toSvgY = (pct: number) => (pct * 8.113).toFixed(2);

  const yTopLeft = toSvgY(nivelSeleccionado.topPercent - SLANT_HALF);
  const yTopRight = toSvgY(nivelSeleccionado.topPercent + SLANT_HALF);
  const yBotLeft = toSvgY(nivelSeleccionado.bottomPercent - SLANT_HALF);
  const yBotRight = toSvgY(nivelSeleccionado.bottomPercent + SLANT_HALF);
  const yCenterLeft = toSvgY(nivelSeleccionado.centerPercent - SLANT_HALF);
  const yCenterRight = toSvgY(nivelSeleccionado.centerPercent + SLANT_HALF);

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
              bajada="Corte axonométrico del edificio: penthouses y roof garden en la coronación, departamentos tipo en niveles 2 a 4, residencias Planta Jardín en 2 niveles (N0–N1) con 46 m² de jardín privado, tres niveles de estacionamiento techado y áreas verdes."
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
                  10
                </span>
                <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.22em] text-[#5c4a2c]/80">
                  Secciones
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
                <span>Seleccionar nivel</span>
                <span className="text-[#c4a96a]">10 Secciones</span>
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
                          className={`w-14 shrink-0 font-serif text-[12px] font-semibold transition-colors ${
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

          {/* Right Column: 3D Axonometric Building Render with Diagonal Perspective Highlight */}
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
                className="relative aspect-[1150/933] min-w-[720px] lg:min-w-0 rounded-2xl overflow-hidden shadow-2xl border border-[#153223]/10 bg-[#fbfaf8] cursor-pointer touch-none"
              >
                {/* Original pristine base image estructura.jpg without any overlaid cards */}
                <Image
                  src="/images/estructura.jpg"
                  alt="Corte esquemático del edificio Lomas Altas: penthouses y roof garden en N5 y N6, departamentos en N2 a N4, Planta Jardín en 2 niveles (N0–N1), tres niveles de estacionamiento de N-1 a N-3 y áreas verdes en N-4."
                  fill
                  sizes="(min-width:1024px) 100vw, 100vw"
                  quality={100}
                  unoptimized
                  priority
                  className="object-cover object-right select-none pointer-events-none"
                />

                {/* DIAGONAL PERSPECTIVE HIGHLIGHT OVERLAY (Follows the true 3D axonometric slab angle) */}
                <svg
                  viewBox="0 0 1000 811"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                >
                  <defs>
                    <linearGradient id="goldDiagonalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c4a96a" stopOpacity="0.28" />
                      <stop offset="50%" stopColor="#153223" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#c4a96a" stopOpacity="0.22" />
                    </linearGradient>
                  </defs>

                  {/* Diagonal Floor Polygon */}
                  <polygon
                    points={`0,${yTopLeft} 1000,${yTopRight} 1000,${yBotRight} 0,${yBotLeft}`}
                    fill="url(#goldDiagonalGradient)"
                    className="transition-all duration-150"
                  />

                  {/* Top Diagonal Slab Line (Accurately follows the underside of upper slab) */}
                  <line
                    x1="0"
                    y1={yTopLeft}
                    x2="1000"
                    y2={yTopRight}
                    stroke="#c4a96a"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="transition-all duration-150"
                  />

                  {/* Bottom Diagonal Slab Line */}
                  <line
                    x1="0"
                    y1={yBotLeft}
                    x2="1000"
                    y2={yBotRight}
                    stroke="#c4a96a"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    className="transition-all duration-150"
                  />

                  {/* Subtle Centerline Guide */}
                  <line
                    x1="0"
                    y1={yCenterLeft}
                    x2="1000"
                    y2={yCenterRight}
                    stroke="#a8904f"
                    strokeWidth="1"
                    strokeOpacity="0.45"
                    strokeDasharray="4,4"
                    className="transition-all duration-150"
                  />
                </svg>

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
                esquemático por niveles, de N-4 a N6. Residencias Planta Jardín en 2 niveles (N0–N1) con 46 m² de jardín privado, departamentos tipo en N2–N4 y penthouses con roof garden en N5–N6.
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
