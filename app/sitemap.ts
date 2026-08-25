import type { MetadataRoute } from "next";
import { getCollections } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://estanteriasevilla.com";

  /* =====================================================
     OBTENER TODAS LAS COLECCIONES DE SHOPIFY
  ===================================================== */

  const collections = await getCollections();

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
     CATEGORÍAS / COLECCIONES
     
     Ejemplos:
     /catalogo/perchas
     /catalogo/percheros
     /catalogo/cremalleras-y-tubos
     /catalogo/paneles-de-lamas
     /catalogo/mostradores
  ===================================================== */

  const collectionPages: MetadataRoute.Sitemap =
    collections
      .filter((collection: any) => collection.handle)
      .map((collection: any) => ({
        url: `${baseUrl}/catalogo/${collection.handle}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

  /* =====================================================
     RESULTADO FINAL
  ===================================================== */

  return [
    ...mainPages,
    ...collectionPages,
  ];
}