"use client";

import { ShoppingBag } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8">

      <ShoppingBag
        size={60}
        className="text-gray-300"
      />

      <h3 className="text-xl font-semibold">
        Tu carrito está vacío
      </h3>

      <p className="max-w-xs text-center text-gray-500">
        Añade productos para comenzar tu compra.
      </p>

    </div>
  );
}