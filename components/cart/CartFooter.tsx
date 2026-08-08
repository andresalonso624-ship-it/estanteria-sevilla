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
    <div className="border-t bg-white p-6">

      <div className="mb-6 flex items-center justify-between">

        <span className="text-lg font-semibold">
          Subtotal
        </span>

        <span className="text-2xl font-bold">
          {subtotal.toFixed(2)} €
        </span>

      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">

        <span>Envío</span>

        <span>Calculado en el checkout</span>

      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C6922F]"
      >
        Finalizar compra
      </a>

      <button
        onClick={onClose}
        className="mt-4 w-full rounded-xl border border-gray-300 py-4 font-semibold transition hover:bg-gray-100"
      >
        Seguir comprando
      </button>

    </div>
  );
}