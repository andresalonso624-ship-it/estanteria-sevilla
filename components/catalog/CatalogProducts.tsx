"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import ProductGrid from "./ProductGrid";

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

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CatalogProducts({
  products,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const term = normalizeText(search.trim());

    if (!term) {
      return products;
    }

    return products.filter((product) => {
      const title = normalizeText(
        product.title || ""
      );

      const description = normalizeText(
        product.description || ""
      );

      const skus =
        product.variants?.nodes
          ?.map((variant) =>
            normalizeText(variant.sku || "")
          )
          .join(" ") || "";

      return (
        title.includes(term) ||
        description.includes(term) ||
        skus.includes(term)
      );
    });
  }, [products, search]);

  return (
    <>
      {/* BUSCADOR */}

      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#C6922F]">
            Nuestra colección
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
            Catálogo
          </h1>

          <p className="mt-3 text-base text-gray-500">
            Explora todos nuestros productos.
          </p>
        </div>

        <div className="w-full lg:max-w-[480px]">

          <label
            htmlFor="catalog-search"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Buscar producto
          </label>

          <div className="relative">

            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="catalog-search"
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Nombre, SKU o descripción..."
              className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-12 text-base outline-none transition placeholder:text-gray-400 focus:border-[#C6922F] focus:ring-4 focus:ring-[#C6922F]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}

          </div>

          {search && (
            <p className="mt-3 text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>
          )}

        </div>

      </div>

      {/* PRODUCTOS */}

      {filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
        />
      ) : (
        <div className="rounded-3xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">

          <Search
            size={42}
            className="mx-auto mb-5 text-gray-300"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            No encontramos ese producto
          </h2>

          <p className="mt-2 text-gray-500">
            Prueba buscando con otro nombre, SKU o palabra.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#C6922F]"
          >
            Ver todo el catálogo
          </button>

        </div>
      )}
    </>
  );
}