"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Building2, Car, Dumbbell, Flower2, Layers, CheckCircle2 } from "lucide-react";

interface NivelData {
  codigo: string;
  nombre: string;
  categoria: "penthouses" | "departamentos" | "acceso" | "estacionamiento" | "amenidades";
  categoriaLabel: string;
  distribucion: string;
  descripcion: string;
  unidades: string;
  topPercent: number;
  bottomPercent: number;
  centerPercent: number;
  tagColor: string;
}

const NIVELES: NivelData[] = [
  {
    codigo: "N7",
    nombre: "Penthouse — Planta Alta",
    categoria: "penthouses",
    categoriaLabel: "Penthouses (Dúplex)",
    distribucion: "TA_PH (Izq) • TD (Centro) • TA_PH (Der)",
    descripcion: "Nivel superior de penthouses con terrazas panorámicas privadas, asador y acceso a roof garden.",
    unidades: "2 PH + 1 TD",
    topPercent: 0,
    bottomPercent: 10.6,
    centerPercent: 6.7,
    tagColor: "border-[#c4a9a9]/60 text-[#7a4848] bg-[#c4a9a9]/15",
  },
  {
    codigo: "N6",
    nombre: "Penthouse — Planta Baja",
    categoria: "penthouses",
    categoriaLabel: "Penthouses (Dúplex)",
    distribucion: "TA_PH (Izq) • TD (Centro) • TA_PH (Der)",
    descripcion: "Primer nivel de penthouses con estancias sociales de doble altura, terrazas y acceso principal.",
    unidades: "2 PH + 1 TD",
    topPercent: 10.6,
    bottomPercent: 18.4,
    centerPercent: 14.5,
    tagColor: "border-[#c4a9a9]/60 text-[#7a4848] bg-[#c4a9a9]/15",
  },
  {
    codigo: "N5",
    nombre: "Nivel Residencial 5",
    categoria: "departamentos",
    categoriaLabel: "Departamentos",
    distribucion: "TA (Izq) • TD (Centro) • TA (Der)",
    descripcion: "Departamentos con amplias terrazas corridas y vistas panorámicas hacia la cañada.",
    unidades: "3 Departamentos",
    topPercent: 18.4,
    bottomPercent: 26.2,
    centerPercent: 22.3,
    tagColor: "border-[#d6cbbe] text-[#5c5040] bg-[#d6cbbe]/20",
  },
  {
    codigo: "N4",
    nombre: "Nivel Residencial 4",
    categoria: "departamentos",
    categoriaLabel: "Departamentos",
    distribucion: "TA (Izq) • TD (Centro) • TA (Der)",
    descripcion: "Residencias con iluminación natural de doble frente y acabados de primera calidad.",
    unidades: "3 Departamentos",
    topPercent: 26.2,
    bottomPercent: 34.0,
    centerPercent: 30.1,
    tagColor: "border-[#d6cbbe] text-[#5c5040] bg-[#d6cbbe]/20",
  },
  {
    codigo: "N3",
    nombre: "Nivel Residencial 3",
    categoria: "departamentos",
    categoriaLabel: "Departamentos",
    distribucion: "TA (Izq) • TD (Centro) • TA (Der)",
    descripcion: "Distribución equilibrada entre áreas sociales integradas y suites de descanso independientes.",
    unidades: "3 Departamentos",
    topPercent: 34.0,
    bottomPercent: 41.8,
    centerPercent: 37.9,
    tagColor: "border-[#d6cbbe] text-[#5c5040] bg-[#d6cbbe]/20",
  },
  {
    codigo: "N2",
    nombre: "Nivel Residencial 2",
    categoria: "departamentos",
    categoriaLabel: "Departamentos",
    distribucion: "TA (Izq) • TD (Centro) • TA (Der)",
    descripcion: "Espacios habitables con cancelería de piso a techo y terrazas privadas techadas.",
    unidades: "3 Departamentos",
    topPercent: 41.8,
    bottomPercent: 49.6,
    centerPercent: 45.7,
    tagColor: "border-[#d6cbbe] text-[#5c5040] bg-[#d6cbbe]/20",
  },
  {
    codigo: "N0–N1",
    nombre: "Planta Jardín (Dúplex 2 Niveles)",
    categoria: "acceso",
    categoriaLabel: "Residencias Planta Jardín",
    distribucion: "TA-G (Dúplex con Jardín Privado 46 m²) • Planta Baja Central",
    descripcion: "Exclusivas residencias de 351 m² en doble nivel con jardín privado de 46 m², terraza techada y mezzanine.",
    unidades: "2 Garden Houses Dúplex",
    topPercent: 49.6,
    bottomPercent: 65.0,
    centerPercent: 57.3,
    tagColor: "border-[#9fae7a]/60 text-[#3f521c] bg-[#9fae7a]/20",
  },
  {
    codigo: "N-1",
    nombre: "Sótano 1 — Estacionamiento",
    categoria: "estacionamiento",
    categoriaLabel: "Estacionamientos",
    distribucion: "Estacionamiento 1",
    descripcion: "Primer sótano de estacionamiento techado con rampas amplias y acceso controlado.",
    unidades: "Cajones techados",
    topPercent: 65.0,
    bottomPercent: 72.3,
    centerPercent: 68.6,
    tagColor: "border-[#cfd5db] text-[#42505e] bg-[#cfd5db]/30",
  },
  {
    codigo: "N-2",
    nombre: "Sótano 2 — Estacionamiento",
    categoria: "estacionamiento",
    categoriaLabel: "Estacionamientos",
    distribucion: "Estacionamiento 2",
    descripcion: "Segundo nivel de cajones independientes y bodegas de almacenamiento.",
    unidades: "Cajones techados",
    topPercent: 72.3,
    bottomPercent: 79.6,
    centerPercent: 75.9,
    tagColor: "border-[#cfd5db] text-[#42505e] bg-[#cfd5db]/30",
  },
  {
    codigo: "N-3",
    nombre: "Sótano 3 — Estacionamiento",
    categoria: "estacionamiento",
    categoriaLabel: "Estacionamientos",
    distribucion: "Estacionamiento 3",
    descripcion: "Tercer nivel subterráneo con cajones para residentes y visitantes.",
    unidades: "Cajones techados",
    topPercent: 79.6,
    bottomPercent: 86.9,
    centerPercent: 83.2,
    tagColor: "border-[#cfd5db] text-[#42505e] bg-[#cfd5db]/30",
  },
  {
    codigo: "N-4",
    nombre: "Nivel Amenidades",
    categoria: "amenidades",
    categoriaLabel: "Amenidades",
    distribucion: "Salón de Eventos (Izq) • Gimnasio Equipado (Der)",
    descripcion: "Espacios de bienestar y convivencia exclusivos: Salón de Eventos y Gimnasio panorámico.",
    unidades: "Amenidades exclusivas",
    topPercent: 86.9,
    bottomPercent: 100,
    centerPercent: 93.4,
    tagColor: "border-[#e5d4a4] text-[#6b5010] bg-[#e5d4a4]/30",
  },
];

