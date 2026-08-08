import { shopifyFetch } from "@/lib/shopify";

export async function POST(request: Request) {
  const { cartId, lineId } = await request.json();

  const data = await shopifyFetch(
    `
    mutation RemoveCartLine(
      $cartId: ID!,
      $lineId: ID!
    ) {
      cartLinesRemove(
        cartId: $cartId
        lineIds: [$lineId]
      ) {
        cart {
          id
          checkoutUrl
          totalQuantity

          lines(first: 50) {
            edges {
              node {
                id
                quantity

                merchandise {
                  ... on ProductVariant {
                    id
                    title

                    price {
                      amount
                      currencyCode
                    }

                    product {
                      title

                      featuredImage {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }

        userErrors {
          field
          message
        }
      }
    }
    `,
    {
      cartId,
      lineId,
    }
  );

  if (data.cartLinesRemove.userErrors.length > 0) {
    return Response.json(
      {
        error: data.cartLinesRemove.userErrors[0].message,
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(data.cartLinesRemove.cart);
}