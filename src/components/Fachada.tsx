import Image from "next/image";

export default function Fachada() {
  return (
    <section id="fachada-principal" className="relative bg-cream pt-16 pb-0 overflow-hidden">
      
      {/* Section Header with Left and Right Lines - Center aligned with padding */}
      <div className="flex items-center w-full max-w-5xl mx-auto gap-6 mb-12 px-6">
        <div className="flex-1 h-px bg-forest/20" />
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-forest text-center whitespace-nowrap">
          Donde la altura se convierte en hogar.
        </h2>
        <div className="flex-1 h-px bg-forest/20" />
      </div>

      {/* Full Width Image - No borders, no margins, no padding */}
      <div className="w-full overflow-hidden">
        <Image
          src="/images/posfooter.png"
          alt="Fachada principal del edificio Lomas Altas"
          width={2000}
          height={1100}
          className="w-full h-auto block"
          priority
          quality={90}
        />
      </div>

    </section>
  );
}
