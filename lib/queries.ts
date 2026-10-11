
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

            seo {
              title
              description
            }

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

            options {
              name
              values
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

    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
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

    const data = await shopifyFetch(query);

    allCollections.push(...data.collections.nodes);

    hasNextPage = data.collections.pageInfo.hasNextPage;
    cursor = data.collections.pageInfo.endCursor;
  }

  return allCollections;
}

/* =========================================================
   OBTENER UNA COLECCIÓN POR HANDLE
========================================================= */

export async function getCollectionByHandle(handle: string) {
  const safeHandle = JSON.stringify(handle);

  const query = `
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

            seo {
              title
              description
            }

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

            options {
              name
              values
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

  const data = await shopifyFetch(query);

  return data.collection;
}

/* =========================================================
   OBTENER UN PRODUCTO POR HANDLE
   INCLUYE GALERÍA, OPCIONES Y VARIANTES
========================================================= */

export async function getProductByHandle(handle: string) {
  const safeHandle = JSON.stringify(handle);

  const query = `
    {
      product(handle: ${safeHandle}) {
        id
        title
        handle
        description
        descriptionHtml

        seo {
          title
          description
        }

        featuredImage {
          url
          altText
        }

        images(first: 20) {
          nodes {
            url
            altText
          }
        }

        options {
          name
          values
        }

        variants(first: 50) {
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
    }
  `;

  const data = await shopifyFetch(query);

  return data.product;
}
