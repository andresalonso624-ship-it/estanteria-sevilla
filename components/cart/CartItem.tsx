"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
    };
    product: {
      title: string;
      featuredImage?: {
        url: string;
      };
    };
  };
};

type Props = {
  line: CartLine;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  line,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex gap-4 border-b pb-5">

      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gray-100">

        {line.merchandise.product.featuredImage && (
          <Image
            src={line.merchandise.product.featuredImage.url}
            alt={line.merchandise.product.title}
            fill
            className="object-contain p-2"
          />
        )}

      </div>

      <div className="flex flex-1 flex-col">

        <h3 className="font-semibold">
          {line.merchandise.product.title}
        </h3>

        <p className="text-sm text-gray-500">
          {line.merchandise.title}
        </p>

        <span className="mt-2 text-lg font-bold">
          {Number(
            line.merchandise.price.amount
          ).toFixed(2)} €
        </span>

      </div>

      <div className="flex flex-col items-end justify-between">

        <button
          onClick={onRemove}
          className="rounded-lg p-2 transition hover:bg-red-50"
        >
          <Trash2
            size={18}
            className="text-red-500"
          />
        </button>

        <div className="flex items-center gap-3 rounded-lg border px-2 py-1">

          <button
            onClick={onDecrease}
            className="p-1"
          >
            <Minus size={15} />
          </button>

          <span className="w-6 text-center font-semibold">
            {line.quantity}
          </span>

          <button
            onClick={onIncrease}
            className="p-1"
          >
            <Plus size={15} />
          </button>

        </div>

      </div>

    </div>
  );
}