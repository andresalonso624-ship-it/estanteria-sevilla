import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogProducts from "@/components/catalog/CatalogProducts";

import {
  getCollectionByHandle,
  getCollections,
} from "@/lib/queries";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

/* =========================================================
   SEO ESPECÍFICO DE CATEGORÍAS
========================================================= */

const seoCategories: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  percheros: {
    title:
      "Percheros para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Compra percheros para tiendas, comercios y negocios en Sevilla. Percheros de pared, suelo y diferentes soluciones para exposición de ropa.",
    keywords: [
      "percheros Sevilla",
      "percheros para tiendas",
      "percheros para comercios",
      "percheros de ropa",
      "percheros comerciales",
      "percheros tienda",
    ],
  },

  perchas: {
    title:
      "Perchas para tiendas y comercios en Sevilla | Estantería Sevilla",
    description:
      "Encuentra perchas para tiendas de ropa y comercios. Diferentes modelos de perchas para exposición y organización de prendas.",
    keywords: [
      "perchas Sevilla",
      "perchas para tiendas",
      "perchas para ropa",
      "perchas para comercios",
      "perchas comerciales",
      "perchas tienda de ropa",
    ],
  },

  "cremalleras-y-tubos": {
    title:
      "Cremalleras y tubos para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Cremalleras, tubos y accesorios para equipamiento comercial y tiendas de ropa en Sevilla. Soluciones para montar y organizar espacios comerciales.",
    keywords: [
      "cremalleras Sevilla",
      "cremalleras para tiendas",
      "tubos para tiendas",
      "tubos para comercio",
      "equipamiento comercial Sevilla",
      "accesorios para tiendas",
    ],
  },

  "bolsas-de-papel": {
    title:
      "Bolsas de papel para comercios en Sevilla | Estantería Sevilla",
    description:
      "Bolsas de papel para tiendas, comercios y negocios en Sevilla. Soluciones para entregar tus productos de forma profesional.",
    keywords: [
      "bolsas de papel Sevilla",
      "bolsas para tiendas",
      "bolsas de papel para comercios",
      "bolsas comerciales",
      "bolsas para ropa",
      "bolsas tienda",
    ],
  },

  "maniquies-y-bustos": {
    title:
      "Maniquíes y bustos para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Maniquíes y bustos para tiendas de ropa y comercios en Sevilla. Equipamiento para exponer prendas y mejorar la presentación de tu negocio.",
    keywords: [
      "maniquíes Sevilla",
      "bustos para tiendas",
      "maniquíes para tiendas",
      "maniquíes de ropa",
      "bustos comerciales",
      "equipamiento para tiendas",
    ],
  },

  "estanterias-de-comercio": {
    title:
      "Estanterías de comercio en Sevilla | Estantería Sevilla",
    description:
      "Estanterías comerciales para tiendas y negocios en Sevilla. Soluciones de exposición y almacenamiento para comercios.",
    keywords: [
      "estanterías de comercio Sevilla",
      "estanterías comerciales Sevilla",
      "estanterías para tiendas",
      "estanterías para comercios",
      "equipamiento comercial",
      "mobiliario comercial Sevilla",
    ],
  },

  "estanteria-de-carga-mediana": {
    title:
      "Estanterías de carga media en Sevilla | Estantería Sevilla",
    description:
      "Estanterías de carga media para almacenes, comercios y negocios en Sevilla. Soluciones profesionales de almacenamiento.",
    keywords: [
      "estanterías carga media Sevilla",
      "estanterías de carga media",
      "estanterías para almacén",
      "estanterías comerciales",
      "estanterías industriales",
      "almacenamiento Sevilla",
    ],
  },

  "estanterias-de-media-carga": {
    title:
      "Estanterías de media carga en Sevilla | Estantería Sevilla",
    description:
      "Estanterías de media carga para almacenes y negocios. Soluciones resistentes para organizar mercancía y productos.",
    keywords: [
      "estanterías media carga Sevilla",
      "estanterías de media carga",
      "estanterías almacén",
      "estanterías comerciales",
      "almacenamiento comercial",
    ],
  },

  "estanterias-tubulares": {
    title:
      "Estanterías tubulares para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Estanterías tubulares para tiendas, comercios y negocios en Sevilla. Soluciones prácticas para exposición y almacenamiento.",
    keywords: [
      "estanterías tubulares Sevilla",
      "estanterías tubulares",
      "estanterías para tiendas",
      "estanterías comerciales",
      "equipamiento comercial",
    ],
  },

  "paneles-de-lamas": {
    title:
      "Paneles de lamas para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Paneles de lamas para tiendas y comercios en Sevilla. Equipamiento comercial para exposición de productos y accesorios.",
    keywords: [
      "paneles de lamas Sevilla",
      "paneles de lamas para tiendas",
      "paneles comerciales",
      "paneles para comercios",
      "equipamiento comercial Sevilla",
    ],
  },

  "cestas-de-supermercado": {
    title:
      "Cestas de supermercado y comercio en Sevilla | Estantería Sevilla",
    description:
      "Cestas para supermercados, tiendas y comercios en Sevilla. Soluciones prácticas para facilitar la compra de tus clientes.",
    keywords: [
      "cestas supermercado Sevilla",
      "cestas para tiendas",
      "cestas comerciales",
      "cestas para supermercados",
      "equipamiento supermercado",
    ],
  },

  etiquetadora: {
    title:
      "Etiquetadoras para tiendas y comercios en Sevilla | Estantería Sevilla",
    description:
      "Etiquetadoras para tiendas, comercios y negocios en Sevilla. Soluciones para marcar precios y productos de forma rápida.",
    keywords: [
      "etiquetadoras Sevilla",
      "etiquetadoras para tiendas",
      "etiquetadoras comerciales",
      "máquinas etiquetadoras",
      "etiquetas para comercios",
    ],
  },

  "mobiliario-mueble": {
    title:
      "Mobiliario comercial para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Mobiliario comercial y muebles para tiendas y negocios en Sevilla. Equipamiento para crear espacios comerciales funcionales y profesionales.",
    keywords: [
      "mobiliario comercial Sevilla",
      "muebles para tiendas",
      "mobiliario para comercios",
      "muebles comerciales",
      "equipamiento comercial Sevilla",
    ],
  },

  "cristales-y-espejos": {
    title:
      "Cristales y espejos para tiendas en Sevilla | Estantería Sevilla",
    description:
      "Cristales y espejos para tiendas, comercios y negocios en Sevilla. Soluciones para mejorar la presentación y distribución de espacios.",
    keywords: [
      "cristales para tiendas Sevilla",
      "espejos para tiendas",
      "espejos comerciales",
      "cristales comerciales",
      "equipamiento para tiendas",
    ],
  },
};

