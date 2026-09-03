import type { LightboxItem } from "@/components/ui/Lightbox";

export interface PlantaIlustrada {
  id: string;
  titulo: string;
  nivel: string;
  src: string;
  alt: string;
}

export interface RenderItem {
  id: string;
  titulo: string;
  espacio: string;
  src: string;
  alt: string;
  caption: string;
}

export interface DesgloseAreas {
  interior: number;
  terrazaTechada: number;
  patioSinTechar?: number;
  jardinSinTechar?: number;
  total: number;
}

export interface Tipologia {
  id: string;
  slug: string;
  codigo: string;
  letra: string;
  nombre: string;
  tagline: string;
  unidades: string;
  cantidadNumero: number;
  niveles: string;
  superficie: string;
  superficieInterior: string;
  exterior: string;
  estacionamiento: string;
  recamaras: string;
  banos: string;
  chip: string;
  areas: DesgloseAreas;
  parrafo: string;
  descripcionLarga: string;
  puntosClave: string[];
  caracteristicas: { label: string; valor: string }[];
  plantas: PlantaIlustrada[];
  renders: RenderItem[];
}

export const TIPOLOGIAS: readonly Tipologia[] = [
  {
    id: "ta-nj-pb",
    slug: "ta-nj-pb",
    codigo: "TA-NJ-PB",
    letra: "PJ",
    nombre: "Planta Jardín",
    tagline: "Residencia en dos niveles con jardín privado de 46 m² y 351 m² totales",
    unidades: "2",
    cantidadNumero: 2,
    niveles: "Planta Baja / Nivel Jardín",
    superficie: "351.36 m²",
    superficieInterior: "263.80 m²",
    exterior: "Terraza (41.17 m²) + Jardín (46.39 m²)",
    estacionamiento: "2 a 3 cajones techados",
    recamaras: "3 a 4 recámaras",
    banos: "3.5 baños",
    chip: "#5c735a",
    areas: {
      interior: 263.8,
      terrazaTechada: 41.17,
      jardinSinTechar: 46.39,
      total: 351.36,
    },
    parrafo:
      "Dos exclusivas residencias en planta baja desarrolladas en doble nivel. Cuentan con 263.8 m² de área interior, terraza techada y un amplio jardín privado sin techar de 46.39 m².",
    descripcionLarga:
      "La residencia Planta Jardín ofrece la experiencia y amplitud de una residencia unifamiliar con la seguridad y comodidades de una torre boutique. Su diseño en doble nivel separa con maestría el área social de la privacidad de las recámaras, abriendo toda la estancia hacia una terraza techada y un jardín privado de 46 m².",
    puntosClave: [
      "Jardín privado sin techar de 46.39 m² con conexión directa a la estancia.",
      "Distribución en doble nivel (Planta Baja y Mezzanine) que maximiza la privacidad.",
      "263.80 m² de área interior con acabados de primera calidad.",
      "Terraza techada de 41.17 m² para convivencias al aire libre todo el año.",
      "Master suite con vestidor tipo walk-in y baño completo.",
    ],
    caracteristicas: [
      { label: "Área Interior", valor: "263.80 m²" },
      { label: "Terraza Techada", valor: "41.17 m²" },
      { label: "Jardín Privado", valor: "46.39 m²" },
      { label: "Superficie Total", valor: "351.36 m²" },
      { label: "Niveles", valor: "Planta Baja / Nivel Jardín (Duplex)" },
      { label: "Recámaras", valor: "3 a 4 recámaras" },
      { label: "Baños", valor: "3.5 baños completos" },
      { label: "Estacionamiento", valor: "2 a 3 cajones techados" },
      { label: "Servicios", valor: "Cuarto de lavado y cuarto de servicio independiente" },
    ],
    plantas: [
      {
        id: "pb",
        titulo: "Planta Baja — Área Social y Jardín",
        nivel: "Nivel de acceso y jardín",
        src: "/images/tipologias/ta-nj-pb/planta-pb.jpg",
        alt: "Planta baja ilustrada de Planta Jardín con jardín privado, terraza y estancia",
      },
      {
        id: "pa",
        titulo: "Planta Alta — Área Privada",
        nivel: "Nivel superior de recámaras",
        src: "/images/tipologias/ta-nj-pb/planta-pa.jpg",
        alt: "Planta alta ilustrada de Planta Jardín con recámaras y vestidores",
      },
    ],
    renders: [
      {
        id: "sala",
        titulo: "Sala y Estancia Principal",
        espacio: "Área Social",
        src: "/images/tipologias/ta-nj-pb/sala.jpg",
        alt: "Render de sala estancia en Planta Jardín con vista y ventanales al jardín",
        caption: "Estancia social continua de gran amplitud integrada armónicamente al jardín privado.",
      },
      {
        id: "cocina",
        titulo: "Cocina Integral Equipada",
        espacio: "Cocina",
        src: "/images/tipologias/ta/cocina.jpeg",
        alt: "Render de cocina integral con acabados en madera clara y cubierta de granito",
        caption: "Cocina con carpintería en madera clara, barra desayunadora y electrodomésticos empotrados.",
      },
      {
        id: "recamara",
        titulo: "Master Suite",
        espacio: "Recámara Principal",
        src: "/images/tipologias/ta/recamara.jpg",
        alt: "Render de recámara principal con luz natural",
        caption: "Suite principal privada con espacio para cama King Size y vestidor completo.",
      },
      {
        id: "bano",
        titulo: "Baño Principal",
        espacio: "Baño",
        src: "/images/9.png",
        alt: "Render de baño principal con acabados en mármol travertino y doble lavabo",
        caption: "Baño principal revestido en mármol travertino con doble lavabo y regadera a ras de piso.",
      },
    ],
  },
  {
    id: "ta",
    slug: "ta",
    codigo: "TA",
    letra: "TA",
    nombre: "Tipología A",
    tagline: "El modelo insignia con 150 m² interiores y 41 m² de terraza corrida",
    unidades: "8",
    cantidadNumero: 8,
    niveles: "Niveles 1 al 4 (N1–N4)",
    superficie: "191.00 m²",
    superficieInterior: "150.00 m²",
    exterior: "Terraza techada (41.00 m²)",
    estacionamiento: "2 cajones techados",
    recamaras: "3 recámaras",
    banos: "2.5 a 3 baños",
    chip: "#c2c1ad",
    areas: {
      interior: 150.0,
      terrazaTechada: 41.0,
      total: 191.0,
    },
    parrafo:
      "Ocho departamentos que representan el modelo más amplio de los niveles 1 al 4. Cuentan con 150 m² habitables y una generosa terraza techada de 41 m² a lo largo de toda la fachada.",
    descripcionLarga:
      "La Tipología A es el referente de amplitud en Lomas Altas. Diseñada para familias contemporáneas, destaca por su estancia libre de columnas que conecta de piso a techo con una terraza techada de 41 m², llenando cada rincón de luz natural y ventilación cruzada.",
    puntosClave: [
      "150 m² interiores optimizados con distribución inteligente.",
      "Terraza techada corrida de 41 m² con jardineras perimetrales integradas.",
      "Master suite con walk-in closet y baño con acabados en mármol travertino.",
      "Cocina integral de diseño abierto con barra de trabajo y espacio de alacena.",
      "Orientación privilegiada con doble frente de iluminación.",
    ],
    caracteristicas: [
      { label: "Área Interior", valor: "150.00 m²" },
      { label: "Terraza Techada", valor: "41.00 m²" },
      { label: "Superficie Total", valor: "191.00 m²" },
      { label: "Niveles", valor: "Nivel 1 al 4 (2 por piso)" },
      { label: "Recámaras", valor: "3 recámaras" },
      { label: "Baños", valor: "2.5 a 3 baños" },
      { label: "Estacionamiento", valor: "2 cajones independientes techados" },
      { label: "Servicios", valor: "Cuarto de lavado independiente" },
    ],
    plantas: [
      {
        id: "planta",
        titulo: "Planta Tipo — Tipología A",
        nivel: "N1 a N4",
        src: "/images/tipologias/ta/planta.jpg",
        alt: "Planta tipo ilustrada de Tipología A con terraza corrida, 3 recámaras y áreas sociales",
      },
    ],
    renders: [
      {
        id: "comedor",
        titulo: "Comedor y Estancia",
        espacio: "Área Social",
        src: "/images/tipologias/ta/comedor.jpg",
        alt: "Render de comedor y estancia en Tipología A con mesa para 8 personas y vista a terraza",
        caption: "Área social fluida sin muros intermedios con salida directa a la terraza.",
      },
      {
        id: "cocina",
        titulo: "Cocina Integral Equipada",
        espacio: "Cocina",
        src: "/images/tipologias/ta/cocina.jpeg",
        alt: "Render de cocina integral con acabados en madera clara y cubierta de granito en Tipología A",
        caption: "Cocina con carpintería en madera clara, barra desayunadora y electrodomésticos empotrados.",
      },
      {
        id: "recamara",
        titulo: "Master Suite",
        espacio: "Recámara Principal",
        src: "/images/tipologias/ta/recamara.jpg",
        alt: "Render de recámara principal en Tipología A con luz natural",
        caption: "Suite principal privada con espacio para cama King Size y vestidor completo.",
      },
      {
        id: "bano",
        titulo: "Baño Principal",
        espacio: "Baño",
        src: "/images/9.png",
        alt: "Render de baño principal con acabados en mármol travertino y doble lavabo",
        caption: "Baño revestido en mármol travertino con doble lavabo y regadera a ras de piso.",
      },
    ],
  },
  {
    id: "tb",
    slug: "tb",
    codigo: "TB",
    letra: "TB",
    nombre: "Tipología B",
    tagline: "Equilibrio perfecto con 153.3 m² interiores y 35.6 m² de terraza techada",
    unidades: "6",
    cantidadNumero: 6,
    niveles: "Niveles 1 al 4 (N1–N4)",
    superficie: "188.94 m²",
    superficieInterior: "153.34 m²",
    exterior: "Terraza techada (35.60 m²)",
    estacionamiento: "2 cajones techados",
    recamaras: "3 recámaras",
    banos: "2.5 a 3 baños",
    chip: "#ccb68d",
    areas: {
      interior: 153.34,
      terrazaTechada: 35.6,
      total: 188.94,
    },
    parrafo:
      "Seis unidades ubicadas en los niveles 1 al 4. Ofrecen 153.34 m² interiores muy equilibrados y una terraza techada de 35.6 m² con excelentes vistas panorámicas.",
    descripcionLarga:
      "La Tipología B equilibra funcionalidad y confort residencial. Con 153.34 m² interiores, ofrece recámaras de gran holgura, estancia con integración total a la terraza techada y una cocina diseñada para la vida diaria y reuniones.",
    puntosClave: [
      "153.34 m² de construcción interior confortable y funcional.",
      "Terraza techada de 35.60 m² con vistas abiertas.",
      "Excelente distribución que separa la zona íntima de recámaras del área social.",
      "Baños con acabados en mármol travertino y cancelería de cristal templado.",
      "Dos cajones de estacionamiento techados.",
    ],
    caracteristicas: [
      { label: "Área Interior", valor: "153.34 m²" },
      { label: "Terraza Techada", valor: "35.60 m²" },
      { label: "Superficie Total", valor: "188.94 m²" },
      { label: "Niveles", valor: "Nivel 1 al 4" },
      { label: "Recámaras", valor: "3 recámaras" },
      { label: "Baños", valor: "2.5 a 3 baños" },
      { label: "Estacionamiento", valor: "2 cajones independientes techados" },
      { label: "Servicios", valor: "Área de lavado cerrada e independiente" },
    ],
    plantas: [
      {
        id: "planta",
        titulo: "Planta Tipo — Tipología B",
        nivel: "N1 a N4",
        src: "/images/tipologias/tb/planta.jpg",
        alt: "Planta tipo ilustrada de Tipología B con 3 recámaras y terraza frontal",
      },
    ],
    renders: [
      {
        id: "comedor",
        titulo: "Comedor y Estancia",
        espacio: "Área Social",
        src: "/images/tipologias/tb/comedor.jpg",
        alt: "Render de comedor en Tipología B",
        caption: "Comedor y estancia iluminados naturalmente con salida a terraza.",
      },
      {
        id: "cocina",
        titulo: "Cocina Gourmet",
        espacio: "Cocina",
        src: "/images/tipologias/tb/cocina.jpg",
        alt: "Render de cocina gourmet en Tipología B",
        caption: "Cocina funcional con barra desayunador y acabados en madera.",
      },
      {
        id: "recamara",
        titulo: "Recámara",
        espacio: "Recámara",
        src: "/images/tipologias/tb/recamara.jpg",
        alt: "Render de recámara en Tipología B",
        caption: "Habitación privada con clóset de madera y gran ventanal.",
      },
      {
        id: "bano",
        titulo: "Baño Principal",
        espacio: "Baño",
        src: "/images/tipologias/tb/bano.jpg",
        alt: "Render de baño principal en Tipología B",
        caption: "Baño revestido en mármol travertino con doble lavabo y regadera a ras de piso.",
      },
    ],
  },
  {
    id: "ta-ph-pb",
    slug: "ta-ph-pb",
    codigo: "TA-PH-PB",
    letra: "TA-PH",
    nombre: "Tipología A — Penthouse",
    tagline: "El cenit de Lomas Altas: 384 m² en doble nivel con 82 m² de terraza y 70 m² de patio",
    unidades: "2",
    cantidadNumero: 2,
    niveles: "Niveles 5 y 6 (N5–N6)",
    superficie: "384.84 m²",
    superficieInterior: "231.94 m²",
    exterior: "Terraza (82.00 m²) + Patio (70.90 m²)",
    estacionamiento: "3 cajones techados",
    recamaras: "3 a 4 recámaras / Family Room",
    banos: "3.5 a 4 baños",
    chip: "#c3a7a6",
    areas: {
      interior: 231.94,
      terrazaTechada: 82.0,
      patioSinTechar: 70.9,
      total: 384.84,
    },
    parrafo:
      "Dos majestuosos penthouses en los niveles 5 y 6. Cuentan con 231.94 m² interiores, una imponente terraza techada de 82 m² y un patio privado sin techar de 70.9 m² en la cumbre del edificio.",
    descripcionLarga:
      "El Penthouse de Lomas Altas es la máxima expresión de lujo, privacidad y arquitectura residencial. Sus 384 m² totales distribuidos en dos niveles integran una monumental terraza de 82 m² con vistas panorámicas a toda la cañada, además de un patio privado de 70.9 m² ideal para roof garden exclusivo.",
    puntosClave: [
      "384.84 m² totales con doble nivel en los pisos 5 y 6 de la torre.",
      "Terraza techada monumental de 82.00 m² con vistas panorámicas.",
      "Patio privado sin techar de 70.90 m² para roof garden y asador privado.",
      "231.94 m² de área interior con dobles alturas y acabados de lujo superior.",
      "3 cajones de estacionamiento techados independientes.",
    ],
    caracteristicas: [
      { label: "Área Interior", valor: "231.94 m²" },
      { label: "Terraza Techada", valor: "82.00 m²" },
      { label: "Patio Privado s/techar", valor: "70.90 m²" },
      { label: "Superficie Total", valor: "384.84 m²" },
      { label: "Niveles", valor: "Niveles 5 y 6 (Doble nivel Penthouse)" },
      { label: "Recámaras", valor: "3 a 4 recámaras con opción a Family Room" },
      { label: "Baños", valor: "3.5 a 4 baños completos" },
      { label: "Estacionamiento", valor: "3 cajones independientes techados" },
      { label: "Servicios", valor: "Cuarto de lavado y cuarto de servicio completo" },
    ],
    plantas: [
      {
        id: "pb",
        titulo: "Planta Nivel 5 — Acceso y Área Social",
        nivel: "Nivel 5 (Planta Baja del PH)",
        src: "/images/tipologias/ta-ph-pb/planta-pb.jpg",
        alt: "Planta ilustrada Nivel 5 de Penthouse con amplia estancia y terraza techada",
      },
      {
        id: "pa",
        titulo: "Planta Nivel 6 — Roof Garden y Terraza",
        nivel: "Nivel 6 (Planta Alta del PH)",
        src: "/images/tipologias/ta-ph-pb/planta-pa.jpg",
        alt: "Planta ilustrada Nivel 6 de Penthouse con patio privado y terraza superior",
      },
    ],
    renders: [
      {
        id: "sala-comedor",
        titulo: "Gran Estancia y Comedor Penthouse",
        espacio: "Área Social",
        src: "/images/tipologias/ta-ph-pb/sala-comedor.jpg",
        alt: "Render de sala y comedor en Penthouse de Lomas Altas con vista panorámica y techos altos",
        caption: "Monumental estancia con ventanales corredizos y conexión a la terraza principal.",
      },
      {
        id: "cocina",
        titulo: "Cocina Gourmet Penthouse",
        espacio: "Cocina",
        src: "/images/tipologias/ta/cocina.jpeg",
        alt: "Render de cocina gourmet en Penthouse",
        caption: "Cocina de diseñador con cubierta de granito, isla central y electrodomésticos empotrados.",
      },
      {
        id: "recamara",
        titulo: "Master Suite Penthouse",
        espacio: "Recámara Principal",
        src: "/images/tipologias/ta/recamara.jpg",
        alt: "Render de Master Suite en Penthouse con luz natural",
        caption: "Suite principal privada con espacio para cama King Size y vestidor walk-in.",
      },
      {
        id: "bano",
        titulo: "Baño Principal Penthouse",
        espacio: "Baño",
        src: "/images/9.png",
        alt: "Render de baño principal en Penthouse con acabados en mármol travertino",
        caption: "Baño principal de lujo revestido en mármol travertino con cancelería templada.",
      },
    ],
  },
];

