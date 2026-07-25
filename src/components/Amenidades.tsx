"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface AmenityCard {
  title: string;
  img: string;
  widthClass: string;
  aspectPosition?: string;
}

export default function Amenidades() {
  const [activeModalImage, setActiveModalImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cardRows: AmenityCard[][] = [
    [
      {
        title: "Gimnasio",
        img: "/images/lomas1.jpeg",
        widthClass: "w-full md:w-[55%]",
      },
      {
        title: "Comedor & Estancia",
        img: "/images/lomas2.jpeg",
        widthClass: "w-full md:w-[45%]",
      },
    ],
    [
      {
        title: "Cocina",
        img: "/images/lomas3.jpeg",
        widthClass: "w-full md:w-[35%]",
      },
      {
        title: "Sala & Terraza",
        img: "/images/lomas4.jpeg",
        widthClass: "w-full md:w-[65%]",
      },
    ],
    [
      {
        title: "Baño Principal",
        img: "/images/lomas5.jpeg",
        widthClass: "w-full md:w-[60%]",
      },
      {
        title: "Vista Exterior",
        img: "/images/eyecatcher.jpg",
        widthClass: "w-full md:w-[40%]",
      },
    ],
  ];

  return (
    <section id="amenidades" className="relative bg-[#ddcc98] pt-8 pb-20 md:pb-28 overflow-visible">
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header with Left/Right Lines */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex items-center w-full max-w-5xl mx-auto gap-6 mb-12 sm:mb-16">
            <div className="flex-grow h-px bg-[#5c4a2c]/25" />
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#5c4a2c] text-center whitespace-nowrap">
              Espacios para disfrutar todos los días
            </h2>
            <div className="flex-grow h-px bg-[#5c4a2c]/25" />
          </div>
        </ScrollReveal>

        {/* Custom Asymmetric Masonry-style Grid with Lightbox Zoom on Click */}
        <div className="flex flex-col gap-6 sm:gap-8 max-w-[1550px] mx-auto">
          {cardRows.map((row, rowIndex) => (
            <ScrollReveal key={rowIndex} variant="fade-up" delay={150 + rowIndex * 100}>
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                {row.map((card) => (
                  <div
                    key={card.title}
                    onClick={() => setActiveModalImage({ src: card.img, title: card.title })}
                    className={`${card.widthClass} h-[300px] sm:h-[400px] lg:h-[480px] relative rounded-sm overflow-hidden shadow-xl border border-white/20 group cursor-pointer`}
                  >
                    {/* Corner Ribbon / Triangle Header */}
                    <div 
                      className="absolute top-0 left-0 bg-[#153124] w-[320px] sm:w-[380px] h-[60px] sm:h-[70px] z-10 flex items-start pl-5 pt-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                    >
                      <span className="text-white text-sm sm:text-base font-serif tracking-wide">
                        {card.title}
                      </span>
                    </div>

                    {/* Background Image with Smooth Hover Zoom */}
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />

                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                    {/* Expand Indicator Badge on Hover */}
                    <div className="absolute bottom-4 right-4 bg-[#153124]/80 backdrop-blur-sm text-white/90 text-xs px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 shadow-md">
                      <svg className="w-3.5 h-3.5 text-[#ddcc98]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      <span>Ver pantalla completa</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Downward Sand-Gold Triangle Arrow dipping into the next section */}
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-20 sm:w-28 md:w-36 h-10 sm:h-14 md:h-16 bg-[#ddcc98] z-30 pointer-events-none" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      />

      {/* Lightbox Modal for Fullscreen View */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-3xl font-light focus:outline-none transition-colors"
              title="Cerrar (ESC)"
            >
              ✕
            </button>

            {/* Title Header */}
            <div className="mb-4 text-center">
              <span className="font-serif text-xl sm:text-2xl text-[#ddcc98] tracking-wide">
                {activeModalImage.title}
              </span>
            </div>

            {/* High Res Image */}
            <div className="relative w-full h-[60vh] sm:h-[75vh] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={activeModalImage.src}
                alt={activeModalImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
