import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
            const chunk = modules.find((module) =>
              id.includes(`/node_modules/${module}`)
            );
            return chunk ? `vendor-${chunk}` : "vendor";
          }
        },
      },
    },
  },
});
