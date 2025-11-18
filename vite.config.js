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
    cssMinify: true, // Enable CSS minification
    rollupOptions: {
      external: [], // Ensure no external dependencies that might cause issues
      output: {
        manualChunks: {
          // Split vendor chunks to reduce bundle size
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'react-icons', 'swiper'],
          charts: ['chart.js', 'react-chartjs-2'],
          utils: ['axios', 'js-cookie']
        }
      }
    },
    target: 'es2020', // Ensure compatibility
    chunkSizeWarningLimit: 1000, // Increase limit to reduce warnings
    sourcemap: false, // Disable sourcemaps for production
    brotliSize: false, // Disable brotli size calculation for faster builds
    minify: 'terser', // Use terser for better minification
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  // Add this to handle the rollup issue on Vercel
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu']
  }
})