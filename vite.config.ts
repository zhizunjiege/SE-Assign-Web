import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        "vue",
        "quasar",
        "vue-router",
        "pinia",
        {
          axios: [["default", "axios"]],
        },
      ],
      dts: "src/imports.d.ts",
    }),
    Components({
      dirs: ["src/components"],
      dts: "src/components.d.ts",
      deep: true,
    }),
    Pages({
      dirs: "src/pages",
      routeBlockLang: "yaml",
    }),
    Layouts({
      layoutsDir: "src/layouts",
      defaultLayout: "home",
    }),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
    fs: {
      strict: true,
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    brotliSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/")) {
            const modules = ["vue", "quasar"];
            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`));
            return chunk ? `vendor-${chunk}` : "vendor";
          }
        },
      },
    },
  },
});
