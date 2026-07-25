"use client";

import { useState } from "react";
import Image from "next/image";

export default function Estructura() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  return (
    <section id="estructura" className="relative bg-cream py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10">
        
        {/* Section Header with Left/Right Lines */}
        <div className="flex items-center w-full max-w-4xl mx-auto gap-6 mb-12 sm:mb-16">
          <div className="flex-grow h-px bg-[#153223]/25" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#153223] text-center whitespace-nowrap">
            Distribución por plantas
          </h2>
          <div className="flex-grow h-px bg-[#153223]/25" />
        </div>

        {/* Large Centered Image Container */}
        <div className="w-full flex justify-center items-center">
          <div className="relative w-full max-w-6xl lg:max-w-7xl group rounded-xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-xs border border-[#5c4a2c]/10 p-2 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-2xl">
            {/* Ambient Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ddcc98]/20 via-transparent to-[#153223]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* High-Resolution Structure Diagram */}
            <div className="relative w-full h-auto">
              <Image
                src="/images/estructura.jpg"
                alt="Distribución por plantas Lomas Altas"
                width={1600}
                height={1000}
                className="w-full h-auto object-contain rounded-lg drop-shadow-md transition-all duration-500 group-hover:drop-shadow-2xl"
                priority
              />

              {/* Interactive Floating Hotspots / Level Badges */}
              <div className="absolute top-[8%] right-[8%] sm:right-[12%] z-20 flex flex-col gap-2">
                <button
                  onMouseEnter={() => setActiveLevel("Roof Garden & Penthouses")}
                  onMouseLeave={() => setActiveLevel(null)}
                  className="flex items-center gap-2 bg-[#153223]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-[#d4c491]/40 hover:scale-105 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-sans font-medium tracking-wide">N5 - N6: Penthouse & Roof Garden</span>
                </button>
              </div>

              <div className="absolute top-[38%] right-[8%] sm:right-[12%] z-20 flex flex-col gap-2">
                <button
                  onMouseEnter={() => setActiveLevel("Departamentos N1-N4")}
                  onMouseLeave={() => setActiveLevel(null)}
                  className="flex items-center gap-2 bg-[#153223]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-[#d4c491]/40 hover:scale-105 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-sans font-medium tracking-wide">N1 - N4: Departamentos A, B y C</span>
                </button>
              </div>

              <div className="absolute bottom-[10%] right-[8%] sm:right-[12%] z-20 flex flex-col gap-2">
                <button
                  onMouseEnter={() => setActiveLevel("Estacionamientos")}
                  onMouseLeave={() => setActiveLevel(null)}
                  className="flex items-center gap-2 bg-[#153223]/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-[#d4c491]/40 hover:scale-105 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-sans font-medium tracking-wide">N-1 a N-4: Estacionamientos</span>
                </button>
              </div>

              {/* Popover Badge when hovering levels */}
              {activeLevel && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#1b2620]/95 text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#d4c491]/50 text-xs sm:text-sm font-serif tracking-wide animate-fade-in pointer-events-none z-30">
                  ✨ {activeLevel}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
