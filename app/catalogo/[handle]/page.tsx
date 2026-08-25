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
   SEO DINÁMICO DE CADA CATEGORÍA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { handle } = await params;

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Categoría no encontrada | Estantería Sevilla",
      description:
        "La categoría que buscas no está disponible.",
    };
  }

  const title =
    collection.seo?.title ||
    `${collection.title} para tiendas y comercios | Estantería Sevilla`;

  const description =
    collection.seo?.description ||
    collection.description ||
    `Descubre nuestra selección de ${collection.title.toLowerCase()} para tiendas, comercios y negocios.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/catalogo/${collection.handle}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `/catalogo/${collection.handle}`,
      siteName: "Estantería Sevilla",
    },

    robots: {
      index: true,
      follow: true,
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
     OBTENER LA COLECCIÓN DIRECTAMENTE DE SHOPIFY
  ======================================================= */

  const collection = await getCollectionByHandle(handle);

  /* =======================================================
     SI NO EXISTE LA COLECCIÓN
  ======================================================= */

  if (!collection) {
    notFound();
  }

  /* =======================================================
     OBTENER TODAS LAS COLECCIONES
     PARA EL FILTRO / MENÚ DEL CATÁLOGO
  ======================================================= */

  const collections = await getCollections();

  /* =======================================================
     PRODUCTOS DE ESTA CATEGORÍA
  ======================================================= */

  const categoryProducts =
    collection.products?.nodes || [];

  /* =======================================================
     DESCRIPCIÓN
  ======================================================= */

  const description =
    collection.description ||
    `Descubre nuestros productos de ${collection.title.toLowerCase()} para tiendas y comercios.`;

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Header />

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <main className="min-h-screen bg-[#FCFAF7]">

        {/* ===================================================
            CABECERA DE CATEGORÍA
        ==================================================== */}

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

        {/* ===================================================
            PRODUCTOS
        ==================================================== */}

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

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </>
  );
}