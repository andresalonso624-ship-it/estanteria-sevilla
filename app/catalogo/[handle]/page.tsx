import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogProducts from "@/components/catalog/CatalogProducts";

import {
  getProducts,
  getCollections,
} from "@/lib/queries";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function CatalogoCategoriaPage({
  params,
}: Props) {
  const { handle } = await params;

  /* =====================================================
     OBTENER PRODUCTOS
  ===================================================== */

  const products = await getProducts();

  /* =====================================================
     OBTENER COLECCIONES
  ===================================================== */

  const collections = await getCollections();

  /* =====================================================
     BUSCAR LA COLECCIÓN
  ===================================================== */

  const collection = collections.find(
    (item: any) => item.handle === handle
  );

  /* =====================================================
     SI NO EXISTE LA CATEGORÍA
  ===================================================== */

  if (!collection) {
    notFound();
  }

  /* =====================================================
     FILTRAR PRODUCTOS DE ESTA CATEGORÍA
  ===================================================== */

  const categoryProducts = products.filter(
    (product: any) =>
      product.collections?.nodes?.some(
        (item: any) => item.handle === handle
      )
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">

        {/* =================================================
            CABECERA DE CATEGORÍA
        ================================================== */}

        <section
          className="
            px-6
            pb-10
            pt-10
            text-center
            sm:pt-14
          "
        >
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

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              text-gray-600
              sm:text-lg
            "
          >
            Descubre nuestros productos de{" "}
            {collection.title.toLowerCase()}.
          </p>
        </section>

        {/* =================================================
            PRODUCTOS
        ================================================== */}

        <section
          className="
            mx-auto
            max-w-7xl
            pb-24
          "
        >
          <CatalogProducts
            products={categoryProducts}
            collections={collections}
          />
        </section>

      </main>

      <Footer />
    </>
  );
}