import { shopifyFetch } from "@/lib/shopify";

export async function POST(request: Request) {
  const { cartId } = await request.json();

  const data = await shopifyFetch(
    `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
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
    }
    `,
    {
      cartId,
    }
  );

  if (!data.cart) {
    return Response.json(
      {
        error: "Carrito no encontrado",
      },
      {
        status: 404,
      }
    );
  }

  return Response.json(data.cart);
}