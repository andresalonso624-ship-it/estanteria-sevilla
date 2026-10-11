
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type CartContextType = {
  open: boolean;
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function CartProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = useCallback(async () => {
    try {
      const cartId = localStorage.getItem("shopify-cart-id");

      if (!cartId) {
        setCartCount(0);
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
        console.error(
          "No se pudo actualizar el contador del carrito."
        );
        return;
      }

      const cart = await response.json();

      if (cart.error) {
        console.error("Error al consultar el carrito:", cart.error);
        return;
      }

      setCartCount(Number(cart.totalQuantity) || 0);
    } catch (error) {
      console.error("Error actualizando el carrito:", error);
    }
  }, []);

  useEffect(() => {
    void refreshCart();

    function handleCartUpdated() {
      void refreshCart();
    }

    window.addEventListener("cartUpdated", handleCartUpdated);

    window.addEventListener("storage", handleCartUpdated);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );

      window.removeEventListener("storage", handleCartUpdated);
    };
  }, [refreshCart]);

  const openCart = useCallback(() => {
    setOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        open,
        cartCount,
        openCart,
        closeCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider."
    );
  }

  return context;
}
