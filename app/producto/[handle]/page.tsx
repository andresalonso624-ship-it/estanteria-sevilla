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
   CONFIGURACIÓN SEO
========================================================= */

const BASE_URL = "https://estanteriasevilla.com";

/* =========================================================
   LIMPIAR TEXTO PARA SEO
========================================================= */

function cleanText(text: string = "") {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   LIMITAR DESCRIPCIÓN
========================================================= */

function limitDescription(text: string, max = 155) {
  const clean = cleanText(text);

  if (clean.length <= max) {
    return clean;
  }

  return `${clean.substring(0, max - 3).trim()}...`;
}

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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const fallbackTitle =
    `${product.title} para tiendas | Estantería Sevilla`;

  const title = (
    product.seo?.title ||
    fallbackTitle
  ).trim();

  const sourceDescription =
    product.seo?.description ||
    product.description ||
    `Compra ${product.title} para tiendas y comercios en España.`;

  const description = limitDescription(
    sourceDescription,
    155
  );

  const canonical =
    `${BASE_URL}/producto/${product.handle}`;

  const image =
    product.featuredImage?.url ||
    product.images?.nodes?.[0]?.url;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Estantería Sevilla",

      ...(image
        ? {
            images: [
              {
                url: image,
                alt:
                  product.featuredImage?.altText ||
                  product.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      ...(image
        ? {
            images: [image],
          }
        : {}),
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

  /* =======================================================
     IMAGEN PRINCIPAL
  ======================================================= */

  const image =
    product.featuredImage?.url ||
    product.images?.nodes?.[0]?.url ||
    null;

  /* =======================================================
     DESCRIPCIÓN
  ======================================================= */

  const description =
    product.description ||
    `Producto para tiendas y comercios: ${product.title}.`;

  /* =======================================================
     PRIMERA VARIANTE
  ======================================================= */

  const variant =
    product.variants?.nodes?.[0] || null;

  const price =
    variant?.price?.amount || null;

  const currency =
    variant?.price?.currencyCode || "EUR";

  const availableForSale =
    variant?.availableForSale ?? true;

  /* =======================================================
     URL CANÓNICA
  ======================================================= */

  const canonical =
    `${BASE_URL}/producto/${product.handle}`;

  /* =======================================================
     CATEGORÍAS
  ======================================================= */

  const collections =
    product.collections?.nodes || [];

  /* =======================================================
     DATOS ESTRUCTURADOS PRODUCT
  ======================================================= */

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    description: cleanText(description),

    url: canonical,

    ...(image
      ? {
          image: [image],
        }
      : {}),

    brand: {
      "@type": "Brand",
      name: "Estantería Sevilla",
    },

    ...(variant?.sku
      ? {
          sku: variant.sku,
        }
      : {}),

    ...(price
      ? {
          offers: {
            "@type": "Offer",

            url: canonical,

            priceCurrency: currency,

            price: price,

            availability: availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",

            seller: {
              "@type": "Organization",
              name: "Estantería Sevilla",
              url: BASE_URL,
            },
          },
        }
      : {}),
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">

        {/* =================================================
            DATOS ESTRUCTURADOS PARA GOOGLE
        ================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {/* =================================================
            PRODUCTO
        ================================================== */}

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

              {/* MARCA */}

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
                "
              >
                {product.title}
              </h1>

              {/* LÍNEA */}

              <div
                className="
                  mt-5
                  h-1
                  w-20
                  rounded-full
                  bg-[#C6922F]
                "
              />

              {/* PRECIO */}

              {price && (
                <p
                  className="
                    mt-6
                    text-2xl
                    font-bold
                    text-[#111111]
                  "
                >
                  {Number(price).toLocaleString(
                    "es-ES",
                    {
                      style: "currency",
                      currency,
                    }
                  )}
                </p>
              )}

              {/* DESCRIPCIÓN */}

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

              {collections.length > 0 && (
                <div className="mt-8">

                  <p className="mb-3 font-semibold text-[#111111]">
                    Categorías
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {collections.map(
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