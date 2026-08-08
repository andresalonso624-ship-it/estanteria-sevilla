import Link from "next/link";

import ProductCard from "../catalog/ProductCard";
import SectionTitle from "../ui/SectionTitle";

import { getProducts } from "../../lib/queries";

interface Variant {
  id: string;
  sku: string;
  availableForSale: boolean;

  price: {
    amount: string;
  };

  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface Product {
  id: string;
  title: string;
  description: string;

  featuredImage?: {
    url: string;
  };

  images?: {
    nodes: {
      url: string;
    }[];
  };

  variants?: {
    nodes: Variant[];
  };
}

export default async function FeaturedProducts() {
  const products = (await getProducts()) as Product[];

  // Mostramos solamente los primeros 4 productos
  const featuredProducts = products.slice(0, 4);

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
              nombre={product.title}
              descripcion={product.description}
              sku={
                product.variants?.nodes?.[0]?.sku ?? ""
              }
              precio={Number(
                product.variants?.nodes?.[0]?.price?.amount ?? 0
              )}
              imagenPrincipal={
                product.featuredImage?.url ?? ""
              }
              imagenes={
                product.images?.nodes?.map(
                  (image) => image.url
                ) ?? []
              }
              variantes={
                product.variants?.nodes ?? []
              }
            />
          ))}
        </div>

        {/* BOTÓN */}

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