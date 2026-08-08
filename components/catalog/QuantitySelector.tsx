"use client";

type Props = {
  quantity: number;
  setQuantity: (value: number) => void;
};

export default function QuantitySelector({
  quantity,
  setQuantity,
}: Props) {
  return (
    <div className="mt-4">

      <p className="mb-2 text-sm font-semibold text-gray-700">
        Cantidad
      </p>

      <div className="flex w-36 items-center justify-between rounded-xl border">

        <button
          onClick={() =>
            quantity > 1 && setQuantity(quantity - 1)
          }
          className="px-4 py-3 text-xl hover:bg-gray-100"
        >
          −
        </button>

        <span className="font-semibold">
          {quantity}
        </span>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
          className="px-4 py-3 text-xl hover:bg-gray-100"
        >
          +
        </button>

      </div>

    </div>
  );
}