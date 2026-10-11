
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogProducts from "@/components/catalog/CatalogProducts";
import { getCollectionByHandle, getCollections } from "@/lib/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

type CollectionSEO = {
  title?: string | null;
  description?: string | null;
};

const BASE_URL = "https://www.estanteriasevilla.com";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { handle } = await params;

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Categoría no encontrada | Estantería Sevilla",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = collection.seo as CollectionSEO | undefined;

  const title =
    seo?.title ||
    `${collection.title} | Estantería Sevilla`;

  const description =
    seo?.description ||
    collection.description ||
    `Descubre nuestros productos de ${collection.title.toLowerCase()} para tiendas y comercios.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/catalogo/${collection.handle}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/catalogo/${collection.handle}`,
      siteName: "Estantería Sevilla",
      type: "website",
    },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { handle } = await params;

  const [collection, collections] = await Promise.all([
    getCollectionByHandle(handle),
    getCollections(),
  ]);

  if (!collection) {
    notFound();
  }

  const products = collection.products?.nodes ?? [];

  const description =
    collection.description ||
    `Descubre nuestros productos de ${collection.title.toLowerCase()} para tiendas y comercios en Sevilla.`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">
        {/* Encabezado de la categoría */}
        <section className="px-6 pb-8 pt-12 text-center md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A36A33]">
            Estantería Sevilla
          </p>

          <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-[#171717] sm:text-5xl">
            {collection.title}
          </h1>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-[#D09A2D]" />

          <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-[#4B5563] sm:text-lg">
            {description}
          </p>

          {/* Volver a todas las categorías */}
          
<div className="mx-auto mt-1 flex w-full max-w-7xl justify-end">
  <Link
    href="/catalogo"
    className="inline-flex items-center gap-2 rounded-full border border-[#8B5E34] px-5 py-3 text-sm font-semibold text-[#8B5E34] transition hover:bg-[#8B5E34] hover:text-white"
  >
    <span aria-hidden="true">←</span>
    Volver a categorías
  </Link>
</div>

        </section>

        {/* Productos sin buscador ni selector de categorías */}
        <CatalogProducts
          products={products}
          collections={collections}
        />
      </main>

      <Footer />
    </>
  );
}
