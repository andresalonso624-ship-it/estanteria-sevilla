"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function PresupuestoPage() {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    const form = e.currentTarget;

    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
    const correo = (form.elements.namedItem("correo") as HTMLInputElement).value;
    const telefono = (form.elements.namedItem("telefono") as HTMLInputElement).value;
    const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value;

    const texto = `Hola, quiero solicitar un presupuesto.

*Nombre:* ${nombre}
*Correo:* ${correo}
*Teléfono / WhatsApp:* ${telefono}

*Mensaje:*
${mensaje}`;

    const numeroWhatsApp = "34651000000";

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-[#FCFAF7] px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto w-full max-w-6xl">

        {/* BOTÓN VOLVER AL INICIO */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#D8D0C7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2C241C] transition hover:bg-[#F6F1EA]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>

            Volver al inicio
          </Link>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="overflow-hidden rounded-3xl border border-[#E5DED5] bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* INFORMACIÓN */}
            <section className="p-6 sm:p-8 md:p-10 lg:p-12">

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#A36A33]">
                Presupuesto
              </p>

              <h1 className="text-3xl font-bold leading-tight text-[#2C241C] sm:text-4xl md:text-5xl">
                Estamos para ayudarte
              </h1>

              <p className="mt-5 text-base leading-7 text-[#5C5148] sm:text-lg">
                Ponte en contacto con nuestro equipo y cuéntanos qué necesitas.
                Te responderemos lo antes posible con información sobre tu
                proyecto y presupuesto.
              </p>

              <div className="mt-8 space-y-6">

                {/* TELÉFONO */}
                <a
                  href="tel:+34688097157"
                  className="flex items-start gap-4 rounded-xl border border-transparent p-2 transition hover:border-[#E5DED5] hover:bg-[#FCFAF7]"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6F1EA] text-[#A36A33]">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-bold text-[#2C241C]">
                      Teléfono
                    </h2>
                    <p className="mt-1 text-[#5C5148]">
                      +34 688 097 157
                    </p>
                  </div>
                </a>

                {/* CORREO */}
                <a
                  href="mailto:Estanteriasevilla@163.com"
                  className="flex items-start gap-4 rounded-xl border border-transparent p-2 transition hover:border-[#E5DED5] hover:bg-[#FCFAF7]"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6F1EA] text-[#A36A33]">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-[#2C241C]">
                      Correo
                    </h2>

                    <p className="mt-1 break-all text-[#5C5148]">
                      Estanteriasevilla@163.com
                    </p>
                  </div>
                </a>

                {/* HORARIO */}
                <div className="flex items-start gap-4 p-2">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6F1EA] text-[#A36A33]">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-bold text-[#2C241C]">
                      Horario
                    </h2>

                    <p className="mt-1 leading-7 text-[#5C5148]">
                      Lunes - Viernes: 10:00 - 20:00
                      <br />
                      Sábados: 10:00 - 18:00
                      <br />
                      Domingos y festivos: Cerrado
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* FORMULARIO */}
            <section className="border-t border-[#E5DED5] bg-[#FCFAF7] p-6 sm:p-8 md:p-10 lg:border-l lg:border-t-0 lg:p-12">

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NOMBRE */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-2 block text-sm font-semibold text-[#2C241C]"
                  >
                    Nombre completo
                  </label>

                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Escribe tu nombre"
                    className="w-full rounded-xl border border-[#D8D0C7] bg-white px-4 py-3.5 text-[#2C241C] outline-none transition placeholder:text-[#9A9188] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                  />
                </div>

                {/* CORREO */}
                <div>
                  <label
                    htmlFor="correo"
                    className="mb-2 block text-sm font-semibold text-[#2C241C]"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-[#D8D0C7] bg-white px-4 py-3.5 text-[#2C241C] outline-none transition placeholder:text-[#9A9188] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                  />
                </div>

                {/* TELÉFONO / WHATSAPP */}
                <div>
                  <label
                    htmlFor="telefono"
                    className="mb-2 block text-sm font-semibold text-[#2C241C]"
                  >
                    Teléfono o WhatsApp
                  </label>

                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder="+34 600 000 000"
                    className="w-full rounded-xl border border-[#D8D0C7] bg-white px-4 py-3.5 text-[#2C241C] outline-none transition placeholder:text-[#9A9188] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                  />
                </div>

                {/* MENSAJE */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-2 block text-sm font-semibold text-[#2C241C]"
                  >
                    Cuéntanos qué necesitas
                  </label>

                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={6}
                    placeholder="Escribe aquí los detalles de tu solicitud..."
                    className="w-full resize-none rounded-xl border border-[#D8D0C7] bg-white px-4 py-3.5 text-[#2C241C] outline-none transition placeholder:text-[#9A9188] focus:border-[#A36A33] focus:ring-2 focus:ring-[#A36A33]/20"
                  />
                </div>

                {/* BOTÓN */}
                <button
                  type="submit"
                  disabled={enviando}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#A36A33] px-5 py-4 text-base font-bold text-white transition hover:bg-[#7A4E24] disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
                >
                  {enviando ? "Abriendo WhatsApp..." : "Solicitar mi presupuesto"}

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>

                <p className="text-center text-xs leading-5 text-[#7A7067] sm:text-sm">
                  Al enviar el formulario se abrirá WhatsApp con tus datos
                  preparados para solicitar el presupuesto.
                </p>

              </form>
            </section>

          </div>
        </div>

        {/* SEGUNDO BOTÓN VOLVER */}


      </div>
    </main>
  );
}