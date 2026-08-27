"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Check, ChevronDown, Loader2 } from "lucide-react";
import SafeReveal from "@/components/ui/SafeReveal";
import {
  CANALES,
  CONTACTO,
  FORMAS_DE_PAGO,
  LIMITE_MENSAJE,
  MODELOS,
  enviarSolicitud,
  formatearTelefono,
  validarSolicitud,
  type Canal,
  type Solicitud,
} from "@/lib/contacto";

type EstadoEnvio = "idle" | "enviando" | "exito" | "error";

type Valores = Omit<Solicitud, "montadoEn">;

type CampoValidable = "nombre" | "correo" | "telefono" | "modelo" | "consentimiento" | "mensaje";

type FalloEnvio = { titulo: string; texto: string };

const VALORES_INICIALES: Valores = {
  nombre: "",
  correo: "",
  telefono: "",
  modelo: "",
  pago: FORMAS_DE_PAGO[0],
  canal: "Llamada",
  mensaje: "",
  consentimiento: false,
  empresa: "",
};

/** Reading order of the form, so the error summary lists fields the way the eye finds them. */
const ORDEN_CAMPOS: CampoValidable[] = [
  "nombre",
  "correo",
  "telefono",
  "modelo",
  "mensaje",
  "consentimiento",
];

const ETIQUETAS: Record<CampoValidable, string> = {
  nombre: "Nombre completo",
  correo: "Correo electrónico",
  telefono: "Teléfono",
  modelo: "Modelo de interés",
  mensaje: "Mensaje",
  consentimiento: "Autorización de contacto",
};

const FALLO_DE_RED: FalloEnvio = {
  titulo: "No pudimos enviar tu solicitud.",
  texto: `Revisa tu conexión e inténtalo otra vez, o llámanos al ${CONTACTO.telFmt} y lo resolvemos por teléfono.`,
};

const FALLO_POR_REPETICION: FalloEnvio = {
  titulo: "Ya recibimos una solicitud tuya.",
  texto: `Acabas de enviarnos una hace unos segundos. Espera un momento antes de mandar otra, o llámanos al ${CONTACTO.telFmt}.`,
};

/** One successful submission every 30 s. Retries after a failure are never blocked. */
const ESPERA_ENTRE_ENVIOS_MS = 30_000;

const LABEL_CLASS =
  "font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5c4a2c]";
const HINT_CLASS = "mt-2 font-sans text-[11px] font-light leading-snug text-[#5c4a2c]/80";
const ERROR_CLASS = "mt-2 flex items-start gap-1.5 font-sans text-xs text-clay";
// border-forest/55 y el anillo de foco en gold-dark solido son los minimos que pasan
// el 3:1 de 1.4.11 contra el blanco del panel y el crema del propio campo.
const CAMPO_CLASS =
  "w-full rounded-none border border-forest/55 bg-cream px-4 py-3.5 font-sans text-base font-normal text-forest transition-[box-shadow,border-color] duration-200 placeholder:text-[#5c4a2c]/80 focus:border-forest focus:shadow-[inset_3px_0_0_0_#c4a96a,0_0_0_2px_#a8904f] focus:outline-none aria-[invalid=true]:border-clay aria-[invalid=true]:shadow-[inset_3px_0_0_0_#8c3a24] md:text-sm";

/** aria-describedby must be absent, never an empty string, when there is nothing to point at. */
function describedBy(...ids: (string | undefined)[]): string | undefined {
  const presentes = ids.filter((id): id is string => Boolean(id));
  return presentes.length > 0 ? presentes.join(" ") : undefined;
}

function prefiereMenosMovimiento(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function Obligatorio() {
  return (
    <span aria-hidden className="text-clay">
      {" *"}
    </span>
  );
}

function MensajeError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className={ERROR_CLASS}>
      <AlertCircle aria-hidden className="mt-px size-3.5 shrink-0" />
      {children}
    </p>
  );
}

type CampoTextoProps = {
  id: string;
  etiqueta: string;
  valor: string;
  placeholder: string;
  autoComplete: string;
  obligatorio?: boolean;
  tipo?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel";
  enterKeyHint?: "next" | "send";
  hint?: string;
  error?: string;
  className?: string;
  onChange: (valor: string) => void;
  onBlur: () => void;
  registrar: (el: HTMLInputElement | null) => void;
};

