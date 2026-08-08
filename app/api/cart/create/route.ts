import { shopifyFetch } from "@/lib/shopify";

export async function POST() {
  const data = await shopifyFetch(`
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          totalQuantity
        }

        userErrors {
          field
          message
        }
      }
    }
  `);

  if (
    data.cartCreate.userErrors &&
    data.cartCreate.userErrors.length > 0
  ) {
    return Response.json(
      {
        error:
          data.cartCreate.userErrors[0].message,
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(data.cartCreate.cart);
}