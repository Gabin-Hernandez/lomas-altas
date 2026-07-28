"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import Lightbox, { type LightboxItem } from "@/components/ui/Lightbox";
import { LAMINAS } from "@/lib/galeria";

interface VisorContextValue {
  /** Opens the viewer on the given plate id ("01"–"12"). */
  abrir: (laminaId: string) => void;
}

const GaleriaVisorContext = createContext<VisorContextValue | null>(null);

export function useVisor(): VisorContextValue {
  const contexto = useContext(GaleriaVisorContext);
  if (!contexto) {
    throw new Error("useVisor sólo funciona dentro de <VisorProvider>.");
  }
  return contexto;
}

// Built once at module scope: the plate list never changes at runtime.
const ITEMS: LightboxItem[] = LAMINAS.map((lamina) => ({
  src: lamina.src,
  alt: lamina.alt,
  title: lamina.titulo,
  caption: lamina.epigrafe,
  plate: lamina.visor.plate,
}));

/**
 * Client island that owns the viewer state. It renders `children` untouched, so the
 * notebooks stay Server Components and only the plate buttons ship JavaScript.
 */
export default function VisorProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);

  const abrir = useCallback((laminaId: string) => {
    const posicion = LAMINAS.findIndex((lamina) => lamina.id === laminaId);
    if (posicion >= 0) setIndex(posicion);
  }, []);

  const value = useMemo(() => ({ abrir }), [abrir]);

  return (
    <GaleriaVisorContext.Provider value={value}>
      {children}
      <Lightbox
        items={ITEMS}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </GaleriaVisorContext.Provider>
  );
}
