
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
    <section className="relative w-full overflow-hidden bg-[#17130F]">
      <div className="relative h-[520px] w-full overflow-hidden sm:h-[550px] lg:h-[590px] xl:h-[610px]">
        {/* IMÁGENES DEL CARRUSEL */}
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
                  ? "Equipamiento comercial para tiendas"
                  : index === 1
                    ? "Mobiliario y expositores comerciales"
                    : "Soluciones de exposición para negocios"
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

        {/* CAPA OSCURA PARA MEJORAR LA LECTURA */}
        <div className="absolute inset-0 z-20 bg-black/15" />

        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/75 via-black/45 via-55% to-black/5" />

        <div className="absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-black/35 to-transparent" />

        {/* CONTENIDO */}
        <div className="relative z-30 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
          <div className="max-w-[560px] text-white">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 sm:text-xs">
              Estantería Sevilla
            </p>

            <div className="mb-5 h-[3px] w-14 rounded-full bg-[#C6922F]" />

            <h1 className="font-serif text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] sm:text-[44px] md:text-[50px] lg:text-[56px]">
              Equipamiento comercial
              <span className="mt-2 block text-[26px] font-medium leading-tight tracking-[-0.02em] text-[#E5B75D] sm:text-[32px] lg:text-[36px]">
                para tiendas y negocios
              </span>
            </h1>

            <p className="mt-5 max-w-[460px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              Soluciones de mobiliario comercial para organizar,
              exponer y aprovechar mejor cada espacio.
            </p>

            {/* BOTONES */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#C6922F] px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#A8791F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Ver catálogo
                <span className="ml-3" aria-hidden="true">→</span>
              </Link>

              <Link
                href="/presupuesto"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/70 bg-black/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#2C241C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Solicitar presupuesto
              </Link>
            </div>
          </div>
        </div>

        {/* INDICADORES DEL CARRUSEL */}
        <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              aria-label={`Mostrar imagen ${index + 1}`}
              aria-current={index === currentImage ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "w-7 bg-[#C6922F]"
                  : "w-2 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* CONTADOR */}
        <div className="absolute bottom-5 right-6 z-40 hidden items-center gap-3 text-white sm:flex lg:right-10">
          <span className="text-xs font-semibold">
            {String(currentImage + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-7 bg-white/60" />

          <span className="text-[10px] text-white/70">
            {String(heroImages.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
