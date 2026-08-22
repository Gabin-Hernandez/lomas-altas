/**
 * Single source of truth for /galeria — "Cuaderno de obra".
 *
 * Every counter on the page ("3 láminas", "12 láminas", the plate numbers 01.2) is
 * derived from these arrays, never typed by hand. The sanitising crops live here too,
 * with the reason why, so the grid, the sumario thumbnails and the viewer all agree.
 */

export type CuadernoId = "01" | "02" | "03" | "04";

export type Tone = "dark" | "light" | "sand";

export interface Lamina {
  /** Plate number, 01–12, and also the key used to open the viewer. */
  id: string;
  cuaderno: CuadernoId;
  src: string;
  width: number;
  height: number;
  titulo: string;
  epigrafe: string;
  alt: string;
  /**
   * Sanitising crop. `ratio` is the aspect the frame MUST keep for the crop to work;
   * `imgClass` is the object-fit/position pair. `nota` records the measurement that
   * justifies it — change either number and the dirt comes back.
   */
  crop?: { ratio: string; imgClass: string; nota: string };
  /** Sumario thumbnail: same crop as the big plate, plus its own backing colour. */
  miniatura: { fondo: string; imgClass: string };
  /** Viewer treatment. `plate` is the backdrop painted behind the frame. */
  visor: { plate: "dark" | "cream" };
}

export interface Cuaderno {
  id: CuadernoId;
  titulo: string;
  descriptor: string;
  /** Plate ids, in reading order. */
  laminas: string[];
}

