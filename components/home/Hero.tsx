"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F4EE]">

      {/* =========================
          VERSIÓN CELULAR
      ========================== */}

      <div className="block md:hidden">

        {/* Imagen superior */}

        <div className="relative h-[430px] w-full">

          <Image
            src="/images/hero/hero.jpg"
            alt="Estantería comercial para tiendas y negocios"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Degradado suave inferior */}

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F7F4EE] to-transparent" />

        </div>

        {/* Tarjeta de contenido */}

        <div className="relative z-10 mx-4 -mt-20 rounded-[36px] bg-white px-6 pb-7 pt-8 shadow-xl">

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

          <p className="mt-5 text-sm leading-6 text-[#334155]">
            Descubre soluciones profesionales para comercios,
            supermercados, tiendas de ropa, ferreterías,
            almacenes y cualquier tipo de negocio.
          </p>

          {/* Botones */}

          <div className="mt-6 flex flex-col gap-2">

            <Link
              href="/catalogo"
              className="flex h-11 items-center justify-center rounded-md bg-[#C6922F] text-sm font-semibold text-white transition hover:bg-[#A8791F]"
            >
              Ver catálogo
            </Link>

            <Link
              href="/contacto"
              className="flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-[#111111] transition hover:border-[#C6922F]"
            >
              Contactar
            </Link>

          </div>

        </div>

      </div>


      {/* =========================
          TABLET
      ========================== */}

      <div className="hidden md:block lg:hidden">

        <div className="relative h-[600px] w-full">

          <Image
            src="/images/hero/hero.jpg"
            alt="Estantería comercial"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-10 left-8 max-w-[520px] rounded-[30px] bg-white p-8 shadow-2xl">

            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#C6922F]">
              ESTANTERÍA SEVILLA
            </p>

            <h1 className="font-serif text-4xl font-bold leading-tight text-[#111111]">
              Equipamiento comercial{" "}
              <span className="text-[#C6922F]">
                para tiendas y negocios
              </span>
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Soluciones profesionales para comercios,
              supermercados, tiendas y negocios.
            </p>

            <div className="mt-6 flex gap-3">

              <Link
                href="/catalogo"
                className="flex-1 rounded-md bg-[#C6922F] px-6 py-3 text-center font-semibold text-white"
              >
                Ver catálogo
              </Link>

              <Link
                href="/contacto"
                className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-center font-semibold"
              >
                Contactar
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          COMPUTADOR
      ========================== */}

      <div className="hidden lg:block">

        <div className="relative min-h-[680px] w-full">

          <Image
            src="/images/hero/hero.jpg"
            alt="Estantería comercial para tiendas y negocios"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Oscurecimiento muy suave */}

          <div className="absolute inset-0 bg-black/5" />

          {/* Contenido */}

          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-8">

            <div className="max-w-[570px] rounded-[35px] bg-white/95 p-10 shadow-2xl backdrop-blur-sm">

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
                  className="rounded-md bg-[#C6922F] px-10 py-4 font-semibold text-white transition hover:bg-[#A8791F]"
                >
                  Ver catálogo
                </Link>

                <Link
                  href="/contacto"
                  className="rounded-md border border-gray-300 bg-white px-10 py-4 font-semibold text-[#111111] transition hover:border-[#C6922F] hover:text-[#C6922F]"
                >
                  Contactar
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}