
"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SearchProduct = {
  id: string;
  handle: string;
  title: string;
  image: string | null;
  price: string | null;
  currency: string;
  availableForSale: boolean;
};

export default function ProductSearch() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const query = term.trim();

    if (!open || query.length < 2) {
      setProducts([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal, cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Error al buscar productos");
        }

        setProducts(data.products ?? []);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setProducts([]);
        setError("No se pudo realizar la búsqueda.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [term, open]);

  function closeSearch() {
    setOpen(false);
    setTerm("");
    setProducts([]);
    setError("");
  }

  function formatPrice(price: string | null, currency: string) {
    if (price === null || !Number.isFinite(Number(price))) {
      return "Consultar precio";
    }

    try {
      return Number(price).toLocaleString("es-ES", {
        style: "currency",
        currency: currency || "EUR",
      });
    } catch {
      return `${price} €`;
    }
  }

  return (
    <div className="relative">
      {/* LUPA */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Cerrar búsqueda" : "Buscar productos"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#111111] transition hover:bg-gray-100 hover:text-[#C6922F]"
      >
        {open ? <X size={21} /> : <Search size={22} strokeWidth={1.8} />}
      </button>

      {/* BUSCADOR COMPACTO */}
      {open && (
        <div className="fixed left-3 right-3 top-[100px] z-[2000] max-h-[calc(100dvh-116px)] overflow-hidden rounded-xl border border-[#E9E2D9] bg-white p-3 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:max-h-none sm:w-[400px] sm:translate-x-0">
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="flex items-center gap-2 rounded-lg border border-[#E9E2D9] bg-[#FCFAF7] px-3"
          >
            <Search size={18} className="shrink-0 text-[#8B5E34]" />

            <input
              ref={inputRef}
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#2C241C] outline-none placeholder:text-gray-500"
            />

            {term && (
              <button
                type="button"
                onClick={() => setTerm("")}
                aria-label="Borrar búsqueda"
                className="text-xs text-[#8B5E34]"
              >
                Borrar
              </button>
            )}
          </form>

          <div className="mt-2 max-h-[min(320px,calc(100dvh-300px))] overflow-y-auto sm:max-h-[320px]">
            {term.trim().length < 2 ? (
              <p className="px-2 py-3 text-xs text-gray-500">
                Escribe al menos dos letras.
              </p>
            ) : loading ? (
              <p className="px-2 py-4 text-sm text-gray-500">
                Buscando...
              </p>
            ) : error ? (
              <p role="alert" className="px-2 py-3 text-sm text-red-600">
                {error}
              </p>
            ) : products.length === 0 ? (
              <p className="px-2 py-4 text-sm text-gray-500">
                No encontramos productos. Prueba otra palabra.
              </p>
            ) : (
              <div className="divide-y divide-[#F0EBE4]">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/producto/${encodeURIComponent(product.handle)}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-[#FCFAF7]"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#F7F5F1]">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                          Sin foto
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-[#2C241C]">
                        {product.title}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#8B5E34]">
                        {formatPrice(product.price, product.currency)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 border-t border-[#E9E2D9] pt-2">
            <Link
              href="/catalogo"
              onClick={closeSearch}
              className="block px-2 py-2 text-sm font-semibold text-[#8B5E34] hover:underline"
            >
              Ver todo el catálogo →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
