import type { LightboxItem } from "@/components/ui/Lightbox";

/**
 * Single source of truth for /espacios. Pure data — no JSX, no "use client":
 * both the server sections and the client sections import from here.
 *
 * WARNING — two families of numbers here are SAMPLED FROM THE IMAGE FILES, not
 * design decisions. They break silently if the assets are replaced:
 *   · TIPOLOGIAS[].chip  — pastels read straight out of estructura.jpg.
 *   · NIVELES[].y        — vertical position of each level label, as a % of
 *                          estructura.jpg (1658x933). Valid only while the
 *                          diagram is cropped horizontally (aspect-[1150/933]).
 *   · ESTANCIAS[].x/y    — image-space coordinates over render.jpg (907x1143).
 *                          Valid only inside a wrapper with aspect-[907/1143].
 * Replacing estructura.jpg or render.jpg means re-measuring all of them.
 */

export interface Tipologia {
  id: string;
  letra: string;
  nombre: string;
  unidades: string;
  niveles: string;
  superficie: string;
  exterior: string;
  estacionamiento: string;
  /** Sampled from estructura.jpg. Decorative only — never the sole carrier of meaning. */
  chip: string;
  parrafo: string;
}

export const TIPOLOGIAS: readonly Tipologia[] = [
  {
    id: "a",
    letra: "A",
    nombre: "Modelo A",
    unidades: "8",
    niveles: "N1–N4",
    superficie: "105 m²",
    exterior: "Terraza",
    estacionamiento: "2 cajones",
    chip: "#c2c1ad",
    parrafo:
      "Ocho unidades: la tipología más repetida del edificio. Ocupa los dos extremos de cada planta, con terraza al frente y doble orientación.",
  },
  {
    id: "b",
    letra: "B",
    nombre: "Modelo B",
    unidades: "4",
    niveles: "N1–N4",
    superficie: "105 m²",
    exterior: "Terraza frontal",
    estacionamiento: "2 cajones",
    chip: "#ccb68d",
    parrafo:
      "Cuatro unidades al frente de la torre. Terraza frontal corrida sobre la fachada de jardineras y áreas sociales integradas.",
  },
  {
    id: "c",
    letra: "C",
    nombre: "Modelo C",
    unidades: "4",
    niveles: "N1–N4",
    superficie: "105 m²",
    exterior: "Balcón posterior",
    estacionamiento: "2 cajones",
    chip: "#a8b0bb",
    parrafo:
      "Cuatro unidades orientadas al interior del predio. La posición más silenciosa, con balcón hacia los jardines.",
  },
  {
    id: "ph",
    letra: "PH",
    nombre: "Penthouse",
    unidades: "2",
    niveles: "N5–N6",
    superficie: "Consultar",
    exterior: "Roof garden compartido",
    estacionamiento: "Consultar",
    chip: "#c3a7a6",
    parrafo:
      "Dos unidades en los niveles 5 y 6, las únicas con salida al roof garden. Superficie y equipamiento se especifican por unidad.",
  },
];

export interface Estancia {
  n: string;
  nombre: string;
  tag: string;
  desc: string;
  /** % of render.jpg width (907px), origin top-left. */
  x: number;
  /** % of render.jpg height (1143px), origin top-left. */
  y: number;
}