const FILTROS = [
  { id: "todos", label: "Todos los niveles", icon: Layers },
  { id: "penthouses", label: "Penthouses (N6–N7)", icon: Sparkles },
  { id: "departamentos", label: "Departamentos (N2–N5)", icon: Building2 },
  { id: "acceso", label: "Planta Jardín (N0–N1)", icon: Flower2 },
  { id: "estacionamiento", label: "Estacionamiento (N-1 a N-3)", icon: Car },
  { id: "amenidades", label: "Amenidades (N-4)", icon: Dumbbell },
] as const;

export default function Estructura() {
  const [nivelActivo, setNivelActivo] = useState<string>("N0–N1");
  const [filtro, setFiltro] = useState<string>("todos");
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
    <section id="estructura" className="relative bg-cream py-16 md:py-24 overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header with Left/Right Lines */}
        <div className="flex items-center w-full max-w-4xl mx-auto gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex-grow h-px bg-[#153223]/25 min-w-[8px] sm:min-w-[24px]" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#153223] text-center sm:whitespace-nowrap font-normal">
            Distribución por plantas
          </h2>
          <div className="flex-grow h-px bg-[#153223]/25 min-w-[8px] sm:min-w-[24px]" />
        </div>

        <p className="text-center text-xs sm:text-sm md:text-base font-light text-[#5c4a2c]/85 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Explora la distribución vertical de la torre. Pasa el cursor o presiona sobre cada nivel para descubrir los detalles de departamentos, penthouses dúplex, residencias planta jardín en 2 niveles, estacionamientos y amenidades.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {FILTROS.map((f) => {
            const Icon = f.icon;
            const isSelected = filtro === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFiltro(f.id);
                  if (f.id !== "todos") {
                    const primero = NIVELES.find((n) => n.categoria === f.id);
                    if (primero) handleSelectNivel(primero.codigo);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#153223] text-cream shadow-md shadow-[#153223]/20 scale-105"
                    : "bg-white/80 text-[#5c4a2c] hover:bg-white hover:text-[#153223] border border-[#153223]/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="w-full bg-[#fcfcfc] py-8 sm:py-12 md:py-16 border-y border-[#153223]/10 relative">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Fixed-Height Detail Card + Stable Selector List */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* Detail Card with strictly fixed height to prevent ANY layout shifts */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#153223]/10 relative overflow-hidden h-[240px] flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c4a96a] via-[#153223] to-[#c4a96a]" />
                
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center font-serif text-xs sm:text-sm font-bold bg-[#153223] text-cream px-2.5 py-1 rounded-lg shadow-sm min-w-[56px] text-center">
                        {nivelSeleccionado.codigo}
                      </span>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c4a96a] block">
                          {nivelSeleccionado.categoriaLabel}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#153223] font-medium leading-tight truncate max-w-[170px] sm:max-w-[200px]">
                          {nivelSeleccionado.nombre}
                        </h3>
                      </div>
                    </div>
                    
                    <span className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${nivelSeleccionado.tagColor}`}>
                      {nivelSeleccionado.unidades}
                    </span>
                  </div>

                  <div className="bg-cream/60 rounded-xl p-2.5 my-2 border border-[#153223]/5">
                    <div className="text-[10px] uppercase tracking-wider text-[#5c4a2c]/70 font-semibold mb-0.5">
                      Distribución en planta
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#153223] truncate">
                      {nivelSeleccionado.distribucion}
                    </div>
                  </div>

                  <p className="text-xs text-[#5c4a2c]/90 font-light leading-relaxed line-clamp-2 h-[34px]">
                    {nivelSeleccionado.descripcion}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#153223]/10 flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-[#5c4a2c]/70 flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#153223] shrink-0" />
                    <span className="truncate">{filtro === "todos" ? "Nivel activo" : `Filtro: ${filtro}`}</span>
                  </span>

                  <Link
                    href="/espacios"
                    className="text-[11px] uppercase tracking-wider font-semibold text-[#153223] hover:text-[#c4a96a] transition-colors shrink-0"
                  >
                    Ver planos →
                  </Link>
                </div>
              </div>

              {/* Levels Selector List */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-md border border-[#153223]/10">
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[#5c4a2c]/80 mb-3 px-2 flex items-center justify-between">
                  <span>Seleccionar nivel</span>
                  <span className="text-[10px] text-[#c4a96a] font-normal">11 Secciones</span>
                </div>

                <div className="flex flex-col gap-1">
                  {NIVELES.map((n) => {
                    const isSelected = nivelActivo === n.codigo;
                    const matchesFiltro = filtro === "todos" || n.categoria === filtro;

                    return (
                      <button
                        key={n.codigo}
                        type="button"
                        onClick={() => handleSelectNivel(n.codigo)}
                        onMouseEnter={() => handleSelectNivel(n.codigo)}
                        className={`w-full h-8 px-3 rounded-lg text-left flex items-center justify-between transition-colors duration-100 cursor-pointer ${
                          isSelected
                            ? "bg-[#153223] text-white shadow-sm"
                            : matchesFiltro
                            ? "hover:bg-[#153223]/10 text-[#153223]"
                            : "opacity-40 hover:opacity-100 hover:bg-[#153223]/10 text-[#5c4a2c]"
                        }`}
                      >
                        <div className="flex items-center gap-3 pointer-events-none">
                          <span
                            className={`font-serif text-xs font-semibold w-12 text-left ${
                              isSelected ? "text-[#decd98]" : "text-[#153223]"
                            }`}
                          >
                            {n.codigo}
                          </span>
                          <span
                            className={`text-xs font-light truncate max-w-[170px] sm:max-w-[210px] ${
                              isSelected ? "text-white font-medium" : "text-[#5c4a2c]"
                            }`}
                          >
                            {n.nombre}
                          </span>
                        </div>

                        {/* Dot indicator */}
                        <div className="flex items-center gap-2 pointer-events-none shrink-0">
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-150 ${
                              isSelected
                                ? "bg-[#decd98] ring-2 ring-[#decd98]/40"
                                : matchesFiltro
                                ? "bg-[#153223]/25"
                                : "bg-black/10"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Building Render with Deterministic Mathematical Tracking */}
            <div className="lg:col-span-8 xl:col-span-8 order-1 lg:order-2">
              <div className="relative w-full max-w-[980px] mx-auto">

                {/* Building Visual Container with Single-Point Pointer Tracker */}
                <div
                  ref={diagramRef}
                  onPointerMove={handleDiagramPointerMove}
                  onClick={handleDiagramPointerMove}
                  className="relative aspect-[1107/961] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#153223]/10 bg-[#fbfaf8] cursor-pointer touch-none"
                >
                  
                  {/* Base Building Image */}
                  <Image
                    src="/images/distribucion-plantas.jpg"
                    alt="Distribución por plantas y niveles del edificio residencial Lomas Altas"
                    fill
                    priority
                    quality={100}
                    unoptimized
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
                            {n.nombre}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Bottom Helper Hint */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#5c4a2c]/75 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c4a96a] animate-pulse" />
                    <span>Nivel seleccionado: <strong className="text-[#153223] font-medium">{nivelSeleccionado.codigo} — {nivelSeleccionado.nombre}</strong></span>
                  </div>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-[#7a6636]">
                    Distribución vertical integral
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
