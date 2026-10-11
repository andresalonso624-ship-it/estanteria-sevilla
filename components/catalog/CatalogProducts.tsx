
"use client";

import ProductGrid from "./ProductGrid";

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

interface Collection {
  id: string;
  title: string;
  handle: string;
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
  collections?: {
    nodes: Collection[];
  };
}

interface Props {
  products: Product[];
  collections: Collection[];
}

export default function CatalogProducts({
  products,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      <ProductGrid products={products} />
    </section>
  );
}