export const ESTANCIAS: readonly Estancia[] = [
  {
    n: "01",
    nombre: "Terraza",
    tag: "TERRAZA PRIVADA",
    desc: "Corre a lo largo de la fachada y está techada. La jardinera perimetral la separa de la calle sin cerrarle la vista, y se abre desde la estancia con cancelería de piso a techo.",
    x: 33,
    y: 77,
  },
  {
    n: "02",
    nombre: "Estancia",
    tag: "ÁREA SOCIAL",
    desc: "Sin muros intermedios con el comedor. El ventanal corre completo hacia la terraza: abierto, sala y terraza terminan siendo el mismo espacio.",
    x: 55,
    y: 60,
  },
  {
    n: "03",
    nombre: "Comedor",
    tag: "ÁREA SOCIAL",
    desc: "Integrado a la estancia y con paso directo a la cocina. Cabe una mesa de ocho sin invadir la circulación.",
    x: 60,
    y: 46,
  },
  {
    n: "04",
    nombre: "Cocina equipada",
    tag: "EQUIPAMIENTO",
    desc: "Cocina integral con frentes de madera clara, electrodomésticos empotrados y barra de trabajo continua.",
    x: 60,
    y: 16,
  },
  {
    n: "05",
    nombre: "Recámara principal",
    tag: "SUITE PRINCIPAL",
    desc: "La recámara más protegida de la planta, en el extremo tranquilo. Espacio para cama king size, vestidor y baño propio.",
    x: 22,
    y: 59,
  },
  {
    n: "06",
    nombre: "Recámara secundaria",
    tag: "HABITACIÓN",
    desc: "Recámara con clóset integrado y ventana a la fachada larga.",
    x: 29,
    y: 43,
  },
  {
    n: "07",
    nombre: "Tercera recámara",
    tag: "HABITACIÓN",
    desc: "La tercera habitación, en el extremo opuesto a la principal. Funciona igual como recámara que como oficina.",
    x: 40,
    y: 14,
  },
  {
    n: "08",
    nombre: "Estudio o family room",
    tag: "ESPACIO MULTIUSOS",
    desc: "Espacio abierto entre las recámaras: sala de televisión, estudio o cuarto de juegos, según haga falta.",
    x: 34,
    y: 27,
  },
  {
    n: "09",
    nombre: "Baño principal",
    tag: "ZONA HÚMEDA",
    desc: "Doble lavabo sobre mueble de madera, travertino en muros y regadera a ras de piso, sin escalón.",
    x: 50,
    y: 28,
  },
  {
    n: "10",
    nombre: "Cuarto de lavado",
    tag: "SERVICIOS",
    desc: "Cuarto de lavado cerrado e independiente, con espacio para lavadora, secadora y almacenamiento.",
    x: 66,
    y: 27,
  },
  {
    n: "11",
    nombre: "Cuarto de servicio",
    tag: "SERVICIOS",
    desc: "Cuarto de servicio independiente, con acceso propio desde la circulación de servicio.",
    x: 80,
    y: 19,
  },
  {
    n: "12",
    nombre: "Balcón posterior",
    tag: "EXTERIOR",
    desc: "Balcón hacia el interior del predio, orientado a los jardines. Es el exterior característico del Modelo C.",
    x: 76,
    y: 62,
  },
];

export interface Acabado {
  n: string;
  nombre: string;
  detalle: string;
}

/**
 * The page's only list of finishes. Deliberately conservative: everything that
 * the developer has not confirmed on paper (marble, walnut, jacuzzi, teak deck)
 * was dropped rather than repeated, because real-estate advertising is
 * enforceable in Mexico (PROFECO, NOM-247).
 */
export const ACABADOS: readonly Acabado[] = [
  {
    n: "01",
    nombre: "Cocina integral",
    detalle:
      "Equipada, con cubierta de granito, frentes de madera clara y espacio de almacenamiento corrido.",
  },
  {
    n: "02",
    nombre: "Pisos",
    detalle: "Madera en áreas secas; cerámico texturizado en áreas húmedas.",
  },
  {
    n: "03",
    nombre: "Baños",
    detalle: "Travertino en el baño principal y muebles de lavabo a medida.",
  },
  {
    n: "04",
    nombre: "Terraza",
    detalle: "Techada, con barandal de cristal templado y jardinera corrida.",
  },
  {
    n: "05",
    nombre: "Cancelería",
    detalle: "Corrediza de piso a techo en la estancia, con cristal acústico.",
  },
  {
    n: "06",
    nombre: "Iluminación",
    detalle: "LED integrada, sumada a luz natural en todas las estancias.",
  },
  {
    n: "07",
    nombre: "Lavado",
    detalle: "Cuarto independiente y cerrado, con salida propia.",
  },
  {
    n: "08",
    nombre: "Instalaciones",
    detalle: "Preparación para clima y automatización en áreas sociales.",
  },
];

export interface Nivel {
  codigo: string;
  uso: string;
  /** % of estructura.jpg height, measured on the level labels themselves. */
  y: number;
}

export const NIVELES: readonly Nivel[] = [
  { codigo: "N6", uso: "Penthouse y roof garden", y: 11.7 },
  { codigo: "N5", uso: "Penthouse y roof garden", y: 19.8 },
  { codigo: "N4", uso: "Modelo A · B · C · A", y: 28.2 },
  { codigo: "N3", uso: "Modelo A · B · C · A", y: 36.4 },
  { codigo: "N2", uso: "Modelo A · B · C · A", y: 44.6 },
  { codigo: "N1", uso: "Modelo A · B · C · A", y: 52.7 },
  { codigo: "N0", uso: "Planta baja: acceso, lobby y amenidades", y: 61.7 },
  { codigo: "N-1", uso: "Estacionamiento 1", y: 69.3 },
  { codigo: "N-2", uso: "Estacionamiento 2", y: 75.3 },
  { codigo: "N-3", uso: "Estacionamiento 3", y: 81.2 },
  { codigo: "N-4", uso: "Jardín", y: 87.4 },
];

