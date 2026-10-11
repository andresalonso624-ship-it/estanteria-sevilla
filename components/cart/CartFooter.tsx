
"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { CartLine } from "./CartItem";

type Props = {
  lines: CartLine[];
  checkoutUrl: string;
  onClose: () => void;
};

function formatPrice(amount: number, currencyCode = "EUR") {
  if (!Number.isFinite(amount)) return "—";

  try {
    return amount.toLocaleString("es-ES", {
      style: "currency",
      currency: currencyCode,
    });
  } catch {
    return `${amount.toFixed(2)} €`;
  }
}

export default function CartFooter({
  lines,
  checkoutUrl,
  onClose,
}: Props) {
  const subtotal = lines.reduce(
    (total, line) =>
      total +
      Number(line.merchandise.price.amount) * line.quantity,
    0
  );

  const currency =
    lines[0]?.merchandise.price.currencyCode || "EUR";

  const totalUnits = lines.reduce(
    (total, line) => total + line.quantity,
    0
  );

  const hasProducts = lines.length > 0;
  const validCheckoutUrl =
    Boolean(checkoutUrl) && checkoutUrl !== "#";

  return (
    <div className="bg-white px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
      {/* SUBTOTAL */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-[#2C241C]">
            Subtotal
          </h3>

          <p className="mt-1 text-sm text-[#8B8177]">
            {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"}
          </p>
        </div>

        <p className="whitespace-nowrap text-xl font-semibold tracking-tight text-[#2C241C] sm:text-2xl">
          {formatPrice(subtotal, currency)}
        </p>
      </div>

      {/* FINALIZAR COMPRA */}
      {hasProducts && validCheckoutUrl ? (
        <a
          href={checkoutUrl}
          className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-[#8B5E34] px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-[#7A4E24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5E34] focus-visible:ring-offset-2"
        >
          Finalizar compra
          <ArrowRight size={19} />
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-[#8B5E34] px-5 py-3 text-base font-semibold text-white opacity-50"
        >
          Finalizar compra
          <ArrowRight size={19} />
        </button>
      )}

      {/* PAGO SEGURO */}
      <div className="flex items-center justify-center gap-2 py-3.5 text-sm text-[#76695E]">
        <ShieldCheck
          size={16}
          className="shrink-0 text-[#8B5E34]"
        />
        <span>Pago seguro a través de Shopify</span>
      </div>

      {/* SEGUIR COMPRANDO */}
      <button
        type="button"
        onClick={onClose}
        className="flex min-h-[50px] w-full items-center justify-center rounded-xl border border-[#DCCDBD] bg-white px-5 py-3 text-base font-semibold text-[#2C241C] transition hover:bg-[#FCFAF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5E34] focus-visible:ring-offset-2"
      >
        Seguir comprando
      </button>
    </div>
  );
}
