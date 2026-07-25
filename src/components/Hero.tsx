import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="sticky top-0 z-0 w-full h-screen overflow-hidden">
      {/* Background Image - Official Hero Render with Original Green Tint */}
      <Image
        src="/images/eyecatcher.jpg"
        alt="Lomas Altas - Vista aérea del edificio residencial"
        fill
        className="object-cover object-top"
        priority
      />

    </section>
  );
}
