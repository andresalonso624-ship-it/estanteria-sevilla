"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartProvider";

interface Collection {
  id: string;
  title: string;
  handle: string;
}

export default function Header() {
  const {
    open,
    openCart,
    closeCart,
    cartCount,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [catalogOpen, setCatalogOpen] =
    useState(false);

  const [collections, setCollections] =
    useState<Collection[]>([]);

  const [loadingCollections, setLoadingCollections] =
    useState(false);

  /* =====================================================
     CARGAR CATEGORÍAS
  ===================================================== */

  useEffect(() => {
    if (!mobileMenuOpen || !catalogOpen) {
      return;
    }

    if (collections.length > 0) {
      return;
    }

    async function loadCollections() {
      try {
        setLoadingCollections(true);

        const response = await fetch(
          "/api/collections"
        );

        if (!response.ok) {
          throw new Error(
            "No se pudieron cargar las categorías"
          );
        }

        const data =
          await response.json();

        setCollections(data);
      } catch (error) {
        console.error(
          "Error cargando categorías:",
          error
        );
      } finally {
        setLoadingCollections(false);
      }
    }

    loadCollections();
  }, [
    mobileMenuOpen,
    catalogOpen,
    collections.length,
  ]);

  /* =====================================================
     CERRAR MENÚ
  ===================================================== */

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setCatalogOpen(false);
  }

  return (
    <>
      {/* =================================================
          BARRA SUPERIOR
      ================================================= */}

      <div className="hidden bg-[#111111] text-white lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-sm">

          <div className="flex items-center gap-8">

            <span>
              📦 Envíos a toda España
            </span>

            <span>
              ☎ +34 688 097 157
            </span>

            <span>
              ✉ Estanteriasevilla@163.com
            </span>

          </div>

          <span>
            Lunes - Viernes 10:00 - 20:00
          </span>

        </div>
      </div>


      {/* =================================================
          HEADER PRINCIPAL
      ================================================= */}

      <header className="sticky top-0 z-[999] border-b border-gray-200 bg-white shadow-sm">

        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">

          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMobileMenu}
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
              MENÚ ORDENADOR
          ================================================== */}

          <nav className="hidden lg:block">

            <ul className="flex items-center gap-10 text-sm font-semibold uppercase">

              <li>
                <Link
                  href="/"
                  className="border-b-2 border-[#C6922F] pb-1 text-[#C6922F]"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/catalogo"
                  className="transition hover:text-[#C6922F]"
                >
                  Catálogo
                </Link>
              </li>

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


            {/* MENÚ MÓVIL */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              aria-expanded={
                mobileMenuOpen
              }
              onClick={() => {
                const newState =
                  !mobileMenuOpen;

                setMobileMenuOpen(
                  newState
                );

                if (!newState) {
                  setCatalogOpen(false);
                }
              }}
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


        {/* =================================================
            MENÚ MÓVIL
        ================================================== */}

        {mobileMenuOpen && (

          <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">

            <nav className="px-5 py-3">

              <div className="flex flex-col">

                {/* INICIO */}

                <Link
                  href="/"
                  onClick={
                    closeMobileMenu
                  }
                  className="
                    border-b
                    border-gray-100
                    py-4
                    text-sm
                    font-semibold
                    uppercase
                    text-[#C6922F]
                  "
                >
                  Inicio
                </Link>


                {/* =================================================
                    CATÁLOGO
                ================================================== */}

                <div className="border-b border-gray-100">

                  <button
                    type="button"
                    onClick={() =>
                      setCatalogOpen(
                        !catalogOpen
                      )
                    }
                    aria-expanded={
                      catalogOpen
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      uppercase
                      text-[#111111]
                    "
                  >

                    <span>
                      Catálogo
                    </span>

                    <ChevronDown
                      size={19}
                      className={`
                        transition-transform
                        ${
                          catalogOpen
                            ? "rotate-180 text-[#C6922F]"
                            : ""
                        }
                      `}
                    />

                  </button>


                  {/* =================================================
                      CATEGORÍAS
                  ================================================== */}

                  {catalogOpen && (

                    <div className="mb-3 overflow-hidden rounded-2xl border border-gray-100 bg-[#FCFAF7]">

                      {/* TODOS */}

                      <Link
                        href="/catalogo"
                        onClick={
                          closeMobileMenu
                        }
                        className="
                          flex
                          items-center
                          border-b
                          border-gray-200
                          px-4
                          py-3.5
                          text-sm
                          font-semibold
                          text-[#C6922F]
                        "
                      >
                        Todos los productos
                      </Link>


                      {/* CATEGORÍAS */}

                      {loadingCollections ? (

                        <div className="px-4 py-5 text-sm text-gray-500">
                          Cargando categorías...
                        </div>

                      ) : collections.length === 0 ? (

                        <div className="px-4 py-5 text-sm text-gray-500">
                          No hay categorías
                          disponibles.
                        </div>

                      ) : (

                        collections.map(
                          (collection) => (

                            <Link
                              key={
                                collection.id
                              }
                              href={`/catalogo?categoria=${encodeURIComponent(
                                collection.handle
                              )}`}
                              onClick={
                                closeMobileMenu
                              }
                              className="
                                flex
                                items-center
                                border-b
                                border-gray-200
                                px-4
                                py-3.5
                                text-sm
                                font-medium
                                text-[#111111]
                                last:border-b-0
                                hover:bg-white
                                hover:text-[#C6922F]
                              "
                            >
                              {
                                collection.title
                              }
                            </Link>

                          )
                        )

                      )}

                    </div>

                  )}

                </div>


                {/* PRESUPUESTO */}

                <Link
                  href="/presupuesto"
                  onClick={
                    closeMobileMenu
                  }
                  className="
                    border-b
                    border-gray-100
                    py-4
                    text-sm
                    font-semibold
                    uppercase
                    text-[#111111]
                  "
                >
                  Presupuesto
                </Link>


                {/* BUSCAR */}

                <Link
                  href="/catalogo"
                  onClick={
                    closeMobileMenu
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    py-4
                    text-sm
                    font-semibold
                    uppercase
                    text-[#111111]
                  "
                >
                  <Search size={18} />

                  Buscar productos

                </Link>

              </div>

            </nav>

          </div>

        )}

      </header>


      {/* =================================================
          CARRITO
      ================================================== */}

      <CartDrawer
        open={open}
        onClose={closeCart}
      />

    </>
  );
}