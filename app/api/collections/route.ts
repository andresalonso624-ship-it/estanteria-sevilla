import { NextResponse } from "next/server";
import { getCollections } from "@/lib/queries";

export async function GET() {
  try {
    const collections =
      await getCollections();

    return NextResponse.json(
      collections
    );

  } catch (error) {

    console.error(
      "Error obteniendo categorías:",
      error
    );

    return NextResponse.json(
      {
        error:
          "No se pudieron obtener las categorías",
      },
      {
        status: 500,
      }
    );
  }
}