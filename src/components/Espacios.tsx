"use client";

import { useState } from "react";
import Image from "next/image";

interface FeatureItem {
  name: string;
  tag: string;
  desc: string;
  x: number; // percentage left
  y: number; // percentage top
}

const modelData: Record<
  string,
  {
    desc: string;
    features: FeatureItem[];
    acabados: string[];
    img: string;
  }
> = {
  "Modelo A": {
    desc: "Departamentos y penthouses diseñados para familias que buscan un espacio nuevo, funcional y elegante, con distribuciones amplias y terrazas privadas.",
    features: [
      { name: "Estancia", tag: "ÁREA SOCIAL", desc: "Espacio amplio y luminoso integrado con el área social y vista a la terraza.", x: 54, y: 67 },
      { name: "Comedor", tag: "ÁREA FORMAL", desc: "Área formal de comedor con capacidad para 6-8 comensales, conectada con la cocina.", x: 57, y: 50 },
      { name: "Cocina equipada", tag: "EQUIPAMIENTO PREMIUM", desc: "Cocina integral equipada con cubierta de granito, estufa y amplio espacio de almacenamiento.", x: 58, y: 14 },
      { name: "Recámara principal", tag: "SUITE PRINCIPAL", desc: "Recámara principal con espacio para cama King Size, vestidor y baño privado completo.", x: 31, y: 64 },
      { name: "Recámaras secundarias", tag: "HABITACIONES", desc: "Amplias recámaras secundarias con clóset integrado y excelente iluminación natural.", x: 35, y: 46 },
      { name: "Estudio o family room", tag: "ESPACIO MULTIUSOS", desc: "Espacio versátil ideal para estudio de trabajo, área de TV o sala de estar familiar.", x: 44, y: 15 },
      { name: "Cuarto de lavado", tag: "INDEPENDIENTE", desc: "Cuarto de lavado independiente con espacio para lavadora, secadora y almacenamiento.", x: 67, y: 22 },
      { name: "Cuarto de servicio, según tipología", tag: "ÁREA DE SERVICIO", desc: "Cuarto de servicio independiente con baño propio según la tipología elegida.", x: 64, y: 32 },
      { name: "Terraza", tag: "TERRAZA PRIVADA", desc: "Terraza privada con acabados de primera calidad, ideal para convivencias al aire libre.", x: 48, y: 86 },
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
      { name: "Estancia doble altura", tag: "ÁREA SOCIAL", desc: "Estancia espectacular con doble altura y vistas panorámicas.", x: 54, y: 67 },
      { name: "Comedor formal", tag: "ÁREA FORMAL", desc: "Comedor elegante integrado a la cocina gourmet.", x: 57, y: 50 },
      { name: "Cocina gourmet abierta", tag: "ISLA DE GRANITO", desc: "Cocina gourmet de concepto abierto con acabados de lujo.", x: 58, y: 14 },
      { name: "Recámara principal con walk-in closet", tag: "MASTER SUITE", desc: "Suite principal con amplio vestidor tipo walk-in.", x: 31, y: 64 },
      { name: "Recámara secundaria con baño propio", tag: "HABITACIÓN SUITE", desc: "Recámara secundaria privada con baño en suite.", x: 35, y: 46 },
      { name: "Family Room", tag: "SALA DE TV", desc: "Sala de estar familiar íntima y acogedora.", x: 44, y: 15 },
      { name: "Área de lavado", tag: "SERVICIOS", desc: "Área de lavado funcional e independiente.", x: 67, y: 22 },
      { name: "Terraza frontal expandida", tag: "EXTERIOR", desc: "Terraza expandida a lo largo de toda la fachada.", x: 48, y: 86 },
    ],
    acabados: [
      "Cubierta de cuarzo en cocina",
      "Piso de madera de ingeniería",
      "Mármol importado en baños",
      "Terraza con barandal de vidrio templado",
      "Ventilación cruzada optimizada",
    ],
    img: "/images/render.jpg",
  },
  "Modelo C": {
    desc: "Departamentos posteriores orientados a la privacidad y el silencio, con una distribución compacta y ultra eficiente.",
    features: [
      { name: "Estancia acogedora", tag: "SALA DE ESTAR", desc: "Estancia acogedora optimizada para el máximo aprovechamiento del espacio.", x: 54, y: 67 },
      { name: "Comedor para 6 personas", tag: "COMEDOR", desc: "Comedor funcional de 6 plazas.", x: 57, y: 50 },
      { name: "Cocina con desayunador", tag: "COCINA INTEGRAL", desc: "Cocina integral con barra desayunadora de granito.", x: 58, y: 14 },
      { name: "Recámara principal con baño", tag: "SUITE", desc: "Recámara principal con baño privado y clóset amplio.", x: 31, y: 64 },
      { name: "Dos recámaras secundarias", tag: "HABITACIONES", desc: "Dos recámaras secundarias llenas de luz natural.", x: 35, y: 46 },
      { name: "Cuarto de lavado independiente", tag: "LAVADO", desc: "Cuarto de lavado cerrado e independiente.", x: 67, y: 22 },
      { name: "Balcón posterior", tag: "BALCÓN", desc: "Balcón posterior con vista a jardines interiores.", x: 48, y: 86 },
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
      { name: "Estancia y comedor de triple altura", tag: "GRAN ESTANCIA", desc: "Espacio majestuoso de triple altura con ventanales de piso a techo.", x: 54, y: 67 },
      { name: "Cocina con isla central de granito", tag: "COCINA PREMIUM", desc: "Cocina de diseñador con isla central de granito importado.", x: 58, y: 14 },
      { name: "Master Suite con baño y tina", tag: "LUXURY SUITE", desc: "Master Suite privada con tina de hidromasaje y balcón.", x: 31, y: 64 },
      { name: "Dos Junior Suites con baño privado", tag: "JUNIOR SUITES", desc: "Dos amplias Junior Suites, cada una con baño privado.", x: 35, y: 46 },
      { name: "Estudio de televisión", tag: "MEDIA ROOM", desc: "Sala de cine o estudio privado acustizado.", x: 44, y: 15 },
      { name: "Roof Garden privado con asador", tag: "ROOF GARDEN", desc: "Exclusivo Roof Garden privado equipado con asador y jacuzzi.", x: 67, y: 22 },
      { name: "Cuarto de servicio completo", tag: "SERVICIOS", desc: "Cuarto de servicio completo con baño.", x: 64, y: 32 },
      { name: "3 cajones de estacionamiento", tag: "ESTACIONAMIENTO", desc: "3 cajones de estacionamiento independientes y techados.", x: 48, y: 86 },
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
  const [activeFeatureName, setActiveFeatureName] = useState<string>("");

  const current = modelData[selectedModel];
  const activeFeature =
    current.features.find((f) => f.name === activeFeatureName) || null;

  return (
    <section id="espacios" className="relative bg-cream pt-16 md:pt-24 pb-12 overflow-hidden">
      {/* Background Sand-Gold Bar extending seamlessly for right side to join Amenidades */}
      <div className="absolute right-0 bottom-0 top-[110px] sm:top-[130px] lg:top-[140px] w-full lg:w-[58%] bg-[#ddcc98] z-0" />

      <div className="max-w-[1600px] mx-auto px-6 lg:pl-12 lg:pr-0 relative z-10">
        
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Model Details */}
          <div className="lg:col-span-5 text-left flex flex-col justify-start lg:pr-6">
            
            {/* Title */}
            <h2 className="font-sans font-light text-3xl md:text-4xl lg:text-[2.6rem] text-[#5c4a2c] leading-tight mb-4">
              Distribuciones del espacio
            </h2>
            
            {/* Dynamic Description */}
            <p className="text-[#5c4a2c]/85 text-xs sm:text-sm font-light leading-relaxed mb-6 max-w-md">
              {current.desc}
            </p>

            {/* Features List with interactive click */}
            <div className="flex flex-col gap-2 mb-8 max-w-md">
              {current.features.map((feat) => {
                const isActive = activeFeatureName === feat.name;
                return (
                  <button
                    key={feat.name}
                    onClick={() => setActiveFeatureName(feat.name)}
                    className={`flex items-center gap-3 text-left w-full transition-all duration-200 border-b border-[#5c4a2c]/15 pb-2.5 pt-1 px-2 rounded-xs group ${
                      isActive
                        ? "bg-[#153223] text-white font-medium shadow-sm border-transparent"
                        : "hover:bg-[#5c4a2c]/5 text-[#5c4a2c]"
                    }`}
                  >
                    <span
                      className={`text-sm shrink-0 transition-colors ${
                        isActive ? "text-gold-light font-bold" : "text-[#5c4a2c]"
                      }`}
                    >
                      +
                    </span>
                    <span className="text-xs sm:text-sm tracking-wide">
                      {feat.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Included Acabados Sub-section */}
            <div className="mt-2 max-w-md">
              <h3 className="font-sans text-base md:text-lg text-[#5c4a2c] font-normal mb-3">
                Acabados incluidos
              </h3>
              <div className="flex flex-col gap-2">
                {current.acabados.map((acabado) => (
                  <div key={acabado} className="flex items-start gap-3">
                    <span className="text-[#5c4a2c] text-xs sm:text-sm font-semibold shrink-0 mt-0.5">✓</span>
                    <span className="text-[#5c4a2c]/85 text-xs sm:text-sm font-light leading-relaxed">
                      {acabado}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Model Tabs & Diagram with Pins & Popover */}
          <div className="lg:col-span-7 flex flex-col w-full relative pt-2 lg:pt-4">
            
            {/* Model Selector Tabs */}
            <div className="flex justify-end items-center gap-2 mb-4 w-full pr-6 lg:pr-12">
              {(Object.keys(modelData) as ModelKeys[]).map((model, index, array) => (
                <div key={model} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedModel(model);
                      setActiveFeatureName("");
                    }}
                    className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-sans tracking-wide transition-all ${
                      selectedModel === model
                        ? "bg-white border border-[#5c4a2c]/20 text-[#5c4a2c] font-normal shadow-xs rounded-t-sm"
                        : "text-[#5c4a2c]/65 hover:text-[#5c4a2c] font-light"
                    }`}
                  >
                    {selectedModel === model && (
                      <span className="w-2 h-2 rounded-full bg-[#1b3c2d] shrink-0" />
                    )}
                    {model}
                  </button>
                  {index < array.length - 1 && (
                    <span className="text-[#5c4a2c]/30 font-light text-xs sm:text-sm">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* Floor Plan Image Container with Pins and Popover Tooltip */}
            <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px] p-4 sm:p-6 md:p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                
                {/* Render Image */}
                <Image
                  key={selectedModel}
                  src={current.img}
                  alt={`Planta de distribución - ${selectedModel}`}
                  fill
                  className="object-contain object-center transition-opacity duration-300"
                  priority
                />

                {/* Hotspot Pins (pin.svg) positioned over render */}
                {current.features.map((feat) => {
                  const isActive = activeFeatureName === feat.name;
                  return (
                    <button
                      key={feat.name}
                      onClick={() => setActiveFeatureName(feat.name)}
                      style={{ left: `${feat.x}%`, top: `${feat.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none cursor-pointer"
                      title={feat.name}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Pulse Ring when Active */}
                        {isActive && (
                          <div className="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping" />
                        )}
                        {/* pin.svg icon */}
                        <div
                          className={`relative w-7 h-8 sm:w-8 sm:h-9 transition-transform duration-300 ${
                            isActive
                              ? "scale-125 filter drop-shadow-lg"
                              : "hover:scale-110 opacity-90"
                          }`}
                        >
                          <Image
                            src="/images/pin.svg"
                            alt={feat.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Floating Popover Tooltip Card next to Active Pin (Exact Match to Image 1) */}
                {activeFeature && (
                  <div
                    style={{
                      left: `${Math.min(Math.max(activeFeature.x - 18, 5), 55)}%`,
                      top: `${Math.min(Math.max(activeFeature.y - 12, 10), 65)}%`,
                    }}
                    className="absolute z-30 w-72 sm:w-80 bg-[#1b2620]/95 backdrop-blur-md text-white border border-[#d4c491]/30 p-5 rounded-lg shadow-2xl transition-all duration-300 animate-fade-in pointer-events-auto"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-sans text-base font-semibold tracking-wide text-white">
                        {activeFeature.name}
                      </h4>
                      <button
                        onClick={() => setActiveFeatureName("")}
                        className="text-white/50 hover:text-white text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#d4c491] mb-2 block font-medium">
                      {activeFeature.tag}
                    </span>

                    <p className="font-sans text-xs font-light leading-relaxed text-white/85">
                      {activeFeature.desc}
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
