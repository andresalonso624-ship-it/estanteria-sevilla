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
            }

            images(first: 10) {
              nodes {
                url
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

    allProducts.push(
      ...data.products.nodes
    );

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