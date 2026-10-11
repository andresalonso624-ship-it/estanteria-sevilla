
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ShoppingBag } from "lucide-react";

import CartItem, { CartLine } from "./CartItem";
import CartFooter from "./CartFooter";
import CartEmpty from "./CartEmpty";

type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);

  /*
   * CARGAR CARRITO
   */
  const loadCart = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    try {
      const cartId = localStorage.getItem("shopify-cart-id");

      if (!cartId) {
        setCart(null);
        return;
      }

      const response = await fetch("/api/cart/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("No se pudo cargar el carrito");
      }

      const data = await response.json();

      if (data.error) {
        console.error("Error del carrito:", data.error);
        setCart(null);
        return;
      }

      setCart(data);
    } catch (error) {
      console.error("Error cargando carrito:", error);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  /*
   * ABRIR Y ACTUALIZAR CARRITO
   */
  useEffect(() => {
    if (!open) return;

    void loadCart(true);

    function refresh() {
      void loadCart(false);
    }

    window.addEventListener("cartUpdated", refresh);

    return () => {
      window.removeEventListener("cartUpdated", refresh);
    };
  }, [open, loadCart]);

  /*
   * ELIMINAR PRODUCTO
   */
  async function removeLine(lineId: string) {
    const cartId = localStorage.getItem("shopify-cart-id");

    if (!cartId) return;

    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId, lineId }),
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
      }

      const data = await response.json();

      setCart(data);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  }

  /*
   * ACTUALIZAR CANTIDAD
   */
  async function updateQuantity(lineId: string, quantity: number) {
    if (quantity <= 0) {
      await removeLine(lineId);
      return;
    }

    const cartId = localStorage.getItem("shopify-cart-id");

    if (!cartId) return;

    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId, lineId, quantity }),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la cantidad");
      }

      const data = await response.json();

      setCart(data);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      console.error("Error actualizando cantidad:", error);
    }
  }

  /*
   * CONVERTIR LÍNEAS
   */
  const lines = useMemo(
    () => cart?.lines.edges.map((edge) => edge.node) ?? [],
    [cart]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      {/* PANEL DEL CARRITO */}
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col overflow-hidden bg-[#FCFAF7] text-[#2C241C] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* CABECERA */}
        <header className="z-20 shrink-0 border-b border-[#E9E2D9] bg-white px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <ShoppingBag
                  size={22}
                  strokeWidth={1.8}
                  className="text-[#8B5E34]"
                />
                <h2
                  id="cart-title"
                  className="text-2xl font-bold leading-tight tracking-tight sm:text-[28px]"
                >
                  Tu carrito
                </h2>
              </div>

              <p className="mt-1.5 text-sm text-[#76695E] sm:text-base">
                {cart?.totalQuantity ?? 0}{" "}
                {(cart?.totalQuantity ?? 0) === 1
                  ? "producto"
                  : "productos"}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar carrito"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#2C241C] transition-colors hover:bg-[#F6F1EA] active:bg-[#E9E2D9]"
            >
              <X size={24} strokeWidth={1.8} />
            </button>
          </div>
        </header>

        {/* LISTA DE PRODUCTOS: DESPLAZAMIENTO INDEPENDIENTE */}
        <div
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-[#FCFAF7]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {loading ? (
            <div className="flex min-h-[220px] items-center justify-center px-6">
              <div className="text-center">
                <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#E9E2D9] border-t-[#8B5E34]" />
                <p className="text-sm text-[#76695E]">
                  Cargando tu carrito...
                </p>
              </div>
            </div>
          ) : lines.length === 0 ? (
            <div className="px-5 py-8 sm:px-6">
              <CartEmpty />
            </div>
          ) : (
            <div className="space-y-0 px-4 py-2 sm:px-6 sm:py-3">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className="border-b border-[#E9E2D9] py-5 last:border-b-0 sm:py-6"
                >
                  <CartItem
                    line={line}
                    onRemove={() => removeLine(line.id)}
                    onDecrease={() =>
                      updateQuantity(line.id, line.quantity - 1)
                    }
                    onIncrease={() =>
                      updateQuantity(line.id, line.quantity + 1)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RESUMEN Y CHECKOUT */}
        {!loading && lines.length > 0 && (
          <div className="shrink-0 border-t border-[#E9E2D9] bg-white shadow-[0_-8px_24px_rgba(44,36,28,0.05)]">
            <CartFooter
              lines={lines}
              checkoutUrl={cart?.checkoutUrl ?? "#"}
              onClose={onClose}
            />
          </div>
        )}

        {!loading && lines.length === 0 && (
          <div className="shrink-0 border-t border-[#E9E2D9] bg-white">
            <CartFooter
              lines={[]}
              checkoutUrl="#"
              onClose={onClose}
            />
          </div>
        )}
      </aside>
    </div>
  );
}
