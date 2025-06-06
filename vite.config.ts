import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/random-barcode/',
  define: {
    APP_VERSION: JSON.stringify(version),
  },
});