export function obtenerTipologiaPorSlug(slug: string): Tipologia | undefined {
  return TIPOLOGIAS.find((t) => t.slug === slug || t.id === slug);
}

export interface Estancia {
  n: string;
  nombre: string;
  tag: string;
  desc: string;
  x: number;
  y: number;
}

export const ESTANCIAS: readonly Estancia[] = [
  {
    n: "01",
    nombre: "Terraza techada",
    tag: "TERRAZA PRIVADA",
    desc: "Corre a lo largo de la fachada. La jardinera perimetral la separa de la calle sin cerrarle la vista, y se abre desde la estancia con cancelería de piso a techo.",
    x: 33,
    y: 77,
  },
  {
    n: "02",
    nombre: "Estancia principal",
    tag: "ÁREA SOCIAL",
    desc: "Sin muros intermedios con el comedor. El ventanal corre completo hacia la terraza: abierto, sala y terraza terminan siendo el mismo espacio.",
    x: 55,
    y: 60,
  },
  {
    n: "03",
    nombre: "Comedor",
    tag: "ÁREA SOCIAL",
    desc: "Integrado a la estancia y con paso directo a la cocina. Con capacidad para ocho comensales sin invadir la circulación.",
    x: 60,
    y: 46,
  },
  {
    n: "04",
    nombre: "Cocina integral equipada",
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
    desc: "Recámara con clóset integrado y ventana a la fachada larga con luz natural.",
    x: 29,
    y: 43,
  },
  {
    n: "07",
    nombre: "Tercera recámara",
    tag: "HABITACIÓN",
    desc: "La tercera habitación, en el extremo opuesto a la principal. Funciona igual como recámara que como oficina privada.",
    x: 40,
    y: 14,
  },
  {
    n: "08",
    nombre: "Estudio o family room",
    tag: "ESPACIO MULTIUSOS",
    desc: "Espacio abierto entre las recámaras: sala de televisión, estudio o cuarto de juegos.",
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
    desc: "Cuarto de servicio independiente con baño propio, según la tipología elegida.",
    x: 80,
    y: 19,
  },
  {
    n: "12",
    nombre: "Jardín o patio",
    tag: "EXTERIOR EXCLUSIVO",
    desc: "Exclusivo para residencias Planta Jardín (46.39 m²) y Penthouses (70.90 m² de patio sin techar).",
    x: 76,
    y: 62,
  },
];

