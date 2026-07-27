"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "El desarrollo", href: "/#el-desarrollo" },
  { label: "Ubicación", href: "/#ubicacion" },
  { label: "Espacios", href: "/espacios" },
  { label: "Amenidades", href: "/#amenidades" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isSolid = scrolled || pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Subtle top shade for text legibility over sec_log.jpg */}
      <div
        className={`absolute inset-x-0 top-0 transition-all duration-500 pointer-events-none ${
          isSolid ? "opacity-0" : "opacity-100"
        } h-48 md:h-56 bg-gradient-to-b from-[#153124]/40 via-[#153124]/15 to-transparent`}
      />

      {/* Solid bar when scrolled or on subpages */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none bg-[#153124]/95 backdrop-blur-md shadow-xl border-b border-white/10 ${
          isSolid ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Header Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center transition-all duration-500 ${
        isSolid ? "py-3" : "pt-6 pb-4"
      }`}>
        {/* Logo */}
        <Link href="/" className="mb-3 transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/loma-logo-clean.png"
            alt="Lomas Altas - El hogar donde todo crece"
            width={260}
            height={70}
            className={`transition-all duration-500 object-contain filter drop-shadow-md ${
              isSolid ? "h-10 w-auto" : "h-14 md:h-16 w-auto"
            }`}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center w-full max-w-4xl px-4 gap-6">
          <div className="flex-1 h-px bg-gold/40" />
          <nav className="flex items-center gap-6 whitespace-nowrap">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <span key={link.href} className="flex items-center gap-6">
                  <Link
                    href={link.href}
                    className={`text-[13px] font-serif tracking-wide transition-colors duration-300 nav-link-underline ${
                      isActive ? "text-gold font-medium" : "text-white/90 hover:text-gold font-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-gold/40 text-xs font-light">|</span>
                  )}
                </span>
              );
            })}
          </nav>
          <div className="flex-1 h-px bg-gold/40" />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden absolute right-6 top-6 text-white p-2"
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden relative z-10 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-[#0b3e25]/95 backdrop-blur-md px-6 pb-6 pt-2 flex flex-col items-center gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                  isActive ? "text-gold font-semibold" : "text-white/90 hover:text-gold font-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
