"use client";

import { useMemo, useState } from "react";
import {
  Search,
  X,
  ChevronDown,
} from "lucide-react";

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

interface Collection {
  id: string;
  title: string;
  handle: string;
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

  collections?: {
    nodes: Collection[];
  };
}

type Props = {
  products: Product[];
  collections: Collection[];
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CatalogProducts({
  products,
  collections,
}: Props) {
  const [search, setSearch] = useState("");

  const [selectedCollection, setSelectedCollection] =
    useState("all");

  const [categoriesOpen, setCategoriesOpen] =
    useState(false);

  /*
   * =====================================================
   * PRODUCTOS FILTRADOS
   * =====================================================
   */

  const filteredProducts = useMemo(() => {
    const term = normalizeText(search.trim());

    return products.filter((product) => {
      /*
       * FILTRO POR CATEGORÍA
       */

      const matchesCollection =
        selectedCollection === "all" ||
        product.collections?.nodes?.some(
          (collection) =>
            collection.handle ===
            selectedCollection
        );

      if (!matchesCollection) {
        return false;
      }

      /*
       * FILTRO POR BUSCADOR
       */

      if (!term) {
        return true;
      }

      const title = normalizeText(
        product.title || ""
      );

      const description = normalizeText(
        product.description || ""
      );

      const skus =
        product.variants?.nodes
          ?.map((variant) =>
            normalizeText(
              variant.sku || ""
            )
          )
          .join(" ") || "";

      return (
        title.includes(term) ||
        description.includes(term) ||
        skus.includes(term)
      );
    });
  }, [
    products,
    search,
    selectedCollection,
  ]);

  /*
   * =====================================================
   * NOMBRE DE LA CATEGORÍA SELECCIONADA
   * =====================================================
   */

  const selectedCollectionName =
    selectedCollection === "all"
      ? "Todos los productos"
      : collections.find(
          (collection) =>
            collection.handle ===
            selectedCollection
        )?.title ??
        "Todos los productos";

  return (
    <>
      {/* =====================================================
          CABECERA
      ====================================================== */}

      <div className="mx-auto mb-10 w-full max-w-7xl px-4 sm:px-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          {/* TEXTO */}

          <div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#C6922F]">
              Nuestra colección
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
              Productos
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Encuentra el producto que necesitas.
            </p>

          </div>


          {/* BUSCADOR */}

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
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-12 text-base text-[#111111] outline-none transition placeholder:text-gray-400 focus:border-[#C6922F] focus:ring-4 focus:ring-[#C6922F]/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={18} />
                </button>
              )}

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTÓN CATEGORÍAS
        ====================================================== */}

        {collections.length > 0 && (

          <div className="relative mt-7">

            <button
              type="button"
              onClick={() =>
                setCategoriesOpen(
                  !categoriesOpen
                )
              }
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#C6922F] sm:w-[300px]"
            >

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C6922F]">
                  Categorías
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111111]">
                  {selectedCollectionName}
                </p>

              </div>

              <ChevronDown
                size={20}
                className={`ml-5 transition-transform ${
                  categoriesOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>


            {/* =================================================
                MENÚ CATEGORÍAS
            ================================================== */}

            {categoriesOpen && (

              <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-[340px] rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl">

                {/* TODAS */}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCollection(
                      "all"
                    );
                    setCategoriesOpen(
                      false
                    );
                  }}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    selectedCollection ===
                    "all"
                      ? "bg-[#C6922F] text-white"
                      : "text-[#111111] hover:bg-[#FCFAF7]"
                  }`}
                >
                  Todos los productos
                </button>


                {/* COLECCIONES */}

                {collections.map(
                  (collection) => (

                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => {
                        setSelectedCollection(
                          collection.handle
                        );

                        setCategoriesOpen(
                          false
                        );
                      }}
                      className={`mt-1 w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                        selectedCollection ===
                        collection.handle
                          ? "bg-[#C6922F] text-white"
                          : "text-[#111111] hover:bg-[#FCFAF7]"
                      }`}
                    >
                      {collection.title}
                    </button>

                  )
                )}

              </div>

            )}

          </div>

        )}

      </div>


      {/* =====================================================
          RESULTADOS
      ====================================================== */}

      {(search ||
        selectedCollection !== "all") && (

        <div className="mx-auto mb-6 flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">

          <p className="text-sm text-gray-500">

            {filteredProducts.length}{" "}

            {filteredProducts.length === 1
              ? "producto encontrado"
              : "productos encontrados"}

          </p>

          {selectedCollection !==
            "all" && (

            <button
              type="button"
              onClick={() =>
                setSelectedCollection(
                  "all"
                )
              }
              className="text-sm font-semibold text-[#C6922F] hover:underline"
            >
              Ver todos
            </button>

          )}

        </div>

      )}


      {/* =====================================================
          PRODUCTOS
      ====================================================== */}

      {filteredProducts.length > 0 ? (

        <ProductGrid
          products={filteredProducts}
        />

      ) : (

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">

            <Search
              size={42}
              className="mx-auto mb-5 text-gray-300"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              No encontramos productos
            </h2>

            <p className="mt-2 text-gray-500">
              Prueba con otra categoría o
              búsqueda.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCollection(
                  "all"
                );
              }}
              className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#C6922F]"
            >
              Ver todo el catálogo
            </button>

          </div>

        </div>

      )}

    </>
  );
}