export const LAMINAS: Lamina[] = [
  {
    id: "01",
    cuaderno: "01",
    src: "/images/eyecatcher.jpg",
    width: 2000,
    height: 1322,
    titulo: "Conjunto en contexto",
    epigrafe:
      "Vista aérea del conjunto: la torre de jardineras al centro, las dos barras vecinas de Terralago y la calle arbolada al frente.",
    alt: "Vista aérea del conjunto Lomas Altas: la torre con jardineras corridas en la fachada, rodeada de calles arboladas y edificios bajos de Lomas Verdes.",
    crop: {
      ratio: "",
      imgClass: "object-cover object-[50%_45%]",
      nota: "The tower sits centre-right; 45% vertical anchoring keeps it whole in every ratio used.",
    },
    miniatura: { fondo: "bg-cream-dark", imgClass: "object-cover object-[50%_45%]" },
    visor: { plate: "dark" },
  },
  {
    id: "02",
    cuaderno: "01",
    src: "/images/edif1.png",
    width: 669,
    height: 703,
    titulo: "El volumen desde la esquina",
    epigrafe:
      "Siete franjas horizontales de concreto aparente; entre ellas, la vegetación se descuelga de nivel en nivel. Accesos peatonal y vehicular independientes.",
    alt: "Perspectiva de esquina de la torre Lomas Altas: siete franjas de concreto con jardineras corridas y vegetación colgante, junto a un edificio vecino más bajo.",
    crop: {
      ratio: "aspect-[669/703]",
      imgClass: "object-contain object-bottom",
      nota: "RGBA cut-out: transparent sky, opaque building, near-black street in the bottom 8%. Needs a dark panel plus the bottom dissolve.",
    },
    miniatura: { fondo: "bg-[#0f2419]", imgClass: "object-contain object-bottom" },
    visor: { plate: "dark" },
  },
  {
    id: "03",
    cuaderno: "01",
    src: "/images/posfooter.png",
    width: 2000,
    height: 1107,
    titulo: "Alzado principal",
    epigrafe:
      "Planta baja libre, acceso vehicular al oriente y el vacío del roof garden abierto en la coronación.",
    alt: "Alzado principal de Lomas Altas: cinco niveles de departamentos con jardineras en cada losa, planta baja libre y roof garden abierto en la coronación.",
    crop: {
      ratio: "",
      imgClass: "object-cover object-top",
      nota: "Transparent sky again: on bg-black the cut-out resolves to black with no seam. Never cropped on desktop — an elevation is never distorted.",
    },
    miniatura: { fondo: "bg-black", imgClass: "object-cover object-top" },
    visor: { plate: "dark" },
  },
  {
    id: "04",
    cuaderno: "02",
    src: "/images/sec_log.jpg",
    width: 2000,
    height: 991,
    titulo: "Vestíbulo y recepción",
    epigrafe:
      "Mostrador de travertino, buzonería y una sala de espera que también sirve para recibir.",
    alt: "Vestíbulo de acceso de Lomas Altas con mostrador de travertino, buzones, sillones y plantas de interior.",
    crop: {
      ratio: "",
      imgClass: "object-cover object-[50%_45%]",
      nota: "Pre-rendered green duotone (average #1b3a25). Mounted on the forest slab so the tint reads as editorial criteria, never next to the colour interiors.",
    },
    miniatura: { fondo: "bg-[#153124]", imgClass: "object-cover object-[50%_45%]" },
    visor: { plate: "dark" },
  },
  {
    id: "05",
    cuaderno: "02",
    src: "/images/4.png",
    width: 3419,
    height: 2043,
    titulo: "Gimnasio",
    epigrafe:
      "En planta baja, con muro de ladrillo aparente y ventanal corrido al jardín interior. Luz natural todo el día.",
    alt: "Gimnasio equipado con máquinas de fuerza y bicicletas, muro de ladrillo claro y ventanales corridos hacia un jardín tropical.",
    crop: {
      ratio: "aspect-[16/10]",
      imgClass: "object-cover object-center",
      nota: "High resolution 4K render 3419x2043.",
    },
    miniatura: { fondo: "bg-cream-dark", imgClass: "object-cover object-center" },
    visor: { plate: "dark" },
  },
  {
    id: "06",
    cuaderno: "02",
    src: "/images/slider2.png",
    width: 2000,
    height: 512,
    titulo: "El entorno inmediato",
    epigrafe:
      "Banquetas arboladas, baja densidad y salidas rápidas a Chamapa–Lechería y Periférico.",
    alt: "Vista aérea de la calle frente al proyecto: banquetas arboladas, edificios bajos y tráfico ligero en Lomas Verdes.",
    crop: {
      ratio: "",
      imgClass: "object-cover object-bottom",
      nota: "Green-tinted PNG (#122718) with partial alpha on the edges and a transparent V notch at the top centre (x 45–55%). Needs a solid base layer plus the V patch.",
    },
    miniatura: { fondo: "bg-[#153124]", imgClass: "object-cover object-bottom" },
    visor: { plate: "dark" },
  },
  {
    id: "07",
    cuaderno: "03",
    src: "/images/3.png",
    width: 3323,
    height: 2058,
    titulo: "Comedor y estancia",
    epigrafe:
      "Área social continua, sin muro intermedio y con salida directa a la terraza. La terraza ajardinada funciona como tercer espacio, no como remate.",
    alt: "Comedor y estancia de un departamento de Lomas Altas, con mesa de madera para ocho, muro de ladrillo, terraza ajardinada y vista abierta a la ciudad.",
    crop: {
      ratio: "aspect-[16/10]",
      imgClass: "object-cover object-center",
      nota: "High resolution 4K render 3323x2058.",
    },
    miniatura: { fondo: "bg-cream-dark", imgClass: "object-cover object-center" },
    visor: { plate: "dark" },
  },
  {
    id: "08",
    cuaderno: "03",
    src: "/images/10.png",
    width: 2663,
    height: 2036,
    titulo: "Cocina integral",
    epigrafe:
      "Madera clara, electrodomésticos empotrados y barra de trabajo continua. Se entrega lista para usarse.",
    alt: "Cocina integral en madera clara con refrigerador empotrado, parrilla, campana y muro de azulejo blanco.",
    crop: {
      ratio: "aspect-[4/3]",
      imgClass: "object-cover object-center",
      nota: "High resolution 4K render 2663x2036.",
    },
    miniatura: { fondo: "bg-cream-dark", imgClass: "object-cover object-center" },
    visor: { plate: "dark" },
  },
  {
    id: "09",
    cuaderno: "03",
    src: "/images/7.png",
    width: 3335,
    height: 2051,
    titulo: "Sala y terraza",
    epigrafe:
      "Ventanal corredizo de piso a techo: abierto, la terraza duplica el frente de luz de la sala.",
    alt: "Sala con sofá modular claro, mesa de centro baja y ventanal corredizo de piso a techo abierto a una terraza con vegetación.",
    crop: {
      ratio: "aspect-[16/10]",
      imgClass: "object-cover object-center",
      nota: "High resolution 4K render 3335x2051.",
    },
    miniatura: { fondo: "bg-cream-dark", imgClass: "object-cover object-center" },
    visor: { plate: "dark" },
  },
  {
    id: "10",
    cuaderno: "03",
    src: "/images/9.png",
    width: 1398,
    height: 2036,
    titulo: "Baño principal",
    epigrafe: "Doble lavabo sobre travertino y regadera a ras de piso.",
    alt: "Baño principal con doble lavabo, cubierta de mármol travertino, espejos iluminados y regadera a ras de piso.",
    crop: {
      ratio: "aspect-[1398/2036]",
      imgClass: "object-cover object-center",
      nota: "High resolution 4K portrait render 1398x2036.",
    },
    miniatura: { fondo: "bg-cream-dark", imgClass: "object-cover object-center" },
    visor: { plate: "dark" },
  },
  {
    id: "11",
    cuaderno: "04",
    src: "/images/render.jpg",
    width: 907,
    height: 1143,
    titulo: "Planta tipo — Modelo A",
    epigrafe:
      "105 m². Zona social continua al frente y ala privada de recámaras al fondo, con terraza corrida sobre la fachada.",
    alt: "Plano isométrico de la planta tipo Modelo A: tres recámaras, baños, cocina integral, estancia con comedor y terraza corrida con jardineras al frente.",
    crop: {
      ratio: "aspect-[907/1143]",
      imgClass: "object-contain",
      nota: "Background measured #dbcb98 on all four corners and edges: the slab is painted that exact hex so the drawing floats without a frame.",
    },
    miniatura: { fondo: "bg-[#dbcb98]", imgClass: "object-contain" },
    visor: { plate: "cream" },
  },
  {
    id: "12",
    cuaderno: "04",
    src: "/images/estructura.jpg",
    width: 1658,
    height: 933,
    titulo: "Corte por niveles",
    epigrafe:
      "Cuatro niveles de departamentos, dos penthouses con roof garden en la coronación, planta baja y tres sótanos de estacionamiento sobre el jardín.",
    alt: "Corte esquemático del edificio por niveles, del N−4 al N6: jardín, tres sótanos de estacionamiento, planta baja, cuatro niveles con los modelos A, B y C, y dos penthouses con roof garden.",
    crop: {
      ratio: "aspect-[6/5]",
      imgClass: "object-cover object-right",
      nota: "The file carries its own baked-in legend in the left third (x 6.7–23.8%); the diagram starts at x 35.2%. 6/5 + object-right shows the right 67.5%, dropping the baked legend — it is reprinted as real HTML next to it. Background measured #fcfcfc.",
    },
    miniatura: { fondo: "bg-white", imgClass: "object-cover object-right" },
    visor: { plate: "cream" },
  },
];