/** The five photographic plates of section 03, in reading order. */
export const FIGURAS: readonly LightboxItem[] = [
  {
    src: "/images/lomas2.jpeg",
    alt: "Estancia y comedor abiertos hacia la terraza, con cancelería de piso a techo y muro de tabique en la fachada",
    title: "Fig. 03 — Estancia y comedor",
    caption:
      "Estancia y comedor abiertos a la terraza, sin muros intermedios. El muro de tabique acompaña toda la fachada y filtra la vista de la ciudad.",
  },
  {
    src: "/images/lomas3.jpeg",
    alt: "Cocina integral con frentes de madera clara, electrodomésticos empotrados y cubierta de granito",
    title: "Fig. 04 — Cocina integral",
    caption:
      "Cocina integral con frentes de madera clara, electrodomésticos empotrados y cubierta de granito.",
  },
  {
    src: "/images/lomas5.jpeg",
    alt: "Baño principal con doble lavabo sobre mueble de madera, muros de travertino y regadera a ras de piso",
    title: "Fig. 05 — Baño principal",
    caption:
      "Baño principal: doble lavabo sobre mueble de madera, travertino en muros y regadera a ras de piso.",
  },
  {
    src: "/images/lomas4.jpeg",
    alt: "Sala con cancelería corrediza de piso a techo abierta hacia la terraza ajardinada",
    title: "Fig. 06 — Sala",
    caption: "Sala con cancelería corrediza de piso a techo hacia la terraza ajardinada.",
  },
  {
    src: "/images/lomas1.jpeg",
    alt: "Gimnasio del edificio en planta baja, con ventanales hacia el jardín",
    title: "Fig. 07 — Gimnasio",
    caption: "Gimnasio del edificio, en planta baja, con ventanales al jardín.",
  },
];

/** Single-item lightbox for the floor plan. `plate: cream` keeps the light diagram off black. */
export const FIGURA_PLANTA: readonly LightboxItem[] = [
  {
    src: "/images/render.jpg",
    alt: "Planta tipo de 105 m² en vista isométrica: terraza, estancia, comedor, cocina, tres recámaras, estudio, baños, cuarto de lavado, cuarto de servicio y balcón posterior",
    title: "Fig. 02 — Planta tipo",
    caption:
      "Planta tipo del proyecto, común a las cuatro tipologías. Imagen ilustrativa: superficies, mobiliario y acabados pueden variar respecto al proyecto ejecutivo.",
    plate: "cream",
  },
];

/** Single-item lightbox for the section drawing — shown whole, legend included. */
export const FIGURA_CORTE: readonly LightboxItem[] = [
  {
    src: "/images/estructura.jpg",
    alt: "Corte esquemático del edificio Lomas Altas: penthouses y roof garden en N5 y N6, cuatro departamentos por nivel de N1 a N4, planta baja en N0, tres niveles de estacionamiento de N-1 a N-3 y jardín en N-4.",
    title: "Fig. 08 — El edificio en corte",
    caption:
      "Corte esquemático por niveles, de N-4 a N6. En cada nivel de vivienda el orden es siempre Modelo A, B, C y A.",
    plate: "cream",
  },
];

export interface FichaFila {
  dt: string;
  dd: string;
}

export const FICHA: readonly FichaFila[] = [
  { dt: "Ubicación", dd: "Lomas Verdes, Naucalpan, Edo. Méx." },
  { dt: "Unidades", dd: "18 (16 departamentos + 2 penthouses)" },
  { dt: "Niveles", dd: "5 sobre planta baja" },
  { dt: "Superficie", dd: "105 m² por departamento" },
  { dt: "Estacionamiento", dd: "2 cajones por unidad" },
  { dt: "Amenidades", dd: "Roof garden, gimnasio y jardín" },
  { dt: "Desarrolla", dd: "Siermend" },
];

export const CONTACTO = {
  tel: "56 1070 6351",
  telHref: "tel:+525610706351",
  mail: "ventas@siermend.com",
  direccion: "Av. Lomas Verdes y P.º de Lomas Verdes, 53125 Naucalpan de Juárez, Méx.",
} as const;
