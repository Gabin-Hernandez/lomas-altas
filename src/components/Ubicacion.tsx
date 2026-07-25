"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Map, MapControls, MapMarker, MarkerContent } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="relative bg-cream pt-16 pb-0 overflow-hidden">
      {/* Watermark Isotipo Background behind title */}
      <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-[0.08] w-80 h-80 md:w-[420px] md:h-[420px]">
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
          <div className="flex items-center w-full max-w-5xl mx-auto gap-6 mb-12 relative z-10">
            <div className="flex-grow h-px bg-forest/20" />
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-forest text-center whitespace-nowrap">
              Sección de ubicación
            </h2>
            <div className="flex-grow h-px bg-forest/20" />
          </div>
        </ScrollReveal>

        {/* Topography Style Map Container - LARGER & INTERACTIVE */}
        <Card className="relative w-full max-w-6xl mx-auto h-[550px] md:h-[650px] rounded-sm overflow-hidden shadow-2xl border border-gold/25 p-0 bg-[#faf5f0]">
          <Map
            center={[-99.267787, 19.517566]} // Coordinates for Avenida Lomas Verdes, Naucalpan (Exact client position)
            zoom={15}
            theme="light"
            className="w-full h-full"
          >
            <MapControls />
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
          </Map>

          {/* Direction Overlay Card - Matches mockup layout */}
          <div className="absolute bottom-10 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[680px] z-30">
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
        </Card>
      </div>

      {/* Puntos Cercanos - Uses sec_log.jpg directly as background (already green pre-rendered) */}
      <div className="relative py-20 px-6 mt-16 overflow-hidden">
        {/* Background Image: sec_log.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sec_log.jpg"
            alt="Puntos Cercanos"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Header with Left/Right lines */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="flex items-center w-full max-w-4xl mx-auto gap-6 mb-16">
              <div className="flex-grow h-px bg-[#d4c491]/30" />
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#d4c491] text-center whitespace-nowrap tracking-wide">
                Puntos Cercanos
              </h3>
              <div className="flex-grow h-px bg-[#d4c491]/30" />
            </div>
          </ScrollReveal>

          {/* Logos Grid - Flat White Silhouette styling */}
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="flex flex-col gap-12">
            
            {/* Row 1 (4 logos) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
              
              {/* Logo 1: Colegio Alemán */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo1.svg"
                    alt="Colegio Alemán"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Colegio Alemán
                </span>
              </div>

              {/* Logo 2: La Cúspide Sky Mall */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo2.svg"
                    alt="La Cúspide Sky Mall"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  La Cúspide Sky Mall
                </span>
              </div>

              {/* Logo 3: Colegio Carol Baur */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo3.svg"
                    alt="Colegio Carol Baur"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Colegio Carol Baur
                </span>
              </div>

              {/* Logo 4: UVM Lomas */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo3.svg"
                    alt="UVM Lomas"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  UVM Lomas
                </span>
              </div>

            </div>

            {/* Row 2 (3 logos) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center max-w-4xl mx-auto w-full">
              
              {/* Logo 5: Plaza Satélite */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo4.svg"
                    alt="Plaza Satélite"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Plaza Satélite
                </span>
              </div>

              {/* Logo 6: Bellavista Country */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo5.svg"
                    alt="Bellavista Country"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[#d4c491] text-xs md:text-sm font-serif tracking-wide">
                  Bellavista Country
                </span>
              </div>

              {/* Logo 7: Chamapa-Lechería */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo4.svg"
                    alt="Chamapa-Lechería"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
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
