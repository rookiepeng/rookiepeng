// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zpeng.me',
  // WordPress served every page with a trailing slash; keep the same URLs
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
