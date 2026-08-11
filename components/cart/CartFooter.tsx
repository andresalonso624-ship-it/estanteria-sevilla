"use client";

import { CartLine } from "./CartItem";

type Props = {
  lines: CartLine[];
  checkoutUrl: string;
  onClose: () => void;
};

export default function CartFooter({
  lines,
  checkoutUrl,
  onClose,
}: Props) {
  const subtotal = lines.reduce(
    (total, line) =>
      total +
      Number(line.merchandise.price.amount) *
        line.quantity,
    0
  );

  return (
    <div className="border-t border-gray-200 bg-white p-5 sm:p-6">

      {/* SUBTOTAL */}
      <div className="mb-5 flex items-center justify-between">

        <span className="text-lg font-semibold text-[#111111]">
          Subtotal
        </span>

        <span className="text-3xl font-bold text-[#111111]">
          {subtotal.toFixed(2)} €
        </span>

      </div>

      {/* ENVÍO */}
      <div className="mb-6 flex items-center justify-between text-sm">

        <span className="font-medium text-gray-700">
          Envío
        </span>

        <span className="text-right text-gray-500">
          Calculado en el checkout
        </span>

      </div>

      {/* FINALIZAR */}
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-full items-center justify-center rounded-xl bg-black text-base font-semibold text-white transition duration-300 hover:bg-[#C6922F]"
      >
        Finalizar compra
      </a>

      {/* CONTINUAR */}
      <button
        onClick={onClose}
        className="mt-4 flex h-14 w-full items-center justify-center rounded-xl border border-gray-300 bg-white text-base font-semibold text-[#111111] transition duration-300 hover:border-[#C6922F] hover:bg-[#F8F8F8]"
      >
        Seguir comprando
      </button>

    </div>
  );
}