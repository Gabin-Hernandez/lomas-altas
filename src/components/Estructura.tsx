import Image from "next/image";

export default function Estructura() {
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

      </div>

      {/*
        Edge-to-edge band painted in the render's own backdrop colour (#fcfcfc),
        so the diagram reads as one continuous surface instead of a framed image.
        The render stays capped at its native width to avoid upscaling; the band
        carries the colour the rest of the way out to both edges.
      */}
      <div className="w-full bg-[#fcfcfc] py-10 md:py-16">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8">
          <Image
            src="/images/estructura.jpg"
            alt="Distribución por plantas Lomas Altas"
            width={1658}
            height={933}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
