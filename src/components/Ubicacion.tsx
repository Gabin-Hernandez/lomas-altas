import Image from "next/image";

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="relative bg-cream pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with Left and Right Lines */}
        <div className="flex items-center w-full max-w-5xl mx-auto gap-6 mb-12">
          <div className="flex-grow h-px bg-forest/20" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-forest text-center whitespace-nowrap">
            Sección de ubicación
          </h2>
          <div className="flex-grow h-px bg-forest/20" />
        </div>

        {/* Topography Style Map Container - LARGER */}
        <div className="relative w-full max-w-6xl mx-auto h-[550px] md:h-[650px] rounded-sm overflow-hidden shadow-2xl border border-gold/25 bg-[#faf5f0]">
          {/* Map background (using footer.jpg directly, which is the cream/brown map) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/footer.jpg"
              alt="Mapa de ubicación Lomas Altas"
              fill
              className="object-cover w-full h-full select-none"
              priority
            />
          </div>

          {/* Map Grid overlay for tech look */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#faf5f0_95%)] opacity-40 z-0" />

          {/* Central Roundabout Pin with Leaf Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            {/* Pulsing ring */}
            <div className="absolute w-14 h-14 rounded-full bg-forest/10 animate-ping border border-forest/30" />
            
            {/* Green Leaf Logo in Roundabout */}
            <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gold/20 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <Image
                src="/images/logo1.svg"
                alt="Lomas Altas Ubicación"
                width={30}
                height={30}
                className="w-[70%] h-auto filter brightness-75 hue-rotate-60"
              />
            </div>
          </div>

          {/* Direction Overlay Card - Matches mockup layout */}
          <div className="absolute bottom-10 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[680px] z-15">
            <div className="bg-[#153124]/95 backdrop-blur-md border border-gold/20 px-8 py-5 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold border-r border-white/20 pr-4 shrink-0">
                  Dirección:
                </span>
                <p className="text-white text-xs md:text-[13px] font-light leading-relaxed">
                  Avenida Lomas Verdes, P.º de Lomas Verdes,
                  <br />
                  53125 Naucalpan de Juárez, Méx.
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-white text-[10px] tracking-[0.25em] uppercase font-semibold border-b border-gold hover:border-white pb-0.5 transition-colors whitespace-nowrap"
              >
                VER UBICACIÓN
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Puntos Cercanos - Dark Green Lobby background with white logos */}
      <div className="relative py-20 px-6 mt-16 overflow-hidden">
        {/* Background Lobby Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sec_log.jpg"
            alt=""
            fill
            className="object-cover"
          />
          {/* Solid Green Overlay */}
          <div className="absolute inset-0 bg-[#153124]/90 backdrop-blur-xs" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Header with Left/Right lines */}
          <div className="flex items-center w-full max-w-4xl mx-auto gap-6 mb-16">
            <div className="flex-grow h-px bg-white/20" />
            <h3 className="font-serif text-2xl md:text-3xl text-white text-center whitespace-nowrap">
              Puntos Cercanos
            </h3>
            <div className="flex-grow h-px bg-white/20" />
          </div>

          {/* Logos Grid - Flat White Silhouette styling */}
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
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
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
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
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
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
                  Colegio Carol Baur
                </span>
              </div>

              {/* Logo 4: UVM Lomas */}
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo3.svg" // fallback to logo3 with white filters
                    alt="UVM Lomas"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
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
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
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
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
                  Bellavista Country
                </span>
              </div>

              {/* Logo 7: Chamapa-Lechería */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center gap-3 group">
                <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/logo4.svg" // fallback symbol
                    alt="Chamapa-Lechería"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-white/80 text-xs md:text-sm font-serif tracking-wide">
                  Chamapa-Lechería
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
