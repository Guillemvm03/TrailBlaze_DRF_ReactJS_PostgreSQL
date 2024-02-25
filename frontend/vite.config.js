// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  optimizeDeps: {
    exclude: ['@here/maps-api-for-javascript']
  },
  esbuild: {
    jsxInject: "import React from 'react'"
  },
  resolve: {
    alias: {
      '@': '/src' // Aquí establecemos el alias "@"
    }
  }
});
