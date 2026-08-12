"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  X,
  ChevronDown,
} from "lucide-react";

import ProductGrid from "./ProductGrid";


/* =========================================================
   TIPOS
========================================================= */

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


/* =========================================================
   NORMALIZAR TEXTO
========================================================= */

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}


/* =========================================================
   COMPONENTE
========================================================= */

export default function CatalogProducts({
  products,
  collections,
}: Props) {

  /* =======================================================
     ESTADOS
  ======================================================= */

  const [search, setSearch] =
    useState("");

  const [
    selectedCollection,
    setSelectedCollection,
  ] = useState("all");

  const [
    categoryOpen,
    setCategoryOpen,
  ] = useState(false);


  /* =======================================================
     LEER CATEGORÍA DE LA URL
  ======================================================= */

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const category =
      params.get("categoria");

    if (category) {
      setSelectedCollection(
        category
      );
    }

  }, []);


  /* =======================================================
     FILTRAR PRODUCTOS
  ======================================================= */

  const filteredProducts =
    useMemo(() => {

      const term =
        normalizeText(
          search.trim()
        );


      return products.filter(
        (product) => {

          /* ==============================================
             NOMBRE
          ============================================== */

          const title =
            normalizeText(
              product.title || ""
            );


          /* ==============================================
             DESCRIPCIÓN
          ============================================== */

          const description =
            normalizeText(
              product.description ||
                ""
            );


          /* ==============================================
             SKU
          ============================================== */

          const skus =
            product.variants?.nodes
              ?.map(
                (variant) =>
                  normalizeText(
                    variant.sku || ""
                  )
              )
              .join(" ") || "";


          /* ==============================================
             BUSCADOR
          ============================================== */

          const matchesSearch =
            !term ||
            title.includes(term) ||
            description.includes(term) ||
            skus.includes(term);


          /* ==============================================
             CATEGORÍA
          ============================================== */

          const matchesCategory =
            selectedCollection ===
              "all" ||
            product.collections?.nodes?.some(
              (collection) =>
                collection.handle ===
                selectedCollection
            );


          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );

    }, [
      products,
      search,
      selectedCollection,
    ]);


  /* =======================================================
     NOMBRE CATEGORÍA
  ======================================================= */

  const selectedCategoryName =
    selectedCollection === "all"
      ? "Todos los productos"
      : collections.find(
          (collection) =>
            collection.handle ===
            selectedCollection
        )?.title ??
        "Todos los productos";


  /* =======================================================
     SELECCIONAR CATEGORÍA
  ======================================================= */

  function selectCategory(
    handle: string
  ) {

    setSelectedCollection(
      handle
    );

    setCategoryOpen(false);


    const url =
      new URL(
        window.location.href
      );


    if (handle === "all") {

      url.searchParams.delete(
        "categoria"
      );

    } else {

      url.searchParams.set(
        "categoria",
        handle
      );

    }


    window.history.replaceState(
      {},
      "",
      url.toString()
    );
  }


  /* =======================================================
     LIMPIAR FILTROS
  ======================================================= */

  function clearFilters() {

    setSearch("");

    setSelectedCollection(
      "all"
    );

    setCategoryOpen(false);


    const url =
      new URL(
        window.location.href
      );


    url.searchParams.delete(
      "categoria"
    );


    window.history.replaceState(
      {},
      "",
      url.toString()
    );
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>

      {/* ===================================================
          FILTROS
      =================================================== */}

      <div
        className="
          mx-auto
          mb-14
          grid
          w-full
          max-w-6xl
          grid-cols-1
          gap-6
          px-6
          md:grid-cols-2
          md:items-end
        "
      >

        {/* =================================================
            CATEGORÍAS
        ================================================== */}

        <div className="w-full">

          <label
            className="
              mb-3
              block
              text-sm
              font-semibold
              text-[#111111]
            "
          >
            Categorías
          </label>


          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setCategoryOpen(
                  !categoryOpen
                )
              }
              aria-expanded={
                categoryOpen
              }
              className="
                flex
                h-14
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                text-left
                shadow-sm
                transition
                hover:border-[#C6922F]
                hover:shadow-md
              "
            >

              <div className="min-w-0">

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#C6922F]
                  "
                >
                  Categorías
                </p>


                <p
                  className="
                    mt-0.5
                    truncate
                    text-base
                    font-semibold
                    text-[#111111]
                  "
                >
                  {
                    selectedCategoryName
                  }
                </p>

              </div>


              <ChevronDown
                size={20}
                className={`
                  shrink-0
                  transition-transform
                  ${
                    categoryOpen
                      ? "rotate-180 text-[#C6922F]"
                      : "text-[#111111]"
                  }
                `}
              />

            </button>


            {/* =============================================
                MENÚ CATEGORÍAS
            ============================================== */}

            {categoryOpen && (

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-[calc(100%+8px)]
                  z-50
                  max-h-80
                  overflow-y-auto
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-2
                  shadow-xl
                "
              >

                {/* TODOS */}

                <button
                  type="button"
                  onClick={() =>
                    selectCategory(
                      "all"
                    )
                  }
                  className={`
                    flex
                    w-full
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    transition
                    ${
                      selectedCollection ===
                      "all"
                        ? "bg-[#C6922F]/10 text-[#C6922F]"
                        : "text-[#111111] hover:bg-gray-50"
                    }
                  `}
                >
                  Todos los productos
                </button>


                {/* CATEGORÍAS */}

                {collections.map(
                  (collection) => (

                    <button
                      key={
                        collection.id
                      }
                      type="button"
                      onClick={() =>
                        selectCategory(
                          collection.handle
                        )
                      }
                      className={`
                        flex
                        w-full
                        rounded-xl
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-semibold
                        transition
                        ${
                          selectedCollection ===
                          collection.handle
                            ? "bg-[#C6922F]/10 text-[#C6922F]"
                            : "text-[#111111] hover:bg-gray-50"
                        }
                      `}
                    >
                      {
                        collection.title
                      }
                    </button>

                  )
                )}

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            BUSCADOR
        ================================================== */}

        <div className="w-full">

          <label
            htmlFor="catalog-search"
            className="
              mb-3
              block
              text-sm
              font-semibold
              text-[#111111]
            "
          >
            Buscar producto
          </label>


          <div className="relative">

            <Search
              size={21}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />


            <input
              id="catalog-search"
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Nombre, SKU o descripción..."
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                pl-14
                pr-12
                text-base
                text-[#111111]
                shadow-sm
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#C6922F]
                focus:ring-4
                focus:ring-[#C6922F]/10
              "
            />


            {search && (

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Limpiar búsqueda"
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  rounded-full
                  p-1.5
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-black
                "
              >
                <X size={18} />
              </button>

            )}

          </div>


          {/* RESULTADOS */}

          {(search ||
            selectedCollection !==
              "all") && (

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                {filteredProducts.length}{" "}
                {filteredProducts.length ===
                1
                  ? "producto encontrado"
                  : "productos encontrados"}
              </p>


              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="
                  text-sm
                  font-semibold
                  text-[#C6922F]
                  hover:text-[#A8791F]
                "
              >
                Limpiar
              </button>

            </div>

          )}

        </div>

      </div>


      {/* ===================================================
          PRODUCTOS
      =================================================== */}

      {filteredProducts.length >
      0 ? (

        <ProductGrid
          products={
            filteredProducts
          }
        />

      ) : (

        <div
          className="
            mx-6
            rounded-3xl
            border
            border-gray-200
            bg-gray-50
            px-6
            py-20
            text-center
          "
        >

          <Search
            size={42}
            className="
              mx-auto
              mb-5
              text-gray-300
            "
          />


          <h2
            className="
              text-2xl
              font-bold
              text-gray-800
            "
          >
            No encontramos ese
            producto
          </h2>


          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Prueba buscando con otro
            nombre, SKU o categoría.
          </p>


          <button
            type="button"
            onClick={
              clearFilters
            }
            className="
              mt-6
              rounded-xl
              bg-black
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#C6922F]
            "
          >
            Ver todo el catálogo
          </button>

        </div>

      )}

    </>
  );
}