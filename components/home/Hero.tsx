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

  // ============================================================
  // CAMBIO AUTOMÁTICO DE IMAGEN
  // ============================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        return (prev + 1) % heroImages.length;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black">

      {/* ========================================================
          PORTADA
      ========================================================= */}

      <div
        className="
          relative
          h-[720px]
          w-full
          sm:h-[760px]
          lg:h-[780px]
          xl:h-[820px]
        "
      >

        {/* ======================================================
            IMÁGENES
        ======================================================= */}

        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`
              absolute
              inset-0
              transition-opacity
              duration-[1400ms]
              ease-in-out
              ${
                index === currentImage
                  ? "z-[1] opacity-100"
                  : "z-0 opacity-0"
              }
            `}
          >

            <Image
              src={image}
              alt={
                index === 0
                  ? "Mobiliario comercial para tiendas"
                  : "Estantería comercial para tienda de ropa"
              }
              fill
              priority={index === 0}
              sizes="100vw"
              className={`
                object-cover
                object-center
                transition-transform
                duration-[7000ms]
                ease-out
                ${
                  index === currentImage
                    ? "scale-100"
                    : "scale-110"
                }
              `}
            />

          </div>
        ))}


        {/* ======================================================
            CAPA OSCURA GENERAL
        ======================================================= */}

        <div className="absolute inset-0 z-[2] bg-black/20" />


        {/* ======================================================
            DEGRADADO IZQUIERDO
        ======================================================= */}

        <div
          className="
            absolute
            inset-0
            z-[3]
            bg-gradient-to-r
            from-black/75
            via-black/45
            to-black/10
          "
        />


        {/* ======================================================
            DEGRADADO INFERIOR
        ======================================================= */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-[3]
            h-64
            bg-gradient-to-t
            from-black/65
            via-black/20
            to-transparent
          "
        />


        {/* ======================================================
            CONTENIDO PRINCIPAL
        ======================================================= */}

        <div
          className="
            relative
            z-[10]
            mx-auto
            flex
            h-full
            max-w-7xl
            items-center
            px-6
            sm:px-8
            lg:px-10
          "
        >

          <div
            className="
              max-w-[620px]
              text-white
              sm:max-w-[650px]
            "
          >

            {/* ==================================================
                PEQUEÑA LÍNEA
            =================================================== */}

            <div
              className="
                mb-6
                h-1
                w-12
                rounded-full
                bg-[#C6922F]
                sm:w-16
              "
            />


            {/* ==================================================
                ETIQUETA
            =================================================== */}

            <p
              className="
                mb-4
                text-[10px]
                font-bold
                tracking-[0.35em]
                text-[#E0AD4B]
                sm:text-xs
              "
            >
              ESTANTERÍA SEVILLA
            </p>


            {/* ==================================================
                TÍTULO
            =================================================== */}

            <h1
              className="
                font-serif
                text-[42px]
                font-bold
                leading-[0.98]
                tracking-[-0.02em]
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-[76px]
              "
            >
              Equipamiento
              <br />

              comercial
            </h1>


            {/* ==================================================
                SUBTÍTULO
            =================================================== */}

            <h2
              className="
                mt-2
                font-serif
                text-[30px]
                font-bold
                leading-tight
                text-[#D9A13A]
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              para tiendas y negocios
            </h2>


            {/* ==================================================
                DESCRIPCIÓN
            =================================================== */}

            <p
              className="
                mt-6
                max-w-[560px]
                text-sm
                leading-6
                text-white/85
                sm:text-base
                sm:leading-7
                lg:text-lg
                lg:leading-8
              "
            >
              Diseñamos y fabricamos soluciones profesionales
              para comercios, supermercados, tiendas de ropa,
              ferreterías, almacenes y todo tipo de negocios.
            </p>


            {/* ==================================================
                BOTONES
            =================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              {/* CATÁLOGO */}

              <Link
                href="/catalogo"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#C6922F]
                  px-8
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-black/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#A8791F]
                  hover:shadow-xl
                  active:scale-[0.98]
                "
              >
                Ver catálogo
              </Link>


              {/* PRESUPUESTO */}

              <Link
                href="/presupuesto"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/60
                  bg-white/10
                  px-8
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:text-[#111111]
                  active:scale-[0.98]
                "
              >
                Solicitar presupuesto
              </Link>

            </div>

          </div>

        </div>


        {/* ======================================================
            INDICADORES
        ======================================================= */}

        <div
          className="
            absolute
            bottom-8
            left-1/2
            z-[20]
            flex
            -translate-x-1/2
            items-center
            gap-2
          "
        >

          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              aria-label={`Mostrar imagen ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-500
                ${
                  index === currentImage
                    ? "w-10 bg-[#C6922F]"
                    : "w-2 bg-white/60 hover:bg-white"
                }
              `}
            />
          ))}

        </div>


        {/* ======================================================
            NÚMERO DE SLIDE
        ======================================================= */}

        <div
          className="
            absolute
            bottom-7
            right-6
            z-[20]
            hidden
            items-center
            gap-3
            text-white
            sm:flex
            lg:right-10
          "
        >

          <span className="text-sm font-semibold">
            {String(currentImage + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-8 bg-white/50" />

          <span className="text-xs text-white/60">
            {String(heroImages.length).padStart(2, "0")}
          </span>

        </div>

      </div>

    </section>
  );
}