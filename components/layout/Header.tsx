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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

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

        const response = await fetch("/api/collections");

        if (!response.ok) {
          throw new Error(
            "No se pudieron cargar las categorías"
          );
        }

        const data = await response.json();

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

  /* =====================================================
     BLOQUEAR SCROLL DEL FONDO CUANDO EL MENÚ ESTÁ ABIERTO
  ===================================================== */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

      <header
        className="
          sticky top-0 z-[999]
          border-b border-gray-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            mx-auto flex h-[74px]
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:h-24
            lg:px-8
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center"
          >
            <Image
              src="/images/logo/logo.png"
              alt="Estantería Sevilla"
              width={240}
              height={90}
              priority
              className="
                h-auto
                w-[170px]
                rounded-md
                bg-white
                px-2
                py-1
                object-contain
                sm:w-[190px]
                lg:w-[220px]
                lg:bg-transparent
                lg:px-0
                lg:py-0
              "
            />
          </Link>

          {/* =================================================
              MENÚ ORDENADOR
          ================================================== */}

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10 text-sm font-semibold uppercase">

              {/* INICIO */}

              <li>
                <Link
                  href="/"
                  className="
                    border-b-2
                    border-[#C6922F]
                    pb-1
                    text-[#C6922F]
                  "
                >
                  Inicio
                </Link>
              </li>

              {/* CATÁLOGO */}

              <li>
                <Link
                  href="/catalogo"
                  className="
                    text-[#111111]
                    transition
                    hover:text-[#C6922F]
                  "
                >
                  Catálogo
                </Link>
              </li>

              {/* PRESUPUESTO */}

              <li>
                <Link
                  href="/presupuesto"
                  className="
                    text-[#111111]
                    transition
                    hover:text-[#C6922F]
                  "
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

            {/* =================================================
                BUSCAR
            ================================================= */}

            <Link
              href="/catalogo"
              aria-label="Buscar productos"
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                text-[#111111]
                transition
                hover:bg-gray-100
                hover:text-[#C6922F]
              "
            >
              <Search
                size={22}
                strokeWidth={1.8}
              />
            </Link>

            {/* =================================================
                CARRITO
            ================================================= */}

            <button
              type="button"
              aria-label="Abrir carrito"
              onClick={openCart}
              className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-full
                text-[#111111]
                transition
                hover:bg-gray-100
                hover:text-[#C6922F]
              "
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
                MENÚ MÓVIL
            ================================================== */}

            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                const newState =
                  !mobileMenuOpen;

                setMobileMenuOpen(newState);

                if (!newState) {
                  setCatalogOpen(false);
                }
              }}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                text-[#111111]
                transition
                hover:bg-gray-100
                hover:text-[#C6922F]
                lg:hidden
              "
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
          <div
            className="
              fixed
              inset-0
              z-[1000]
              bg-black/60
              lg:hidden
            "
          >

            {/* =================================================
                PANEL
            ================================================= */}

            <div
              className="
                absolute
                right-0
                top-0
                flex
                h-[100dvh]
                w-full
                max-w-[420px]
                flex-col
                bg-white
                shadow-2xl
              "
            >

              {/* =================================================
                  CABECERA DEL MENÚ
              ================================================= */}

              <div
                className="
                  flex
                  h-[74px]
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-gray-100
                  px-6
                "
              >

                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center"
                >
                  <Image
                    src="/images/logo/logo.png"
                    alt="Estantería Sevilla"
                    width={150}
                    height={55}
                    priority
                    className="
                      h-auto
                      w-[125px]
                      object-contain
                    "
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-gray-900
                    transition
                    hover:bg-gray-100
                  "
                  aria-label="Cerrar menú"
                >
                  <X
                    size={25}
                    strokeWidth={1.8}
                  />
                </button>

              </div>

              {/* =================================================
                  CONTENIDO CON SCROLL
              ================================================== */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  touch-pan-y
                  pb-10
                "
              >

                <nav className="px-6 pt-4">

                  {/* =================================================
                      INICIO
                  ================================================= */}

                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      border-b
                      border-gray-100
                      text-sm
                      font-semibold
                      text-[#111111]
                      transition
                      hover:text-[#C6922F]
                    "
                  >
                    INICIO
                  </Link>

                  {/* =================================================
                      CATÁLOGO
                  ================================================= */}

                  <div className="border-b border-gray-100">

                    <button
                      type="button"
                      onClick={() =>
                        setCatalogOpen(
                          (prev) => !prev
                        )
                      }
                      className="
                        flex
                        min-h-[58px]
                        w-full
                        items-center
                        justify-between
                        text-left
                        text-sm
                        font-semibold
                        text-[#111111]
                      "
                    >

                      <span>
                        CATÁLOGO
                      </span>

                      <ChevronDown
                        size={19}
                        className={`
                          text-[#C6922F]
                          transition-transform
                          duration-200
                          ${
                            catalogOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>

                    {/* =================================================
                        CATEGORÍAS
                    ================================================== */}

                    {catalogOpen && (
                      <div
                        className="
                          mb-4
                          overflow-hidden
                          rounded-2xl
                          border
                          border-[#eee9e1]
                          bg-[#FCFAF7]
                        "
                      >

                        {/* TODOS LOS PRODUCTOS */}

                        <Link
                          href="/catalogo"
                          onClick={closeMobileMenu}
                          className="
                            flex
                            min-h-[56px]
                            items-center
                            border-b
                            border-[#eee9e1]
                            px-4
                            text-sm
                            font-semibold
                            text-[#C6922F]
                            transition
                            hover:bg-[#f5efe5]
                          "
                        >
                          Todos los productos
                        </Link>

                        {/* CARGANDO */}

                        {loadingCollections && (
                          <div
                            className="
                              px-4
                              py-5
                              text-sm
                              text-gray-500
                            "
                          >
                            Cargando categorías...
                          </div>
                        )}

                        {/* CATEGORÍAS */}

                        {!loadingCollections &&
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
                                  min-h-[46px]
                                  items-center
                                  border-b
                                  border-[#eee9e1]
                                  px-4
                                  text-sm
                                  text-[#222222]
                                  transition
                                  hover:bg-[#f5efe5]
                                  hover:text-[#C6922F]
                                "
                              >
                                {
                                  collection.title
                                }
                              </Link>
                            )
                          )}

                        {/* SI NO HAY CATEGORÍAS */}

                        {!loadingCollections &&
                          collections.length ===
                            0 && (
                            <div
                              className="
                                px-4
                                py-5
                                text-sm
                                text-gray-500
                              "
                            >
                              No hay categorías
                              disponibles.
                            </div>
                          )}

                      </div>
                    )}

                  </div>

                  {/* =================================================
                      PRESUPUESTO
                  ================================================== */}

                  <Link
                    href="/presupuesto"
                    onClick={closeMobileMenu}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      border-b
                      border-gray-100
                      text-sm
                      font-semibold
                      text-[#111111]
                      transition
                      hover:text-[#C6922F]
                    "
                  >
                    PRESUPUESTO
                  </Link>

                  {/* =================================================
                      BUSCAR PRODUCTOS
                  ================================================== */}

                  <Link
                    href="/catalogo"
                    onClick={closeMobileMenu}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      gap-3
                      text-sm
                      font-semibold
                      text-[#111111]
                      transition
                      hover:text-[#C6922F]
                    "
                  >

                    <Search
                      size={20}
                    />

                    BUSCAR PRODUCTOS

                  </Link>

                </nav>

              </div>

            </div>

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