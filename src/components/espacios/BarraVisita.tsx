"use client";

import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { CONTACTO } from "./espaciosData";
import { useSeccionActiva } from "./useSeccionActiva";

/**
 * The page's only concession to app language, and only where it earns its keep:
 * on a phone the closing CTA is six screens away from the moment the reader
 * decides they are interested.
 *
 * Appears once #tipologias has been crossed and retracts inside #visita, so it
 * never duplicates the CTA nor covers the legal note. Both states come from the
 * same shared observer as the sticky index — no extra listeners.
 *
 * z-40: under the navbar (z-50) and the lightbox (z-60).
 */
export default function BarraVisita() {
  const activa = useSeccionActiva();
  const oculto = activa === null || activa === "visita";

  return (
    <div
      data-oculto={oculto}
      aria-hidden={oculto}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#decd98]/25 bg-[#153124] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 data-[oculto=true]:translate-y-full md:hidden"
    >
      <div className="grid grid-cols-2 divide-x divide-white/15">
        <a
          href={CONTACTO.telHref}
          tabIndex={oculto ? -1 : undefined}
          className="flex items-center justify-center gap-2 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#decd98] focus-visible:ring-offset-2 focus-visible:ring-offset-[#153124]"
        >
          <Phone size={14} aria-hidden />
          Llamar
        </a>
        <Link
          href="/contacto"
          tabIndex={oculto ? -1 : undefined}
          className="flex items-center justify-center gap-2 bg-[#decd98] py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#153124] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#153124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#decd98]"
        >
          <CalendarDays size={14} aria-hidden />
          Agendar visita
        </Link>
      </div>
    </div>
  );
}
