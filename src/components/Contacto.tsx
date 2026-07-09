"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contacto" className="bg-[#153124] py-16 md:py-24 text-white relative">
      
      {/* Decorative Blueprint watermark of building render (optional aesthetic touch) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/estructura.jpg"
          alt=""
          fill
          className="object-cover invert"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Section Header with Left and Right Lines */}
        <div className="flex items-center w-full max-w-4xl mx-auto gap-6 mb-16">
          <div className="flex-1 h-px bg-white/20" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white text-center whitespace-nowrap">
            Contáctanos
          </h2>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-12">
          
          {/* Left Column: Why Choose Lomas Altas */}
          <div className="w-full lg:w-5/12 text-left flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-8">
              ¿Por qué elegir Lomas Altas?
            </h3>
            
            {/* Checked features list */}
            <ul className="flex flex-col gap-5">
              {[
                { title: "Ubicación estratégica", desc: "En el corazón de Lomas Verdes, con accesos rápidos y cercanía a los mejores colegios y centros comerciales." },
                { title: "Baja densidad", desc: "Un desarrollo exclusivo de solo 18 unidades que garantiza privacidad y tranquilidad para tu familia." },
                { title: "Departamentos amplios", desc: "Espacios habitables de 105 m² con distribuciones óptimas, luz natural y acabados de primera calidad." }
              ].map((item) => (
                <li key={item.title} className="flex gap-4 items-start">
                  {/* Gold Checkmark */}
                  <span className="text-gold text-lg font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="text-white text-sm md:text-base font-semibold tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-xs md:text-sm font-light mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-7/12 border-l border-white/10 lg:pl-16">
            <h3 className="text-gold text-xl font-serif font-light mb-2">
              Agenda una cita y conoce el proyecto
            </h3>
            <p className="text-white/60 text-xs md:text-sm font-light mb-8">
              Déjanos tus datos y te contactamos.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                <label htmlFor="contact-name" className="text-white/50 text-[10px] tracking-widest uppercase font-semibold">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  className="bg-transparent text-white text-sm focus:outline-none placeholder:text-white/25 w-full py-1"
                  placeholder="Tu Nombre Completo"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                <label htmlFor="contact-email" className="text-white/50 text-[10px] tracking-widest uppercase font-semibold">
                  Correo
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  className="bg-transparent text-white text-sm focus:outline-none placeholder:text-white/25 w-full py-1"
                  placeholder="tu@correo.com"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                <label htmlFor="contact-phone" className="text-white/50 text-[10px] tracking-widest uppercase font-semibold">
                  Teléfono
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  className="bg-transparent text-white text-sm focus:outline-none placeholder:text-white/25 w-full py-1"
                  placeholder="55 1234 5678"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 border-b border-white/20 focus-within:border-gold pb-2 transition-colors duration-300">
                <label htmlFor="contact-message" className="text-white/50 text-[10px] tracking-widest uppercase font-semibold">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  rows={2}
                  className="bg-transparent text-white text-sm focus:outline-none placeholder:text-white/25 w-full py-1 resize-none"
                  placeholder="¿En qué modelo estás interesado?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center lg:justify-start mt-4">
                <button
                  type="submit"
                  disabled={submitted}
                  className="bg-transparent border border-gold hover:bg-gold text-gold hover:text-white font-medium text-xs tracking-[0.2em] uppercase px-12 py-4 rounded-sm hover:shadow-[0_0_20px_rgba(196,169,106,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                >
                  {submitted ? "¡Enviado!" : "Agenda Cita"}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