export interface Acabado {
  n: string;
  nombre: string;
  detalle: string;
}

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
    detalle: "Madera de ingeniería en áreas secas; cerámico texturizado en áreas húmedas.",
  },
  {
    n: "03",
    nombre: "Baños",
    detalle: "Travertino en el baño principal y muebles de lavabo a medida con doble tarja.",
  },
  {
    n: "04",
    nombre: "Terraza y jardineras",
    detalle: "Techada, con barandal de cristal templado y jardinera corrida con riego.",
  },
  {
    n: "05",
    nombre: "Cancelería",
    detalle: "Corrediza de piso a techo en la estancia, con cristal acústico y control térmico.",
  },
  {
    n: "06",
    nombre: "Iluminación",
    detalle: "LED integrada arquitectónica, sumada a luz natural en todas las estancias.",
  },
  {
    n: "07",
    nombre: "Lavado",
    detalle: "Cuarto independiente y cerrado con ventilación natural.",
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
  nombre?: string;
  topPercent: number;
  bottomPercent: number;
  centerPercent: number;
  y: number;
}

export const NIVELES: readonly Nivel[] = [
  { codigo: "N6", uso: "Tipología A — Penthouse (2 unidades)", nombre: "Penthouse — Planta Alta", topPercent: 0, bottomPercent: 15.7, centerPercent: 11.7, y: 11.7 },
  { codigo: "N5", uso: "Tipología A — Penthouse y terrazas privadas", nombre: "Penthouse — Planta Baja", topPercent: 15.7, bottomPercent: 24.0, centerPercent: 19.8, y: 19.8 },
  { codigo: "N4", uso: "Tipología A (2) y Tipología B (2)", nombre: "Nivel Residencial 4", topPercent: 24.0, bottomPercent: 32.3, centerPercent: 28.2, y: 28.2 },
  { codigo: "N3", uso: "Tipología A (2) y Tipología B (2)", nombre: "Nivel Residencial 3", topPercent: 32.3, bottomPercent: 40.5, centerPercent: 36.4, y: 36.4 },
  { codigo: "N2", uso: "Tipología A (2) y Tipología B (1)", nombre: "Nivel Residencial 2", topPercent: 40.5, bottomPercent: 50.2, centerPercent: 45.3, y: 45.3 },
  { codigo: "N0–N1", uso: "Planta Jardín (Dúplex 2 Niveles)", nombre: "Planta Jardín (Dúplex 2 Niveles)", topPercent: 50.2, bottomPercent: 67.5, centerPercent: 58.8, y: 58.8 },
  { codigo: "N-1", uso: "Estacionamiento 1", nombre: "Sótano 1 — Estacionamiento", topPercent: 67.5, bottomPercent: 74.3, centerPercent: 70.9, y: 70.9 },
  { codigo: "N-2", uso: "Estacionamiento 2", nombre: "Sótano 2 — Estacionamiento", topPercent: 74.3, bottomPercent: 81.0, centerPercent: 77.6, y: 77.6 },
  { codigo: "N-3", uso: "Estacionamiento 3", nombre: "Sótano 3 — Estacionamiento", topPercent: 81.0, bottomPercent: 87.5, centerPercent: 84.2, y: 84.2 },
  { codigo: "N-4", uso: "Jardines y áreas verdes", nombre: "Nivel Amenidades — Jardines", topPercent: 87.5, bottomPercent: 100, centerPercent: 93.5, y: 93.5 },
];

