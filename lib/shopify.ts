
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

export async function shopifyFetch(
  query: string,
  variables: Record<string, unknown> = {}
) {
  if (!domain || !token) {
    throw new Error(
      "Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_PUBLIC_TOKEN en .env.local."
    );
  }

  const endpoint = `https://${domain}/api/2026-07/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  const responseText = await response.text();

  let json: {
    data?: Record<string, any>;
    errors?: Array<{
      message?: string;
      extensions?: Record<string, unknown>;
    }>;
  };

  try {
    json = JSON.parse(responseText);
  } catch {
    console.error(
      "Respuesta no válida de Shopify:",
      response.status,
      responseText
    );

    throw new Error(
      `Shopify devolvió una respuesta no válida (HTTP ${response.status}).`
    );
  }

  if (!response.ok || json.errors?.length) {
    console.error("Error de Shopify:", {
      status: response.status,
      errors: json.errors,
    });

    throw new Error(
      json.errors?.map((error) => error.message).join("; ") ||
        `Error HTTP ${response.status} al consultar Shopify.`
    );
  }

  if (!json.data) {
    console.error("Shopify no devolvió datos:", json);
    throw new Error("Shopify no devolvió datos.");
  }

  return json.data;
}
