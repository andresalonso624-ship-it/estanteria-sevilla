"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Expand,
  Package,
  ShoppingCart,
} from "lucide-react";

import ProductModal from "./ProductModal";
import { addToCart } from "@/lib/cart";

type Variant = {
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
};

type Props = {
  id: string;
  nombre: string;
  descripcion: string;
  sku: string;
  precio: number;
  imagenPrincipal: string;
  imagenes?: string[];
  variantes: Variant[];
};

export default function ProductCard({
  id,
  nombre,
  descripcion,
  sku,
  precio,
  imagenPrincipal,
  imagenes = [],
  variantes,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverImage, setHoverImage] = useState(false);
  const [quantity, setQuantity] = useState(1);

  /*
   * GALERÍA
   */

  const gallery = useMemo(() => {
    if (imagenes.length > 0) {
      return imagenes;
    }

    return imagenPrincipal
      ? [imagenPrincipal]
      : [];
  }, [imagenes, imagenPrincipal]);

  const image =
    hoverImage && gallery.length > 1
      ? gallery[1]
      : gallery[0];

  /*
   * COLORES
   */

  const colors = Array.from(
    new Set(
      variantes.flatMap((variant) =>
        variant.selectedOptions
          .filter(
            (option) =>
              option.name.toLowerCase() ===
              "color"
          )
          .map((option) => option.value)
      )
    )
  );

  /*
   * MEDIDAS
   */

  const sizes = Array.from(
    new Set(
      variantes.flatMap((variant) =>
        variant.selectedOptions
          .filter((option) => {
            const name =
              option.name.toLowerCase();

            return (
              name.includes("medida") ||
              name.includes("size") ||
              name.includes("tamaño") ||
              name.includes("大小")
            );
          })
          .map((option) => option.value)
      )
    )
  );

  const [selectedColor, setSelectedColor] =
    useState(colors[0] || "");

  const [selectedSize, setSelectedSize] =
    useState(sizes[0] || "");

  /*
   * VARIANTE ACTUAL
   */

  const currentVariant =
    variantes.find((variant) => {
      const colorOption =
        variant.selectedOptions.find(
          (option) =>
            option.name.toLowerCase() ===
            "color"
        );

      const sizeOption =
        variant.selectedOptions.find(
          (option) => {
            const name =
              option.name.toLowerCase();

            return (
              name.includes("medida") ||
              name.includes("size") ||
              name.includes("tamaño") ||
              name.includes("大小")
            );
          }
        );

      const colorOk =
        !selectedColor ||
        !colorOption ||
        colorOption.value === selectedColor;

      const sizeOk =
        !selectedSize ||
        !sizeOption ||
        sizeOption.value === selectedSize;

      return colorOk && sizeOk;
    }) || variantes[0];

  /*
   * PRECIO
   */

  const currentPrice = Number(
    currentVariant?.price?.amount ??
      precio
  );

  /*
   * SKU
   */

  const currentSku =
    currentVariant?.sku || sku;

  /*
   * STOCK
   */

  const inStock =
    currentVariant?.availableForSale ??
    true;

  /*
   * AGREGAR AL CARRITO
   */

  async function handleAddToCart() {
    if (!currentVariant) return;

    try {
      await addToCart(
        currentVariant.id,
        quantity
      );
    } catch (error) {
      console.error(error);

      alert(
        "No fue posible añadir el producto."
      );
    }
  }

  return (
    <>
      {/* TARJETA */}

      <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* IMAGEN */}

        <div
          className="relative cursor-pointer bg-[#fafafa]"
          onClick={() =>
            setModalOpen(true)
          }
          onMouseEnter={() =>
            setHoverImage(true)
          }
          onMouseLeave={() =>
            setHoverImage(false)
          }
        >
          <div className="relative h-[190px] sm:h-[250px] md:h-[300px] lg:h-[340px]">

            {image ? (
              <Image
                src={image}
                alt={nombre}
                fill
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 1024px) 33vw,
                  25vw
                "
                className="object-contain p-3 transition duration-500 group-hover:scale-105 sm:p-5 md:p-6 lg:p-8"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Sin imagen
              </div>
            )}

          </div>

          {/* NÚMERO DE FOTOS */}

          {gallery.length > 1 && (
            <div className="absolute right-2 top-2 rounded-full bg-black px-2 py-1 text-[10px] font-semibold text-white sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
              +{gallery.length - 1} fotos
            </div>
          )}

          {/* BOTÓN AMPLIAR */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10"
          >
            <Expand
              size={15}
              className="sm:h-[18px] sm:w-[18px]"
            />
          </button>
        </div>

        {/* INFORMACIÓN */}

        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 md:space-y-5 md:p-5 lg:p-6">

          {/* NOMBRE */}

          <div>
            <h2 className="line-clamp-2 text-sm font-bold leading-5 text-[#111111] sm:text-base md:text-lg lg:text-xl">
              {nombre}
            </h2>

            {currentSku && (
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-500 sm:mt-2 sm:text-xs md:text-sm">
                <Package
                  size={13}
                  className="sm:h-[15px] sm:w-[15px]"
                />

                {currentSku}
              </div>
            )}
          </div>

          {/* PRECIO */}

          <div>
            <span className="text-[10px] text-gray-500 sm:text-xs md:text-sm">
              Desde
            </span>

            <h3 className="text-xl font-bold text-[#111111] sm:text-2xl md:text-3xl">
              {currentPrice.toFixed(2)} €
            </h3>
          </div>

          {/* COLOR */}

          {colors.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold sm:text-sm">
                Color
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`rounded-full border px-2.5 py-1.5 text-[10px] transition sm:px-3 sm:py-2 sm:text-xs md:px-4 md:text-sm ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MEDIDA */}

          {sizes.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold sm:text-sm">
                Medida
              </p>

              <select
                value={selectedSize}
                onChange={(e) =>
                  setSelectedSize(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-xs outline-none focus:border-black sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
              >
                {sizes.map((size) => (
                  <option
                    key={size}
                    value={size}
                  >
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}



{/* CANTIDAD */}

<div>
  <p className="mb-2 text-sm font-semibold">
    Cantidad
  </p>

  <div className="flex h-12 w-36 items-center justify-between overflow-hidden rounded-xl border border-gray-300 bg-white">

    <button
      type="button"
      aria-label="Disminuir cantidad"
      onClick={(e) => {
        e.stopPropagation();

        setQuantity((prev) =>
          prev > 1 ? prev - 1 : 1
        );
      }}
      className="flex h-full w-12 touch-manipulation items-center justify-center text-xl font-medium text-gray-700 transition active:bg-gray-100"
    >
      −
    </button>

    <span className="min-w-[40px] text-center text-sm font-semibold">
      {quantity}
    </span>

    <button
      type="button"
      aria-label="Aumentar cantidad"
      onClick={(e) => {
        e.stopPropagation();

        setQuantity((prev) => prev + 1);
      }}
      className="flex h-full w-12 touch-manipulation items-center justify-center text-xl font-medium text-gray-700 transition active:bg-gray-100"
    >
      +
    </button>

  </div>
</div>

          {/* ESTADO */}

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500 sm:text-sm">
              Estado
            </span>

            <span
              className={`rounded-full px-2 py-1 text-[9px] font-semibold sm:px-3 sm:text-xs ${
                inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {inStock
                ? "Disponible"
                : "Sin stock"}
            </span>

          </div>

          {/* BOTÓN */}

          <button
            type="button"
            disabled={!inStock}
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-xs font-semibold transition sm:gap-3 sm:rounded-xl sm:py-4 sm:text-sm ${
              inStock
                ? "bg-black text-white hover:bg-[#C6922F]"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            <ShoppingCart
              size={17}
            />

            {inStock
              ? "Añadir al carrito"
              : "Sin stock"}
          </button>

          {/* DESCRIPCIÓN */}

          {descripcion && (
            <div className="border-t border-gray-200 pt-3 sm:pt-5">
              <p className="line-clamp-3 text-[10px] leading-4 text-gray-500 sm:text-xs sm:leading-5 md:text-sm md:leading-6">
                {descripcion}
              </p>
            </div>
          )}

        </div>
      </article>

      {/* MODAL */}

      <ProductModal
        open={modalOpen}
        images={gallery}
        onClose={() =>
          setModalOpen(false)
        }
      />
    </>
  );
}