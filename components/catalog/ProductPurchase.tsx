
"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  MapPin,
  Package,
} from "lucide-react";
import { addToCart } from "@/lib/cart";

interface ProductPurchaseProps {
  variantId: string | null;
  price: string | null;
  currency: string;
  availableForSale: boolean;
  pickupOnly?: boolean;
}

export default function ProductPurchase({
  variantId,
  price,
  currency,
  availableForSale,
  pickupOnly = false,
}: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  // Evita errores si Shopify no devuelve la moneda.
  const safeCurrency =
    typeof currency === "string" && currency.trim()
      ? currency.trim()
      : "EUR";

  const numericPrice =
    price !== null && price.trim() !== ""
      ? Number(price)
      : null;

  const formattedPrice =
    numericPrice !== null && Number.isFinite(numericPrice)
      ? numericPrice.toLocaleString("es-ES", {
          style: "currency",
          currency: safeCurrency,
        })
      : "";

  async function handleAddToCart() {
    if (!variantId || !availableForSale || adding) {
      return;
    }

    setAdding(true);
    setMessage("");

    try {
      await addToCart(variantId, quantity);
      setMessage("Producto añadido al carrito.");
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      setMessage("No se pudo añadir. Inténtalo de nuevo.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <section className="mt-5 space-y-4">
      {/* Cantidad y botón de compra */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 shrink-0 items-center overflow-hidden rounded-xl border border-[#E9E2D9] bg-white">
          <button
            type="button"
            aria-label="Reducir cantidad"
            disabled={quantity <= 1}
            onClick={() =>
              setQuantity((current) => Math.max(1, current - 1))
            }
            className="flex h-full items-center px-3 text-[#2C241C] transition hover:bg-[#F5F0E8] disabled:opacity-40"
          >
            <Minus size={15} />
          </button>

          <span className="min-w-7 text-center text-sm font-semibold text-[#2C241C]">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() =>
              setQuantity((current) => Math.min(999, current + 1))
            }
            className="flex h-full items-center px-3 text-[#2C241C] transition hover:bg-[#F5F0E8]"
          >
            <Plus size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!variantId || !availableForSale || adding}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#8B5E34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6E4728] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={17} />
          {adding ? "Añadiendo..." : "Añadir al carrito"}
        </button>
      </div>

      {!availableForSale && (
        <p className="text-sm font-medium text-red-700">
          Producto no disponible actualmente.
        </p>
      )}

      {message && (
        <p
          role="status"
          className={`text-sm ${
            message.startsWith("No se pudo")
              ? "text-red-700"
              : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      {/* Información de entrega */}
      <div className="border-t border-[#E9E2D9] pt-4">
        <div className="flex items-start gap-3">
          {pickupOnly ? (
            <MapPin
              size={20}
              className="mt-0.5 shrink-0 text-[#8B5E34]"
            />
          ) : (
            <Truck
              size={20}
              className="mt-0.5 shrink-0 text-[#8B5E34]"
            />
          )}

          <div>
            <p className="text-sm font-semibold text-[#2C241C]">
              {pickupOnly
                ? "Recogida en nuestras instalaciones"
                : "Información de envío"}
            </p>

            <p className="mt-1 text-sm leading-5 text-[#6B6259]">
              {pickupOnly
                ? "Este artículo no se envía. Disponible únicamente para recogida en nuestras instalaciones."
                : "Consulta los gastos y plazos de entrega disponibles durante el proceso de compra."}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-3">
          <Package
            size={20}
            className="mt-0.5 shrink-0 text-[#8B5E34]"
          />

          <div>
            <p className="text-sm font-semibold text-[#2C241C]">
              Precio por unidad
            </p>

            <p className="mt-1 text-sm text-[#6B6259]">
              {formattedPrice
                ? `${formattedPrice} por unidad.`
                : "Consulta el precio del producto."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
