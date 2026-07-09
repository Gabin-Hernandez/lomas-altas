import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#153124] text-white py-16 overflow-hidden">
      
      {/* Background Watermark (footer.jpg topography lines) */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/images/footer.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Main 3-Column Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start mb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-start text-left">
            <Image
              src="/images/loma-logo.jpeg"
              alt="Lomas Altas"
              width={220}
              height={50}
              className="h-12 w-auto mb-6 object-contain"
            />
            <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed max-w-xs">
              Un desarrollo residencial boutique dentro de Terralago, diseñado para
              vivir con amplitud, privacidad y conexión natural en una de las zonas con
              mayor valor de Lomas Verdes.
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div className="flex flex-col items-start text-left">
            <span className="text-gold text-[10px] tracking-[0.25em] uppercase font-semibold font-serif block mb-6">
              Contacto
            </span>
            
            <div className="flex flex-col gap-5 text-white/70 text-xs md:text-[13px] font-light">
              
              {/* Address */}
              <div className="flex gap-4 items-start">
                <svg
                  className="w-4 h-4 text-gold shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>
                  Avenida Lomas Verdes, P.º de Lomas Verdes, 53125 Naucalpan de Juárez,
                  Estado de México.
                </span>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-center">
                <svg
                  className="w-4 h-4 text-gold shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a href="tel:5610706351" className="hover:text-gold transition-colors">
                  56 1070 6351
                </a>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-center">
                <svg
                  className="w-4 h-4 text-gold shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-4.97 0-9-4.03-9-9s4.03-9 9-9m0 0c4.97 0 9 4.03 9 9s-4.03 9-9 9"
                  />
                </svg>
                <a
                  href="mailto:ventas@siermend.com"
                  className="hover:text-gold transition-colors"
                >
                  ventas@siermend.com
                </a>
              </div>

            </div>
          </div>

          {/* Column 3: Links Explorar */}
          <div className="flex flex-col items-start text-left">
            <span className="text-gold text-[10px] tracking-[0.25em] uppercase font-semibold font-serif block mb-6">
              Explorar
            </span>
            <ul className="grid grid-cols-1 gap-3 text-white/70 text-xs md:text-sm font-light">
              {[
                { label: "Desarrollo", href: "#el-desarrollo" },
                { label: "Ubicación", href: "#ubicacion" },
                { label: "Espacios", href: "#espacios" },
                { label: "Amenidades", href: "#amenidades" },
                { label: "Distribución", href: "#estructura" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-gold transition-colors nav-link-underline w-fit inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Separator line */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Bar: Rights, Privacy, Developer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
          
          {/* Rights reserved */}
          <span className="order-2 md:order-1 font-light">
            ® Todos los derechos reservados · 2024
          </span>

          {/* Privacy and Legal */}
          <div className="order-1 md:order-2 flex items-center gap-4 font-light">
            <a href="#contacto" className="hover:text-white transition-colors">
              Aviso de Privacidad
            </a>
            <span className="text-white/20">•</span>
            <a href="#contacto" className="hover:text-white transition-colors">
              Legal
            </a>
          </div>

          {/* Developer logo */}
          <div className="order-3 flex items-center gap-4">
            <span className="font-light tracking-[0.1em] uppercase text-[10px]">
              Desarrolla
            </span>
            <Image
              src="/images/logoSiermend.svg"
              alt="Siermend"
              width={110}
              height={24}
              className="h-6 w-auto opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>

        </div>

      </div>
    </footer>
  );
}
