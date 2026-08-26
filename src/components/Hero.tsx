import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="sticky top-0 z-0 w-full h-screen overflow-hidden">
      {/* Background Image - Official Hero Render with Original Green Tint */}
      <Image
        src="/images/Amenidades/Terralago Vista aérea.jpg"
        alt="Lomas Altas - Vista aérea del edificio residencial"
        fill
        className="object-cover object-top"
        priority
        quality={100}
        unoptimized
      />
      {/* Subtle top green gradient overlay for logo and navbar legibility */}
      <div className="absolute inset-x-0 top-0 h-64 md:h-80 bg-gradient-to-b from-[#153124]/85 via-[#153124]/45 to-transparent pointer-events-none z-10" />
    </section>
  );
}
