import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

export default defineConfig({
  integrations: [react(), tailwind()],
  trailingSlash: 'never',
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
