"use client";

import ProductCard from "./ProductCard";

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

type Props = {
  products: Product[];
};

export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 px-3 sm:grid-cols-2 sm:gap-5 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          nombre={product.title}
          descripcion={product.description}
          sku={
            product.variants?.nodes?.[0]?.sku ?? ""
          }
          precio={Number(
            product.variants?.nodes?.[0]?.price
              ?.amount ?? 0
          )}
          imagenPrincipal={
            product.featuredImage?.url ?? ""
          }
          imagenes={
            product.images?.nodes?.map(
              (img) => img.url
            ) ?? []
          }
          variantes={
            product.variants?.nodes ?? []
          }
        />
      ))}

    </div>
  );
}