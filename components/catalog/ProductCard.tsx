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
      {/* =====================================================
          TARJETA DEL PRODUCTO
      ====================================================== */}

      <article
        className="
          group
          overflow-hidden
          rounded-[24px]
          border
          border-[#E8E1D8]
          bg-white
          shadow-[0_8px_30px_rgba(44,36,28,0.06)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[#D8C7AD]
          hover:shadow-[0_18px_45px_rgba(44,36,28,0.12)]
        "
      >

        {/* =====================================================
            IMAGEN
        ====================================================== */}

        <div
          className="
            relative
            cursor-pointer
            overflow-hidden
            bg-gradient-to-b
            from-[#FBF9F5]
            to-[#F4EFE7]
          "
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

          {/* Marco interior */}

          <div
            className="
              relative
              h-[200px]
              p-3
              sm:h-[260px]
              sm:p-4
              md:h-[310px]
              md:p-5
              lg:h-[340px]
            "
          >

            {image ? (
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[18px]
                  bg-white
                  shadow-[0_4px_18px_rgba(44,36,28,0.05)]
                "
              >

                <Image
                  src={image}
                  alt={nombre}
                  fill
                  sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    25vw
                  "
                  className="
                    object-contain
                    p-4
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.035]
                    sm:p-5
                    md:p-6
                  "
                />

              </div>
            ) : (

              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  rounded-[18px]
                  bg-white
                  text-sm
                  text-gray-400
                "
              >
                Sin imagen
              </div>

            )}

          </div>

          {/* =================================================
              NÚMERO DE FOTOS
          ================================================== */}

          {gallery.length > 1 && (
            <div
              className="
                absolute
                left-5
                top-5
                rounded-full
                border
                border-white/60
                bg-white/90
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-[#4A4035]
                shadow-sm
                backdrop-blur-sm
                sm:left-6
                sm:top-6
                sm:text-xs
              "
            >
              +{gallery.length - 1} fotos
            </div>
          )}

          {/* =================================================
              BOTÓN AMPLIAR
          ================================================== */}

          <button
            type="button"
            aria-label="Ampliar imagen"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="
              absolute
              bottom-5
              right-5
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#E8E1D8]
              bg-white/95
              text-[#3E352B]
              shadow-md
              backdrop-blur-sm
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#C6922F]
              hover:text-white
              sm:bottom-6
              sm:right-6
              sm:h-10
              sm:w-10
            "
          >
            <Expand
              size={16}
            />
          </button>

        </div>

        {/* =====================================================
            INFORMACIÓN
        ====================================================== */}

        <div
          className="
            space-y-4
            p-4
            sm:space-y-5
            sm:p-5
            md:p-6
          "
        >

          {/* =================================================
              NOMBRE
          ================================================== */}

          <div>

            <h2
              className="
                line-clamp-2
                text-[15px]
                font-semibold
                leading-5
                tracking-[-0.01em]
                text-[#211D19]
                sm:text-base
                md:text-lg
              "
            >
              {nombre}
            </h2>

            {currentSku && (
              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  text-[#8B8177]
                  sm:text-xs
                "
              >

                <Package
                  size={13}
                  className="text-[#A49686]"
                />

                <span>
                  {currentSku}
                </span>

              </div>
            )}

          </div>

          {/* =================================================
              PRECIO
          ================================================== */}

          <div
            className="
              rounded-xl
              bg-[#FAF7F2]
              px-3
              py-3
              sm:px-4
              sm:py-3.5
            "
          >

            <span
              className="
                block
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-[#95897B]
                sm:text-xs
              "
            >
              Desde
            </span>

            <h3
              className="
                mt-0.5
                text-2xl
                font-bold
                tracking-tight
                text-[#211D19]
                sm:text-[26px]
              "
            >
              {currentPrice.toFixed(2)} €
            </h3>

          </div>

          {/* =================================================
              COLOR
          ================================================== */}

          {colors.length > 0 && (
            <div>

              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  text-[#29241F]
                  sm:text-sm
                "
              >
                Color
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  gap-1.5
                  sm:gap-2
                "
              >

                {colors.map((color) => (

                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-[10px]
                      transition-all
                      duration-200
                      sm:px-3.5
                      sm:py-2
                      sm:text-xs
                      ${
                        selectedColor === color
                          ? "border-[#C6922F] bg-[#C6922F] text-white shadow-sm"
                          : "border-[#DDD5CA] bg-white text-[#4A4035] hover:border-[#C6922F]"
                      }
                    `}
                  >
                    {color}
                  </button>

                ))}

              </div>

            </div>
          )}

          {/* =================================================
              MEDIDA
          ================================================== */}

          {sizes.length > 0 && (
            <div>

              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  text-[#29241F]
                  sm:text-sm
                "
              >
                Medida
              </p>

              <select
                value={selectedSize}
                onChange={(e) =>
                  setSelectedSize(
                    e.target.value
                  )
                }
                className="
                  h-11
                  w-full
                  cursor-pointer
                  rounded-xl
                  border
                  border-[#DCD4C9]
                  bg-white
                  px-3
                  text-xs
                  text-[#302A25]
                  outline-none
                  transition
                  focus:border-[#C6922F]
                  focus:ring-2
                  focus:ring-[#C6922F]/10
                  sm:h-12
                  sm:px-4
                  sm:text-sm
                "
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

          {/* =================================================
              CANTIDAD
          ================================================== */}

          <div>

            <p
              className="
                mb-2
                text-xs
                font-semibold
                text-[#29241F]
                sm:text-sm
              "
            >
              Cantidad
            </p>

            <div
              className="
                flex
                h-11
                w-[140px]
                items-center
                justify-between
                overflow-hidden
                rounded-xl
                border
                border-[#DCD4C9]
                bg-white
                sm:h-12
              "
            >

              <button
                type="button"
                aria-label="Disminuir cantidad"
                onClick={(e) => {
                  e.stopPropagation();

                  setQuantity((prev) =>
                    prev > 1
                      ? prev - 1
                      : 1
                  );
                }}
                className="
                  flex
                  h-full
                  w-11
                  touch-manipulation
                  items-center
                  justify-center
                  text-lg
                  font-medium
                  text-[#5A5148]
                  transition
                  hover:bg-[#F7F3ED]
                  active:bg-[#EEE7DC]
                "
              >
                −
              </button>

              <span
                className="
                  min-w-[40px]
                  text-center
                  text-sm
                  font-semibold
                  text-[#29241F]
                "
              >
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={(e) => {
                  e.stopPropagation();

                  setQuantity(
                    (prev) => prev + 1
                  );
                }}
                className="
                  flex
                  h-full
                  w-11
                  touch-manipulation
                  items-center
                  justify-center
                  text-lg
                  font-medium
                  text-[#5A5148]
                  transition
                  hover:bg-[#F7F3ED]
                  active:bg-[#EEE7DC]
                "
              >
                +
              </button>

            </div>

          </div>

          {/* =================================================
              ESTADO
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[#EEE8E0]
              pt-4
            "
          >

            <span
              className="
                text-xs
                text-[#8B8177]
                sm:text-sm
              "
            >
              Estado
            </span>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-[9px]
                font-semibold
                sm:text-xs
                ${
                  inStock
                    ? "bg-[#E4F8EC] text-[#16834A]"
                    : "bg-[#FCE7E7] text-[#C53535]"
                }
              `}
            >
              {inStock
                ? "Disponible"
                : "Sin stock"}
            </span>

          </div>

          {/* =================================================
              BOTÓN CARRITO
          ================================================== */}

          <button
            type="button"
            disabled={!inStock}
            onClick={handleAddToCart}
            className={`
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              py-3
              text-xs
              font-semibold
              transition-all
              duration-300
              sm:py-3.5
              sm:text-sm
              ${
                inStock
                  ? `
                    bg-[#211D19]
                    text-white
                    shadow-sm
                    hover:-translate-y-0.5
                    hover:bg-[#C6922F]
                    hover:shadow-md
                  `
                  : `
                    cursor-not-allowed
                    bg-gray-200
                    text-gray-500
                  `
              }
            `}
          >

            <ShoppingCart
              size={17}
            />

            {inStock
              ? "Añadir al carrito"
              : "Sin stock"}

          </button>

          {/* =================================================
              DESCRIPCIÓN
          ================================================== */}

          {descripcion && (
            <div
              className="
                border-t
                border-[#EEE8E0]
                pt-4
                sm:pt-5
              "
            >

              <p
                className="
                  line-clamp-3
                  text-[10px]
                  leading-4
                  text-[#81776D]
                  sm:text-xs
                  sm:leading-5
                  md:text-sm
                  md:leading-6
                "
              >
                {descripcion}
              </p>

            </div>
          )}

        </div>

      </article>

      {/* =====================================================
          MODAL DE IMÁGENES
      ====================================================== */}

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