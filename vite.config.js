import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Future Django: add server.proxy { '/api': 'http://localhost:8000' }
export default defineConfig({
  base: './',
  plugins: [react()]
});
