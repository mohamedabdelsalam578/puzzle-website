import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  css: {
    postcss: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: ['postcss']
    }
  },
  optimizeDeps: {
    exclude: ['postcss']
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})