import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  build: {
    assets: 'assets',
  },
  site: 'https://ec2-13-61-2-249.eu-north-1.compute.amazonaws.com',
  base: '/',
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-accordion'],
          },
        },
      },
    },
  },
});
