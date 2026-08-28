"use client";

import { useState } from "react";
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
  yPercent: number; // Center of the floor in % (for the connector dot)
  topPercent: number; // Top edge of floor in %
  heightPercent: number; // Height of floor in %
  colorBadge: string;
  tagColor: string;
}

const NIVELES: NivelData[] = [
  {
    codigo: "N7",
    nombre: "Penthouse — Planta Alta",
    categoria: "penthouses",
    categoriaLabel: "Penthouses",
    distribucion: "TA_PH (Izq) • TD (Centro) • TA_PH (Der)",
    descripcion: "Nivel superior de penthouses con terrazas panorámicas privadas, asador y acceso a roof garden.",
    unidades: "3 Residencias",
    yPercent: 6.8,
    topPercent: 2.8,
    heightPercent: 7.8,
    colorBadge: "bg-[#c4a9a9] text-[#4a2e2e]",
    tagColor: "border-[#c4a9a9]/60 text-[#7a4848] bg-[#c4a9a9]/15",
  },
  {
    codigo: "N6",
    nombre: "Penthouse — Planta Baja",
    categoria: "penthouses",
    categoriaLabel: "Penthouses",
    distribucion: "TA_PH (Izq) • TD (Centro) • TA_PH (Der)",
    descripcion: "Primer nivel de penthouses con estancias sociales de doble altura y suites principales.",
    unidades: "3 Residencias",
    yPercent: 14.4,
    topPercent: 10.6,
    heightPercent: 7.6,
    colorBadge: "bg-[#c4a9a9] text-[#4a2e2e]",
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
    yPercent: 22.2,
    topPercent: 18.2,
    heightPercent: 7.6,
    colorBadge: "bg-[#d6cbbe] text-[#3d3830]",
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
    yPercent: 30.0,
    topPercent: 25.8,
    heightPercent: 7.6,
    colorBadge: "bg-[#d6cbbe] text-[#3d3830]",
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
    yPercent: 37.8,
    topPercent: 33.4,
    heightPercent: 7.6,
    colorBadge: "bg-[#d6cbbe] text-[#3d3830]",
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
    yPercent: 45.6,
    topPercent: 41.0,
    heightPercent: 7.6,
    colorBadge: "bg-[#d6cbbe] text-[#3d3830]",
    tagColor: "border-[#d6cbbe] text-[#5c5040] bg-[#d6cbbe]/20",
  },
  {
    codigo: "N1",
    nombre: "Nivel Residencial 1",
    categoria: "departamentos",
    categoriaLabel: "Departamentos",
    distribucion: "TA (Izq) • Planta Baja Central • TA (Der)",
    descripcion: "Departamentos laterales sobre el vestíbulo y área ajardinada de planta baja.",
    unidades: "2 Departamentos",
    yPercent: 53.3,
    topPercent: 48.6,
    heightPercent: 7.4,
    colorBadge: "bg-[#d6cbbe] text-[#3d3830]",
    tagColor: "border-[#d6cbbe] text-[#5c5040] bg-[#d6cbbe]/20",
  },
  {
    codigo: "N0",
    nombre: "Planta Baja & Jardines",
    categoria: "acceso",
    categoriaLabel: "Planta Baja",
    distribucion: "TA-G (Izq) • Jardín Central • TA-G (Der)",
    descripcion: "Residencias Planta Jardín con jardines privados exclusivos y acceso a jardineras centrales.",
    unidades: "2 Garden Houses + Jardín",
    yPercent: 60.4,
    topPercent: 56.0,
    heightPercent: 7.5,
    colorBadge: "bg-[#9fae7a] text-[#223512]",
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
    yPercent: 67.8,
    topPercent: 63.5,
    heightPercent: 7.2,
    colorBadge: "bg-[#cfd5db] text-[#2c3742]",
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
    yPercent: 75.3,
    topPercent: 70.7,
    heightPercent: 7.2,
    colorBadge: "bg-[#cfd5db] text-[#2c3742]",
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
    yPercent: 82.4,
    topPercent: 77.9,
    heightPercent: 7.2,
    colorBadge: "bg-[#cfd5db] text-[#2c3742]",
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
    yPercent: 92.6,
    topPercent: 85.1,
    heightPercent: 12.0,
    colorBadge: "bg-[#e5d4a4] text-[#48370d]",
    tagColor: "border-[#e5d4a4] text-[#6b5010] bg-[#e5d4a4]/30",
  },
];

