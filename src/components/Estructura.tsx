import Image from "next/image";

export default function Estructura() {
  return (
    <section id="estructura" className="relative bg-cream-dark/30 py-16 md:py-24 border-t border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.25em] uppercase font-semibold block mb-2">
            Niveles
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-forest leading-tight">
            Distribución por <em className="italic text-gold">plantas</em>
          </h2>
          <div className="w-12 h-px bg-gold/60 mx-auto mt-4" />
        </div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side: Legend & Statistics */}
          <div className="w-full lg:w-4/12 text-left bg-white/60 backdrop-blur-sm border border-gold/20 p-8 rounded-sm shadow-md">
            <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold block mb-2">
              18 Unidades | 5 Niveles
            </span>
            <h3 className="font-serif text-xl text-forest mb-6">
              Modelos disponibles
            </h3>

            {/* Model Legend List */}
            <div className="flex flex-col gap-5">
              {[
                { name: "Modelo A", qty: "8 Unidades", desc: "Departamentos tipo estándar con excelente distribución.", color: "bg-[#b1ad8a]" },
                { name: "Modelo B", qty: "4 Unidades", desc: "Departamentos con amplias terrazas frontales.", color: "bg-[#cda662]" },
                { name: "Modelo C", qty: "4 Unidades", desc: "Departamentos traseros con mayor privacidad.", color: "bg-[#9da4b6]" },
                { name: "Penthouse", qty: "2 Unidades", desc: "Doble altura con roof garden privado en el último nivel.", color: "bg-[#cca79f]" }
              ].map((model) => (
                <div key={model.name} className="flex gap-4 items-start">
                  <div className={`w-5 h-5 rounded-sm ${model.color} shrink-0 mt-1 shadow-sm`} />
                  <div>
                    <div className="flex justify-between w-full text-sm font-semibold text-forest">
                      <span>{model.name}</span>
                      <span className="text-gold-dark">{model.qty}</span>
                    </div>
                    <p className="text-forest/70 text-xs mt-1 leading-relaxed">
                      {model.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Building Cross Section Image (estructura.jpg) */}
          <div className="w-full lg:w-8/12 flex justify-center">
            <div className="relative w-full max-w-3xl transition-transform duration-500 hover:scale-[1.01] shadow-lg rounded-sm overflow-hidden bg-white border border-gold/15 p-4 md:p-6">
              <Image
                src="/images/estructura.jpg"
                alt="Distribución arquitectónica de niveles y modelos Lomas Altas"
                width={1200}
                height={750}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
