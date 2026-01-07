import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://apsu-gis-center.github.io', // Placeholder, user can update
  base: '/apsu_gis_website', // Updated to match repository name
  vite: {
    plugins: [tailwindcss()]
  }
})