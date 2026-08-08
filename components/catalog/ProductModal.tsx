"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  images: string[];
  onClose: () => void;
};

export default function ProductModal({
  open,
  images,
  onClose,
}: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (open) setCurrent(0);
  }, [open]);

  if (!open) return null;

  const previous = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6">

      <div className="relative w-full max-w-6xl rounded-2xl bg-white p-6">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-white p-2 shadow"
        >
          <X size={24} />
        </button>

        <div className="relative h-[70vh]">

          <Image
            src={images[current]}
            alt=""
            fill
            className="object-contain"
          />

        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={previous}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg"
            >
              <ChevronRight />
            </button>

            <div className="mt-6 flex justify-center gap-3">

              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border ${
                    current === index
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}

            </div>
          </>
        )}

      </div>

    </div>
  );
}