export const FIGURAS: readonly LightboxItem[] = [
  {
    src: "/images/estancia-comedor.jpg",
    alt: "Estancia y salón con iluminación natural y amplios ventanales",
    title: "Fig. 03 — Estancia y comedor",
    caption:
      "Estancia y comedor con techos continuos, ventanales de piso a techo y conexión panorámica al exterior.",
  },
  {
    src: "/images/10.png",
    alt: "Cocina integral con frentes de madera clara, electrodomésticos empotrados y cubierta de granito",
    title: "Fig. 04 — Cocina integral",
    caption:
      "Cocina integral con frentes de madera clara, electrodomésticos empotrados y cubierta de granito.",
  },
  {
    src: "/images/9.png",
    alt: "Baño principal con doble lavabo sobre mueble de madera, muros de travertino y regadera a ras de piso",
    title: "Fig. 05 — Baño principal",
    caption:
      "Baño principal: doble lavabo sobre mueble de madera, travertino en muros y regadera a ras de piso.",
  },
  {
    src: "/images/7.png",
    alt: "Sala con cancelería corrediza de piso a techo abierta hacia la terraza ajardinada",
    title: "Fig. 06 — Sala",
    caption: "Sala con cancelería corrediza de piso a techo hacia la terraza ajardinada.",
  },
  {
    src: "/images/Amenidades/Terralago Gym.jpg",
    alt: "Gimnasio del edificio en planta baja, con ventanales hacia el jardín",
    title: "Fig. 07 — Gimnasio",
    caption: "Gimnasio del edificio, en planta baja, con ventanales al jardín.",
  },
];

