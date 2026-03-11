import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
      "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/@mui/") ||
            id.includes("/@emotion/") ||
            id.includes("/@popperjs/")
          ) {
            return "ui-vendor";
          }

          if (id.includes("/react-router/")) {
            return "router-vendor";
          }

          if (id.includes("/@tanstack/react-query/")) {
            return "query-vendor";
          }

          if (
            id.includes("/react-hook-form/") ||
            id.includes("/@hookform/resolvers/") ||
            id.includes("/zod/")
          ) {
            return "form-vendor";
          }

          if (
            id.includes("/i18next/") ||
            id.includes("/react-i18next/")
          ) {
            return "i18n-vendor";
          }

          if (id.includes("/axios/")) {
            return "http-vendor";
          }
        },
      },
    },
  },
});
