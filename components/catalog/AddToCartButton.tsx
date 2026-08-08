"use client";

import { ShoppingCart } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function AddToCartButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C6922F]"
    >
      <ShoppingCart size={22} />

      Añadir al carrito
    </button>
  );
}