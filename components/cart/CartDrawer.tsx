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
  async function loadCart(
    showLoading = true
  ) {
    if (showLoading) {
      setLoading(true);
    }

    try {
      const cartId =
        localStorage.getItem(
          "shopify-cart-id"
        );

      if (!cartId) {
        setCart(null);
        return;
      }

      const response = await fetch(
        "/api/cart/get",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartId,
          }),
        }
      );

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

    /*
     * Cuando otro componente añade un producto,
     * actualizamos el carrito.
     */
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
  async function removeLine(
    lineId: string
  ) {
    const cartId =
      localStorage.getItem(
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

      /*
       * IMPORTANTE:
       * No hacemos cartUpdated aquí.
       *
       * Ya tenemos la respuesta actualizada
       * de Shopify.
       */
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

    const cartId =
      localStorage.getItem(
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

      /*
       * Shopify ya nos devuelve
       * el carrito actualizado.
       */
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
    <div className="fixed inset-0 z-[9999] bg-black/50">

      {/* PANEL */}

      <div className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              Carrito
            </h2>

            <p className="text-sm text-gray-500">
              {cart?.totalQuantity ?? 0} productos
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
            aria-label="Cerrar carrito"
          >
            <X size={22} />
          </button>

        </div>

        {/* CONTENIDO */}

        <div className="flex-1 overflow-y-auto">

          {loading ? (

            <div className="flex h-full items-center justify-center">

              <p className="text-gray-500">
                Cargando carrito...
              </p>

            </div>

          ) : lines.length === 0 ? (

            <CartEmpty />

          ) : (

            <div className="space-y-5 p-6">

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

        <CartFooter
          lines={lines}
          checkoutUrl={
            cart?.checkoutUrl ?? "#"
          }
          onClose={onClose}
        />

      </div>

    </div>
  );
}