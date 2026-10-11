
import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (term.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const products = await getProducts();
    const normalizedTerm = normalize(term);
    const words = normalizedTerm.split(/\s+/).filter(Boolean);

    const results = products
      .filter((product: any) => {
        if (
          typeof product.handle !== "string" ||
          !product.handle.trim()
        ) {
          return false;
        }

        const title = normalize(product.title ?? "");
        const description = normalize(
          stripHtml(product.description ?? "")
        );

        return (
          title.includes(normalizedTerm) ||
          description.includes(normalizedTerm) ||
          words.every(
            (word) => title.includes(word) || description.includes(word)
          )
        );
      })
      .slice(0, 8)
      .map((product: any) => {
        const variant = product.variants?.nodes?.[0];

        return {
          id: product.id,
          handle: product.handle,
          title: product.title,
          image:
            product.featuredImage?.url ??
            product.images?.nodes?.[0]?.url ??
            null,
          price: variant?.price?.amount ?? null,
          currency: variant?.price?.currencyCode ?? "EUR",
          availableForSale: variant?.availableForSale ?? false,
        };
      });

    return NextResponse.json(
      { products: results },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error buscando productos:", error);

    return NextResponse.json(
      { error: "No se pudieron buscar los productos." },
      { status: 500 }
    );
  }
}
