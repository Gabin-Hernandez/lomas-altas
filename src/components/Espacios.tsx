"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface FeatureItem {
  name: string;
  tag: string;
  desc: string;
  x: number; // percentage left
  y: number; // percentage top
}

interface ModelInfo {
  slug: string;
  codigo: string;
  superficie: string;
  desc: string;
  areas: {
    interior: string;
    terraza: string;
    exteriorExtra?: string;
    total: string;
  };
  features: FeatureItem[];
  acabados: string[];
  img: string;
}

const modelData: Record<string, ModelInfo> = {
  "Tipología A (NJ)": {
    slug: "ta-nj-pb",
    codigo: "TA-NJ-PB",
    superficie: "351.36 m²",
    desc: "Exclusiva residencia dúplex en Planta Baja con 263.8 m² de área interior, terraza techada y jardín privado sin techar de 46.39 m².",
    areas: {
      interior: "263.80 m²",
      terraza: "41.17 m²",
      exteriorExtra: "46.39 m² de jardín",
      total: "351.36 m²",
    },
    features: [
      { name: "Jardín privado", tag: "EXTERIOR EXCLUSIVO", desc: "46.39 m² de jardín privado con conexión directa a la estancia.", x: 32, y: 72 },
      { name: "Estancia en doble altura", tag: "ÁREA SOCIAL", desc: "Área social amplia y luminosa integrada con ventanales hacia el jardín.", x: 42, y: 55 },
      { name: "Comedor formal", tag: "ÁREA FORMAL", desc: "Capacidad para 8 comensales con paso directo a la cocina.", x: 52, y: 46 },
      { name: "Cocina integral equipada", tag: "EQUIPAMIENTO PREMIUM", desc: "Cubierta de granito, frentes en madera clara y electrodomésticos empotrados.", x: 50, y: 22 },
      { name: "Master Suite (PA)", tag: "SUITE PRINCIPAL", desc: "Recámara principal en planta alta con vestidor walk-in y baño propio.", x: 30, y: 35 },
      { name: "Recámaras secundarias", tag: "HABITACIONES", desc: "Habitaciones amplias con clóset y luz natural.", x: 30, y: 22 },
      { name: "Terraza techada", tag: "TERRAZA PRIVADA", desc: "41.17 m² techados con vista y acceso al jardín.", x: 44, y: 68 },
    ],
    acabados: [
      "Jardín privado sin techar de 46.39 m²",
      "Piso de madera de ingeniería en recámaras",
      "Mármol travertino en baños",
      "Cocina equipada con cubierta de granito",
      "2 a 3 cajones de estacionamiento techados",
    ],
    img: "/images/tipologias/ta-nj-pb/planta-pb.jpg",
  },
  "Tipología A": {
    slug: "ta",
    codigo: "TA",
    superficie: "191.00 m²",
    desc: "El modelo insignia de los niveles 1 al 4: 150 m² habitables y una generosa terraza corrida de 41 m² a lo largo de toda la fachada.",
    areas: {
      interior: "150.00 m²",
      terraza: "41.00 m²",
      total: "191.00 m²",
    },
    features: [
      { name: "Estancia corrida", tag: "ÁREA SOCIAL", desc: "Espacio amplio y luminoso sin muros intermedios y vista a la terraza.", x: 42, y: 56 },
      { name: "Comedor", tag: "ÁREA FORMAL", desc: "Área formal de comedor para 8 comensales conectada a la cocina.", x: 52, y: 46 },
      { name: "Cocina integral", tag: "EQUIPAMIENTO PREMIUM", desc: "Cocina equipada con barra desayunador y cubierta de granito.", x: 50, y: 22 },
      { name: "Recámara principal", tag: "SUITE PRINCIPAL", desc: "Master suite con cama King Size, walk-in closet y baño completo.", x: 30, y: 58 },
      { name: "Recámaras secundarias", tag: "HABITACIONES", desc: "Dos recámaras secundarias con clóset y luz natural.", x: 30, y: 36 },
      { name: "Estudio / Family Room", tag: "MULTIUSOS", desc: "Área flexible para oficina o sala de televisión.", x: 38, y: 22 },
      { name: "Terraza techada", tag: "EXTERIOR", desc: "Terraza frontal corrida de 41 m² con jardineras integradas.", x: 44, y: 72 },
    ],
    acabados: [
      "150 m² interiores + 41 m² de terraza",
      "Cancelería de piso a techo acústica",
      "Travertino en baño principal con doble lavabo",
      "Cuarto de lavado independiente",
      "2 cajones de estacionamiento techados",
    ],
    img: "/images/tipologias/ta/planta.jpg",
  },
  "Tipología B": {
    slug: "tb",
    codigo: "TB",
    superficie: "188.94 m²",
    desc: "Distribución equilibrada y funcional con 153.34 m² interiores y una terraza techada de 35.6 m² orientada a vistas panorámicas.",
    areas: {
      interior: "153.34 m²",
      terraza: "35.60 m²",
      total: "188.94 m²",
    },
    features: [
      { name: "Estancia social", tag: "ÁREA SOCIAL", desc: "Área social fluida conectada con la terraza frontal.", x: 53, y: 63 },
      { name: "Comedor", tag: "ÁREA FORMAL", desc: "Comedor con capacidad para 6-8 comensales.", x: 53, y: 49 },
      { name: "Cocina gourmet", tag: "COCINA INTEGRAL", desc: "Cocina de diseño contemporáneo con barra de trabajo.", x: 35, y: 63 },
      { name: "Recámara principal", tag: "SUITE", desc: "Suite principal con baño privado y clóset vestidor.", x: 72, y: 65 },
      { name: "Recámaras secundarias", tag: "HABITACIONES", desc: "Recámaras privadas con ventilación natural.", x: 48, y: 24 },
      { name: "Terraza techada", tag: "EXTERIOR", desc: "35.60 m² de terraza techada.", x: 44, y: 76 },
    ],
    acabados: [
      "153.34 m² interiores + 35.6 m² terraza",
      "Madera de ingeniería en estancias y recámaras",
      "Mármol en baños y cubiertas de granito",
      "Iluminación arquitectónica LED",
      "2 cajones de estacionamiento techados",
    ],
    img: "/images/tipologias/tb/planta.jpg",
  },
  "Penthouse (PH)": {
    slug: "ta-ph-pb",
    codigo: "TA-PH-PB",
    superficie: "384.84 m²",
    desc: "La máxima expresión de lujo en dos niveles (pisos 5 y 6): 231.94 m² interiores, terraza monumental de 82 m² y patio privado sin techar de 70.9 m².",
    areas: {
      interior: "231.94 m²",
      terraza: "82.00 m²",
      exteriorExtra: "70.90 m² de patio",
      total: "384.84 m²",
    },
    features: [
      { name: "Terraza monumental", tag: "TERRAZA PRIVADA", desc: "82 m² de terraza techada con vistas panorámicas a toda la cañada.", x: 44, y: 72 },
      { name: "Patio en azotea", tag: "ROOF GARDEN", desc: "70.90 m² de patio privado sin techar para asador y convivencia.", x: 32, y: 72 },
      { name: "Gran Estancia", tag: "ÁREA SOCIAL", desc: "Estancia de gran altura con ventanales corredizos continuos.", x: 42, y: 55 },
      { name: "Cocina de diseñador", tag: "COCINA PREMIUM", desc: "Cocina gourmet con isla y cubiertas en granito importado.", x: 50, y: 22 },
      { name: "Master Suite Penthouse", tag: "LUXURY SUITE", desc: "Master suite privada con tina, vestidor y balcón.", x: 30, y: 42 },
      { name: "Junior Suites", tag: "SUITES PRIVADAS", desc: "Suites secundarias completas con baño propio.", x: 30, y: 26 },
    ],
    acabados: [
      "384.84 m² totales en doble nivel",
      "Terraza techada de 82 m² + Patio privado de 70.9 m²",
      "Carpinterías y acabados de lujo superior",
      "3 cajones de estacionamiento independientes",
      "Vistas panorámicas en la cúspide de la torre",
    ],
    img: "/images/tipologias/ta-ph-pb/planta-pb.jpg",
  },
};

