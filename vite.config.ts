import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@component': path.resolve(__dirname, './src/components'),
      '@service': path.resolve(__dirname, './src/services'),
      '@page': path.resolve(__dirname, './src/pages'),
      '@util': path.resolve(__dirname, './src/utils'),
    },
  },
});
