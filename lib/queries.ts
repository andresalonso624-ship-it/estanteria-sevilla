import { shopifyFetch } from "./shopify";

/* =========================================================
   OBTENER TODOS LOS PRODUCTOS
========================================================= */

export async function getProducts() {
  const allProducts: any[] = [];

  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const after = cursor
      ? `, after: ${JSON.stringify(cursor)}`
      : "";

    const query = `
      {
        products(first: 24${after}) {
          nodes {
            id
            title
            handle
            description

            featuredImage {
              url
              altText
            }

            images(first: 10) {
              nodes {
                url
                altText
              }
            }

            variants(first: 20) {
              nodes {
                id
                title
                sku
                availableForSale

                selectedOptions {
                  name
                  value
                }

                price {
                  amount
                  currencyCode
                }
              }
            }

            collections(first: 20) {
              nodes {
                id
                title
                handle
              }
            }
          }

          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const data = await shopifyFetch(query);

    allProducts.push(...data.products.nodes);

    hasNextPage =
      data.products.pageInfo.hasNextPage;

    cursor =
      data.products.pageInfo.endCursor;
  }

  return allProducts;
}

/* =========================================================
   OBTENER TODAS LAS CATEGORÍAS / COLECCIONES
========================================================= */

export async function getCollections() {
  const allCollections: any[] = [];

  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const after = cursor
      ? `, after: ${JSON.stringify(cursor)}`
      : "";

    const query = `
      {
        collections(first: 50${after}) {
          nodes {
            id
            title
            handle
            description

            image {
              url
              altText
            }

            seo {
              title
              description
            }
          }

          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const data =
      await shopifyFetch(query);

    allCollections.push(
      ...data.collections.nodes
    );

    hasNextPage =
      data.collections.pageInfo.hasNextPage;

    cursor =
      data.collections.pageInfo.endCursor;
  }

  return allCollections;
}

/* =========================================================
   NORMALIZAR TEXTO
   Sirve para comparar:

   PERCHAS
   perchas
   Perchas
   perchas-para-tiendas

========================================================= */

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* =========================================================
   OBTENER UNA COLECCIÓN POR HANDLE
========================================================= */

export async function getCollectionByHandle(
  handle: string
) {
  const safeHandle =
    JSON.stringify(handle);

  /* =======================================================
     1. PRIMER INTENTO:
     HANDLE EXACTO DE SHOPIFY
  ======================================================= */

  const directQuery = `
    {
      collection(handle: ${safeHandle}) {
        id
        title
        handle
        description
        descriptionHtml

        image {
          url
          altText
        }

        seo {
          title
          description
        }

        products(first: 50) {
          nodes {
            id
            title
            handle
            description

            featuredImage {
              url
              altText
            }

            images(first: 10) {
              nodes {
                url
                altText
              }
            }

            variants(first: 20) {
              nodes {
                id
                title
                sku
                availableForSale

                selectedOptions {
                  name
                  value
                }

                price {
                  amount
                  currencyCode
                }
              }
            }

            collections(first: 20) {
              nodes {
                id
                title
                handle
              }
            }
          }

          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  const directData =
    await shopifyFetch(directQuery);

  /* =======================================================
     SI EXISTE EL HANDLE EXACTO
  ======================================================= */

  if (directData.collection) {
    return directData.collection;
  }

  /* =======================================================
     2. SI NO EXISTE:
     BUSCAR ENTRE TODAS LAS COLECCIONES
  ======================================================= */

  const collections =
    await getCollections();

  const normalizedHandle =
    normalizeText(handle);

  /* =======================================================
     BUSCAR POR HANDLE NORMALIZADO
  ======================================================= */

  let matchedCollection =
    collections.find(
      (collection: any) =>
        normalizeText(collection.handle) ===
        normalizedHandle
    );

  /* =======================================================
     BUSCAR POR TÍTULO

     Ejemplo:

     URL:
     /catalogo/perchas

     Shopify:
     PERCHAS
  ======================================================= */

  if (!matchedCollection) {
    matchedCollection =
      collections.find(
        (collection: any) =>
          normalizeText(collection.title) ===
          normalizedHandle
      );
  }

  /* =======================================================
     3. SI NO ENCONTRAMOS NADA
  ======================================================= */

  if (!matchedCollection) {
    return null;
  }

  /* =======================================================
     4. OBTENER LA COLECCIÓN REAL DE SHOPIFY
        USANDO SU HANDLE REAL
  ======================================================= */

  const realHandle =
    matchedCollection.handle;

  const realSafeHandle =
    JSON.stringify(realHandle);

  const collectionQuery = `
    {
      collection(handle: ${realSafeHandle}) {
        id
        title
        handle
        description
        descriptionHtml

        image {
          url
          altText
        }

        seo {
          title
          description
        }

        products(first: 50) {
          nodes {
            id
            title
            handle
            description

            featuredImage {
              url
              altText
            }

            images(first: 10) {
              nodes {
                url
                altText
              }
            }

            variants(first: 20) {
              nodes {
                id
                title
                sku
                availableForSale

                selectedOptions {
                  name
                  value
                }

                price {
                  amount
                  currencyCode
                }
              }
            }

            collections(first: 20) {
              nodes {
                id
                title
                handle
              }
            }
          }

          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  const collectionData =
    await shopifyFetch(collectionQuery);

  return collectionData.collection;
}