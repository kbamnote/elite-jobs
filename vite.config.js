import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  css: {
    transformer: 'lightningcss',
  },
  build: {
    cssMinify: 'lightningcss'
  },
  resolve: {
    alias: {
      // Force Vite to use the same CSS processor across platforms
      'lightningcss': 'lightningcss'
    }
  }
})