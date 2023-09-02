import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sanity from "astro-sanity";
import vue from "@astrojs/vue";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://lacanterarecreacion.org.ar/",
  integrations: [
    react(),
    tailwind(),
    // prefetch(),
    sanity({
      projectId: "1ekf84ne",
      dataset: "production",
      apiVersion: "2023-02-08",
      useCdn: true,
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    sitemap(),
  ],
});
