
import Link from "next/link";

import ProductCard from "../catalog/ProductCard";
import SectionTitle from "../ui/SectionTitle";

import { getProducts } from "../../lib/queries";

interface Variant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode?: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;

  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;

  images?: {
    nodes: {
      url: string;
      altText?: string | null;
    }[];
  };

  variants?: {
    nodes: Variant[];
  };
}

/**
 * Obtiene el día actual usando la zona horaria de Sevilla.
 * La fecha se representa como AAAA-MM-DD.
 */
function getSevilleDateKey(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return `${values.year}-${values.month}-${values.day}`;
}

/**
 * Convierte la fecha local de Sevilla en un número de día.
 * Permite que la selección avance una vez por día.
 */
function getDayNumber(): number {
  const dateKey = getSevilleDateKey();
  const [year, month, day] = dateKey.split("-").map(Number);

  return Math.floor(
    (Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) /
      86_400_000
  );
}

/**
 * Selecciona productos de forma secuencial y circular.
 * La selección cambia diariamente y no se repite un producto
 * dentro de la misma selección, salvo que el catálogo tenga
 * menos productos que el número solicitado.
 */
function getDailyProducts<T>(products: T[], count = 4): T[] {
  if (products.length <= count) {
    return products;
  }

  const start = (getDayNumber() * count) % products.length;

  return Array.from(
    { length: Math.min(count, products.length) },
    (_, index) => products[(start + index) % products.length]
  );
}

export default async function FeaturedProducts() {
  const products = (await getProducts()) as Product[];

  // Rotación diaria de cuatro productos.
  const featuredProducts = getDailyProducts(products, 4);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* TÍTULO */}
        <SectionTitle
          subtitle="Productos destacados"
          title="Lo más vendido"
        />

        {/* PRODUCTOS */}
        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-3
            sm:mt-10
            sm:grid-cols-2
            sm:gap-5
            md:grid-cols-3
            lg:mt-14
            lg:grid-cols-4
            lg:gap-8
          "
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              handle={product.handle}
              nombre={product.title}
              descripcion={product.description}
              sku={product.variants?.nodes?.[0]?.sku ?? ""}
              precio={Number(
                product.variants?.nodes?.[0]?.price?.amount ?? 0
              )}
              imagenPrincipal={product.featuredImage?.url ?? ""}
              imagenes={
                product.images?.nodes?.map((image) => image.url) ?? []
              }
              variantes={product.variants?.nodes ?? []}
            />
          ))}
        </div>

        {/* BOTÓN VER CATÁLOGO */}
        <div className="mt-10 text-center sm:mt-14 lg:mt-16">
          <Link
            href="/catalogo"
            className="
              inline-flex
              items-center
              justify-center
              rounded-md
              border
              border-[#C6922F]
              px-6
              py-3
              text-sm
              font-semibold
              text-[#C6922F]
              transition
              hover:bg-[#C6922F]
              hover:text-white
              sm:px-10
              sm:py-4
              sm:text-base
            "
          >
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}
