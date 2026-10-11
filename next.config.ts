import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contacto",
        destination: "/presupuesto",
        permanent: true,
      },
      {
        source: "/catalogo/frontpage",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/catalogo/utensilios-para-comercio-1",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/producto/columna-gris",
        destination: "/catalogo/estanterias-de-comercio",
        permanent: true,
      },
      {
        source: "/producto/pie-de-columna-gris",
        destination: "/catalogo/estanterias-de-comercio",
        permanent: true,
      },
      {
        source: "/producto/mostrador",
        destination: "/catalogo/mobiliario-muebles-mostradores",
        permanent: true,
      },
      {
        source: "/producto/conjunto-de-mostrador-y-tpv",
        destination: "/catalogo/mobiliario-muebles-mostradores",
        permanent: true,
      },
      {
        source: "/producto/mesa-redonda-blanca-3-plantas-120-125cm",
        destination: "/catalogo/mobiliario-muebles-mostradores",
        permanent: true,
      },
      {
        source: "/producto/bolsas-de-papel-1",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/producto/panel-liso-gris",
        destination: "/catalogo/estanterias-de-comercio",
        permanent: true,
      },
      {
        source: "/producto/panel-perforado-gris",
        destination: "/catalogo/paneles-de-rejilla",
        permanent: true,
      },
      {
        source: "/producto/carro-supermercado-60-litros",
        destination: "/catalogo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
