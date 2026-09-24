import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // hydrate do Stencil é app Node com DOM simulado: não bundlar
  serverExternalPackages: ["@plataforma-xvia/ds-core"],
};

export default nextConfig;
