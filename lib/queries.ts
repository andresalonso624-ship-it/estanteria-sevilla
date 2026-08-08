import { shopifyFetch } from "./shopify";

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