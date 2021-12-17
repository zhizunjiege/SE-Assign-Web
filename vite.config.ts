import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: "src/css/variables.scss",
    }),
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
      dts: "src/types/imports.d.ts",
    }),
    Components({
      dirs: ["src/components"],
      dts: "src/types/components.d.ts",
      deep: true,
    }),
    Pages({
      dirs: "src/pages",
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
    proxy: {
      "^/(?:user|topic)": {
        target: "http://10.135.67.153:10011",
        changeOrigin: true,
      },
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
            const modules = ["quasar"];
            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`));
            return chunk ? `vendor-${chunk}` : "vendor";
          }
        },
      },
    },
  },
});
