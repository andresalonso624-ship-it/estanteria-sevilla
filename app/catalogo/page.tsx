import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogProducts from "@/components/catalog/CatalogProducts";

import {
  getProducts,
  getCollections,
} from "@/lib/queries";


export default async function CatalogoPage() {

  /* =====================================================
     OBTENER PRODUCTOS
  ===================================================== */

  const products =
    await getProducts();


  /* =====================================================
     OBTENER CATEGORÍAS
  ===================================================== */

  const collections =
    await getCollections();


  return (
    <>
      {/* =================================================
          HEADER
      ================================================== */}

      <Header />


      {/* =================================================
          CONTENIDO
      ================================================== */}

      <main
        className="
          min-h-screen
          bg-[#FCFAF7]
        "
      >

        {/* =================================================
            CABECERA
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
            CATÁLOGO
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
            Explora todos nuestros
            productos diseñados para
            tu negocio.
          </p>

        </section>


        {/* =================================================
            PRODUCTOS + FILTROS
        ================================================== */}

        <section
          className="
            mx-auto
            max-w-7xl
            pb-24
          "
        >

          <CatalogProducts
            products={products}
            collections={collections}
          />

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================== */}

      <Footer />

    </>
  );
}