function CampoTexto({
  id,
  etiqueta,
  valor,
  placeholder,
  autoComplete,
  obligatorio = false,
  tipo = "text",
  inputMode,
  enterKeyHint = "next",
  hint,
  error,
  className = "",
  onChange,
  onBlur,
  registrar,
}: CampoTextoProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {etiqueta}
        {obligatorio && <Obligatorio />}
      </label>
      <input
        id={id}
        name={id}
        ref={registrar}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        required={obligatorio}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(hintId, errorId)}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`mt-2 ${CAMPO_CLASS}`}
      />
      {hint && (
        <p id={hintId} className={HINT_CLASS}>
          {hint}
        </p>
      )}
      {error && errorId && <MensajeError id={errorId}>{error}</MensajeError>}
    </div>
  );
}

type CampoSelectProps = {
  id: string;
  etiqueta: string;
  valor: string;
  obligatorio?: boolean;
  error?: string;
  className?: string;
  opciones: { valor: string; etiqueta: string }[];
  onChange: (valor: string) => void;
  onBlur: () => void;
  registrar: (el: HTMLSelectElement | null) => void;
};

function CampoSelect({
  id,
  etiqueta,
  valor,
  obligatorio = false,
  error,
  className = "",
  opciones,
  onChange,
  onBlur,
  registrar,
}: CampoSelectProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {etiqueta}
        {obligatorio && <Obligatorio />}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          name={id}
          ref={registrar}
          value={valor}
          required={obligatorio}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(errorId)}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${CAMPO_CLASS} appearance-none pr-10`}
        >
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.etiqueta}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#5c4a2c]/70"
        />
      </div>
      {error && errorId && <MensajeError id={errorId}>{error}</MensajeError>}
    </div>
  );
}

type AcuseProps = {
  nombre: string;
  canal: Canal;
  folio: string;
  onNuevaSolicitud: () => void;
};

/** Reads naturally mid-sentence; a blanket toLowerCase() would print "whatsapp". */
const CANAL_EN_PROSA: Record<Canal, string> = {
  Llamada: "llamada",
  WhatsApp: "WhatsApp",
  Correo: "correo",
};

/** The receipt is a printed slip, not a toast: it holds the folio the CRM will quote back. */
function AcuseDeRecibo({ nombre, canal, folio, onNuevaSolicitud }: AcuseProps) {
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const primerNombre = nombre.trim().split(/\s+/)[0];

  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  return (
    <div role="status" className="relative bg-forest-deeper p-10 text-white lg:p-14">
      <p className="sr-only">Solicitud enviada. Un asesor te contactará.</p>
      <span
        aria-hidden
        className="absolute left-10 top-0 h-10 w-10 bg-gold"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      />

      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-light">
        Acuse de recibo
      </p>

      <h3 ref={tituloRef} tabIndex={-1} className="mt-5 outline-none">
        <span className="block font-sans text-3xl font-light text-white lg:text-4xl">
          Gracias, {primerNombre}.
        </span>
        <span className="block font-serif text-3xl italic text-gold-light lg:text-4xl">
          Te buscamos hoy mismo.
        </span>
      </h3>

      <p className="mt-6 max-w-[52ch] font-sans text-[13px] font-light leading-relaxed text-white/75">
        Un asesor de Siermend te contactará por {CANAL_EN_PROSA[canal]} dentro de las próximas 24
        horas hábiles. Si quieres adelantarte, escríbenos por WhatsApp y te mandamos las plantas
        ahora.
      </p>

      <p className="mt-8 font-sans text-[11px] tracking-[0.3em] text-gold-light">
        FOLIO LA-{folio}
      </p>

      <div aria-hidden className="my-8 h-px w-full bg-white/12" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={CONTACTO.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-gold px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-light transition-colors duration-300 hover:bg-forest-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Escribir por WhatsApp
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
        <button
          type="button"
          onClick={onNuevaSolicitud}
          className="inline-flex min-h-[44px] items-center justify-center font-sans text-xs uppercase tracking-[0.2em] text-white/70 underline underline-offset-8 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:justify-start"
        >
          Enviar otra solicitud
        </button>
      </div>
    </div>
  );
}

export default function SolicitudForm() {
  const [valores, setValores] = useState<Valores>(VALORES_INICIALES);
  const [tocados, setTocados] = useState<Partial<Record<CampoValidable, boolean>>>({});
  const [intentado, setIntentado] = useState(false);
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [folio, setFolio] = useState("");
  const [fallo, setFallo] = useState<FalloEnvio | null>(null);
  const [, iniciarEnvio] = useTransition();

  const refsCampos = useRef<Partial<Record<CampoValidable, HTMLElement | null>>>({});
  const ultimoEnvioRef = useRef(0);
  const pedirFocoNombreRef = useRef(false);
  // A submit milliseconds after the form appeared is a bot. Stamped in an effect so
  // server and client agree on the first render, and re-stamped after each send.
  const montadoEnRef = useRef(0);

  useEffect(() => {
    montadoEnRef.current = Date.now();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modParam = params.get("modelo");
      if (modParam) {
        const found = MODELOS.find(
          (m) =>
            (m.valor && m.valor.toLowerCase().includes(modParam.toLowerCase())) ||
            (modParam === "ta-nj-pb" && (m.valor.includes("Planta Jardín") || m.valor.includes("Nivel Jardín"))) ||
            (modParam === "ta" && m.valor === "Tipología A (191.00 m²)") ||
            (modParam === "tb" && m.valor.includes("Tipología B")) ||
            (modParam === "ta-ph-pb" && m.valor.includes("Penthouse"))
        );
        if (found && found.valor) {
          setValores((prev) => ({ ...prev, modelo: found.valor }));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (estado === "idle" && pedirFocoNombreRef.current) {
      pedirFocoNombreRef.current = false;
      refsCampos.current.nombre?.focus();
    }
  }, [estado]);

  // montadoEn plays no part in validation - the real stamp is attached at send time,
  // where reading the ref is legal.
  const borrador: Solicitud = { ...valores, montadoEn: 0 };
  const errores = validarSolicitud(borrador);
  const invalidos = ORDEN_CAMPOS.filter((campo) => errores[campo]);
  const enviando = estado === "enviando";

  /** Errors stay quiet until the field is left, then track every keystroke while it is fixed. */
  const errorDe = (campo: CampoValidable): string | undefined =>
    tocados[campo] || intentado ? errores[campo] : undefined;

  const marcarTocado = (campo: CampoValidable) => {
    setTocados((previos) => ({ ...previos, [campo]: true }));
  };

  const actualizar = <K extends keyof Valores>(campo: K, valor: Valores[K]) => {
    setValores((previos) => ({ ...previos, [campo]: valor }));
  };

  const enfocar = (campo: CampoValidable) => {
    const elemento = refsCampos.current[campo];
    if (!elemento) return;
    elemento.scrollIntoView({
      block: "center",
      behavior: prefiereMenosMovimiento() ? "auto" : "smooth",
    });
    elemento.focus({ preventScroll: true });
  };

  const despachar = (respetarEspera: boolean) => {
    setEstado("enviando");
    setFallo(null);

    iniciarEnvio(async () => {
      // Captcha-free throttle: one *successful* submission per window. A retry
      // after a failure is never blocked, which is the whole point of "Reintentar".
      if (respetarEspera && Date.now() - ultimoEnvioRef.current < ESPERA_ENTRE_ENVIOS_MS) {
        setEstado("error");
        setFallo(FALLO_POR_REPETICION);
        return;
      }

      try {
        const respuesta = await enviarSolicitud({ ...valores, montadoEn: montadoEnRef.current });
        if (respuesta.ok) {
          ultimoEnvioRef.current = Date.now();
          // The receipt replaces the form, so the next one starts its clock here.
          montadoEnRef.current = Date.now();
          setFolio(respuesta.folio);
          setEstado("exito");
          // The floating mobile bar listens for this to retract itself.
          window.dispatchEvent(new CustomEvent("solicitud:exito"));
        } else {
          setEstado("error");
          setFallo({ titulo: FALLO_DE_RED.titulo, texto: respuesta.error });
        }
      } catch {
        setEstado("error");
        setFallo(FALLO_DE_RED);
      }
    });
  };

  const alEnviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // El boton usa aria-disabled, no disabled, para no perder el foco mientras se
    // envia: hay que ignorar el reenvio a mano.
    if (enviando) return;

    setIntentado(true);

    // Se revalida siempre, tambien al reintentar: entre el fallo y el reintento el
    // usuario pudo vaciar un campo obligatorio y saldria sin ningun aviso.
    const fallidos = ORDEN_CAMPOS.filter((campo) => errores[campo]);
    if (fallidos.length > 0) {
      enfocar(fallidos[0]);
      return;
    }

    // "Reintentar" tras un fallo de red no vuelve a pasar por la espera: aquel envio
    // no llego a ninguna parte. Pero si el fallo FUE la propia espera, hay que seguir
    // respetandola, o bastarian dos pulsaciones seguidas para saltarse el limite.
    despachar(estado !== "error" || fallo === FALLO_POR_REPETICION);
  };

  const reiniciar = () => {
    setValores(VALORES_INICIALES);
    setTocados({});
    setIntentado(false);
    setFolio("");
    setFallo(null);
    pedirFocoNombreRef.current = true;
    setEstado("idle");
    // Contrapartida de "solicitud:exito": el acuse ya no esta en pantalla, asi que la
    // barra movil puede volver a ofrecer sus salidas.
    window.dispatchEvent(new CustomEvent("solicitud:reinicio"));
  };

  const textoBoton = enviando ? "Enviando…" : estado === "error" ? "Reintentar" : "Enviar solicitud";

  return (
    <section
      id="solicitud"
      className="relative scroll-mt-28 bg-cream py-20 md:scroll-mt-32 md:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* Editorial margin rail. Never wrapped whole in a reveal: a transformed
            ancestor would kill lg:sticky. */}
        <aside className="relative lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <Image
            src="/images/isotip3.svg"
            alt=""
            aria-hidden
            width={360}
            height={360}
            className="pointer-events-none absolute -left-16 -top-8 -z-10 hidden w-[360px] opacity-[0.045] lg:block"
          />

          <SafeReveal variant="slide-left" delay={100}>
            <p aria-hidden className="font-serif text-[68px] font-light leading-[0.8] text-[#5c4a2c]/20">
              01
            </p>
            <span aria-hidden className="mt-3 block h-px w-10 bg-gold" />
            <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c4a2c]">
              Solicitud de información
            </p>
            <h2 className="mt-5">
              <span className="block font-sans text-3xl font-light leading-[1.05] tracking-[-0.01em] text-forest lg:text-[2.5rem]">
                Cuéntanos qué buscas
              </span>
              <span className="block font-serif text-3xl italic text-forest lg:text-[2.5rem]">
                y preparamos tu visita.
              </span>
            </h2>
          </SafeReveal>

          <p className="mt-6 font-sans text-sm font-light leading-relaxed text-[#5c4a2c]">
            Entre más nos digas, mejor llegamos a la cita: llevamos el plano del modelo que te
            interesa, los niveles disponibles y las opciones de pago que apliquen a tu caso.
          </p>

          <div aria-hidden className="my-8 h-px w-full bg-forest/12" />

          <div className="border-l-2 border-gold py-1 pl-5">
            <p className="font-sans text-sm font-light leading-relaxed text-[#5c4a2c]">
              Respondemos en menos de 24 horas hábiles. Sin listas de correo ni llamadas
              insistentes.
            </p>
          </div>

          <p className="mt-10 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c4a2c]">
            Qué pasa después de enviar
          </p>
          <ol className="mt-4">
            {[
              "Recibimos tu solicitud. Entra directo a la bandeja del equipo de ventas.",
              "Te contactamos en menos de 24 horas hábiles, por el canal que elijas.",
              "Agendamos tu visita: fachada, distribuciones, disponibilidad y precios al día.",
            ].map((paso, i) => (
              <li
                key={paso}
                className="flex gap-4 border-b border-forest/12 py-3.5 last:border-0"
              >
                <span className="font-serif text-[13px] tracking-[0.15em] text-[#5c4a2c]/80">
                  0{i + 1}
                </span>
                <p className="font-sans text-sm font-light leading-relaxed text-[#5c4a2c]">
                  {paso}
                </p>
              </li>
            ))}
          </ol>

          <a
            href={CONTACTO.telHref}
            className="mt-8 inline-block font-sans text-xs font-light text-[#5c4a2c] underline decoration-gold-dark/50 underline-offset-8 transition-colors duration-300 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark"
          >
            ¿Prefieres hablar? Marca al {CONTACTO.telFmt}
          </a>


        </aside>

        {/* Form panel over the offset sand plane */}
        <div className="relative lg:col-span-8">
          <div
            aria-hidden
            className={`absolute inset-0 translate-x-3 translate-y-3 transition-colors duration-700 md:translate-x-5 md:translate-y-5 ${
              estado === "exito" ? "bg-gold" : "bg-[#decd99]"
            }`}
          />

          {estado === "exito" ? (
            <AcuseDeRecibo
              nombre={valores.nombre}
              canal={valores.canal}
              folio={folio}
              onNuevaSolicitud={reiniciar}
            />
          ) : (
            <form
              noValidate
              onSubmit={alEnviar}
              className="form-lomas relative border border-forest/12 bg-white p-6 sm:p-10 lg:p-12"
            >
              <p className="font-sans text-[11px] font-light text-[#5c4a2c]/80">
                Los campos marcados con <span className="text-clay">*</span> son necesarios.
              </p>

              {intentado && invalidos.length > 0 && (
                <div role="alert" className="mt-6 border-l-2 border-clay bg-clay/[0.06] px-5 py-4">
                  <p className="font-sans text-xs font-semibold text-clay">
                    Revisa estos campos antes de enviar:
                  </p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {invalidos.map((campo) => (
                      <li key={campo}>
                        <button
                          type="button"
                          onClick={() => enfocar(campo)}
                          className="inline-flex min-h-[24px] items-center py-0.5 text-left font-sans text-xs text-clay underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                        >
                          {ETIQUETAS[campo]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
                <CampoTexto
                  id="sol-nombre"
                  etiqueta="Nombre completo"
                  obligatorio
                  valor={valores.nombre}
                  placeholder="María Fernanda Ruiz"
                  autoComplete="name"
                  error={errorDe("nombre")}
                  className="sm:col-span-2"
                  onChange={(v) => actualizar("nombre", v)}
                  onBlur={() => marcarTocado("nombre")}
                  registrar={(el) => {
                    refsCampos.current.nombre = el;
                  }}
                />

                <CampoTexto
                  id="sol-correo"
                  etiqueta="Correo electrónico"
                  obligatorio
                  tipo="email"
                  inputMode="email"
                  valor={valores.correo}
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                  hint="Ahí te enviamos las plantas y la información de precios."
                  error={errorDe("correo")}
                  onChange={(v) => actualizar("correo", v)}
                  onBlur={() => marcarTocado("correo")}
                  registrar={(el) => {
                    refsCampos.current.correo = el;
                  }}
                />

                <CampoTexto
                  id="sol-telefono"
                  etiqueta="Teléfono"
                  obligatorio
                  tipo="tel"
                  inputMode="tel"
                  valor={valores.telefono}
                  placeholder="55 1234 5678"
                  autoComplete="tel"
                  hint="Diez dígitos, con lada."
                  error={errorDe("telefono")}
                  onChange={(v) => actualizar("telefono", formatearTelefono(v))}
                  onBlur={() => marcarTocado("telefono")}
                  registrar={(el) => {
                    refsCampos.current.telefono = el;
                  }}
                />

                <CampoSelect
                  id="sol-modelo"
                  etiqueta="Modelo de interés"
                  obligatorio
                  valor={valores.modelo}
                  opciones={MODELOS}
                  error={errorDe("modelo")}
                  onChange={(v) => actualizar("modelo", v)}
                  onBlur={() => marcarTocado("modelo")}
                  registrar={(el) => {
                    refsCampos.current.modelo = el;
                  }}
                />

                <CampoSelect
                  id="sol-pago"
                  etiqueta="Forma de pago"
                  valor={valores.pago}
                  opciones={FORMAS_DE_PAGO.map((p) => ({ valor: p, etiqueta: p }))}
                  onChange={(v) => actualizar("pago", v)}
                  onBlur={() => undefined}
                  registrar={() => undefined}
                />

                <fieldset className="sm:col-span-2">
                  <legend className={LABEL_CLASS}>¿Cómo prefieres que te contactemos?</legend>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {CANALES.map((canal) => (
                      <label key={canal} className="cursor-pointer">
                        <input
                          type="radio"
                          name="sol-canal"
                          value={canal}
                          checked={valores.canal === canal}
                          onChange={() => actualizar("canal", canal)}
                          className="peer sr-only"
                        />
                        <span className="flex min-h-[44px] cursor-pointer items-center rounded-none border border-forest/55 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-[#5c4a2c] transition peer-checked:border-forest peer-checked:bg-forest peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-dark">
                          {canal}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-col sm:col-span-2">
                  <label htmlFor="sol-mensaje" className={LABEL_CLASS}>
                    Mensaje
                  </label>
                  <textarea
                    id="sol-mensaje"
                    name="sol-mensaje"
                    ref={(el) => {
                      refsCampos.current.mensaje = el;
                    }}
                    rows={4}
                    value={valores.mensaje}
                    placeholder="¿Qué te gustaría saber? Vista, nivel, tiempos de entrega, formas de pago…"
                    enterKeyHint="send"
                    aria-invalid={Boolean(errorDe("mensaje"))}
                    aria-describedby={describedBy(
                      "sol-mensaje-hint",
                      errorDe("mensaje") ? "sol-mensaje-error" : undefined
                    )}
                    onChange={(e) => actualizar("mensaje", e.target.value)}
                    onBlur={() => marcarTocado("mensaje")}
                    className={`mt-2 resize-y ${CAMPO_CLASS}`}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <p id="sol-mensaje-hint" className={HINT_CLASS}>
                      Opcional. Hasta {LIMITE_MENSAJE} caracteres.
                    </p>
                    {/* Visual only: the limit is already announced in the hint above. */}
                    <p
                      aria-hidden
                      className="mt-2 shrink-0 font-sans text-[11px] font-light tabular-nums text-[#5c4a2c]/80"
                    >
                      {valores.mensaje.length}/{LIMITE_MENSAJE}
                    </p>
                  </div>
                  {errorDe("mensaje") && (
                    <MensajeError id="sol-mensaje-error">{errorDe("mensaje")}</MensajeError>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <input
                      id="sol-consentimiento"
                      name="sol-consentimiento"
                      type="checkbox"
                      ref={(el) => {
                        refsCampos.current.consentimiento = el;
                      }}
                      checked={valores.consentimiento}
                      required
                      onChange={(e) => {
                        actualizar("consentimiento", e.target.checked);
                        marcarTocado("consentimiento");
                      }}
                      aria-invalid={Boolean(errorDe("consentimiento"))}
                      aria-labelledby="sol-consentimiento-texto"
                      aria-describedby={describedBy(
                        errorDe("consentimiento") ? "sol-consentimiento-error" : undefined
                      )}
                      className="peer sr-only"
                    />
                    {/* The label is the box alone so the privacy link inside the sentence
                        stays a link and does not toggle the checkbox when clicked.
                        El ::before agranda el area tactil a 32x32 sin mover el dibujo
                        de 18px: cabe en el gap-3 y no pisa el texto. */}
                    <label
                      htmlFor="sol-consentimiento"
                      className="relative mt-0.5 grid size-[18px] shrink-0 cursor-pointer place-items-center rounded-none border border-forest/55 before:absolute before:-inset-[7px] before:content-[''] peer-checked:border-forest peer-checked:bg-forest peer-checked:[&_svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-dark"
                    >
                      <Check aria-hidden className="size-3 text-cream opacity-0" />
                    </label>
                    <p
                      id="sol-consentimiento-texto"
                      className="font-sans text-[11px] leading-relaxed text-[#5c4a2c]"
                    >
                      He leído el{" "}
                      <Link
                        href="/contacto#aviso-de-privacidad"
                        className="underline decoration-gold-dark/60 underline-offset-4 transition-colors duration-300 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
                      >
                        aviso de privacidad
                      </Link>{" "}
                      y autorizo a Siermend a contactarme por teléfono, WhatsApp o correo sobre
                      Lomas Altas.
                      <Obligatorio />
                    </p>
                  </div>
                  {errorDe("consentimiento") && (
                    <MensajeError id="sol-consentimiento-error">
                      {errorDe("consentimiento")}
                    </MensajeError>
                  )}
                </div>

                <div className="sm:col-span-2">
                  {fallo && (
                    <div
                      role="alert"
                      className="mb-6 border-l-2 border-clay bg-clay/[0.06] px-5 py-4"
                    >
                      <p className="font-sans text-xs font-semibold text-clay">{fallo.titulo}</p>
                      <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-[#5c4a2c]">
                        {fallo.texto}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                    {/* Sibling frame, never a pseudo-element inside the button:
                        overflow-hidden would clip it and it would eat the click. */}
                    <div className="group relative inline-block w-full sm:w-auto">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-gold transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                      {/* aria-disabled en vez de disabled: un boton deshabilitado en
                          pleno envio pierde el foco al <body>, y si el envio falla el
                          teclado se queda al principio del documento. */}
                      <button
                        type="submit"
                        aria-disabled={enviando}
                        aria-busy={enviando}
                        className="relative w-full overflow-hidden bg-forest px-12 py-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-gold hover:text-forest hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
                      >
                        {enviando && (
                          <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gold/25">
                            <span className="block h-full w-1/3 animate-rule-sweep bg-gold motion-reduce:w-full motion-reduce:animate-none" />
                          </span>
                        )}
                        <span className="inline-flex items-center justify-center gap-2">
                          {enviando && <Loader2 aria-hidden className="size-3.5 animate-spin" />}
                          {textoBoton}
                        </span>
                      </button>
                    </div>

                    <p className="font-sans text-[11px] font-light leading-relaxed text-[#5c4a2c]/80 sm:max-w-[34ch]">
                      Tus datos se usan únicamente para atender esta solicitud. No los compartimos
                      con terceros.
                    </p>
                  </div>

                  <p role="status" aria-live="polite" className="sr-only">
                    {enviando ? "Enviando tu solicitud." : ""}
                  </p>
                </div>
              </div>

              {/* Honeypot: invisible, out of the tab order, and shipped in the payload
                  so the future Server Action can drop bots without a redesign. */}
              <div aria-hidden className="absolute left-[-9999px] top-0">
                <input
                  type="text"
                  name="empresa"
                  tabIndex={-1}
                  autoComplete="off"
                  value={valores.empresa}
                  onChange={(e) => actualizar("empresa", e.target.value)}
                />
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Editorial showcase banner for the sample unit finishes */}
      <div className="mx-auto mt-16 max-w-[1400px] px-6 sm:mt-20 lg:mt-24 lg:px-12">
        <SafeReveal variant="fade-up" delay={150}>
          <div className="relative overflow-hidden border border-forest/15 bg-white/80 p-6 sm:p-10 lg:p-12 shadow-sm">
            <span
              aria-hidden
              className="absolute left-0 top-0 h-16 w-16 bg-[#decd99]"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-forest/12 shadow-md lg:col-span-7">
                <Image
                  src="/images/tipologias/ta/cocina.jpeg"
                  alt="Cocina integral del departamento muestra en Lomas Altas, con acabados y equipamiento de entrega"
                  fill
                  loading="lazy"
                  quality={100}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-3 sm:inset-4 border border-white/30"
                />
              </div>

              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-gold" />
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c4a2c]">
                    Departamento Muestra
                  </p>
                </div>

                <h3 className="mt-4 font-sans text-2xl font-light text-forest sm:text-3xl">
                  Conoce los acabados reales{" "}
                  <span className="font-serif italic text-forest">en tu recorrido.</span>
                </h3>

                <p className="mt-4 font-sans text-xs font-light leading-relaxed text-[#5c4a2c] sm:text-sm">
                  Cada departamento se entrega totalmente equipado: cocina integral con cubiertas
                  resistentes, carpintería al tono y equipos instalados. Ven a comprobar la calidad
                  constructiva y las vistas antes de decidir.
                </p>

                <div className="mt-6">
                  <a
                    href="#como-llegar"
                    className="inline-flex items-center gap-2 border-b border-forest/40 pb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest transition-colors duration-300 hover:border-forest hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                  >
                    Ver sala de ventas y cómo llegar →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SafeReveal>
      </div>
    </section>
  );
}
