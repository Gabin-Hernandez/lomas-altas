"use client";

import { useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Map, MapMarker, MarkerContent, useMap } from "@/components/ui/map";

/** Base zoom and how much it grows as the map crosses the viewport. */
const MAP_ZOOM_BASE = 14.8;
const MAP_ZOOM_RANGE = 0.7;

/**
 * Drives a subtle zoom from the page scroll position instead of the wheel,
 * so scrolling over the map never traps the page.
 */
function ScrollDrivenZoom() {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const container = map.getContainer();
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      // 0 while the map is still below the fold, 1 once it has fully passed above it.
      const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const progress = Math.min(1, Math.max(0, raw));
      map.setZoom(MAP_ZOOM_BASE + progress * MAP_ZOOM_RANGE);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [map, isLoaded]);

  return null;
}

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="relative bg-cream pt-16 pb-0 overflow-hidden">
      {/* Watermark Isotipo Background behind title */}
      <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-[0.65] w-80 h-80 md:w-[420px] md:h-[420px]">
        <Image
          src="/images/isotip3.svg"
          alt=""
          fill
          className="object-contain object-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header with Left and Right Lines */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex items-center w-full max-w-5xl mx-auto gap-6 mb-4 relative z-10">
            <div className="flex-grow h-px bg-forest/20" />
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-forest text-center whitespace-nowrap">
              Sección de ubicación
            </h2>
            <div className="flex-grow h-px bg-forest/20" />
          </div>
        </ScrollReveal>

      </div>

      {/* Full-bleed map that dissolves into the cream background - no frame, no shadow */}
      <div className="relative z-10 w-full">
        <div className="relative w-full h-[620px] md:h-[860px]">
          <Map
            center={[-99.267787, 19.517566]} // Coordinates for Avenida Lomas Verdes, Naucalpan (Exact client position)
            zoom={MAP_ZOOM_BASE}
            theme="light"
            scrollZoom={false}
            className="w-full h-full"
          >
            <ScrollDrivenZoom />
            <MapMarker longitude={-99.267787} latitude={19.517566}>
              <MarkerContent>
                <div className="relative z-10 flex flex-col items-center">
                  {/* Pulsing ring */}
                  <div className="absolute w-14 h-14 rounded-full bg-forest/10 animate-ping border border-forest/30" />

                  {/* Green Leaf Logo Pin */}
                  <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gold/20 hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Image
                      src="/images/isotip3.svg"
                      alt="Lomas Altas Ubicación"
                      width={30}
                      height={30}
                      className="w-[70%] h-auto filter brightness-75 hue-rotate-60"
                    />
                  </div>
                </div>
              </MarkerContent>
            </MapMarker>

            {/* Cream tint so the map reads as part of the page, not a pasted tile */}
            <div className="absolute inset-0 z-[4] bg-cream/25 pointer-events-none" />

            {/* Edge fades - dissolve all four sides into the cream */}
            <div className="absolute inset-y-0 left-0 w-[14%] md:w-[18%] z-[5] bg-gradient-to-r from-cream via-cream/70 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[14%] md:w-[18%] z-[5] bg-gradient-to-l from-cream via-cream/70 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[18%] z-[5] bg-gradient-to-b from-cream via-cream/70 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] z-[5] bg-gradient-to-t from-cream via-cream/70 to-transparent pointer-events-none" />
          </Map>
        </div>

        {/* Direction Overlay Card - floats over the map */}
        <div className="absolute bottom-12 md:bottom-16 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[680px] z-30">
          <div className="bg-[#153124]/95 backdrop-blur-md border border-gold/20 px-8 py-5 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold border-r border-white/20 pr-4 shrink-0">
                Dirección:
              </span>
              <p className="text-white text-xs md:text-[13px] font-light leading-relaxed">
                Avenida Lomas Verdes & P.º de Lomas Verdes,
                <br />
                53125 Naucalpan de Juárez, Méx.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=19.517566,-99.267787"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-white text-[10px] tracking-[0.25em] uppercase font-semibold border-b border-gold hover:border-white pb-0.5 transition-colors whitespace-nowrap"
            >
              VER UBICACIÓN
            </a>
          </div>
        </div>
      </div>

      {/* Puntos Cercanos - Uses sec_log.jpg with green mobile backdrop for legibility */}
      <div className="relative py-14 sm:py-20 px-4 sm:px-6 mt-12 sm:mt-16 overflow-hidden">
        {/* Background Image: sec_log.jpg with mobile green overlay */}
        <div className="absolute inset-0 z-0 bg-[#122718]">
          <Image
            src="/images/sec_log.jpg"
            alt="Puntos Cercanos"
            fill
            className="object-cover object-center opacity-40 md:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#122718]/70 via-[#122718]/50 to-[#122718]/80 md:opacity-0 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Header with Left/Right lines */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="flex items-center w-full max-w-4xl mx-auto gap-3 sm:gap-6 mb-10 sm:mb-16">
              <div className="flex-grow h-px bg-[#d4c491]/30" />
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#d4c491] text-center whitespace-nowrap tracking-wide">
                Puntos Cercanos
              </h3>
              <div className="flex-grow h-px bg-[#d4c491]/30" />
            </div>
          </ScrollReveal>

          {/* Logos Grid - Flat White Silhouette styling */}
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="flex flex-col gap-10 sm:gap-12">
            
            {/* Row 1 (4 logos) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 sm:gap-8 md:gap-12 items-center justify-items-center">
              
              {/* Logo 1: Colegio Alemán */}
              <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo1.svg"
                    alt="Colegio Alemán"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 filter brightness-[1.3] contrast-[1.1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Colegio Alemán
                </span>
              </div>

              {/* Logo 2: La Cúspide Sky Mall */}
              <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo2.svg"
                    alt="La Cúspide Sky Mall"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 filter brightness-[1.3] contrast-[1.1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  La Cúspide Sky Mall
                </span>
              </div>

              {/* Logo 3: Colegio Carol Baur */}
              <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo5.svg"
                    alt="Colegio Carol Baur"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 filter brightness-[1.3] contrast-[1.1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Colegio Carol Baur
                </span>
              </div>

              {/* Logo 4: UVM Lomas */}
              <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo_uvm.png"
                    alt="UVM Lomas"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-45 group-hover:opacity-100 transition-all duration-300 filter brightness-[0.72] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  UVM Lomas
                </span>
              </div>

            </div>

            {/* Row 2 (3 logos) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 sm:gap-8 md:gap-12 items-center justify-items-center max-w-4xl mx-auto w-full">
              
              {/* Logo 5: Plaza Satélite */}
              <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo3.svg"
                    alt="Plaza Satélite"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 filter brightness-[1.3] contrast-[1.1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Plaza Satélite
                </span>
              </div>

              {/* Logo 6: Bellavista Country */}
              <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo4.svg"
                    alt="Bellavista Country"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 filter brightness-[1.3] contrast-[1.1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Bellavista Country
                </span>
              </div>

              {/* Logo 7: Chamapa-Lechería */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center gap-2.5 sm:gap-3 group">
                <div className="w-18 h-18 sm:w-24 sm:h-24 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo_chamapa.png"
                    alt="Chamapa-Lechería"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain opacity-45 group-hover:opacity-100 transition-all duration-300 filter brightness-[0.72] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Chamapa-Lechería
                </span>
              </div>

            </div>
          </div>
        </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
