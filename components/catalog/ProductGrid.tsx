"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

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

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  const [search, setSearch] = useState("");

  /*
   * BUSCADOR
   */

  const filteredProducts = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) {
      return products;
    }

    return products.filter((product) => {
      const title =
        product.title?.toLowerCase() ?? "";

      const description =
        product.description?.toLowerCase() ?? "";

      const skus =
        product.variants?.nodes
          ?.map(
            (variant) =>
              variant.sku?.toLowerCase() ?? ""
          )
          .join(" ") ?? "";

      return (
        title.includes(text) ||
        description.includes(text) ||
        skus.includes(text)
      );
    });
  }, [products, search]);

  return (
    <div className="w-full">

      {/* =========================
          BUSCADOR
      ========================== */}

      <div className="mx-auto mb-8 w-full max-w-5xl px-3 sm:mb-10 sm:px-6">

        <div className="flex h-12 w-full items-center rounded-full border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition focus-within:border-[#C6922F] focus-within:ring-2 focus-within:ring-[#C6922F]/10 sm:h-14">

          {/* ICONO BUSCAR */}

          <div className="flex shrink-0 items-center pl-4 text-gray-500 sm:pl-5">
            <Search
              size={20}
              className="sm:h-[22px] sm:w-[22px]"
            />
          </div>

          {/* INPUT */}

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Buscar productos..."
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-gray-900 outline-none placeholder:text-gray-400 sm:px-4 sm:text-base"
          />

          {/* X PARA BORRAR */}

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Borrar búsqueda"
              className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 sm:mr-2"
            >
              <X size={18} />
            </button>
          )}

          {/* ICONO FILTROS */}

          <div className="mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center border-l border-gray-200 text-gray-600 sm:mr-2 sm:h-10 sm:w-10">
            <SlidersHorizontal
              size={18}
            />
          </div>

        </div>

      </div>

      {/* =========================
          RESULTADOS
      ========================== */}

      {search.trim() && (
        <div className="mx-auto mb-5 w-full max-w-7xl px-3 sm:px-6">

          <p className="text-xs text-gray-500 sm:text-sm">

            {filteredProducts.length === 0
              ? "No encontramos productos."
              : `${filteredProducts.length} producto${
                  filteredProducts.length !== 1
                    ? "s"
                    : ""
                } encontrado${
                  filteredProducts.length !== 1
                    ? "s"
                    : ""
                }`}

          </p>

        </div>
      )}

      {/* =========================
          PRODUCTOS
      ========================== */}

      {filteredProducts.length > 0 ? (

        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 px-3 sm:grid-cols-2 sm:gap-5 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}

                id={product.id}

                nombre={product.title}

                descripcion={
                  product.description
                }

                sku={
                  product.variants?.nodes?.[0]
                    ?.sku ?? ""
                }

                precio={Number(
                  product.variants?.nodes?.[0]
                    ?.price?.amount ?? 0
                )}

                imagenPrincipal={
                  product.featuredImage?.url ??
                  ""
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

            )
          )}

        </div>

      ) : (

        /* =========================
            SIN RESULTADOS
        ========================== */

        <div className="mx-auto max-w-7xl px-4 py-16 text-center">

          <Search
            size={40}
            className="mx-auto mb-4 text-gray-300"
          />

          <h3 className="text-lg font-semibold text-gray-800">
            No encontramos productos
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Prueba buscando por nombre, SKU o
            descripción.
          </p>

        </div>

      )}

    </div>
  );
}