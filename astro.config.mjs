import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";
import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import sanity from "astro-sanity";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://lacanteraweb.netlify.app/",
  integrations: [
    mdx(),
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    // prefetch(),
    svelte(),
    sanity({
      projectId: "1ekf84ne",
      dataset: "production",
      apiVersion: "2023-02-08",
      useCdn: false,
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
  ],
});
