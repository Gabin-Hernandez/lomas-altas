/**
 * Single source of truth for everything /contacto needs: the sales-office data,
 * the shape of a request, its pure validation rules and the network layer.
 *
 * No "use client" on purpose - Server Components read CONTACTO, the form reads
 * the validators, and the day this gets a Server Action only `enviarSolicitud`
 * has to change.
 */

export const CANALES = ["Llamada", "WhatsApp", "Correo"] as const;

export type Canal = (typeof CANALES)[number];

// VERIFICAR CON EL CLIENTE: horarios de la sala de ventas y, sobre todo, el
// WhatsApp. Se asume wa.me/525610706351 (México ya no usa el 1 despues del 52).
// Un wa.me roto es una fuga de leads silenciosa: probarlo en un dispositivo real
// antes de publicar. Si el numero no tiene cuenta, la tercera puerta debe apuntar
// a #solicitud en lugar de dejar un enlace muerto.
export const CONTACTO = {
  telFmt: "56 1070 6351",
  telHref: "tel:+525610706351",
  mail: "ventas@siermend.com",
  mailHref: "mailto:ventas@siermend.com?subject=Informes%20Lomas%20Altas",
  wa: "https://wa.me/525610706351?text=Hola%2C%20me%20interesa%20Lomas%20Altas%20en%20Lomas%20Verdes.%20Quisiera%20informaci%C3%B3n%20de%20disponibilidad.",
  dir1: "Avenida Lomas Verdes esq. P.º de Lomas Verdes",
  dir2: "53125 Naucalpan de Juárez, Estado de México",
  maps: "https://maps.google.com/?q=19.517566,-99.267787",
  coords: [-99.267787, 19.517566] as [number, number],
  horarios: [
    { d: "Lunes a viernes", h: "10:00 – 19:00" },
    { d: "Sábado", h: "10:00 – 15:00" },
    { d: "Domingo", h: "Sólo con cita previa" },
  ],
};

/** Empty value doubles as "not chosen yet", which is what the model validator rejects. */
export const MODELOS = [
  { valor: "", etiqueta: "Selecciona una opción" },
  { valor: "Aún no lo sé", etiqueta: "Aún no lo sé" },
  { valor: "Planta Jardín (351.36 m²)", etiqueta: "Planta Jardín (351.36 m²)" },
  { valor: "Tipología A (191.00 m²)", etiqueta: "Tipología A (191.00 m²)" },
  { valor: "Tipología B (188.94 m²)", etiqueta: "Tipología B (188.94 m²)" },
  { valor: "Tipología A — Penthouse (384.84 m²)", etiqueta: "Tipología A — Penthouse (384.84 m²)" },
  { valor: "Quiero comparar todos", etiqueta: "Quiero comparar todos" },
];

export const FORMAS_DE_PAGO = [
  "Por definir",
  "Crédito hipotecario bancario",
  "Infonavit o Fovissste",
  "Contado",
];

export const LIMITE_MENSAJE = 600;

export type Solicitud = {
  nombre: string;
  correo: string;
  telefono: string;
  modelo: string;
  pago: string;
  canal: Canal;
  mensaje: string;
  consentimiento: boolean;
  /** Honeypot. Any content means a bot filled a field no human can see. */
  empresa: string;
  /** Epoch ms of form mount: a submit milliseconds after mount is not a human. */
  montadoEn: number;
};

export type RespuestaEnvio = { ok: true; folio: string } | { ok: false; error: string };

const RE_CORREO = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const RE_LETRA = /\p{L}/u;

function soloDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/** Masks input as the Mexican 2-4-4 grouping and caps it at ten digits. */
export function formatearTelefono(v: string): string {
  const digitos = soloDigitos(v).slice(0, 10);
  return [digitos.slice(0, 2), digitos.slice(2, 6), digitos.slice(6, 10)]
    .filter(Boolean)
    .join(" ");
}

/** Pure: returns one message per invalid field, an empty object when it all passes. */
export function validarSolicitud(d: Solicitud): Partial<Record<keyof Solicitud, string>> {
  const errores: Partial<Record<keyof Solicitud, string>> = {};
  const nombre = d.nombre.trim();

  if (nombre.length < 3 || !RE_LETRA.test(nombre)) {
    errores.nombre = "Escribe tu nombre para saber cómo dirigirnos a ti.";
  }
  if (!RE_CORREO.test(d.correo.trim())) {
    errores.correo = "Revisa el correo: parece que falta algo. Ejemplo: nombre@correo.com";
  }
  if (soloDigitos(d.telefono).length !== 10) {
    errores.telefono = "El teléfono debe tener diez dígitos, con lada.";
  }
  if (d.modelo === "") {
    errores.modelo = "Elige un modelo, o marca «Aún no lo sé».";
  }
  if (!d.consentimiento) {
    errores.consentimiento = "Necesitamos tu autorización para poder contactarte.";
  }
  if (d.mensaje.length > LIMITE_MENSAJE) {
    errores.mensaje = "El mensaje no puede superar los 600 caracteres.";
  }

  return errores;
}

function generarFolio(): string {
  const ahora = new Date();
  const fecha =
    String(ahora.getFullYear()).slice(-2) +
    String(ahora.getMonth() + 1).padStart(2, "0") +
    String(ahora.getDate()).padStart(2, "0");
  const sufijo = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${fecha}-${sufijo}`;
}

/**
 * TODO: sustituir por Server Action ("use server") o fetch al CRM.
 * NO PUBLICAR SIN CONECTAR: hoy el acuse promete «recibimos tu solicitud» y no la
 * recibe nadie. La firma ya es la definitiva, así que conectarla es cambiar este
 * cuerpo, nada más. El folio sale SIEMPRE de aquí - si lo inventara el componente,
 * el CRM no lo reconocería en la llamada de seguimiento.
 */
export async function enviarSolicitud(d: Solicitud): Promise<RespuestaEnvio> {
  await new Promise((r) => setTimeout(r, 1200));

  // The honeypot and the mount timestamp travel from day one so the server side
  // can drop bots without the form having to be rebuilt later.
  void d;

  return { ok: true, folio: generarFolio() };
}
