"use client";

import { useEffect, useState } from "react";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { CONTACTO } from "@/lib/contacto";

const ACCION_CLASS =
  "flex min-h-[56px] flex-col items-center justify-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 active:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold";

/** Thumb-reach shortcuts for the whole scroll, minus the two moments they would be noise. */
export default function AccionesMovil() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const portico = document.getElementById("portico");
    const solicitud = document.getElementById("solicitud");

    let fueraDelPortico = false;
    let enSolicitud = false;
    let yaEnviado = false;

    const sincronizar = () => setVisible(fueraDelPortico && !enSolicitud && !yaEnviado);

    const obsPortico = new IntersectionObserver(
      ([entrada]) => {
        fueraDelPortico = !entrada.isIntersecting;
        sincronizar();
      },
      { threshold: 0 }
    );

    const obsSolicitud = new IntersectionObserver(
      ([entrada]) => {
        // Measured against the viewport, not against the section: #solicitud is
        // taller than the screen, so its own intersectionRatio could never reach 0.3.
        const alturaRaiz = entrada.rootBounds?.height ?? window.innerHeight;
        enSolicitud =
          entrada.isIntersecting && entrada.intersectionRect.height / alturaRaiz >= 0.3;
        sincronizar();
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    if (portico) obsPortico.observe(portico);
    if (solicitud) obsSolicitud.observe(solicitud);

    const alConfirmar = () => {
      yaEnviado = true;
      sincronizar();
    };
    // Sin esto, "Enviar otra solicitud" dejaria la barra oculta para el resto de la
    // sesion: el acuse ya no esta en pantalla pero la bandera nunca se limpiaba.
    const alReiniciar = () => {
      yaEnviado = false;
      sincronizar();
    };
    window.addEventListener("solicitud:exito", alConfirmar);
    window.addEventListener("solicitud:reinicio", alReiniciar);

    return () => {
      obsPortico.disconnect();
      obsSolicitud.disconnect();
      window.removeEventListener("solicitud:exito", alConfirmar);
      window.removeEventListener("solicitud:reinicio", alReiniciar);
    };
  }, []);

  const irASolicitud = () => {
    const prefiereMenos =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById("solicitud")?.scrollIntoView({
      block: "start",
      behavior: prefiereMenos ? "auto" : "smooth",
    });
    document.getElementById("sol-nombre")?.focus({ preventScroll: true });
  };

  return (
    // La barra nunca se desmonta, solo se desliza fuera de pantalla con translate-y:
    // sin inert sus tres controles siguen en el orden de tabulacion y en el arbol de
    // accesibilidad mientras son invisibles.
    <div
      data-visible={visible}
      inert={!visible}
      className="fixed inset-x-0 bottom-0 z-40 grid translate-y-full grid-cols-3 divide-x divide-white/10 border-t border-gold/25 bg-forest-deeper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-[400ms] data-[visible=true]:translate-y-0 md:hidden"
    >
      <a href={CONTACTO.telHref} className={ACCION_CLASS}>
        <Phone aria-hidden className="size-4" />
        Llamar
      </a>
      <a
        href={CONTACTO.wa}
        target="_blank"
        rel="noopener noreferrer"
        className={ACCION_CLASS}
      >
        <MessageCircle aria-hidden className="size-4" />
        WhatsApp
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
      <button type="button" onClick={irASolicitud} className={ACCION_CLASS}>
        <FileText aria-hidden className="size-4" />
        Solicitud
      </button>
    </div>
  );
}
