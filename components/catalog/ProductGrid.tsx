
"use client";

import ProductCard from "./ProductCard";

interface ProductImage {
  url: string;
  altText?: string | null;
}

interface ProductVariant {
  id: string;
  title?: string;
  sku?: string | null;
  availableForSale?: boolean;
  price?: {
    amount: string;
    currencyCode?: string;
  };
}

interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  featuredImage?: ProductImage | null;
  images?: {
    nodes: ProductImage[];
  };
  variants?: {
    nodes: ProductVariant[];
  };
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E9E2D9] bg-[#F8F5F1] px-6 py-12 text-center">
        <h2 className="text-lg font-semibold text-[#2C241C]">
          No hay productos disponibles
        </h2>

        <p className="mt-2 text-sm text-[#8B5E34]">
          Prueba de nuevo más tarde.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm text-[#6B6259]">
          {products.length}{" "}
          {products.length === 1
            ? "producto"
            : "productos"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const firstVariant = product.variants?.nodes?.[0];

          const price = Number(
            firstVariant?.price?.amount ?? 0
          );

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              handle={product.handle}
              nombre={product.title}
              descripcion={product.description ?? ""}
              sku={firstVariant?.sku ?? ""}
              precio={price}
              imagenPrincipal={
                product.featuredImage?.url ??
                product.images?.nodes?.[0]?.url ??
                ""
              }
              imagenes={
                product.images?.nodes?.map(
                  (image) => image.url
                ) ?? []
              }
              variantes={product.variants?.nodes ?? []}
              styleMode="beige"
            />
          );
        })}
      </div>
    </section>
  );
}
