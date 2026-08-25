import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { getProductByHandle } from "@/lib/queries";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

/* =========================================================
   SEO DEL PRODUCTO
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Producto no encontrado | Estantería Sevilla",
      description:
        "El producto que buscas no está disponible.",
    };
  }

  const title =
    product.seo?.title ||
    `${product.title} | Estantería Sevilla`;

  const description =
    product.seo?.description ||
    product.description ||
    `Compra ${product.title.toLowerCase()} para tiendas y comercios en España.`;

  return {
    title,
    description,

    alternates: {
      canonical: `https://estanteriasevilla.com/producto/${product.handle}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `https://estanteriasevilla.com/producto/${product.handle}`,
      siteName: "Estantería Sevilla",

      images: product.featuredImage?.url
        ? [
            {
              url: product.featuredImage.url,
              alt:
                product.featuredImage.altText ||
                product.title,
            },
          ]
        : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================================
   PÁGINA DEL PRODUCTO
========================================================= */

export default async function ProductoPage({
  params,
}: Props) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const image =
    product.featuredImage?.url ||
    product.images?.nodes?.[0]?.url ||
    null;

  const description =
    product.description ||
    `Producto para tiendas y comercios: ${product.title}.`;

  const price =
    product.variants?.nodes?.[0]?.price?.amount || null;

  const currency =
    product.variants?.nodes?.[0]?.price?.currencyCode ||
    "EUR";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">

        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="grid gap-12 md:grid-cols-2">

            {/* =================================================
                IMAGEN
            ================================================== */}

            <div className="overflow-hidden rounded-2xl bg-white">

              {image ? (
                <img
                  src={image}
                  alt={
                    product.featuredImage?.altText ||
                    product.title
                  }
                  className="
                    h-auto
                    w-full
                    object-contain
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    aspect-square
                    items-center
                    justify-center
                    bg-gray-100
                    text-gray-400
                  "
                >
                  Sin imagen
                </div>
              )}

            </div>

            {/* =================================================
                INFORMACIÓN
            ================================================== */}

            <div>

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
                "
              >
                {product.title}
              </h1>

              <div
                className="
                  mt-5
                  h-1
                  w-20
                  rounded-full
                  bg-[#C6922F]
                "
              />

              {price && (
                <p
                  className="
                    mt-6
                    text-2xl
                    font-bold
                    text-[#111111]
                  "
                >
                  {Number(price).toLocaleString("es-ES", {
                    style: "currency",
                    currency,
                  })}
                </p>
              )}

              <div
                className="
                  mt-8
                  text-base
                  leading-7
                  text-gray-600
                "
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />

              {/* =================================================
                  CATEGORÍAS
              ================================================== */}

              {product.collections?.nodes?.length > 0 && (
                <div className="mt-8">

                  <p className="mb-3 font-semibold text-[#111111]">
                    Categorías
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {product.collections.nodes.map(
                      (collection: any) => (
                        <a
                          key={collection.id}
                          href={`/catalogo/${collection.handle}`}
                          className="
                            rounded-full
                            border
                            border-[#E5DED4]
                            bg-white
                            px-4
                            py-2
                            text-sm
                            text-[#8B5E34]
                            transition
                            hover:bg-[#F6F1EA]
                          "
                        >
                          {collection.title}
                        </a>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}