export const FIGURA_PLANTA: readonly LightboxItem[] = [
  {
    src: "/images/render.jpg",
    alt: "Planta tipo en vista isométrica: terraza, estancia, comedor, cocina, recámaras y baños",
    title: "Fig. 02 — Planta tipo isométrica",
    caption:
      "Planta tipo del proyecto en vista 3D isométrica. Mobiliario y acabados ilustrativos.",
    plate: "cream",
  },
];

export const FIGURA_CORTE: readonly LightboxItem[] = [
  {
    src: "/images/estructura.jpg",
    alt: "Corte esquemático del edificio Lomas Altas con 18 unidades distribuidas en niveles residenciales, Planta Jardín en 2 niveles (N0–N1), sótanos de estacionamiento y amenidades",
    title: "Fig. 08 — El edificio en corte",
    caption:
      "Distribución por niveles, de N-4 a N6. Residencias Planta Jardín en 2 niveles (N0–N1), departamentos y penthouses dúplex.",
    plate: "cream",
  },
];

export interface FichaFila {
  dt: string;
  dd: string;
}

export const FICHA: readonly FichaFila[] = [
  { dt: "Ubicación", dd: "Lomas Verdes, Naucalpan, Edo. Méx." },
  { dt: "Unidades", dd: "18 exclusivas (16 departamentos + 2 penthouses)" },
  { dt: "Tipologías", dd: "4 modelos diseñados a detalle" },
  { dt: "Niveles", dd: "5 sobre planta baja + 3 de estacionamiento" },
  { dt: "Superficies", dd: "Desde 188.94 m² hasta 384.84 m² totales" },
  { dt: "Estacionamiento", dd: "2 a 3 cajones techados por residencia" },
  { dt: "Amenidades", dd: "Roof garden común, gimnasio, lobby y jardines" },
  { dt: "Desarrolla", dd: "Siermend" },
];

export const CONTACTO = {
  tel: "56 1070 6351",
  telHref: "tel:+525610706351",
  mail: "ventas@siermend.com",
  direccion: "Av. Lomas Verdes y P.º de Lomas Verdes, 53125 Naucalpan de Juárez, Méx.",
} as const;
