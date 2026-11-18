// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: manter igual a site.url em src/config/site.ts
export default defineConfig({
  site: 'https://brvitta.com.br',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