const FILTROS = [
  { id: "todos", label: "Todos los niveles", icon: Layers },
  { id: "penthouses", label: "Penthouses (N6–N7)", icon: Sparkles },
  { id: "departamentos", label: "Departamentos (N1–N5)", icon: Building2 },
  { id: "acceso", label: "Planta Jardín (N0)", icon: Flower2 },
  { id: "estacionamiento", label: "Estacionamiento (N-1 a N-3)", icon: Car },
  { id: "amenidades", label: "Amenidades (N-4)", icon: Dumbbell },
] as const;

export default function Estructura() {
  const [nivelActivo, setNivelActivo] = useState<string | null>("N7");
  const [filtro, setFiltro] = useState<string>("todos");

  const nivelSeleccionado = NIVELES.find((n) => n.codigo === nivelActivo) || NIVELES[0];

  return (
    <section id="estructura" className="relative bg-cream py-16 md:py-24 overflow-hidden">
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
          Explora la distribución vertical de la torre. Pasa el cursor o presiona sobre cada nivel para descubrir los detalles de departamentos, penthouses, estacionamientos y amenidades.
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
                    if (primero) setNivelActivo(primero.codigo);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 ${
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Levels Column + Legend */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* Detail Card of Active Level */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#153223]/10 relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c4a96a] via-[#153223] to-[#c4a96a]" />
                
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center font-serif text-lg sm:text-xl font-bold bg-[#153223] text-cream w-12 h-10 rounded-lg shadow-sm">
                      {nivelSeleccionado.codigo}
                    </span>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c4a96a] block">
                        {nivelSeleccionado.categoriaLabel}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg text-[#153223] font-medium leading-tight">
                        {nivelSeleccionado.nombre}
                      </h3>
                    </div>
                  </div>
                  
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${nivelSeleccionado.tagColor}`}>
                    {nivelSeleccionado.unidades}
                  </span>
                </div>

                <div className="bg-cream/60 rounded-xl p-3.5 my-3 border border-[#153223]/5">
                  <div className="text-[11px] uppercase tracking-wider text-[#5c4a2c]/70 font-semibold mb-1">
                    Distribución en planta
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#153223]">
                    {nivelSeleccionado.distribucion}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5c4a2c]/90 font-light leading-relaxed mb-4">
                  {nivelSeleccionado.descripcion}
                </p>

                <div className="pt-3 border-t border-[#153223]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#5c4a2c]/70 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#153223]" />
                    {filtro === "todos" ? "Pasa el cursor por la lista o el edificio" : `Filtrado por: ${filtro}`}
                  </span>

                  <Link
                    href="/espacios"
                    className="text-[11px] uppercase tracking-wider font-semibold text-[#153223] hover:text-[#c4a96a] transition-colors"
                  >
                    Ver planos →
                  </Link>
                </div>
              </div>

              {/* Levels Compact Selector List */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-md border border-[#153223]/10">
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[#5c4a2c]/80 mb-3 px-2 flex items-center justify-between">
                  <span>Seleccionar nivel</span>
                  <span className="text-[10px] text-[#c4a96a] font-normal">12 Niveles</span>
                </div>

                <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                  {NIVELES.map((n) => {
                    const isHovered = nivelActivo === n.codigo;
                    const matchesFiltro = filtro === "todos" || n.categoria === filtro;

                    return (
                      <button
                        key={n.codigo}
                        type="button"
                        onClick={() => setNivelActivo(n.codigo)}
                        onMouseEnter={() => setNivelActivo(n.codigo)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 group ${
                          isHovered
                            ? "bg-[#153223] text-cream shadow-md shadow-[#153223]/15 translate-x-1"
                            : matchesFiltro
                            ? "hover:bg-cream text-[#153223]"
                            : "opacity-40 hover:opacity-100 hover:bg-cream text-[#5c4a2c]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-serif text-xs sm:text-sm font-semibold w-9 text-left ${
                              isHovered ? "text-[#decd98]" : "text-[#153223]"
                            }`}
                          >
                            {n.codigo}
                          </span>
                          <span
                            className={`text-xs font-light truncate max-w-[180px] sm:max-w-[220px] ${
                              isHovered ? "text-white" : "text-[#5c4a2c] group-hover:text-[#153223]"
                            }`}
                          >
                            {n.nombre}
                          </span>
                        </div>

                        {/* Dot indicator */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isHovered
                                ? "bg-[#decd98] ring-4 ring-[#decd98]/30 scale-125 animate-pulse"
                                : matchesFiltro
                                ? "bg-[#153223]/30 group-hover:bg-[#153223]"
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

            {/* Right Column: Building Render with Interactive Highlight Lines & Glowing Dots */}
            <div className="lg:col-span-8 xl:col-span-8 order-1 lg:order-2">
              <div className="relative w-full max-w-[980px] mx-auto">

                {/* Building Visual Container */}
                <div className="relative aspect-[1107/961] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#153223]/10 bg-[#fbfaf8]">
                  
                  {/* Building Image */}
                  <Image
                    src="/images/distribucion-plantas.jpg"
                    alt="Distribución por plantas y niveles del edificio residencial Lomas Altas"
                    fill
                    priority
                    quality={100}
                    unoptimized
                    className="object-contain object-right md:object-center select-none"
                  />

                  {/* Level Interactive Overlay Tracks & Glowing Pins */}
                  {NIVELES.map((n) => {
                    const isSelected = nivelActivo === n.codigo;
                    const matchesFiltro = filtro === "todos" || n.categoria === filtro;

                    return (
                      <div
                        key={n.codigo}
                        style={{
                          top: `${n.topPercent}%`,
                          height: `${n.heightPercent}%`,
                        }}
                        onClick={() => setNivelActivo(n.codigo)}
                        onMouseEnter={() => setNivelActivo(n.codigo)}
                        className={`absolute left-0 right-0 cursor-pointer transition-all duration-300 group z-10 ${
                          isSelected
                            ? "bg-gradient-to-r from-[#c4a96a]/25 via-[#153223]/15 to-[#c4a96a]/20 ring-1 ring-[#c4a96a]/50"
                            : matchesFiltro
                            ? "hover:bg-black/5"
                            : "opacity-30 hover:opacity-100"
                        }`}
                      >
                        {/* Floor Scanner Highlight Line */}
                        {isSelected && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/40 to-transparent animate-[pulse_1.5s_ease-in-out_infinite]" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a96a] to-transparent opacity-80" />
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a96a] to-transparent opacity-80" />
                          </div>
                        )}

                        {/* Interactive Dotted Pin on Left Edge of the Level */}
                        <div className="absolute left-1 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
                          
                          {/* Level Code Tag */}
                          <div
                            className={`px-2 py-0.5 rounded-md font-serif text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-sm ${
                              isSelected
                                ? "bg-[#153223] text-[#decd98] scale-110 shadow-[#153223]/30"
                                : "bg-white/90 text-[#153223] border border-[#153223]/15 group-hover:bg-[#153223] group-hover:text-cream group-hover:scale-105"
                            }`}
                          >
                            {n.codigo}
                          </div>

                          {/* Dotted Connecting Line */}
                          <div
                            className={`h-px w-3 sm:w-6 md:w-10 border-b border-dashed transition-colors duration-300 ${
                              isSelected
                                ? "border-[#c4a96a] border-solid scale-x-110"
                                : "border-[#153223]/30 group-hover:border-[#153223]"
                            }`}
                          />

                          {/* Glowing Jewel Pin */}
                          <div className="relative flex items-center justify-center">
                            {isSelected && (
                              <span className="absolute w-6 h-6 rounded-full bg-[#c4a96a]/40 animate-ping" />
                            )}
                            <span
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                isSelected
                                  ? "bg-[#c4a96a] ring-4 ring-[#c4a96a]/50 shadow-[0_0_12px_#c4a96a] scale-125"
                                  : "bg-[#153223]/60 group-hover:bg-[#c4a96a] group-hover:scale-125 group-hover:shadow-[0_0_8px_#c4a96a]"
                              }`}
                            />
                          </div>

                          {/* Level Micro-label (Visible on medium/large screens) */}
                          <span
                            className={`hidden md:inline-block text-[11px] font-medium tracking-wide transition-all duration-300 ml-1.5 px-2 py-0.5 rounded-md ${
                              isSelected
                                ? "bg-[#153223]/90 text-cream backdrop-blur-sm shadow-md"
                                : "opacity-0 group-hover:opacity-90 bg-white/90 text-[#153223] backdrop-blur-sm shadow-sm"
                            }`}
                          >
                            {n.nombre}
                          </span>

                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* Bottom Helper Hint */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#5c4a2c]/75 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c4a96a] animate-pulse" />
                    <span>Nivel seleccionado: <strong className="text-[#153223] font-medium">{nivelSeleccionado.codigo} — {nivelSeleccionado.nombre}</strong></span>
                  </div>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-[#7a6636]">
                    12 Niveles de ingeniería y diseño
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
