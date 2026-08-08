import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">
          {handle}
        </h1>

        <p className="text-gray-600">
          Estamos preparando la ficha completa de este producto.
        </p>
      </main>

      <Footer />
    </>
  );
}