export const CUADERNOS: Cuaderno[] = [
  {
    id: "01",
    titulo: "Exteriores",
    descriptor: "El volumen, la fachada y su relación con la calle",
    laminas: ["01", "02", "03"],
  },
  {
    id: "02",
    titulo: "Vida en común",
    descriptor: "Vestíbulo, gimnasio y entorno inmediato",
    laminas: ["04", "05", "06"],
  },
  {
    id: "03",
    titulo: "Interiores",
    descriptor: "Estancia, cocina, sala y baño principal",
    laminas: ["07", "08", "09", "10"],
  },
  {
    id: "04",
    titulo: "Planos y estructura",
    descriptor: "Planta tipo y corte por niveles",
    laminas: ["11", "12"],
  },
];

export const TOTAL_LAMINAS = LAMINAS.length;

export function getLamina(id: string): Lamina {
  const lamina = LAMINAS.find((item) => item.id === id);
  if (!lamina) throw new Error(`Lámina desconocida: ${id}`);
  return lamina;
}

export function laminasDe(cuaderno: CuadernoId): Lamina[] {
  return LAMINAS.filter((lamina) => lamina.cuaderno === cuaderno);
}

/** Plate number as printed on the caption: notebook + order inside it, e.g. "03.2". */
export function numeroDePie(lamina: Lamina): string {
  const orden = laminasDe(lamina.cuaderno).findIndex((item) => item.id === lamina.id) + 1;
  return `${lamina.cuaderno}.${orden}`;
}

export interface ToneTokens {
  /** Hairline painted as a background (h-px / w-px spans). */
  rule: string;
  /** Same hairline as a border colour. */
  border: string;
  ghost: string;
  label: string;
  title: string;
  accent: string;
  body: string;
  meta: string;
  num: string;
  /** focus-visible ring + offset for the slab the element lives on. */
  ring: string;
}

/**
 * Measured ink for each slab. Gold never paints text on light backgrounds
 * (#c4a96a is 2.12:1 on cream), so it is reserved for hairlines and rings.
 */
export const TONOS: Record<Tone, ToneTokens> = {
  light: {
    rule: "bg-[#153223]/15",
    border: "border-[#153223]/15",
    ghost: "text-[#153223]/10",
    label: "text-[#7a6636]",
    title: "text-[#153223]",
    accent: "text-[#94793e]",
    body: "text-[#5c4a2c]",
    meta: "text-[#7a6636]",
    num: "text-[#7a6636]",
    ring: "focus-visible:ring-[#7a6636] focus-visible:ring-offset-cream",
  },
  dark: {
    rule: "bg-white/15",
    border: "border-white/15",
    ghost: "text-white/[0.06]",
    label: "text-[#c4a96a]",
    title: "text-white",
    accent: "text-[#decd98]",
    body: "text-white/70",
    meta: "text-white/60",
    num: "text-[#decd98]",
    ring: "focus-visible:ring-[#decd98] focus-visible:ring-offset-[#0f2419]",
  },
  sand: {
    rule: "bg-[#4a3e26]/25",
    border: "border-[#4a3e26]/25",
    ghost: "text-[#4a3e26]/12",
    label: "text-[#4a3e26]",
    title: "text-[#153223]",
    accent: "text-[#4a3e26]",
    body: "text-[#4a3e26]",
    meta: "text-[#4a3e26]",
    num: "text-[#4a3e26]",
    ring: "focus-visible:ring-[#4a3e26] focus-visible:ring-offset-[#dbcb98]",
  },
};

/** Shared page container. Full-bleed plates opt out of it by living outside. */
export const CONTENEDOR = "mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16";
