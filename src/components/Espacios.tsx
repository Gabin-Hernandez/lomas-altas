"use client";

import { useState } from "react";
import Image from "next/image";

const modelData = {
  "Modelo A": {
    desc: "Departamentos diseñados para familias que buscan un espacio nuevo, funcional y elegante, con distribuciones amplias y terrazas privadas.",
    features: [
      "Estancia",
      "Comedor",
      "Cocina equipada",
      "Recámara principal",
      "Recámaras secundarias",
      "Estudio o family room",
      "Cuarto de lavado",
      "Cuarto de servicio, según tipología",
      "Terraza",
    ],
    acabados: [
      "Cocina equipada con cubierta de granito",
      "Piso de madera en interiores",
      "Mármol en zonas seleccionadas",
      "Terraza techada",
      "Distribución funcional e iluminación natural",
    ],
    img: "/images/render.jpg",
  },
  "Modelo B": {
    desc: "Exclusivo departamento con terraza frontal expandida y áreas sociales integradas para un estilo de vida dinámico.",
    features: [
      "Estancia doble altura",
      "Comedor formal",
      "Cocina gourmet abierta",
      "Recámara principal con walk-in closet",
      "Recámara secundaria con baño propio",
      "Family Room",
      "Área de lavado",
      "Terraza frontal expandida",
    ],
    acabados: [
      "Cubierta de cuarzo en cocina",
      "Piso de madera de ingeniería",
      "Mármol importado en baños",
      "Terraza con barandal de vidrio templado",
      "Ventilación cruzada optimizada",
    ],
    img: "/images/render.jpg", // reuse same plan with distinct text info
  },
  "Modelo C": {
    desc: "Departamentos posteriores orientados a la privacidad y el silencio, con una distribución compacta y ultra eficiente.",
    features: [
      "Estancia acogedora",
      "Comedor para 6 personas",
      "Cocina con desayunador",
      "Recámara principal con baño",
      "Dos recámaras secundarias",
      "Cuarto de lavado independiente",
      "Balcón posterior",
    ],
    acabados: [
      "Cocina integral con acabados en madera",
      "Piso cerámico texturizado en áreas húmedas",
      "Luz LED indirecta integrada",
      "Cancelería acústica premium",
      "Preparación para automatización",
    ],
    img: "/images/render.jpg",
  },
  "Penthouses": {
    desc: "El lujo máximo en doble nivel, con roof garden privado y vistas panorámicas espectaculares del desarrollo Terralago.",
    features: [
      "Estancia y comedor de triple altura",
      "Cocina con isla central de granito",
      "Master Suite con baño y tina de hidromasaje",
      "Dos Junior Suites con baño privado",
      "Estudio de televisión",
      "Roof Garden privado con asador y jacuzzi",
      "Cuarto de servicio completo",
      "3 cajones de estacionamiento",
    ],
    acabados: [
      "Piso de madera fina de nogal",
      "Mármol de Carrara en baños",
      "Equipamiento de cocina de alta gama",
      "Roof garden con deck de madera teka",
      "Cristales dobles térmicos e insonorizados",
    ],
    img: "/images/render.jpg",
  },
};

type ModelKeys = keyof typeof modelData;

export default function Espacios() {
  const [selectedModel, setSelectedModel] = useState<ModelKeys>("Modelo A");

  const current = modelData[selectedModel];

  return (
    <section id="espacios" className="relative bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-8">
          
          {/* Left Column: Model Details */}
          <div key={selectedModel} className="w-full lg:w-5/12 text-left flex flex-col justify-start animate-fade-in">
            
            {/* Title */}
            <h2 className="font-serif text-3xl md:text-4xl text-forest leading-tight mb-6">
              Distribuciones del espacio
            </h2>
            
            {/* Dynamic Description */}
            <p className="text-forest/80 text-sm md:text-[14px] font-light leading-relaxed mb-8">
              {current.desc}
            </p>

            {/* Features List */}
            <div className="flex flex-col gap-3 mb-10">
              {current.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3 border-b border-forest/10 pb-2">
                  <span className="text-gold text-sm font-medium shrink-0">+</span>
                  <span className="text-forest text-xs md:text-sm font-light">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Included Acabados Sub-section */}
            <div>
              <h3 className="font-serif text-lg text-forest mb-4">
                Acabados incluidos
              </h3>
              <div className="flex flex-col gap-3">
                {current.acabados.map((acabado) => (
                  <div key={acabado} className="flex items-center gap-3">
                    <span className="text-forest text-sm font-semibold shrink-0">✓</span>
                    <span className="text-forest/80 text-xs md:text-sm font-light leading-relaxed">
                      {acabado}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Model Tabs & Diagram (Ochre/Yellow background) */}
          <div className="w-full lg:w-7/12 flex flex-col">
            
            {/* Model Selector Tabs */}
            <div className="flex justify-end items-center border-b border-gold/15 mb-4 w-full">
              {(Object.keys(modelData) as ModelKeys[]).map((model, index, array) => (
                <div key={model} className="flex items-center">
                  <button
                    onClick={() => setSelectedModel(model)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-3.5 text-xs md:text-sm tracking-wider uppercase transition-all focus:outline-none ${
                      selectedModel === model
                        ? "bg-[#faf5f0] border-t border-l border-r border-gold/25 text-forest font-semibold"
                        : "text-forest/60 hover:text-forest"
                    }`}
                  >
                    {selectedModel === model && (
                      <span className="w-2 h-2 rounded-full bg-forest shrink-0" />
                    )}
                    {model}
                  </button>
                  {index < array.length - 1 && selectedModel !== model && selectedModel !== array[index + 1] && (
                    <div className="h-5 w-px bg-gold/25" />
                  )}
                </div>
              ))}
            </div>

            {/* Image display container with warm ochre/gold background */}
            <div className="relative w-full h-[400px] md:h-[520px] rounded-sm overflow-hidden bg-[#d9d09c] border border-gold/20 flex items-center justify-center p-6 md:p-10 shadow-xl">
              {/* Floor Plan Render */}
              <div key={selectedModel} className="relative w-full h-full transition-transform duration-500 hover:scale-[1.01] animate-fade-in">
                <Image
                  src={current.img}
                  alt={`Planta de distribución - ${selectedModel}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
