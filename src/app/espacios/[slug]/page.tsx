import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TIPOLOGIAS, obtenerTipologiaPorSlug } from "@/components/espacios/espaciosData";
import TipologiaDetalle from "@/components/espacios/TipologiaDetalle";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TIPOLOGIAS.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tipologia = obtenerTipologiaPorSlug(slug);

  if (!tipologia) {
    return {
      title: "Tipología no encontrada — Lomas Altas",
    };
  }

  const primerRender = tipologia.renders[0]?.src || tipologia.plantas[0]?.src || "/images/eyecatcher.jpg";

  return {
    title: `${tipologia.nombre} (${tipologia.codigo}) — Lomas Altas`,
    description: `${tipologia.nombre} en Lomas Altas, Naucalpan. ${tipologia.superficie} de superficie total, ${tipologia.superficieInterior} interior, ${tipologia.exterior}. ${tipologia.unidades} unidades en torre.`,
    alternates: { canonical: `/espacios/${tipologia.slug}` },
    openGraph: {
      title: `${tipologia.nombre} — Lomas Altas`,
      description: `${tipologia.tagline}. ${tipologia.superficie} de superficie total.`,
      url: `/espacios/${tipologia.slug}`,
      type: "website",
      images: [
        {
          url: primerRender,
          width: 1200,
          height: 800,
          alt: tipologia.nombre,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tipologia.nombre} — Lomas Altas`,
      description: `${tipologia.tagline}. ${tipologia.superficie} totales.`,
      images: [primerRender],
    },
  };
}

export default async function TipologiaPage({ params }: PageProps) {
  const { slug } = await params;
  const tipologia = obtenerTipologiaPorSlug(slug);

  if (!tipologia) {
    notFound();
  }

  return <TipologiaDetalle tipologia={tipologia} />;
}
