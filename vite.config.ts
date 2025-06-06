import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pkg from "./package.json" assert { type: "json" };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/random-barcode/",
  define: {
    APP_VERSION: JSON.stringify(pkg.version),
  },
});
