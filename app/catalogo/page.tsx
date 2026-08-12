import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogProducts from "@/components/catalog/CatalogProducts";

import {
  getProducts,
  getCollections,
} from "@/lib/queries";

export default async function CatalogoPage() {
  const [products, collections] =
    await Promise.all([
      getProducts(),
      getCollections(),
    ]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">

        {/* ==========================================
            CABECERA
        =========================================== */}

        <section className="px-6 pb-10 pt-10 text-center">

          <h1 className="text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
            CATÁLOGO
          </h1>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#C6922F]" />

          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg">
            Explora todos nuestros productos
            diseñados para tu negocio.
          </p>

        </section>

        {/* ==========================================
            CATÁLOGO
        =========================================== */}

        <section className="pb-24">

          <CatalogProducts
            products={products}
            collections={collections}
          />

        </section>

      </main>

      <Footer />
    </>
  );
}