/* =========================================================
   SEO DINÁMICO DE CADA CATEGORÍA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { handle } = await params;

  const collection =
    await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title:
        "Categoría no encontrada | Estantería Sevilla",
      description:
        "La categoría que buscas no está disponible.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* =======================================================
     SEO PERSONALIZADO
  ======================================================= */

  const customSEO =
    seoCategories[handle];

  const title =
    customSEO?.title ||
    collection.seo?.title ||
    `${collection.title} para tiendas y comercios | Estantería Sevilla`;

  const description =
    customSEO?.description ||
    collection.seo?.description ||
    collection.description ||
    `Descubre nuestra selección de ${collection.title.toLowerCase()} para tiendas, comercios y negocios en Sevilla.`;

  const keywords =
    customSEO?.keywords || [
      collection.title,
      `${collection.title} Sevilla`,
      `${collection.title} para tiendas`,
      `${collection.title} para comercios`,
      "equipamiento comercial Sevilla",
      "mobiliario comercial Sevilla",
    ];

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical:
        `https://estanteriasevilla.com/catalogo/${collection.handle}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title,
      description,
      type: "website",
      url:
        `https://estanteriasevilla.com/catalogo/${collection.handle}`,
      siteName: "Estantería Sevilla",
      locale: "es_ES",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* =========================================================
   PÁGINA DE CATEGORÍA
========================================================= */

export default async function CatalogoCategoriaPage({
  params,
}: Props) {
  const { handle } = await params;

  /* =======================================================
     OBTENER COLECCIÓN
  ======================================================= */

  const collection =
    await getCollectionByHandle(handle);

  /* =======================================================
     SI NO EXISTE
  ======================================================= */

  if (!collection) {
    notFound();
  }

  /* =======================================================
     OBTENER TODAS LAS COLECCIONES
  ======================================================= */

  const collections =
    await getCollections();

  /* =======================================================
     PRODUCTOS DE LA CATEGORÍA
  ======================================================= */

  const categoryProducts =
    collection.products?.nodes || [];

  /* =======================================================
     DESCRIPCIÓN VISIBLE
  ======================================================= */

  const customSEO =
    seoCategories[handle];

  const description =
    customSEO?.description ||
    collection.description ||
    `Descubre nuestros productos de ${collection.title.toLowerCase()} para tiendas y comercios en Sevilla.`;

  return (
    <>
      {/* ===================================================
          HEADER
      =================================================== */}

      <Header />

      {/* ===================================================
          CONTENIDO
      =================================================== */}

      <main className="min-h-screen bg-[#FCFAF7]">

        {/* =================================================
            CABECERA
        ================================================== */}

        <section
          className="
            px-6
            pb-10
            pt-10
            text-center
            sm:pb-12
            sm:pt-14
          "
        >

          {/* ETIQUETA */}

          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#C6922F]
            "
          >
            Estantería Sevilla
          </p>

          {/* TÍTULO */}

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-[#111111]
              sm:text-5xl
            "
          >
            {collection.title}
          </h1>

          {/* LÍNEA */}

          <div
            className="
              mx-auto
              mt-5
              h-1
              w-20
              rounded-full
              bg-[#C6922F]
            "
          />

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
            "
          >
            {description}
          </p>

        </section>

        {/* =================================================
            PRODUCTOS
        ================================================== */}

        <section
          className="
            mx-auto
            max-w-7xl
            px-4
            pb-24
            sm:px-6
          "
        >

          <CatalogProducts
            products={categoryProducts}
            collections={collections}
          />

        </section>

      </main>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <Footer />
    </>
  );
}