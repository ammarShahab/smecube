import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Changed to your production backend
        changeOrigin: true,
        secure: false, 
      },
    }, 
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});