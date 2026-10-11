
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
import ProductSearch from "@/components/layout/ProductSearch";
import { useLanguage } from "@/components/layout/LanguageProvider";

interface Collection {
  id: string;
  title: string;
  handle: string;
}

export default function Header() {
  const { open, openCart, closeCart, cartCount } = useCart();
  const { t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen || !catalogOpen || collections.length > 0) {
      return;
    }

    async function loadCollections() {
      try {
        setLoadingCollections(true);

        const response = await fetch("/api/collections");

        if (!response.ok) {
          throw new Error("No se pudieron cargar las categorías");
        }

        const data = await response.json();

        setCollections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setLoadingCollections(false);
      }
    }

    void loadCollections();
  }, [mobileMenuOpen, catalogOpen, collections.length]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setCatalogOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* BARRA SUPERIOR */}
      <div className="hidden bg-[#111111] text-white lg:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-sm">
          <div className="flex items-center gap-8">
            <span>📦 {t("shipping")}</span>
            <span>☎ +34 688 097 157</span>
            <span>✉ Estanteriasevilla@163.com</span>
          </div>

          <span>{t("schedule")}</span>
        </div>
      </div>

      {/* ENCABEZADO PRINCIPAL */}
      <header className="sticky top-0 z-[999] border-b border-[#E6E2DA] bg-[#F8F7F4] shadow-sm">
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
              className="h-auto w-[150px] rounded-md bg-white px-2 py-1 object-contain sm:w-[155px] lg:w-[200px] lg:bg-transparent lg:px-0 lg:py-0"
            />
          </Link>

          {/* MENÚ DE ORDENADOR */}
          <nav className="hidden lg:block" aria-label="Navegación principal">
            <ul className="flex items-center gap-10 text-sm font-semibold uppercase">
              <li>
                <Link
                  href="/"
                  className="border-b-2 border-[#967044] pb-1 text-[#967044]"
                >
                  {t("home")}
                </Link>
              </li>

              <li>
                <Link
                  href="/catalogo"
                  className="text-[#252525] transition hover:text-[#967044]"
                >
                  {t("catalog")}
                </Link>
              </li>

              <li>
                <Link
                  href="/presupuesto"
                  className="text-[#111111] transition hover:text-[#C6922F]"
                >
                  {t("budget")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* SELECTOR DE IDIOMA, BUSCADOR Y CARRITO */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ProductSearch />

            <button
              type="button"
              aria-label={t("openCart")}
              onClick={openCart}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#252525] transition hover:bg-[#EEEAE3] hover:text-[#967044]"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C6922F] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </button>

            {/* BOTÓN DEL MENÚ MÓVIL */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                const nextOpen = !mobileMenuOpen;
                setMobileMenuOpen(nextOpen);

                if (!nextOpen) {
                  setCatalogOpen(false);
                }
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111111] transition hover:bg-gray-100 hover:text-[#C6922F] lg:hidden"
            >
              {mobileMenuOpen ? (
                <X size={25} strokeWidth={1.8} />
              ) : (
                <Menu size={25} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[1000] bg-black/60 lg:hidden">
            <div className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-[420px] flex-col bg-white shadow-2xl">
              {/* CABECERA DEL MENÚ */}
              <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-gray-100 px-6">
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
                    className="h-auto w-[125px] object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label={t("closeMenu")}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 transition hover:bg-gray-100"
                >
                  <X size={25} strokeWidth={1.8} />
                </button>
              </div>

              {/* CONTENIDO DEL MENÚ */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-10">
                <nav
                  className="px-6 pt-4"
                  aria-label="Navegación móvil"
                >
                  {/* INICIO */}
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex min-h-[58px] items-center border-b border-gray-100 text-sm font-semibold text-[#111111] transition hover:text-[#C6922F]"
                  >
                    {t("home")}
                  </Link>

                  {/* CATÁLOGO */}
                  <div className="border-b border-gray-100">
                    <button
                      type="button"
                      onClick={() => setCatalogOpen((prev) => !prev)}
                      aria-expanded={catalogOpen}
                      className="flex min-h-[58px] w-full items-center justify-between text-left text-sm font-semibold text-[#111111]"
                    >
                      <span>{t("catalog")}</span>

                      <ChevronDown
                        size={19}
                        className={`text-[#C6922F] transition-transform duration-200 ${
                          catalogOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* CATEGORÍAS DE SHOPIFY */}
                    {catalogOpen && (
                      <div className="mb-4 overflow-hidden rounded-2xl border border-[#eee9e1] bg-[#FCFAF7]">
                        <Link
                          href="/catalogo"
                          onClick={closeMobileMenu}
                          className="flex min-h-[56px] items-center border-b border-[#eee9e1] px-4 text-sm font-semibold text-[#C6922F] transition hover:bg-[#f5efe5]"
                        >
                          {t("allProducts")}
                        </Link>

                        {loadingCollections && (
                          <div className="px-4 py-5 text-sm text-gray-500">
                            {t("loadingCategories")}
                          </div>
                        )}

                        {!loadingCollections &&
                          collections.map((collection) => (
                            <Link
                              key={collection.id}
                              href={`/catalogo?categoria=${encodeURIComponent(
                                collection.handle,
                              )}`}
                              onClick={closeMobileMenu}
                              className="flex min-h-[46px] items-center border-b border-[#eee9e1] px-4 text-sm text-[#222222] transition hover:bg-[#f5efe5] hover:text-[#C6922F]"
                            >
                              {collection.title}
                            </Link>
                          ))}

                        {!loadingCollections && collections.length === 0 && (
                          <div className="px-4 py-5 text-sm text-gray-500">
                            {t("noCategories")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* PRESUPUESTO */}
                  <Link
                    href="/presupuesto"
                    onClick={closeMobileMenu}
                    className="flex min-h-[58px] items-center border-b border-gray-100 text-sm font-semibold text-[#111111] transition hover:text-[#C6922F]"
                  >
                    {t("budget")}
                  </Link>

                  {/* BUSCAR PRODUCTOS */}
                  <Link
                    href="/catalogo"
                    onClick={closeMobileMenu}
                    className="flex min-h-[58px] items-center gap-3 text-sm font-semibold text-[#111111] transition hover:text-[#C6922F]"
                  >
                    <Search size={20} />
                    {t("searchProducts")}
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CARRITO: SE CONSERVA EL COMPONENTE ORIGINAL */}
      <CartDrawer open={open} onClose={closeCart} />
    </>
  );
}
