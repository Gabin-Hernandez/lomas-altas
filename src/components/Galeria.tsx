"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    src: "/images/eyecatcher.jpg",
    alt: "Vista aérea de Lomas Altas",
  },
  {
    src: "/images/edif1.png",
    alt: "Fachada del edificio Lomas Altas",
  },
  {
    src: "/images/posfooter.png",
    alt: "Vista frontal de Lomas Altas",
  },
];

export default function Galeria() {
  const [active, setActive] = useState(0);

  return (
    <section id="galeria" className="bg-cream py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            Galería
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Main Image */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-sm overflow-hidden mb-4">
          <Image
            src={images[active].src}
            alt={images[active].alt}
            fill
            className="object-cover transition-all duration-500"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, index) => (
            <button
              key={img.src}
              onClick={() => setActive(index)}
              className={`relative h-24 md:h-32 rounded-sm overflow-hidden transition-all duration-300 ${
                active === index
                  ? "ring-2 ring-gold opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
