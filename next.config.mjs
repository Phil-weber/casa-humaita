/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deploy estatico: sem servidor, sem banco, sem API (CLAUDE.md).
  output: 'export',
  trailingSlash: true,

  // O otimizador de imagem do Next exige servidor. O projeto tem pipeline
  // proprio (scripts/prepare-assets.mjs) que gera AVIF + WebP responsivos com
  // teto na resolucao nativa, entao o otimizador fica desligado de proposito.
  images: { unoptimized: true },

  reactStrictMode: true,
};

export default nextConfig;
