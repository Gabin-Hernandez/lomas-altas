"use client";

import { useSyncExternalStore } from "react";

export const SECCIONES = [
  "tipologias",
  "planta",
  "interior",
  "acabados",
  "corte",
  "visita",
] as const;

export type SeccionId = (typeof SECCIONES)[number];

/**
 * Which of the six chapters the reader is on.
 *
 * Deliberately a module-level singleton rather than a per-component hook: the
 * sticky index and the mobile action bar both need the answer, and two
 * IntersectionObservers watching the same six elements would be pure waste.
 * The observer starts with the first subscriber and is torn down with the last,
 * so the module leaves nothing behind when the route unmounts.
 *
 * No scroll listener is involved anywhere in this file.
 */

let activa: SeccionId | null = null;
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();
const visibles = new Set<SeccionId>();
/** Latest viewport-relative top of each section, used to tell "above" from "below". */
const tops = new Map<SeccionId, number>();

function esSeccion(id: string): id is SeccionId {
  return (SECCIONES as readonly string[]).includes(id);
}

function recomputar() {
  const previa = activa;

  const primeraVisible = SECCIONES.find((id) => visibles.has(id));
  if (primeraVisible) {
    activa = primeraVisible;
  } else {
    // Nothing in the band. Only fall back to "no chapter" when the reader is
    // genuinely above the first one; at the very bottom of the page we keep the
    // last chapter so the mobile bar does not pop back over the legal note.
    const topPrimera = tops.get(SECCIONES[0]);
    activa = topPrimera !== undefined && topPrimera > 0 ? null : activa;
  }

  if (activa !== previa) listeners.forEach((notificar) => notificar());
}

function conectar() {
  if (typeof IntersectionObserver === "undefined") return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!esSeccion(entry.target.id)) continue;
        tops.set(entry.target.id, entry.boundingClientRect.top);
        if (entry.isIntersecting) visibles.add(entry.target.id);
        else visibles.delete(entry.target.id);
      }
      recomputar();
    },
    // A thin 5%-tall band across the middle of the viewport: whichever section
    // crosses it is the one being read.
    { rootMargin: "-45% 0px -50% 0px" }
  );

  for (const id of SECCIONES) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
}

function desconectar() {
  observer?.disconnect();
  observer = null;
  visibles.clear();
  tops.clear();
  activa = null;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (listeners.size === 1) conectar();

  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) desconectar();
  };
}

const getSnapshot = () => activa;
const getServerSnapshot = (): SeccionId | null => null;

export function useSeccionActiva(): SeccionId | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
