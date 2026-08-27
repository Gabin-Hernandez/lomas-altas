"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contacto" className="relative text-white bg-[#193628] overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE: Image background with architectural sketch + Checkmark list */}
        <div className="relative flex flex-col justify-center px-8 py-16 md:px-14 lg:px-20 bg-[#193628] min-h-[500px]">
          {/* Background Image restricted strictly to left half */}
          <div className="absolute inset-0 z-0 bg-[#193628]">
            <Image
              src="/images/home.jpg"
              alt="Lomas Altas Arquitectura"
              fill
              unoptimized
              quality={100}
              className="object-cover object-center opacity-100"
              priority
            />
          </div>

          <div className="relative z-10 max-w-md mx-auto lg:mx-0 w-full">
            <ScrollReveal variant="slide-left" delay={150}>
              <h2 className="font-serif text-3xl md:text-4xl text-cream font-normal leading-snug mb-10">
                ¿Por qué elegir Lomas Altas?
              </h2>

              <ul className="flex flex-col gap-5">
                {[
                  "Ubicación estratégica",
                  "Baja densidad",
                  "Departamentos amplios",
                  "Terrazas privadas",
                  "Amenidades funcionales",
                  "Plusvalía en Lomas Verdes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white/95 text-base md:text-lg">
                    <Check className="h-5 w-5 text-gold-light shrink-0" />
                    <span className="font-sans font-light tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* RIGHT SIDE: Solid Green background + Contact Form */}
        <div className="relative flex flex-col justify-center px-8 py-16 md:px-14 lg:px-20 bg-[#193628] border-t lg:border-t-0 lg:border-l border-white/15">
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <ScrollReveal variant="slide-right" delay={200}>
              <h3 className="font-serif text-2xl md:text-3xl text-gold-light font-light leading-snug mb-2">
                Agenda una cita y conoce el proyecto
              </h3>
              <p className="text-white/70 text-sm font-sans font-light mb-10">
                Déjanos tus datos y te contactamos.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {/* NOMBRE */}
                <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                  <label htmlFor="contact-name" className="text-white/80 text-[11px] tracking-[0.25em] uppercase font-sans font-medium">
                    N O M B R E
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="bg-transparent text-white text-sm md:text-base focus:outline-none placeholder:text-white/30 w-full py-1 font-sans font-light"
                    placeholder="Tu Nombre Completo"
                  />
                </div>

                {/* CORREO */}
                <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                  <label htmlFor="contact-email" className="text-white/80 text-[11px] tracking-[0.25em] uppercase font-sans font-medium">
                    C O R R E O
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="bg-transparent text-white text-sm md:text-base focus:outline-none placeholder:text-white/30 w-full py-1 font-sans font-light"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                {/* TELÉFONO */}
                <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                  <label htmlFor="contact-phone" className="text-white/80 text-[11px] tracking-[0.25em] uppercase font-sans font-medium">
                    T E L É F O N O
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    className="bg-transparent text-white text-sm md:text-base focus:outline-none placeholder:text-white/30 w-full py-1 font-sans font-light"
                    placeholder="10 dígitos"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center lg:justify-start mt-6">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="bg-white/5 border border-white/30 hover:border-gold hover:bg-gold hover:text-[#193628] text-white font-sans text-xs md:text-sm tracking-[0.2em] uppercase px-10 py-3.5 rounded-none hover:shadow-[0_4px_25px_rgba(196,169,106,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {submitted ? "¡ENVIADO!" : "AGENDAR CITAS"}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}

