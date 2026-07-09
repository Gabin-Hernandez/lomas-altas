import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/eyecatcher.jpg"
        alt="Lomas Altas - Vista aérea del edificio residencial"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Green overlay — more visible as in the original */}
      <div className="absolute inset-0 bg-forest-dark/50" />

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <svg
          className="w-5 h-5 text-white/50 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