type ModelKeys = keyof typeof modelData;

export default function Espacios() {
  const [selectedModel, setSelectedModel] = useState<ModelKeys>("Tipología A");
  const [activeFeatureName, setActiveFeatureName] = useState<string>("");

  const current = modelData[selectedModel];
  const activeFeature =
    current.features.find((f) => f.name === activeFeatureName) || null;

  return (
    <section id="espacios" className="relative bg-cream pt-16 md:pt-24 pb-16 overflow-hidden">
      {/* Background Sand-Gold Bar extending seamlessly for right side below header */}
      <div className="absolute right-0 bottom-0 top-[230px] sm:top-[240px] lg:top-[250px] w-full lg:w-[58%] bg-[#ddcc98] z-0" />

      <div className="max-w-[1600px] mx-auto px-6 lg:pl-12 lg:pr-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]">
              Prototipos y Distribución
            </span>
            <h2 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] text-[#5c4a2c] leading-tight mt-1">
              Departamentos y Penthouses
            </h2>
          </div>

          <Link
            href="/espacios"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#153223] hover:text-[#7d6731] transition-colors pb-1 border-b border-[#153223] w-fit"
          >
            Ver catálogo completo de espacios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Model Details */}
          <div className="lg:col-span-5 text-left flex flex-col justify-start lg:pr-6">
            {/* Header of the Selected Model */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#153223] text-gold-light px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wider uppercase">
                  {current.codigo}
                </span>
                <span className="font-serif text-2xl font-light text-[#5c4a2c]">
                  {current.superficie} totales
                </span>
              </div>
              <p className="text-[#5c4a2c]/85 text-xs sm:text-sm font-light leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Quick Areas Breakdown Badges */}
            <div className="grid grid-cols-2 gap-2 mb-6 max-w-md bg-white/70 p-3 border border-[#5c4a2c]/15">
              <div className="text-xs">
                <span className="block font-sans text-[10px] font-semibold uppercase text-[#5c4a2c]/70">
                  Interior
                </span>
                <span className="font-serif text-base text-[#153223]">
                  {current.areas.interior}
                </span>
              </div>
              <div className="text-xs">
                <span className="block font-sans text-[10px] font-semibold uppercase text-[#5c4a2c]/70">
                  Terraza
                </span>
                <span className="font-serif text-base text-[#153223]">
                  {current.areas.terraza}
                </span>
              </div>
              {current.areas.exteriorExtra && (
                <div className="col-span-2 pt-1 border-t border-[#5c4a2c]/10 text-xs">
                  <span className="font-sans text-[10px] font-semibold uppercase text-[#7d6731]">
                    Exterior adicional:{" "}
                  </span>
                  <span className="font-sans text-xs font-medium text-[#153223]">
                    {current.areas.exteriorExtra}
                  </span>
                </div>
              )}
            </div>

            {/* Features List with interactive click */}
            <div className="flex flex-col gap-2 mb-6 max-w-md">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#5c4a2c]">
                Zonas del prototipo
              </span>
              {current.features.map((feat) => {
                const isActive = activeFeatureName === feat.name;
                return (
                  <button
                    key={feat.name}
                    type="button"
                    onClick={() => setActiveFeatureName(feat.name)}
                    className={`flex items-center gap-3 text-left w-full transition-all duration-200 border-b border-[#5c4a2c]/15 pb-2 pt-1 px-2 rounded-xs group ${
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

            {/* Call to Action Button to Model Page */}
            <div className="mt-2 max-w-md pt-2">
              <Link
                href={`/espacios/${current.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#153223] hover:bg-forest text-gold-light hover:text-white px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-md"
              >
                Ver ficha y renders de {current.codigo}
                <ArrowRight className="h-4 w-4 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Model Tabs & Diagram with Pins & Popover */}
          <div className="lg:col-span-7 flex flex-col w-full relative pt-2 lg:pt-4">
            {/* Model Selector Tabs */}
            <div className="flex flex-wrap justify-start lg:justify-end items-center gap-2 mb-4 w-full pr-0 lg:pr-12">
              {Object.keys(modelData).map((modelName) => {
                const isSelected = selectedModel === modelName;
                return (
                  <button
                    key={modelName}
                    type="button"
                    onClick={() => {
                      setSelectedModel(modelName as ModelKeys);
                      setActiveFeatureName("");
                    }}
                    className={`px-3.5 py-2 font-sans text-xs sm:text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? "bg-white text-[#153223] shadow-md border-b-2 border-[#153223] font-semibold"
                        : "bg-white/40 text-[#5c4a2c] hover:bg-white/70 hover:text-[#153223]"
                    }`}
                  >
                    {isSelected && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#153223] mr-1.5 align-middle" />
                    )}
                    {modelName}
                  </button>
                );
              })}
            </div>

            {/* Floor Plan Image Container with Pins and Popover Tooltip */}
            <div className="relative w-full flex items-center justify-center bg-white/50 border border-[#5c4a2c]/15 p-3 sm:p-6">
              <div className="relative w-full max-w-[540px] aspect-[2550/3300] mx-auto flex items-center justify-center">
                <Image
                  key={selectedModel}
                  src={current.img}
                  alt={`Planta de distribución - ${selectedModel}`}
                  fill
                  className="object-contain object-center transition-opacity duration-300"
                  priority
                />

                {/* Hotspot Pins positioned over render */}
                {current.features.map((feat) => {
                  const isActive = activeFeatureName === feat.name;
                  return (
                    <button
                      key={feat.name}
                      type="button"
                      onClick={() => setActiveFeatureName(feat.name)}
                      style={{ left: `${feat.x}%`, top: `${feat.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none cursor-pointer"
                      title={feat.name}
                    >
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <div className="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping" />
                        )}
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

                {/* Floating Popover Tooltip Card */}
                {activeFeature && (
                  <div
                    style={{
                      left: `${Math.min(Math.max(activeFeature.x - 20, 2), 35)}%`,
                      top: `${Math.min(Math.max(activeFeature.y - 10, 2), 50)}%`,
                    }}
                    className="absolute z-40 w-64 sm:w-72 max-w-[85%] bg-[#1b2620]/95 backdrop-blur-md text-white border border-[#d4c491]/40 p-4 sm:p-5 rounded-sm shadow-2xl transition-all duration-300 animate-fade-in pointer-events-auto origin-top-left"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-sans text-sm sm:text-base font-semibold tracking-wide text-white leading-snug">
                        {activeFeature.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveFeatureName("")}
                        className="shrink-0 w-7 h-7 -mr-1 -mt-1 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-bold transition-colors focus:outline-none focus:ring-1 focus:ring-[#d4c491]"
                        title="Cerrar"
                        aria-label="Cerrar detalles"
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

                    <Link
                      href={`/espacios/${current.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-gold-light hover:text-white"
                    >
                      Ver planta completa en alta resolución
                      <ArrowRight className="h-3 w-3" />
                    </Link>
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
