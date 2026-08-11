import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CartProvider from "@/components/cart/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estanteriasevilla.com"),

  title: {
    default:
      "Estanterías para Tiendas y Comercios en Sevilla | Estantería Sevilla",
    template: "%s | Estantería Sevilla",
  },

  description:
    "Estanterías comerciales, equipamiento para tiendas y mobiliario para negocios en Sevilla. Soluciones profesionales para comercios, supermercados, almacenes y todo tipo de negocios.",

  keywords: [
    "estanterías para tiendas",
    "estanterías comerciales",
    "estanterías para comercios",
    "equipamiento comercial",
    "mobiliario comercial",
    "estanterías Sevilla",
    "equipamiento comercial Sevilla",
    "mobiliario para tiendas Sevilla",
    "estanterías para supermercados",
    "expositores para tiendas",
  ],

  authors: [
    {
      name: "Estantería Sevilla",
    },
  ],

  creator: "Estantería Sevilla",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://estanteriasevilla.com",
    siteName: "Estantería Sevilla",
    title:
      "Estanterías para Tiendas y Comercios en Sevilla | Estantería Sevilla",
    description:
      "Estanterías comerciales, equipamiento para tiendas y mobiliario para negocios en Sevilla.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Estanterías para Tiendas y Comercios en Sevilla | Estantería Sevilla",
    description:
      "Estanterías comerciales y equipamiento profesional para tiendas y negocios.",
  },

  alternates: {
    canonical: "https://estanteriasevilla.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-white text-[#111111] antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}