import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

export default defineConfig({
  integrations: [react(), tailwind()],
  base: '/',                
  trailingSlash: 'never',
  server: {
    port: 4321,
    host: true,
    proxy: { "/wp-json": "http://localhost:8080" },
  },
  prefetch: true,
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@styles": "/src/styles",
        "@utils": "/src/utils",
      },
    },
  },
});
