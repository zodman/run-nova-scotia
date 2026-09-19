import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: [
      { find: /^lucide-react$/, replacement: path.resolve(__dirname, './src/icons.js') },
    ],
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-dom/client', 
      'react/jsx-dev-runtime'
    ],
  },
  server: {
    port: 3000,
    host: true,
    open: false,
    watch: {
      usePolling: true,
      interval: 800
    }
  }
});
