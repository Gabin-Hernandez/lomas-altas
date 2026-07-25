import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ElDesarrollo() {
  return (
    <section
      id="el-desarrollo"
      className="relative z-10 w-full shadow-[0_-25px_60px_rgba(0,0,0,0.4)]"
      style={{ marginTop: "-8.72vw" }}
    >
      {/* Decorative V-line suspended inside the green section - Identical to Image 1 */}
      <div className="absolute top-4 md:top-6 left-6 right-6 md:left-16 md:right-16 z-20 pointer-events-none">
        <Image
          src="/images/linea-slider.png"
          alt=""
          width={1400}
          height={120}
          className="w-full h-auto block opacity-90 drop-shadow-sm"
          priority
        />
      </div>

      {/* Main Container with slider2.png as background, clipped to remove white triangle */}
      <div
        className="relative w-full overflow-hidden bg-forest"
        style={{
          clipPath:
            "polygon(0 0, 44.12% 0, 50% 8.72vw, 55.88% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        {/* Background Image: slider2.png */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/slider2.png"
            alt="Lomas Altas"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Subtle additional green overlay for consistency */}
          <div className="absolute inset-0 bg-forest/20" />
        </div>

        {/* Text Content Overlay - Exact Match to Image 1 */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
          <ScrollReveal variant="fade-up" delay={100}>
            <h2 className="font-sans font-light text-2xl sm:text-4xl lg:text-[2.75rem] text-white tracking-wide leading-tight mb-1">
              Vive en una torre residencial
            </h2>
            <span className="font-serif italic font-normal text-2xl sm:text-4xl lg:text-[2.75rem] text-gold-light tracking-wide mb-6 block">
              dentro de Terralago
            </span>
            <p className="font-sans font-light tracking-wider text-xs sm:text-sm md:text-base text-white/85 max-w-3xl leading-relaxed mx-auto">
              Departamentos amplios, amenidades funcionales y una ubicación estratégica en Lomas Verdes, diseñados para quienes buscan comodidad, privacidad y una conexión natural con su entorno.
            </p>
          </ScrollReveal>
        </div>

      </div>

      {/* Building Icon Circle floating in front on top of both sections - z-30 */}
      <div className="relative z-30 flex justify-center -mt-12 md:-mt-14 -mb-12 md:-mb-14 pointer-events-none">
        <ScrollReveal variant="scale-up" delay={200} className="pointer-events-auto">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-cream flex items-center justify-center shadow-xl border-4 border-white overflow-hidden hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/edifincon.svg"
              alt="Icono edificio Lomas Altas"
              width={120}
              height={120}
              className="w-full h-full object-contain scale-[1.6]"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Stats section with cream background - Exact Match to Image 1 */}
      <div className="relative z-10 bg-cream pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="fade-up" delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-5xl md:text-5xl lg:text-[4.2rem] text-[#5c4a2c] font-light">
                16
              </span>
              <span className="font-sans text-[#5c4a2c] text-md md:text-sm mt-1 tracking-wide font-light">
                Departamentos
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5c4a2c]/25" />
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-5xl md:text-5xl lg:text-[4.2rem] text-[#5c4a2c] font-light">
                2
              </span>
              <span className="font-sans text-[#5c4a2c] text-md md:text-sm mt-1 tracking-wide font-light">
                Penthouses
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5c4a2c]/25" />
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-4xl md:text-5xl lg:text-[4.2rem] text-[#5c4a2c] font-light">
                18
              </span>
              <span className="font-sans text-[#5c4a2c] text-md md:text-sm mt-1 tracking-wide font-light">
                Unidades totales
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5c4a2c]/25" />
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-4xl md:text-5xl lg:text-[4.2rem] text-[#5c4a2c] font-light">
                105 m²
              </span>
              <span className="font-sans text-[#5c4a2c] text-md md:text-sm mt-1 tracking-wide font-light">
                Por departamento
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#5c4a2c]/25" />
            </div>

            {/* Stat 5 */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center">
              <span className="font-serif text-4xl md:text-5xl lg:text-[4.2rem] text-[#5c4a2c] font-light">
                2
              </span>
              <span className="font-sans text-[#5c4a2c] text-md md:text-sm mt-1 tracking-wide font-light">
                Estacionamientos
                <br />
                por unidad
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>

      {/* Detail Section with Full-Width Sand-Gold Background (#decd99) */}
      <div className="relative w-full bg-cream pt-8 pb-20 overflow-hidden">

        {/* Full width container grid */}
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch relative">

          {/* Left Side: Large Building Render standing tall over #decd99 background */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end px-4 lg:px-0 z-10 min-h-[420px] lg:min-h-[580px]">
            {/* Left Sand-Gold Block extending to far-left edge of screen */}
            <div className="absolute -left-[50vw] right-0 bottom-0 h-[48%] bg-[#decd99] z-0" />

            {/* Building Image - Shifted right against text box and raised upward */}
            <div className="relative z-10 w-full max-w-lg lg:max-w-xl -mt-24 sm:-mt-36 lg:-mt-52 lg:-mr-4">
              <Image
                src="/images/edif1.png"
                alt="Edificio Lomas Altas"
                width={800}
                height={900}
                className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Side: Full Side-to-Side Sand-Gold Block (#decd99) */}
          <div className="lg:col-span-6 bg-[#decd99] text-[#4a3e26] flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-20 relative z-10">
            <ScrollReveal variant="fade-up" delay={150}>
              <h3 className="font-sans font-light text-2xl sm:text-4xl lg:text-[2.6rem] leading-tight mb-1 text-[#4a3e26]">
                Vive en una torre residencial
              </h3>
              <span className="font-serif font-normal text-2xl sm:text-4xl lg:text-[2.6rem] text-[#4a3e26] mb-8 block">
                dentro de Terralago
              </span>

              <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-[#4a3e26]/90 max-w-lg mb-10">
                Departamentos amplios, amenidades funcionales y una ubicación estratégica en Lomas Verdes, diseñados para quienes buscan comodidad, privacidad y una conexión natural con su entorno.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href="#contacto"
                  className="border border-[#4a3e26]/30 bg-[#decd99]/60 hover:bg-[#decd99] text-[#4a3e26] font-sans text-xs sm:text-sm tracking-wide px-7 py-3.5 transition-all shadow-sm"
                >
                  Solicitar información
                </a>
                <a
                  href="#espacios"
                  className="bg-white hover:bg-white/95 text-[#4a3e26] font-sans text-xs sm:text-sm tracking-wide px-7 py-3.5 transition-all shadow-lg hover:shadow-xl"
                >
                  Ver departamentos
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Faint Isotipo Watermark at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-15 w-80 h-40 z-20">
          <Image
            src="/images/isotip3.svg"
            alt=""
            fill
            className="object-contain object-bottom"
          />
        </div>

      </div>
    </section>
  );
}
