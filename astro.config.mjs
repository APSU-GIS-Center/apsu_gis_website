import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://apsu-gis-center.github.io', // Placeholder, user can update
  base: '/', // Updated for root deployment
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});