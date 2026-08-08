import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-[#fafafa] py-24">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">

        {/* Información */}

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C6922F]">
            Contacto
          </p>

          <h2 className="mt-3 text-5xl font-bold text-[#111111]">
            ¿Necesitas ayuda?
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-gray-600">
            Ponte en contacto con nuestro equipo y resolveremos
            cualquier duda sobre nuestros productos o pedidos.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-5 rounded-xl border bg-white p-5 shadow-sm">

              <MessageCircle className="text-[#C6922F]" size={28} />

              <div>
                <h3 className="font-semibold">
                  WhatsApp
                </h3>

                <p className="text-gray-500">
                  +34 600 000 000
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5 rounded-xl border bg-white p-5 shadow-sm">

              <Phone className="text-[#C6922F]" size={28} />

              <div>
                <h3 className="font-semibold">
                  Teléfono
                </h3>

                <p className="text-gray-500">
                  +34 954 123 456
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5 rounded-xl border bg-white p-5 shadow-sm">

              <Mail className="text-[#C6922F]" size={28} />

              <div>
                <h3 className="font-semibold">
                  Correo
                </h3>

                <p className="text-gray-500">
                  info@estanteriasevilla.com
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Mapa */}

        <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">

          <iframe
            src="https://www.google.com/maps?q=Polígono+Aeropuerto+Sevilla&output=embed"
            width="100%"
            height="340"
            style={{ border: 0 }}
            loading="lazy"
          />

          <div className="space-y-5 p-8">

            <div className="flex gap-4">

              <MapPin className="mt-1 text-[#C6922F]" />

              <div>

                <h3 className="font-semibold">
                  Dirección
                </h3>

                <p className="text-gray-600">
                  Calle Coginete 23
                  <br />
                  Polígono Aeropuerto
                  <br />
                  41020 Sevilla
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Clock className="mt-1 text-[#C6922F]" />

              <div>

                <h3 className="font-semibold">
                  Horario
                </h3>

                <p className="text-gray-600">
                  Lunes - Viernes
                  <br />
                  09:00 - 18:00
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}