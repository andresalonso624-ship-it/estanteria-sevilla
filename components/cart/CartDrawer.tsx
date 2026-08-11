"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

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

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);

  /*
   * CARGAR CARRITO
   */
  async function loadCart(showLoading = true) {
    if (showLoading) {
      setLoading(true);
    }

    try {
      const cartId = localStorage.getItem(
        "shopify-cart-id"
      );

      if (!cartId) {
        setCart(null);
        return;
      }

      const response = await fetch("/api/cart/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "No se pudo cargar el carrito"
        );
      }

      const data = await response.json();

      if (data.error) {
        console.error(
          "Error del carrito:",
          data.error
        );

        setCart(null);
        return;
      }

      setCart(data);
    } catch (error) {
      console.error(
        "Error cargando carrito:",
        error
      );
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }

  /*
   * ABRIR CARRITO
   */
  useEffect(() => {
    if (!open) return;

    loadCart(true);

    function refresh() {
      loadCart(false);
    }

    window.addEventListener(
      "cartUpdated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        refresh
      );
    };
  }, [open]);

  /*
   * ELIMINAR PRODUCTO
   */
  async function removeLine(lineId: string) {
    const cartId = localStorage.getItem(
      "shopify-cart-id"
    );

    if (!cartId) return;

    try {
      const response = await fetch(
        "/api/cart/remove",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartId,
            lineId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "No se pudo eliminar el producto"
        );
      }

      const data = await response.json();

      setCart(data);
    } catch (error) {
      console.error(
        "Error eliminando producto:",
        error
      );
    }
  }

  /*
   * ACTUALIZAR CANTIDAD
   */
  async function updateQuantity(
    lineId: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      await removeLine(lineId);
      return;
    }

    const cartId = localStorage.getItem(
      "shopify-cart-id"
    );

    if (!cartId) return;

    try {
      const response = await fetch(
        "/api/cart/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartId,
            lineId,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "No se pudo actualizar la cantidad"
        );
      }

      const data = await response.json();

      setCart(data);
    } catch (error) {
      console.error(
        "Error actualizando cantidad:",
        error
      );
    }
  }

  /*
   * CONVERTIR LÍNEAS
   */
  const lines = useMemo(
    () =>
      cart?.lines.edges.map(
        (edge) => edge.node
      ) ?? [],
    [cart]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50"
      style={{
        opacity: 1,
      }}
    >
      {/* PANEL DEL CARRITO */}

      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-white text-[#111111] shadow-2xl"
        style={{
          opacity: 1,
          isolation: "isolate",
        }}
      >
        {/* HEADER */}

        <div
          className="relative z-20 shrink-0 border-b border-gray-200 bg-white px-5 py-5 sm:p-6"
          style={{
            opacity: 1,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[28px] font-bold leading-tight text-[#111111] opacity-100">
                Carrito
              </h2>

              <p className="mt-1 text-[16px] font-medium text-gray-600 opacity-100">
                {cart?.totalQuantity ?? 0}{" "}
                {cart?.totalQuantity === 1
                  ? "producto"
                  : "productos"}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar carrito"
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 active:bg-gray-200"
            >
              <X
                size={25}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        {/* CONTENIDO */}

        <div
          className="relative z-10 min-h-0 flex-1 overflow-y-auto bg-white text-[#111111]"
          style={{
            opacity: 1,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {loading ? (
            <div className="flex h-full min-h-[300px] items-center justify-center bg-white">
              <p className="text-[16px] font-medium text-gray-600">
                Cargando carrito...
              </p>
            </div>
          ) : lines.length === 0 ? (
            <div className="bg-white">
              <CartEmpty />
            </div>
          ) : (
            <div
              className="space-y-5 bg-white p-5 sm:p-6"
              style={{
                opacity: 1,
              }}
            >
              {lines.map((line) => (
                <CartItem
                  key={line.id}
                  line={line}
                  onRemove={() =>
                    removeLine(line.id)
                  }
                  onDecrease={() =>
                    updateQuantity(
                      line.id,
                      line.quantity - 1
                    )
                  }
                  onIncrease={() =>
                    updateQuantity(
                      line.id,
                      line.quantity + 1
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="relative z-30 shrink-0 bg-white"
          style={{
            opacity: 1,
          }}
        >
          <CartFooter
            lines={lines}
            checkoutUrl={
              cart?.checkoutUrl ?? "#"
            }
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}