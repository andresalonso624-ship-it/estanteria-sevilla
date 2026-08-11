"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageScale = Math.min(1 + scrollY * 0.00008, 1.08);
  const imageMove = Math.min(scrollY * 0.08, 35);
  const contentMove = Math.min(scrollY * 0.04, 20);
  const contentOpacity = Math.max(1 - scrollY * 0.002, 0.7);

  return (
    <section className="w-full overflow-hidden bg-[#F7F4EE]">

      {/* =====================================================
          CELULAR
      ====================================================== */}
      <div className="block md:hidden">

        {/* Imagen */}
        <div className="relative h-[420px] w-full overflow-hidden">

          <Image
            src="/images/hero/hero.jpg"
            alt="Estantería comercial para tiendas y negocios"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{
              transform: `scale(${imageScale}) translateY(${imageMove}px)`,
              transition: "transform 0.15s linear",
            }}
          />

          {/* Degradado */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F7F4EE] via-[#F7F4EE]/40 to-transparent" />

        </div>

        {/* Tarjeta */}
        <div
          className="relative z-10 mx-4 -mt-16 rounded-[30px] bg-white px-6 pb-8 pt-8 text-center shadow-xl"
          style={{
            transform: `translateY(${contentMove}px)`,
            opacity: contentOpacity,
          }}
        >

          {/* Etiqueta */}
          <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#C6922F]">
            ESTANTERÍA SEVILLA
          </p>

          {/* Título */}
          <h1 className="font-serif text-[32px] font-bold leading-[1.05] text-[#111111]">
            Equipamiento
            <br />
            comercial
            <br />
            <span className="text-[#C6922F]">
              para tiendas y negocios
            </span>
          </h1>

          {/* Descripción */}
          <p className="mx-auto mt-5 max-w-[330px] text-sm leading-6 text-[#334155]">
            Descubre soluciones profesionales para comercios,
            supermercados, tiendas de ropa, ferreterías,
            almacenes y cualquier tipo de negocio.
          </p>

          {/* Botones */}
          <div className="mx-auto mt-7 flex max-w-[330px] flex-col gap-3">

            <Link
              href="/catalogo"
              className="flex h-12 items-center justify-center rounded-xl bg-[#C6922F] text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8791F]"
            >
              Ver catálogo
            </Link>

            <Link
              href="/presupuesto"
              className="flex h-12 items-center justify-center rounded-xl border border-gray-300 bg-white text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C6922F] hover:text-[#C6922F]"
            >
              Solicitar presupuesto
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLET
      ====================================================== */}
      <div className="hidden md:block lg:hidden">

        <div className="relative h-[600px] w-full overflow-hidden">

          <Image
            src="/images/hero/hero.jpg"
            alt="Estantería comercial para tiendas"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{
              transform: `scale(${imageScale}) translateY(${imageMove}px)`,
              transition: "transform 0.15s linear",
            }}
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-8 left-8 right-8">

            <div
              className="max-w-[540px] rounded-[30px] bg-white/95 p-8 shadow-2xl backdrop-blur-sm"
              style={{
                transform: `translateY(${contentMove}px)`,
                opacity: contentOpacity,
              }}
            >

              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#C6922F]">
                ESTANTERÍA SEVILLA
              </p>

              <h1 className="font-serif text-4xl font-bold leading-[1.05] text-[#111111]">
                Equipamiento comercial{" "}
                <span className="text-[#C6922F]">
                  para tiendas y negocios
                </span>
              </h1>

              <p className="mt-4 text-base leading-7 text-[#475569]">
                Soluciones profesionales para comercios,
                supermercados, tiendas y negocios.
              </p>

              <div className="mt-6 flex gap-3">

                <Link
                  href="/catalogo"
                  className="flex-1 rounded-xl bg-[#C6922F] px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8791F]"
                >
                  Ver catálogo
                </Link>

                <Link
                  href="/presupuesto"
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C6922F] hover:text-[#C6922F]"
                >
                  Solicitar presupuesto
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ORDENADOR
      ====================================================== */}
      <div className="hidden lg:block">

        <div className="relative min-h-[680px] w-full overflow-hidden">

          <Image
            src="/images/hero/hero.jpg"
            alt="Estantería comercial para tiendas y negocios"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{
              transform: `scale(${imageScale}) translateY(${imageMove}px)`,
              transition: "transform 0.15s linear",
            }}
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-8">

            <div
              className="max-w-[570px] rounded-[35px] bg-white/95 p-10 shadow-2xl backdrop-blur-sm"
              style={{
                transform: `translateY(${contentMove}px)`,
                opacity: contentOpacity,
              }}
            >

              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#C6922F]">
                ESTANTERÍA SEVILLA
              </p>

              <h1 className="font-serif text-5xl font-bold leading-[1.05] text-[#111111] xl:text-6xl">
                Equipamiento
                <br />
                comercial
                <br />
                <span className="text-[#C6922F]">
                  para tiendas y negocios
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-[#334155]">
                Descubre soluciones profesionales para comercios,
                supermercados, tiendas de ropa, ferreterías,
                almacenes y cualquier tipo de negocio.
              </p>

              <div className="mt-8 flex gap-4">

                <Link
                  href="/catalogo"
                  className="rounded-xl bg-[#C6922F] px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8791F]"
                >
                  Ver catálogo
                </Link>

                <Link
                  href="/presupuesto"
                  className="rounded-xl border border-gray-300 bg-white px-10 py-4 font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C6922F] hover:text-[#C6922F]"
                >
                  Solicitar presupuesto
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}