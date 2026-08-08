import { shopifyFetch } from "@/lib/shopify";

export async function POST(request: Request) {
  const { cartId, lineId, quantity } = await request.json();

  const data = await shopifyFetch(
    `
    mutation UpdateCartLine(
      $cartId: ID!,
      $lineId: ID!,
      $quantity: Int!
    ) {
      cartLinesUpdate(
        cartId: $cartId
        lines: [
          {
            id: $lineId
            quantity: $quantity
          }
        ]
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
      quantity,
    }
  );

  if (data.cartLinesUpdate.userErrors.length > 0) {
    return Response.json(
      {
        error: data.cartLinesUpdate.userErrors[0].message,
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(data.cartLinesUpdate.cart);
}