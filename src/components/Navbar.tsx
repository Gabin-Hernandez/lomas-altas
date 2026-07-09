"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "El desarrollo", href: "#el-desarrollo" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Espacios", href: "#espacios" },
  { label: "Amenidades", href: "#amenidades" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest-dark/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Logo */}
        <a href="#" className="mb-3 transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/loma-logo.jpeg"
            alt="Lomas Altas - El hogar donde todo crece"
            width={220}
            height={50}
            className={`transition-all duration-500 object-contain ${
              scrolled ? "h-9 w-auto" : "h-14 w-auto"
            }`}
            priority
          />
        </a>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center w-full max-w-4xl px-4 gap-6">
          <div className="flex-1 h-px bg-gold/30" />
          <nav className="flex items-center gap-6 whitespace-nowrap">
            {navLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-6">
                <a
                  href={link.href}
                  className="text-white/90 hover:text-gold text-[13px] font-serif font-light tracking-wide transition-colors duration-300 nav-link-underline"
                >
                  {link.label}
                </a>
                {index < navLinks.length - 1 && (
                  <span className="text-gold/30 text-xs font-light">|</span>
                )}
              </span>
            ))}
          </nav>
          <div className="flex-1 h-px bg-gold/30" />
        </div>        {/* Mobile Hamburger */}
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
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-forest-dark/95 backdrop-blur-md px-6 pb-6 flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/90 hover:text-gold text-sm font-light tracking-[0.15em] uppercase transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
