export default function CondicionesCompraPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF7] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-[#111111]">
          Condiciones de compra
        </h1>

        <div className="mt-4 h-1 w-20 bg-[#C6922F]" />

        <div className="mt-10 space-y-6 text-gray-700">
          <p>
            En esta sección se detallan las condiciones aplicables a las
            compras realizadas a través de nuestra tienda.
          </p>

          <h2 className="text-2xl font-semibold text-[#111111]">
            Pedidos
          </h2>

          <p>
            Todos los pedidos están sujetos a disponibilidad y confirmación.
          </p>

          <h2 className="text-2xl font-semibold text-[#111111]">
            Precios
          </h2>

          <p>
            Los precios mostrados en la página incluyen la información
            correspondiente al producto seleccionado.
          </p>

          <h2 className="text-2xl font-semibold text-[#111111]">
            Contacto
          </h2>

          <p>
            Para cualquier consulta relacionada con un pedido, puedes
            contactar con nosotros.
          </p>
        </div>
      </div>
    </main>
  );
}