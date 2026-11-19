// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: manter igual a site.url em src/config/site.ts
export default defineConfig({
  site: 'https://brvitta.com.br',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  // o chunk do MapLibre (~1,1 MB, ~280 KB gzip) só carrega quando o mapa entra na tela
  vite: { build: { chunkSizeWarningLimit: 1200 } },
});
