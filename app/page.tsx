import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BottomFeatures from "@/components/home/BottomFeatures";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <section
          aria-labelledby="estanterias-comerciales-sevilla"
          className="bg-[#F8F7F4] px-6 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#967044]">
              Equipamiento comercial
            </p>
            <h2
              id="estanterias-comerciales-sevilla"
              className="mt-3 text-2xl font-bold tracking-tight text-[#2C241C] sm:text-3xl"
            >
              Estanterías comerciales para tiendas y negocios en Sevilla
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-7 text-[#51483F]">
              En Estantería Sevilla encontrarás estanterías para comercios,
              soluciones de exposición y mobiliario para organizar y aprovechar
              el espacio de tu negocio. Te ayudamos a elegir equipamiento para
              tiendas, almacenes y otros espacios profesionales, con opciones
              pensadas para presentar tus productos y mantener cada zona ordenada.
            </p>
            <p className="mt-4 max-w-4xl text-base leading-7 text-[#51483F]">
              Explora el catálogo para consultar las referencias disponibles o
              solicita un presupuesto si necesitas orientación para equipar tu
              local. También encontrarás mobiliario comercial y mostradores para
              completar el espacio de venta.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/catalogo/estanterias-de-comercio"
                className="inline-flex items-center justify-center rounded-full bg-[#967044] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#795A39]"
              >
                Ver estanterías comerciales
              </Link>
              <Link
                href="/presupuesto"
                className="inline-flex items-center justify-center rounded-full border border-[#967044] px-6 py-3 text-sm font-semibold text-[#967044] transition hover:bg-[#EEEAE3]"
              >
                Solicitar presupuesto
              </Link>
              <Link
                href="/catalogo/mobiliario-muebles-mostradores"
                className="inline-flex items-center justify-center rounded-full border border-[#E6E2DA] px-6 py-3 text-sm font-semibold text-[#2C241C] transition hover:bg-[#F8F5F1]"
              >
                Ver mostradores y mobiliario
              </Link>
            </div>
          </div>
        </section>

        <FeaturedProducts />

        <BottomFeatures />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}