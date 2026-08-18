"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  "/images/hero/producto-1.png",
  "/images/hero/producto-2.png",
  "/images/hero/producto-3.png",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative h-[680px] w-full overflow-hidden sm:h-[720px] lg:h-[760px] xl:h-[800px]">

        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              index === currentImage
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={
                index === 0
                  ? "Mobiliario comercial para tiendas"
                  : "Estantería comercial para tiendas"
              }
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                index === currentImage ? "scale-100" : "scale-105"
              }`}
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 bg-black/5" />

        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-20 h-40 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="relative z-30 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-10">
          <div className="max-w-[600px] text-white sm:max-w-[650px]">

            <div className="mb-5 h-1 w-12 rounded-full bg-[#C6922F] sm:w-0" />

            <p className="mb-4 text-[10px] font-bold tracking-[0.35em] text-[#fdffff] sm:text-xs">
              ESTANTERÍA SEVILLA
            </p>

            <div className="mb-5 h-1 w-12 rounded-full bg-[#C6922F] sm:w-50" />

            <h1 className="font-serif text-[40px] font-bold leading-[1] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[74px]">
              Equipamiento
              <br />
              comercial
            </h1>

            <h2 className="mt-2 font-serif text-[28px] font-bold leading-tight text-[#D9A13A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] sm:text-4xl md:text-5xl lg:text-6xl">
              para tiendas y negocios
            </h2>

            <p className="mt-6 max-w-[550px] text-sm leading-6 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)] sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              Soluciones profesionales
              para comercios, supermercados, tiendas de ropa,
              ferreterías, almacenes y todo tipo de negocios.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#C6922F] px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#A8791F] active:scale-[0.99]"
              >
                Ver catálogo
              </Link>

              <Link
                href="/presupuesto"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/70 bg-white/10 px-10 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#111111] active:scale-[0.99]"
              >
                Solicitar presupuesto
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              aria-label={`Mostrar imagen ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentImage
                  ? "w-9 bg-[#C6922F]"
                  : "w-2 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 z-40 hidden items-center gap-3 text-white sm:flex lg:right-10">
          <span className="text-sm font-semibold">
            {String(currentImage + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-8 bg-white/60" />

          <span className="text-xs text-white/70">
            {String(heroImages.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
}