import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  css: {
    transformer: 'postcss',
  },
  build: {
    cssMinify: false, // Disable LightningCSS minification
    rollupOptions: {
      external: [] // Ensure no external dependencies that might cause issues
    },
    target: 'es2020' // Ensure compatibility
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})