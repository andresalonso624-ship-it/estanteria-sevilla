import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#111111] text-white">

      {/* CONTENIDO PRINCIPAL */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">

        {/* ENCABEZADO */}
        <div className="mb-10 border-b border-white/10 pb-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C6922F]">
                Estantería Sevilla
              </p>

              <h2 className="max-w-md text-2xl font-semibold leading-tight sm:text-3xl">
                Soluciones para tiendas y negocios.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-gray-400">
              Equipamiento comercial diseñado para ayudarte a organizar,
              mostrar y aprovechar mejor tu espacio.
            </p>

          </div>

        </div>


        {/* COLUMNAS */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">


          {/* EMPRESA */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Empresa
            </h3>

            <nav className="space-y-3">

              <Link
                href="/"
                className="flex items-center justify-between text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Inicio
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/catalogo"
                className="flex items-center justify-between text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Catálogo
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/contacto"
                className="flex items-center justify-between text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Contacto
                <ArrowUpRight size={15} />
              </Link>

            </nav>

          </div>


          {/* INFORMACIÓN */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Información
            </h3>

            <nav className="space-y-3">

              <Link
                href="/politica-privacidad"
                className="block text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Política de privacidad
              </Link>

              <Link
                href="/politica-cookies"
                className="block text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Política de cookies
              </Link>

              <Link
                href="/aviso-legal"
                className="block text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Aviso legal
              </Link>

              <Link
                href="/condiciones-compra"
                className="block text-sm text-gray-400 transition hover:text-[#C6922F]"
              >
                Condiciones de compra
              </Link>

            </nav>

          </div>


          {/* HORARIO */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Horario
            </h3>

            <div className="flex gap-3">

              <Clock
                size={19}
                className="mt-0.5 shrink-0 text-[#C6922F]"
              />

              <div className="text-sm leading-6 text-gray-400">

                <p className="text-white">
                  Atención al cliente
                </p>

                <p>
                  - Lunes - Viernes -
                </p>

                <p>
                  10:00 - 20:00 Horario Continuo
                </p>

                <p>
                  - Sabado - 
                </p>

                <p>
                  10:00 - 18:00 Horario Continuo
                </p>

                                <p>
                  - Domingo Y Festivos - 
                </p>

                <p>
                  Cerrado 
                </p>

              </div>

            </div>

          </div>


          {/* CONTACTO */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>

            <div className="space-y-4">


              {/* WHATSAPP */}
              <a
                href="https://wa.me/34651135775"
                className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-[#C6922F]"
              >

                <MessageCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C6922F]"
                />

                <span>
                  +34 651135775
                
                </span>

              </a>


              {/* TELÉFONO */}
              <a
                href="tel:+34954123456"
                className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-[#C6922F]"
              >

                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C6922F]"
                />

                <span>
                  +34 651 13 57 75
                  <br />
                  +34 688 09 71 57
                </span>

              </a>


              {/* EMAIL */}
              <a
                href="mailto:Estanteriasevilla@163.com"
                className="flex items-start gap-3 break-all text-sm text-gray-400 transition hover:text-[#C6922F]"
              >

                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C6922F]"
                />

                <span>
                  Estanteriasevilla@163.com
                </span>

              </a>


              {/* DIRECCIÓN */}
              <div className="flex items-start gap-3 text-sm text-gray-400">

                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C6922F]"
                />

                <span className="leading-6">
                  Calle Coginete 23
                  <br />
                  Polígono Aeropuerto
                  <br />
                  41020 Sevilla
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BARRA INFERIOR */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 lg:text-left">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Estantería Sevilla. Todos los derechos reservados.
          </p>

          <p className="text-xs text-gray-500">
            Diseñado por: Andres Colorado
          </p>

        </div>

      </div>

    </footer>
  );
}