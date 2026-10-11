
"use client";

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

  const formattedPrice = precio.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  // Evita crear enlaces como /producto/undefined.
  const validHandle =
    typeof handle === "string" &&
    handle.trim() !== "" &&
    handle !== "undefined" &&
    handle !== "null";

  const productUrl = validHandle
    ? `/producto/${encodeURIComponent(handle.trim())}`
    : null;

  const cardContent = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {imagenPrincipal ? (
          <Image
            src={imagenPrincipal}
            alt={nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Imagen no disponible
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h2 className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-[#2C241C] sm:text-lg">
          {nombre}
        </h2>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-[#8B5E34]">
            {formattedPrice}
          </p>

          <span className="whitespace-nowrap text-sm text-[#8B5E34] transition-transform duration-300 group-hover:translate-x-1">
            Ver producto →
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article
      className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        beige
          ? "border-[#E9E0D5] bg-[#F5F0E8]"
          : "border-gray-200 bg-white"
      }`}
    >
      {productUrl ? (
        <Link
          href={productUrl}
          className="block"
          aria-label={`Ver ${nombre}`}
        >
          {cardContent}
        </Link>
      ) : (
        <div
          className="block"
          data-product-id={id}
          title="Este producto no tiene un identificador de URL válido."
        >
          {cardContent}
        </div>
      )}
    </article>
  );
}
