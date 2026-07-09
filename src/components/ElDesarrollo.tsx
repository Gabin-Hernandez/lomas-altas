import Image from "next/image";

export default function ElDesarrollo() {
  return (
    <section
      id="el-desarrollo"
      className="relative z-10 w-full"
      style={{ marginTop: "-8.72vw" }}
    >
      {/* Decorative V-line at the top */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <Image
          src="/images/linea-slider.png"
          alt=""
          width={1400}
          height={120}
          className="w-full h-auto block"
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

        {/* Text Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-40 pb-28 px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.2rem] text-white leading-tight mb-6">
            Vive en una torre residencial
            <br />
            <em className="font-serif italic text-gold-light">dentro de Terralago</em>
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed font-light">
            Departamentos amplios, amenidades funcionales y una ubicación
            estratégica en Lomas Verdes, diseñados para quienes buscan
            comodidad, privacidad y una conexión natural con su entorno.
          </p>
        </div>

        {/* Building icon circle */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div className="w-24 h-24 rounded-full bg-cream flex items-center justify-center shadow-lg border-4 border-white">
            <Image
              src="/images/edifincon.svg"
              alt="Icono edificio"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Stats section with cream background */}
      <div className="bg-cream pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-4xl md:text-5xl text-gold font-light">
                16
              </span>
              <span className="text-forest text-xs md:text-sm mt-1 tracking-wide">
                Departamentos
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gold/30" />
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-4xl md:text-5xl text-gold font-light">
                2
              </span>
              <span className="text-forest text-xs md:text-sm mt-1 tracking-wide">
                Penthouses
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gold/30" />
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-4xl md:text-5xl text-gold font-light">
                18
              </span>
              <span className="text-forest text-xs md:text-sm mt-1 tracking-wide">
                Unidades totales
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gold/30" />
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center relative">
              <span className="font-serif text-4xl md:text-5xl text-gold font-light">
                105 m²
              </span>
              <span className="text-forest text-xs md:text-sm mt-1 tracking-wide">
                Por departamento
              </span>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gold/30" />
            </div>

            {/* Stat 5 */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center">
              <span className="font-serif text-4xl md:text-5xl text-gold font-light">
                2
              </span>
              <span className="text-forest text-xs md:text-sm mt-1 tracking-wide">
                Estacionamientos
                <br />
                por unidad
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Section (Split Layout) */}
      <div className="bg-cream pb-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Building Render overlapping gold rectangle */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            {/* Decorative Gold Rectangle */}
            <div className="absolute right-4 bottom-4 w-[85%] h-[85%] bg-gold/20 rounded-sm z-0" />
            
            {/* Building Image */}
            <div className="relative z-10 w-[90%] max-w-md shadow-2xl rounded-sm overflow-hidden border border-white/40">
              <Image
                src="/images/edif1.png"
                alt="Edificio Lomas Altas"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Side: Copy & CTA */}
          <div className="w-full lg:w-1/2 text-left flex flex-col items-start">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest leading-tight mb-6">
              Vive en la torre más alta
              <br />
              <em className="font-serif italic text-gold">de Lomas Altas.</em>
            </h3>
            
            <p className="text-forest/80 text-sm md:text-base font-light leading-relaxed mb-8 max-w-lg">
              Exclusivo desarrollo residencial de 18 unidades distribuidas en 5 niveles,
              con una ubicación inigualable en Lomas Verdes. Espacios diseñados con la
              máxima atención al detalle para ofrecerte confort y privacidad.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="bg-gold hover:bg-gold-dark text-white font-medium text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Ficha técnica
              </a>
              <a
                href="#contacto"
                className="border border-gold text-gold hover:bg-gold hover:text-white font-medium text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300"
              >
                Presentación
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
