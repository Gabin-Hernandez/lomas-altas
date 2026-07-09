import Image from "next/image";

export default function Amenidades() {
  return (
    <section id="amenidades" className="relative bg-[#d9d09c] py-16 md:py-24 overflow-visible -mt-1">
      
      {/* V-shape downward transition arrow dipping into the next section */}
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-16 h-8 bg-[#d9d09c] z-30 pointer-events-none" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} 
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with Left/Right Lines */}
        <div className="flex items-center w-full max-w-5xl mx-auto gap-6 mb-16">
          <div className="flex-grow h-px bg-forest/20" />
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-forest text-center whitespace-nowrap">
            Espacios para disfrutar todos los días
          </h2>
          <div className="flex-grow h-px bg-forest/20" />
        </div>

        {/* Custom Asymmetric Masonry-style Grid */}
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          
          {/* Row 1 (55% / 45%) */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Card 1: Lobby de acceso (55%) */}
            <div className="w-full md:w-[55%] h-[280px] md:h-[350px] relative rounded-sm overflow-hidden shadow-lg border border-white/20 group">
              {/* Corner Ribbon / Triangle */}
              <div 
                className="absolute top-0 left-0 bg-[#153124] w-[300px] h-[55px] z-10 flex items-start pl-4 pt-2.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              >
                <span className="text-white text-xs md:text-sm font-serif tracking-wide">
                  Lobby de acceso
                </span>
              </div>
              <Image
                src="/images/sec_log.jpg"
                alt="Lobby de acceso"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Card 2: Gimnasio (45%) */}
            <div className="w-full md:w-[45%] h-[280px] md:h-[350px] relative rounded-sm overflow-hidden shadow-lg border border-white/20 group">
              {/* Corner Ribbon / Triangle */}
              <div 
                className="absolute top-0 left-0 bg-[#153124] w-[300px] h-[55px] z-10 flex items-start pl-4 pt-2.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              >
                <span className="text-white text-xs md:text-sm font-serif tracking-wide">
                  Gimnasio
                </span>
              </div>
              <Image
                src="/images/sec_log.jpg"
                alt="Gimnasio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center bottom' }}
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>

          {/* Row 2 (35% / 65%) */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Card 3: Estacionamiento (35%) */}
            <div className="w-full md:w-[35%] h-[280px] md:h-[350px] relative rounded-sm overflow-hidden shadow-lg border border-white/20 group">
              {/* Corner Ribbon / Triangle */}
              <div 
                className="absolute top-0 left-0 bg-[#153124] w-[300px] h-[55px] z-10 flex items-start pl-4 pt-2.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              >
                <span className="text-white text-xs md:text-sm font-serif tracking-wide">
                  Estacionamiento
                </span>
              </div>
              <Image
                src="/images/eyecatcher.jpg" // Use clean eyecatcher.jpg to avoid the white V-notch in slider2.png
                alt="Estacionamiento"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
                style={{ objectPosition: 'center bottom' }}
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Card 4: Jardín (65%) */}
            <div className="w-full md:w-[65%] h-[280px] md:h-[350px] relative rounded-sm overflow-hidden shadow-lg border border-white/20 group">
              {/* Corner Ribbon / Triangle */}
              <div 
                className="absolute top-0 left-0 bg-[#153124] w-[300px] h-[55px] z-10 flex items-start pl-4 pt-2.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              >
                <span className="text-white text-xs md:text-sm font-serif tracking-wide">
                  Jardín
                </span>
              </div>
              <Image
                src="/images/sec_log.jpg"
                alt="Jardín"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center bottom' }}
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>

          {/* Row 3 (60% / 40%) */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Card 5: Terraza (60%) */}
            <div className="w-full md:w-[60%] h-[280px] md:h-[350px] relative rounded-sm overflow-hidden shadow-lg border border-white/20 group">
              {/* Corner Ribbon / Triangle */}
              <div 
                className="absolute top-0 left-0 bg-[#153124] w-[300px] h-[55px] z-10 flex items-start pl-4 pt-2.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              >
                <span className="text-white text-xs md:text-sm font-serif tracking-wide">
                  Terraza
                </span>
              </div>
              <Image
                src="/images/eyecatcher.jpg"
                alt="Terraza"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center top' }}
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Card 6: Salón de eventos (40%) */}
            <div className="w-full md:w-[40%] h-[280px] md:h-[350px] relative rounded-sm overflow-hidden shadow-lg border border-white/20 group">
              {/* Corner Ribbon / Triangle */}
              <div 
                className="absolute top-0 left-0 bg-[#153124] w-[300px] h-[55px] z-10 flex items-start pl-4 pt-2.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              >
                <span className="text-white text-xs md:text-sm font-serif tracking-wide">
                  Salón de eventos
                </span>
              </div>
              <Image
                src="/images/sec_log.jpg"
                alt="Salón de eventos"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center center' }}
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
