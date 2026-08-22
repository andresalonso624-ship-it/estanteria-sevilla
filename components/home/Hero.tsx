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

      {/* =====================================================
          PORTADA
      ====================================================== */}

      <div
        className="
          relative
          h-[540px]
          w-full
          overflow-hidden
          sm:h-[560px]
          lg:h-[580px]
          xl:h-[600px]
        "
      >

        {/* ===================================================
            IMÁGENES
        ==================================================== */}

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
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }
            `}
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
              className={`
                object-cover
                object-center
                transition-transform
                duration-[7000ms]
                ease-out
                ${
                  index === currentImage
                    ? "scale-100"
                    : "scale-105"
                }
              `}
            />
          </div>
        ))}

        {/* ===================================================
            CAPA MUY SUAVE
        ==================================================== */}

        <div className="absolute inset-0 z-20 bg-black/5" />

        {/* ===================================================
            DEGRADADO IZQUIERDO
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            bg-gradient-to-r
            from-black/55
            via-black/25
            via-45%
            to-transparent
          "
        />

        {/* ===================================================
            DEGRADADO INFERIOR
        ==================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-20
            h-32
            bg-gradient-to-t
            from-black/25
            to-transparent
          "
        />

        {/* ===================================================
            CONTENIDO
        ==================================================== */}

        <div
          className="
            relative
            z-30
            mx-auto
            flex
            h-full
            max-w-7xl
            items-center
            px-6
            sm:px-8
            lg:px-10
            xl:px-12
          "
        >

          <div
            className="
              max-w-[500px]
              text-white
              sm:max-w-[540px]
              lg:max-w-[570px]
            "
          >

            {/* LÍNEA */}

            <div
              className="
                mb-4
                h-1
                w-0
                rounded-full
                bg-[#C6922F]
                sm:w-0
              "
            />

            {/* ETIQUETA */}

            <p
              className="
                mb-3
                text-[12px]
                font-bold
                tracking-[0.32em]
                text white
                sm:text-xs
              "
            >
              ESTANTERÍA SEVILLA
            </p>

            <div
              className="
                mb-8
                h-1
                w-50
                rounded-full
                bg-[#C6922F]
                sm:w-50
              "
            />
            {/* =================================================
                TÍTULO
            ================================================== */}

            <h1
              className="
                font-serif
                text-[34px]
                font-bold
                leading-[1.02]
                tracking-tight
                text-white
                drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)]
                sm:text-[40px]
                md:text-[46px]
                lg:text-[52px]
                xl:text-[56px]
              "
            >
              Equipamiento
              <br />
              comercial
            </h1>

            {/* SUBTÍTULO */}

            <h2
              className="
                mt-1
                font-serif
                text-[24px]
                font-bold
                leading-tight
                text-[#D9A13A]
                drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]
                sm:text-[28px]
                md:text-[32px]
                lg:text-[36px]
              "
            >
              para tiendas y negocios
            </h2>

            {/* =================================================
                DESCRIPCIÓN
            ================================================== */}

            <p
              className="
                mt-4
                max-w-[510px]
                text-[13px]
                leading-6
                text-white/95
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]
                sm:text-sm
                sm:leading-6
                lg:text-base
                lg:leading-7
              "
            >
             Equipamiento comercial diseñado para ayudarte a organizar, mostrar y aprovechar mejor tu espacio.
            </p>

            {/* =================================================
                BOTONES
            ================================================== */}

            <div
              className="
                mt-6
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <Link
                href="/catalogo"
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#C6922F]
                  px-7
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#A8791F]
                  active:scale-[0.98]
                "
              >
                Ver catálogo
              </Link>

              <Link
                href="/presupuesto"
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/70
                  bg-white/10
                  px-7
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
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

        {/* ===================================================
            INDICADORES
        ==================================================== */}

        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-40
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
                    ? "w-8 bg-[#C6922F]"
                    : "w-2 bg-white/70 hover:bg-white"
                }
              `}
            />
          ))}
        </div>

        {/* ===================================================
            NÚMERO
        ==================================================== */}

        <div
          className="
            absolute
            bottom-5
            right-6
            z-40
            hidden
            items-center
            gap-3
            text-white
            sm:flex
            lg:right-10
          "
        >
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