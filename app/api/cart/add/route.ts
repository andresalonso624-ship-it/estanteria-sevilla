import { shopifyFetch } from "@/lib/shopify";

export async function POST(request: Request) {
  const { cartId, merchandiseId, quantity } =
    await request.json();

  const data = await shopifyFetch(
    `
    mutation AddToCart(
      $cartId: ID!,
      $merchandiseId: ID!,
      $quantity: Int!
    ) {
      cartLinesAdd(
        cartId: $cartId
        lines: [
          {
            merchandiseId: $merchandiseId
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
      merchandiseId,
      quantity,
    }
  );

  if (data.cartLinesAdd.userErrors.length > 0) {
    console.error("Shopify userErrors:", data.cartLinesAdd.userErrors);

    return Response.json(
      {
        error: data.cartLinesAdd.userErrors[0].message,
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(data.cartLinesAdd.cart);
}