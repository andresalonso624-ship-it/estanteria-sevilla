"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartProvider";

export default function Header() {
  const {
    open,
    openCart,
    closeCart,
    cartCount,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* =====================================================
          BARRA SUPERIOR
          Solo ordenador
      ====================================================== */}

      <div className="hidden bg-[#111111] text-white lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-sm">

          <div className="flex items-center gap-8">

            <span>📦 Envíos a toda España</span>

            <span>☎ +34 954 123 456</span>

            <span>✉ info@estanteriasevilla.com</span>

          </div>

          <span>
            Lunes - Viernes 09:00 - 18:00
          </span>

        </div>
      </div>


      {/* =====================================================
          HEADER PRINCIPAL
      ====================================================== */}

      <header className="sticky top-0 z-[999] border-b border-gray-200 bg-white shadow-sm">

        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">


          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex shrink-0 items-center"
          >

            <Image
              src="/images/logo/logo.png"
              alt="Estantería Sevilla"
              width={150}
              height={55}
              priority
              className="h-auto w-[125px] object-contain sm:w-[145px] lg:w-[150px]"
            />

          </Link>


          {/* =================================================
              NAVEGACIÓN ORDENADOR
          ================================================== */}

          <nav className="hidden lg:block">

            <ul className="flex items-center gap-10 text-sm font-semibold uppercase">

              {/* INICIO */}

              <li>

                <Link
                  href="/"
                  className="border-b-2 border-[#C6922F] pb-1 text-[#C6922F]"
                >
                  Inicio
                </Link>

              </li>


              {/* CATÁLOGO */}

              <li>

                <Link
                  href="/catalogo"
                  className="transition hover:text-[#C6922F]"
                >
                  Catálogo
                </Link>

              </li>


              {/* PRESUPUESTO */}

              <li>

                <Link
                  href="/presupuesto"
                  className="transition hover:text-[#C6922F]"
                >
                  Presupuesto
                </Link>

              </li>

            </ul>

          </nav>


          {/* =================================================
              ICONOS
          ================================================== */}

          <div className="flex items-center gap-4 sm:gap-5">


            {/* BUSCAR */}

            <Link
              href="/catalogo"
              aria-label="Buscar productos"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 hover:text-[#C6922F]"
            >

              <Search
                size={22}
                strokeWidth={1.8}
              />

            </Link>


            {/* CARRITO */}

            <button
              type="button"
              aria-label="Abrir carrito"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 hover:text-[#C6922F]"
            >

              <ShoppingCart
                size={22}
                strokeWidth={1.8}
              />

              {/* CONTADOR */}

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C6922F]
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {cartCount}
              </span>

            </button>


            {/* =================================================
                MENÚ CELULAR
            ================================================== */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 hover:text-[#C6922F] lg:hidden"
            >

              {mobileMenuOpen ? (
                <X
                  size={25}
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  size={25}
                  strokeWidth={1.8}
                />
              )}

            </button>

          </div>

        </div>


        {/* =====================================================
            MENÚ DESPLEGABLE CELULAR
        ====================================================== */}

        {mobileMenuOpen && (

          <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">

            <nav className="px-5 py-5">

              <div className="flex flex-col">


                {/* INICIO */}

                <Link
                  href="/"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="border-b border-gray-100 py-4 text-sm font-semibold uppercase text-[#C6922F]"
                >
                  Inicio
                </Link>


                {/* CATÁLOGO */}

                <Link
                  href="/catalogo"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="border-b border-gray-100 py-4 text-sm font-semibold uppercase text-[#111111] transition hover:text-[#C6922F]"
                >
                  Catálogo
                </Link>


                {/* PRESUPUESTO */}

                <Link
                  href="/presupuesto"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="border-b border-gray-100 py-4 text-sm font-semibold uppercase text-[#111111] transition hover:text-[#C6922F]"
                >
                  Presupuesto
                </Link>


                {/* BUSCAR */}

                <Link
                  href="/catalogo"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex items-center gap-3 py-4 text-sm font-semibold uppercase text-[#111111]"
                >

                  <Search size={18} />

                  Buscar productos

                </Link>

              </div>

            </nav>

          </div>

        )}

      </header>


      {/* =====================================================
          CARRITO
      ====================================================== */}

      <CartDrawer
        open={open}
        onClose={closeCart}
      />

    </>
  );
}