import type { MetadataRoute } from "next";

import {
  getCollections,
  getProducts,
} from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://estanteriasevilla.com";

  /* =====================================================
     OBTENER DATOS DE SHOPIFY
  ===================================================== */

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(),
  ]);

  /* =====================================================
     PÁGINAS PRINCIPALES
  ===================================================== */

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/presupuesto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${baseUrl}/politica-cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${baseUrl}/condiciones-compra`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* =====================================================
     CATEGORÍAS
  ===================================================== */

  const collectionPages: MetadataRoute.Sitemap =
    collections
      .filter(
        (collection: any) =>
          collection.handle
      )
      .map(
        (collection: any) => ({
          url: `${baseUrl}/catalogo/${collection.handle}`,

          lastModified: new Date(),

          changeFrequency: "weekly" as const,

          priority: 0.8,
        })
      );

  /* =====================================================
     PRODUCTOS
  ===================================================== */

  const productPages: MetadataRoute.Sitemap =
    products
      .filter(
        (product: any) =>
          product.handle
      )
      .map(
        (product: any) => ({
          url: `${baseUrl}/producto/${product.handle}`,

          lastModified: new Date(),

          changeFrequency: "weekly" as const,

          priority: 0.7,
        })
      );

  /* =====================================================
     RESULTADO
  ===================================================== */

  return [
    ...mainPages,
    ...collectionPages,
    ...productPages,
  ];
}