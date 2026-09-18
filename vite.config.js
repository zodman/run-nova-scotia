import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-dom/client', 
      'lucide-react', 
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
