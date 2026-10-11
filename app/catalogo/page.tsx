import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCollections } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo de estanterías y mobiliario comercial",
  description: "Explora el catálogo de Estantería Sevilla: estanterías comerciales, mobiliario y equipamiento para tiendas y negocios.",
  alternates: {
    canonical: "https://www.estanteriasevilla.com/catalogo",
  },
  openGraph: {
    url: "https://www.estanteriasevilla.com/catalogo",
    title: "Catálogo de estanterías y mobiliario comercial | Estantería Sevilla",
    description: "Explora estanterías comerciales, mobiliario y equipamiento para tiendas y negocios.",
    siteName: "Estantería Sevilla",
    type: "website",
  },
};

interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
}

export default async function CatalogoPage() {
  const collections = (await getCollections()) as Collection[];

  const sortedCollections = [...collections].sort((a, b) =>
    a.title.localeCompare(b.title, "es")
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">
        <section className="bg-gradient-to-b from-[#F6F1EA] to-[#FCFAF7] px-6 pb-10 pt-10 text-center md:pb-12 md:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A36A33]">
            Estantería Sevilla
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2C241C] sm:text-5xl">
            Nuestro catálogo
          </h1>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#D09A2D]" />

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6B6259] sm:text-lg">
            Todo lo que necesitas para equipar y organizar tu tienda.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#2C241C]">
              Explora por categoría
            </h2>

            <p className="mt-1 text-sm text-[#8B8177]">
              {sortedCollections.length} categorías disponibles
            </p>
          </div>

          {sortedCollections.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {sortedCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/catalogo/${collection.handle}`}
                  className="group overflow-hidden rounded-2xl border border-[#E9E2D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F5F1]">
                    {collection.image?.url ? (
                      <Image
                        src={collection.image.url}
                        alt={collection.image.altText || collection.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#8B8177]">
                        Ver categoría
                      </div>
                    )}
                  </div>

                  <div className="flex min-h-16 items-center justify-between gap-2 px-3 py-3">
                    <h3 className="text-sm font-semibold text-[#2C241C] transition-colors group-hover:text-[#A36A33]">
                      {collection.title}
                    </h3>
                    <span className="shrink-0 text-[#A36A33] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-[#E9E2D9] bg-white p-8 text-center text-[#6B6259]">
              No hay categorías disponibles en este momento.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
