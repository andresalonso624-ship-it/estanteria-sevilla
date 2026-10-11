"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

export type ProductCardStyle = "white" | "beige";

interface ProductCardProps {
  id: string;
  handle?: string;
  nombre: string;
  descripcion?: string;
  sku?: string;
  precio: number;
  imagenPrincipal?: string;
  imagenes?: string[];
  variantes?: unknown[];
  styleMode?: ProductCardStyle;
}

export default function ProductCard({
  id,
  handle,
  nombre,
  precio,
  imagenPrincipal,
  styleMode = "beige",
}: ProductCardProps) {
  const beige = styleMode === "beige";
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    if (!imageOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setImageOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [imageOpen]);

  const formattedPrice = precio.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const validHandle =
    typeof handle === "string" &&
    handle.trim() !== "" &&
    handle !== "undefined" &&
    handle !== "null";

  const productUrl = validHandle
    ? `/producto/${encodeURIComponent(handle.trim())}`
    : null;

  return (
    <>
      <article
        className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
          beige
            ? "border-[#E9E0D5] bg-[#F5F0E8]"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          {imagenPrincipal ? (
            <button
              type="button"
              onClick={() => setImageOpen(true)}
              className="absolute inset-0 block h-full w-full cursor-zoom-in"
              aria-label={`Ampliar imagen de ${nombre}`}
            >
              <Image
                src={imagenPrincipal}
                alt={nombre}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Imagen no disponible
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          {productUrl ? (
            <Link href={productUrl} aria-label={`Ver ${nombre}`} className="block">
              <h2 className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-[#2C241C] sm:text-lg">
                {nombre}
              </h2>
            </Link>
          ) : (
            <h2
              data-product-id={id}
              title="Este producto no tiene un identificador de URL válido."
              className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-[#2C241C] sm:text-lg"
            >
              {nombre}
            </h2>
          )}

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-lg font-semibold text-[#8B5E34]">
              {formattedPrice}
            </p>
            {productUrl ? (
              <Link
                href={productUrl}
                className="whitespace-nowrap text-sm text-[#8B5E34] transition-transform duration-300 hover:translate-x-1"
              >
                Ver producto →
              </Link>
            ) : (
              <span className="whitespace-nowrap text-sm text-[#8B5E34]">
                Ver producto
              </span>
            )}
          </div>
        </div>
      </article>

      {imageOpen && imagenPrincipal && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${nombre}`}
          onClick={() => setImageOpen(false)}
        >
          <button
            type="button"
            onClick={() => setImageOpen(false)}
            aria-label="Cerrar imagen"
            className="fixed right-4 top-4 z-[10000] flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-4xl leading-none text-white shadow-lg hover:bg-black sm:right-6 sm:top-6"
          >
            ×
          </button>
          <div
            className="relative h-[85dvh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={imagenPrincipal}
              alt={nombre}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
