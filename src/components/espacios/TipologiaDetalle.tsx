"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Car,
  Bed,
  Bath,
  Layers,
  Sparkles,
  MessageCircle,
  Mail,
} from "lucide-react";
import SafeReveal from "@/components/ui/SafeReveal";
import Lightbox, { type LightboxItem } from "@/components/ui/Lightbox";
import type { Tipologia } from "./espaciosData";
import { TIPOLOGIAS, CONTACTO } from "./espaciosData";

interface TipologiaDetalleProps {
  tipologia: Tipologia;
}

export default function TipologiaDetalle({ tipologia }: TipologiaDetalleProps) {
  const [plantaActivaIndex, setPlantaActivaIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine plantas and renders for the Lightbox carousel
  const itemsLightbox: LightboxItem[] = [
    ...tipologia.plantas.map((p) => ({
      src: p.src,
      alt: p.alt,
      title: `${tipologia.nombre} — ${p.titulo}`,
      caption: `Planta arquitectónica ilustrada (${p.nivel}). Superficie total: ${tipologia.superficie}.`,
      plate: "cream" as const,
    })),
    ...tipologia.renders.map((r) => ({
      src: r.src,
      alt: r.alt,
      title: `${tipologia.nombre} — ${r.titulo}`,
      caption: r.caption,
      plate: "dark" as const,
    })),
  ];

  // Navigation: previous and next typology
  const currentIndex = TIPOLOGIAS.findIndex((t) => t.id === tipologia.id);
  const prevTipologia =
    TIPOLOGIAS[(currentIndex - 1 + TIPOLOGIAS.length) % TIPOLOGIAS.length];
  const nextTipologia = TIPOLOGIAS[(currentIndex + 1) % TIPOLOGIAS.length];

  const plantaActual = tipologia.plantas[plantaActivaIndex] || tipologia.plantas[0];

  const waMensaje = encodeURIComponent(
    `Hola, me interesa conocer disponibilidad y cotización de la ${tipologia.nombre} (${tipologia.codigo}) en Lomas Altas.`
  );
  const waHref = `https://wa.me/525610706351?text=${waMensaje}`;

  // Percentages for the area bar
  const pctInterior = Math.round((tipologia.areas.interior / tipologia.areas.total) * 100);
  const pctTerraza = Math.round((tipologia.areas.terrazaTechada / tipologia.areas.total) * 100);
  const exteriorExtra = (tipologia.areas.jardinSinTechar || 0) + (tipologia.areas.patioSinTechar || 0);
  const pctExteriorExtra = exteriorExtra > 0 ? 100 - pctInterior - pctTerraza : 0;

  return (
    <article className="min-h-screen bg-cream text-forest selection:bg-gold/20 selection:text-forest">
      {/* Top Header / Breadcrumb Bar */}
      <section className="border-b border-[#5c4a2c]/15 bg-[#153124] pt-28 pb-12 text-white md:pt-36 md:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-6">
            <Link
              href="/espacios#tipologias"
              className="inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo de tipologías
            </Link>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center px-3 py-1 font-sans text-[11px] font-semibold tracking-widest uppercase text-white shadow-sm"
                    style={{ backgroundColor: tipologia.chip }}
                  >
                    {tipologia.codigo}
                  </span>
                  <span className="font-sans text-xs font-light tracking-widest uppercase text-gold-light">
                    {tipologia.unidades} unidades en torre · {tipologia.niveles}
                  </span>
                </div>

                <h1 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {tipologia.nombre}
                </h1>
                <p className="mt-4 font-sans text-base font-light leading-relaxed text-white/80 md:text-lg">
                  {tipologia.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/contacto?modelo=${encodeURIComponent(tipologia.slug)}#solicitud`}
                  className="inline-flex items-center justify-center bg-gold px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-dark transition-all duration-300 hover:bg-gold-light hover:shadow-lg"
                >
                  Solicitar cotización
                </Link>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold-light" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-10 md:py-20 lg:px-16">
        {/* Metric Cards - Exact Areas Breakdown */}
        <SafeReveal variant="fade-up" className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]">
              01 · Desglose exacto de superficies
            </h2>
            <span className="font-sans text-xs text-[#5c4a2c]/70">Medidas arquitectónicas oficiales</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Interior */}
            <div className="border border-[#5c4a2c]/20 bg-cream-dark p-6 transition-all hover:border-[#5c4a2c]/40">
              <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5c4a2c]/80">
                Área Interior
              </span>
              <p className="mt-3 font-serif text-3xl font-light text-forest sm:text-4xl">
                {tipologia.areas.interior.toFixed(2)}{" "}
                <span className="font-sans text-lg font-normal text-[#5c4a2c]/70">m²</span>
              </p>
              <span className="mt-2 block font-sans text-xs font-light text-forest/70">
                Superficie habitable cerrada
              </span>
            </div>

            {/* Terraza */}
            <div className="border border-[#5c4a2c]/20 bg-cream-dark p-6 transition-all hover:border-[#5c4a2c]/40">
              <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5c4a2c]/80">
                Terraza Techada
              </span>
              <p className="mt-3 font-serif text-3xl font-light text-forest sm:text-4xl">
                {tipologia.areas.terrazaTechada.toFixed(2)}{" "}
                <span className="font-sans text-lg font-normal text-[#5c4a2c]/70">m²</span>
              </p>
              <span className="mt-2 block font-sans text-xs font-light text-forest/70">
                Exterior con cancelería corrida
              </span>
            </div>

            {/* Jardín o Patio si aplica */}
            {tipologia.areas.jardinSinTechar ? (
              <div className="border border-[#5c735a]/40 bg-[#f0f5ee] p-6 transition-all">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#2f4d2c]">
                  Jardín Privado
                </span>
                <p className="mt-3 font-serif text-3xl font-light text-[#1b3c2d] sm:text-4xl">
                  {tipologia.areas.jardinSinTechar.toFixed(2)}{" "}
                  <span className="font-sans text-lg font-normal text-[#2f4d2c]/80">m²</span>
                </p>
                <span className="mt-2 block font-sans text-xs font-light text-[#2f4d2c]/80">
                  Jardín frontal sin techar
                </span>
              </div>
            ) : tipologia.areas.patioSinTechar ? (
              <div className="border border-[#a8904f]/40 bg-[#faf6ed] p-6 transition-all">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#7d6731]">
                  Patio Privado
                </span>
                <p className="mt-3 font-serif text-3xl font-light text-[#5c4a2c] sm:text-4xl">
                  {tipologia.areas.patioSinTechar.toFixed(2)}{" "}
                  <span className="font-sans text-lg font-normal text-[#7d6731]/80">m²</span>
                </p>
                <span className="mt-2 block font-sans text-xs font-light text-[#7d6731]/80">
                  Patio exclusivo en azotea
                </span>
              </div>
            ) : (
              <div className="border border-[#5c4a2c]/20 bg-cream-dark p-6 transition-all">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5c4a2c]/80">
                  Orientación
                </span>
                <p className="mt-3 font-serif text-2xl font-light text-forest sm:text-3xl">
                  Exterior
                </p>
                <span className="mt-2 block font-sans text-xs font-light text-forest/70">
                  Vistas abiertas a la cañada
                </span>
              </div>
            )}

            {/* Total */}
            <div className="border-2 border-gold bg-[#153124] p-6 text-white shadow-md">
              <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-gold-light">
                Superficie Total
              </span>
              <p className="mt-3 font-serif text-3xl font-light text-gold-light sm:text-4xl">
                {tipologia.areas.total.toFixed(2)}{" "}
                <span className="font-sans text-lg font-normal text-white/80">m²</span>
              </p>
              <span className="mt-2 block font-sans text-xs font-light text-white/70">
                Área privativa total calculada
              </span>
            </div>
          </div>

          {/* Visual Proportion Bar */}
          <div className="mt-6 rounded-none border border-[#5c4a2c]/20 bg-cream-dark p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-sans text-[#5c4a2c]">
              <span>Proporción interior / exterior</span>
              <span className="font-medium">{pctInterior}% Interior · {100 - pctInterior}% Exterior</span>
            </div>
            <div className="flex h-3 w-full overflow-hidden bg-cream border border-[#5c4a2c]/15">
              <div
                style={{ width: `${pctInterior}%` }}
                className="bg-forest"
                title={`Interior: ${tipologia.areas.interior} m²`}
              />
              <div
                style={{ width: `${pctTerraza}%` }}
                className="bg-gold"
                title={`Terraza: ${tipologia.areas.terrazaTechada} m²`}
              />
              {pctExteriorExtra > 0 && (
                <div
                  style={{ width: `${pctExteriorExtra}%` }}
                  className="bg-[#5c735a]"
                  title={`Jardín/Patio: ${exteriorExtra} m²`}
                />
              )}
            </div>
          </div>
        </SafeReveal>

        {/* Section 02: Plantas Arquitectónicas Ilustradas */}
        <SafeReveal variant="fade-up" className="mb-20">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]">
                02 · Planta arquitectónica ilustrada
              </h2>
              <h3 className="mt-2 font-serif text-2xl font-light text-forest sm:text-3xl">
                {plantaActual.titulo}
              </h3>
            </div>

            {/* Level switch tabs for Duplex / 2-level models */}
            {tipologia.plantas.length > 1 && (
              <div className="flex rounded-none border border-[#5c4a2c]/30 bg-cream-dark p-1">
                {tipologia.plantas.map((planta, idx) => (
                  <button
                    key={planta.id}
                    type="button"
                    onClick={() => setPlantaActivaIndex(idx)}
                    className={`px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-all ${
                      plantaActivaIndex === idx
                        ? "bg-forest text-gold-light shadow-sm"
                        : "text-[#5c4a2c] hover:text-forest"
                    }`}
                  >
                    {planta.titulo.split("—")[0].trim()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative border border-[#5c4a2c]/20 bg-[#dbcb98]/25 p-4 sm:p-8">
            <div className="relative mx-auto flex max-w-4xl items-center justify-center overflow-hidden">
              <Image
                src={plantaActual.src}
                alt={plantaActual.alt}
                width={1200}
                height={800}
                priority
                className="h-auto max-h-[600px] w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(plantaActivaIndex)}
                className="absolute right-4 bottom-4 flex items-center gap-2 border border-forest/30 bg-forest/90 px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition-all hover:bg-forest hover:border-gold"
              >
                <Maximize2 className="h-4 w-4 text-gold-light" />
                Ampliar plano
              </button>
            </div>
            <p className="mt-4 text-center font-sans text-xs font-light text-[#5c4a2c]">
              Haz clic en ampliar para examinar la distribución arquitectónica a pantalla completa con alta resolución.
            </p>
          </div>
        </SafeReveal>

        {/* Section 03: Renders & Espacios Interiores */}
        <SafeReveal variant="fade-up" className="mb-20">
          <div className="mb-8">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]">
              03 · Renders y perspectivas interiores
            </h2>
            <h3 className="mt-2 font-serif text-2xl font-light text-forest sm:text-3xl">
              Visualización hiperrealista de los espacios
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tipologia.renders.map((render, rIdx) => {
              const itemIndex = tipologia.plantas.length + rIdx;
              return (
                <div
                  key={render.id}
                  onClick={() => setLightboxIndex(itemIndex)}
                  className="group relative cursor-pointer border border-[#5c4a2c]/20 bg-cream-dark overflow-hidden transition-all duration-300 hover:border-gold hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#153124]">
                    <Image
                      src={render.src}
                      alt={render.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deeper/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                    <div className="absolute top-3 left-3">
                      <span className="bg-forest/80 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-widest text-gold-light backdrop-blur-sm">
                        {render.espacio}
                      </span>
                    </div>

                    <div className="absolute right-3 bottom-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-1.5 bg-gold px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-forest-dark">
                        <Maximize2 className="h-3 w-3" /> Ver render
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-serif text-lg font-light text-forest group-hover:text-[#7d6731] transition-colors">
                      {render.titulo}
                    </h4>
                    <p className="mt-2 font-sans text-xs font-light leading-relaxed text-[#5c4a2c]">
                      {render.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </SafeReveal>

        {/* Section 04: Puntos Clave y Características Técnicas */}
        <SafeReveal variant="fade-up" className="mb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left: Editorial Description & Key Points */}
            <div className="lg:col-span-7">
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5c4a2c]">
                04 · Memoria descriptiva
              </h2>
              <h3 className="mt-2 font-serif text-2xl font-light text-forest sm:text-3xl">
                Diseño concebido para la amplitud y privacidad
              </h3>

              <p className="mt-6 font-sans text-sm font-light leading-relaxed text-forest/90 md:text-base">
                {tipologia.descripcionLarga}
              </p>

              <div className="mt-8 border-t border-[#5c4a2c]/15 pt-6">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5c4a2c]">
                  Atributos destacados de la tipología
                </h4>
                <ul className="mt-4 space-y-3">
                  {tipologia.puntosClave.map((punto, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-light text-forest/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Technical Specs Table */}
            <div className="lg:col-span-5">
              <div className="border border-[#5c4a2c]/20 bg-cream-dark p-6 sm:p-8">
                <h4 className="font-serif text-xl font-light text-forest mb-6 pb-4 border-b border-[#5c4a2c]/20 flex items-center justify-between">
                  <span>Ficha Técnica</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-[#7d6731]">
                    {tipologia.codigo}
                  </span>
                </h4>

                <dl className="divide-y divide-[#5c4a2c]/15 text-xs sm:text-sm">
                  {tipologia.caracteristicas.map((item, idx) => (
                    <div key={idx} className="py-3 flex justify-between gap-4">
                      <dt className="font-sans font-medium text-[#5c4a2c]/80 uppercase tracking-wider text-[11px]">
                        {item.label}
                      </dt>
                      <dd className="font-sans font-light text-forest text-right">
                        {item.valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </SafeReveal>

        {/* Section 05: Direct Conversion CTA Card */}
        <SafeReveal variant="fade-up" className="mb-20">
          <div className="relative overflow-hidden border border-gold bg-[#153124] p-8 text-white md:p-12 lg:p-16">
            <div className="relative z-10 max-w-3xl">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
                Atención personalizada
              </span>
              <h3 className="mt-3 font-serif text-2xl font-light text-white sm:text-3xl md:text-4xl">
                ¿Deseas conocer más sobre la {tipologia.nombre}?
              </h3>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-white/80 sm:text-base">
                Nuestros asesores patrimoniales pueden compartirte la lista de precios vigente, esquemas de pago y coordinar una visita a la sala de ventas.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/contacto?modelo=${encodeURIComponent(tipologia.slug)}#solicitud`}
                  className="inline-flex items-center justify-center bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-dark transition-all duration-300 hover:bg-gold-light hover:shadow-xl"
                >
                  Solicitar cotización
                </Link>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gold px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-light transition-all duration-300 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  Escribir a un asesor
                </a>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-16 select-none font-serif text-[12rem] font-light text-white/5"
            >
              {tipologia.letra}
            </div>
          </div>
        </SafeReveal>

        {/* Bottom Typology Carousel / Navigation */}
        <section className="border-t border-[#5c4a2c]/20 pt-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <Link
              href={`/espacios/${prevTipologia.slug}`}
              className="group flex items-center gap-4 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-[#5c4a2c]/30 group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                <ArrowLeft className="h-4 w-4 text-[#5c4a2c] group-hover:text-forest" />
              </div>
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5c4a2c]/80">
                  Tipología anterior
                </span>
                <span className="font-serif text-lg font-light text-forest group-hover:text-[#7d6731] transition-colors">
                  {prevTipologia.nombre}
                </span>
              </div>
            </Link>

            <Link
              href="/espacios#tipologias"
              className="text-center font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#7d6731] hover:text-forest transition-colors"
            >
              Ver las 4 tipologías
            </Link>

            <Link
              href={`/espacios/${nextTipologia.slug}`}
              className="group flex items-center justify-end gap-4 text-right"
            >
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5c4a2c]/80">
                  Siguiente tipología
                </span>
                <span className="font-serif text-lg font-light text-forest group-hover:text-[#7d6731] transition-colors">
                  {nextTipologia.nombre}
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center border border-[#5c4a2c]/30 group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                <ArrowRight className="h-4 w-4 text-[#5c4a2c] group-hover:text-forest" />
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Lightbox for zooming blueprints & renders */}
      <Lightbox
        items={itemsLightbox}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={(next) => setLightboxIndex(next)}
      />
    </article>
  );
}
