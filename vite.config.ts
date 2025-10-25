import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'


export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
