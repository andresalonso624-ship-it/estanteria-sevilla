
"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode?: string;
    };
    product: {
      title: string;
      featuredImage?: {
        url: string;
        altText?: string | null;
      } | null;
    };
  };
};

type Props = {
  line: CartLine;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

function formatPrice(amount: string, currencyCode = "EUR") {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "Precio no disponible";
  }

  try {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: currencyCode,
    });
  } catch {
    return `${value.toFixed(2)} €`;
  }
}

export default function CartItem({
  line,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const product = line.merchandise.product;
  const merchandise = line.merchandise;
  const currency = merchandise.price.currencyCode || "EUR";

  const unitPrice = Number(merchandise.price.amount);
  const subtotal = unitPrice * line.quantity;

  return (
    <article className="w-full">
      {/* PRODUCTO */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Imagen */}
        <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl border border-[#E9E2D9] bg-white sm:h-[112px] sm:w-[112px]">
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(max-width: 640px) 100px, 112px"
              className="object-contain p-2.5"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center text-xs text-[#8B8177]">
              Sin imagen
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="break-words text-[15px] font-semibold leading-5 text-[#2C241C] sm:text-base sm:leading-6">
            {product.title}
          </h3>

          {merchandise.title &&
            merchandise.title !== "Default Title" && (
              <p className="mt-1 break-words text-xs leading-5 text-[#76695E] sm:text-sm">
                {merchandise.title}
              </p>
            )}

          <p className="mt-3 text-sm leading-5 text-[#76695E]">
            <span className="font-semibold text-[#8B5E34]">
              {formatPrice(merchandise.price.amount, currency)}
            </span>
            <span> / unidad</span>
          </p>

          <div className="mt-2">
            <p className="text-sm text-[#76695E]">Subtotal del producto</p>
            <p className="mt-0.5 text-base font-bold leading-6 text-[#2C241C]">
              {Number.isFinite(subtotal)
                ? formatPrice(String(subtotal), currency)
                : "—"}
            </p>
          </div>
        </div>

        {/* Eliminar */}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Eliminar ${product.title} del carrito`}
          title="Eliminar producto"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#A94442] transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          <Trash2 size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* CANTIDAD */}
      <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-white px-3.5 py-3 sm:px-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#2C241C]">
            Cantidad
          </p>
          <p className="mt-0.5 text-xs text-[#8B8177]">
            Modifica las unidades
          </p>
        </div>

        <div className="flex h-10 shrink-0 items-center rounded-xl border border-[#E9E2D9] bg-[#FCFAF7]">
          <button
            type="button"
            onClick={onDecrease}
            disabled={line.quantity <= 1}
            aria-label={`Reducir cantidad de ${product.title}`}
            className="flex h-full w-10 items-center justify-center rounded-l-xl text-[#2C241C] transition hover:bg-[#F0E7DC] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Minus size={15} />
          </button>

          <span
            aria-live="polite"
            className="min-w-9 text-center text-sm font-semibold tabular-nums text-[#2C241C]"
          >
            {line.quantity}
          </span>

          <button
            type="button"
            onClick={onIncrease}
            aria-label={`Aumentar cantidad de ${product.title}`}
            className="flex h-full w-10 items-center justify-center rounded-r-xl text-[#2C241C] transition hover:bg-[#F0E7DC]"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
