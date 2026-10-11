
export type Language = "es" | "zh";

export const translations = {
  es: {
    home: "Inicio",
    catalog: "Catálogo",
    budget: "Presupuesto",
    searchProducts: "Buscar productos",
    allProducts: "Todos los productos",
    loadingCategories: "Cargando categorías...",
    noCategories: "No hay categorías disponibles.",
    closeMenu: "Cerrar menú",
    openMenu: "Abrir menú",
    openCart: "Abrir carrito",
    shipping: "Envíos a toda España",
    schedule: "Lunes - Viernes 10:00 - 20:00",
    language: "Idioma",
  },
  zh: {
    home: "首页",
    catalog: "产品目录",
    budget: "获取报价",
    searchProducts: "搜索产品",
    allProducts: "所有产品",
    loadingCategories: "正在加载分类...",
    noCategories: "暂无可用分类。",
    closeMenu: "关闭菜单",
    openMenu: "打开菜单",
    openCart: "打开购物车",
    shipping: "配送至西班牙全境",
    schedule: "周一至周五 10:00–20:00",
    language: "语言",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;
