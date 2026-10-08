// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zpeng.me',
  // WordPress served every page with a trailing slash; keep the same URLs
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Posts whose slug changed after a project was renamed or merged; the old URL becomes a redirect page
  redirects: {
    '/2019/02/11/antenna-array-analysis/': '/2019/02/11/beamscope/',
    '/2025/10/22/hexapod-link/': '/2024/09/12/hexapod/',
  },
  integrations: [sitemap()],
});
