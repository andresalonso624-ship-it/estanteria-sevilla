"use client";

import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* TÍTULO */}
        <div className="mb-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#C6922F]">
            Contacto
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl">
            ¿Necesitas ayuda?
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#31557A]">
            Ponte en contacto con nuestro equipo y resolveremos cualquier duda
            sobre nuestros productos o pedidos.
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* ==============================
              INFORMACIÓN DE CONTACTO
          =============================== */}
          <div className="space-y-5">

            {/* WHATSAPP */}
            <a
              href="https://wa.me/34651135775"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="group flex items-center gap-6 rounded-2xl border border-black bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6922F] hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                <MessageCircle
                  size={34}
                  strokeWidth={1.7}
                  className="text-[#C6922F] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  WhatsApp
                </h3>

                <p className="mt-1 text-base text-[#55708C]">
                  +34 651 135 775
                </p>

                <p className="mt-1 text-sm font-medium text-[#C6922F] opacity-0 transition-opacity group-hover:opacity-100">
                  Escribir por WhatsApp →
                </p>
              </div>
            </a>


            {/* TELÉFONO */}
            <a
              href="tel:+34688097157"
              aria-label="Llamar por teléfono"
              className="group flex items-center gap-6 rounded-2xl border border-black bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6922F] hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                <Phone
                  size={34}
                  strokeWidth={1.7}
                  className="text-[#C6922F] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  Teléfono
                </h3>

                <p className="mt-1 text-base text-[#55708C]">
                  +34 688 097 157
                </p>

                <p className="mt-1 text-sm font-medium text-[#C6922F] opacity-0 transition-opacity group-hover:opacity-100">
                  Llamar ahora →
                </p>
              </div>
            </a>


            {/* CORREO */}
            <a
              href="mailto:Estanteriasevilla@163.com"
              aria-label="Enviar correo electrónico"
              className="group flex items-center gap-6 rounded-2xl border border-black bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6922F] hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                <Mail
                  size={34}
                  strokeWidth={1.7}
                  className="text-[#C6922F] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  Correo
                </h3>

                <p className="mt-1 text-base text-[#55708C]">
                  Estanteriasevilla@163.com
                </p>

                <p className="mt-1 text-sm font-medium text-[#C6922F] opacity-0 transition-opacity group-hover:opacity-100">
                  Enviar correo →
                </p>
              </div>
            </a>

          </div>


          {/* ==============================
              MAPA + DIRECCIÓN
          =============================== */}
          <div className="overflow-hidden rounded-2xl border border-black bg-white shadow-sm">

            {/* MAPA */}
            <div className="relative h-[380px] w-full overflow-hidden">

              <iframe
                src="https://www.google.com/maps?q=Calle%20Coginete%2023,%20Sevilla,%20Spain&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Estantería Sevilla"
              />

            </div>


            {/* DATOS */}
            <div className="grid gap-8 p-8 sm:grid-cols-2">

              {/* DIRECCIÓN */}
              <div className="flex gap-4">

                <MapPin
                  size={28}
                  strokeWidth={1.7}
                  className="mt-1 shrink-0 text-[#C6922F]"
                />

                <div>
                  <h3 className="font-bold text-[#111111]">
                    Dirección
                  </h3>

                  <p className="mt-2 leading-7 text-[#55708C]">
                    Calle Coginete 23
                    <br />
                    Polígono Aeropuerto
                    <br />
                    41020 Sevilla
                  </p>
                </div>

              </div>


              {/* HORARIO */}
              <div className="flex gap-4">

                <Clock
                  size={28}
                  strokeWidth={1.7}
                  className="mt-1 shrink-0 text-[#C6922F]"
                />

                <div>
                  <h3 className="font-bold text-[#111111]">
                    Horario
                  </h3>

                  <p className="mt-2 leading-7 text-[#55708C]">
                    Lunes - Viernes
                    <br />
                    10:00 - 20:00
                    <br />
                    Sábados
                    <br />
                    10:00 - 18:00
                    <br />
                    Domingos y Festivos
                    <br />
                    Cerrados
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}