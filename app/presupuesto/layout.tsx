import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitar presupuesto",
  description: "Contacta con Estantería Sevilla para solicitar presupuesto de estanterías comerciales, mobiliario y equipamiento para tu negocio.",
  alternates: {
    canonical: "https://www.estanteriasevilla.com/presupuesto",
  },
  openGraph: {
    url: "https://www.estanteriasevilla.com/presupuesto",
    title: "Solicitar presupuesto | Estantería Sevilla",
    description: "Solicita presupuesto de estanterías comerciales, mobiliario y equipamiento para tu negocio.",
    siteName: "Estantería Sevilla",
    type: "website",
  },
};

export default function PresupuestoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
