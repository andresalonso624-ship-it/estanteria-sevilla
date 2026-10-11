
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGalleryAndPurchase from "@/components/catalog/ProductGalleryAndPurchase";
import { getProductByHandle } from "@/lib/queries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

const BASE_URL = "https://estanteriasevilla.com";

function cleanText(text: string = ""): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function limitDescription(text: string, max = 155): string {
  const clean = cleanText(text);

  return clean.length <= max
    ? clean
    : `${clean.substring(0, max - 3).trim()}...`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Producto no encontrado | Estantería Sevilla",
      description: "El producto que buscas no está disponible.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    product.seo?.title || `${product.title} | Estantería Sevilla`;

  const description = limitDescription(
    product.seo?.description ||
      product.description ||
      `Compra ${product.title} en Estantería Sevilla.`
  );

  const canonical = `${BASE_URL}/producto/${product.handle}`;
  const image =
    product.featuredImage?.url || product.images?.nodes?.[0]?.url;

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
                alt: product.featuredImage?.altText || product.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const variants = product.variants?.nodes ?? [];
  const firstVariant = variants[0] ?? null;

  const description =
    product.descriptionHtml ||
    product.description ||
    `Producto para tiendas y comercios: ${product.title}.`;

  const pickupOnly =
    /recogida en nuestras instalaciones|no se envía/i.test(
      cleanText(description)
    );

  const images = [
    ...(product.featuredImage ? [product.featuredImage] : []),
    ...(product.images?.nodes ?? []),
  ];

  const collections = (product.collections?.nodes ?? []).map(
    (collection: { id: string; handle: string; title: string }) => ({
      id: collection.id,
      handle: collection.handle,
      title: collection.title,
    })
  );

  const firstImage = images[0]?.url;
  const canonical = `${BASE_URL}/producto/${product.handle}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: cleanText(description),
    url: canonical,
    ...(images.length
      ? {
          image: images.map((image: { url: string }) => image.url),
        }
      : {}),
    brand: {
      "@type": "Brand",
      name: "Estantería Sevilla",
    },
    ...(firstVariant?.sku ? { sku: firstVariant.sku } : {}),
    ...(firstVariant
      ? {
          offers: {
            "@type": "Offer",
            url: canonical,
            priceCurrency: firstVariant.price.currencyCode || "EUR",
            price: firstVariant.price.amount,
            availability: firstVariant.availableForSale
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

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCFAF7]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <ProductGalleryAndPurchase
          title={product.title}
          description={description}
          images={images}
          variants={variants}
          options={product.options ?? []}
          collections={collections}
          pickupOnly={pickupOnly}
        />
      </main>

      <Footer />
    </>
  );
}
