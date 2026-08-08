"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartContextType = {
  open: boolean;
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(
  null
);

type Props = {
  children: ReactNode;
};

export default function CartProvider({
  children,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  async function refreshCart() {

    try {

      const cartId =
        localStorage.getItem(
          "shopify-cart-id"
        );

      if (!cartId) {

        setCartCount(0);

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

      if (!response.ok) return;

      const cart =
        await response.json();

      setCartCount(
        cart.totalQuantity || 0
      );

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    refreshCart();

  }, []);
    useEffect(() => {

    function updateCart() {

      refreshCart();

    }

    window.addEventListener(
      "cartUpdated",
      updateCart
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCart
      );

    };

  }, []);

  return (

    <CartContext.Provider
      value={{
        open,
        cartCount,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
        refreshCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  const context =
    useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );

  }

  return context;

}