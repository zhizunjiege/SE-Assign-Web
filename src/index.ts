import App from "./App.vue";

import { Quasar, Notify, LocalStorage, SessionStorage } from "quasar";
import iconSet from "quasar/icon-set/material-icons";
import langCn from "quasar/lang/zh-CN";
import "quasar/dist/quasar.prod.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";

import { createRouter, createWebHashHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

// 配置quasar
Notify.setDefaults({
  type: "info",
  timeout: 1000,
});
Notify.setDefaults({
  type: "warning",
  timeout: 1500,
});
Notify.registerType("error", {
  color: "error",
  timeout: 2000,
  icon: "warning",
});
Notify.registerType("ask", {
  color: "info",
  timeout: 0,
  icon: "help",
  position: "center",
});

const quasarConfig = {
  config: {},
  iconSet: iconSet,
  lang: langCn,
  plugins: {
    Notify,
    LocalStorage,
    SessionStorage,
  },
};

// 配置vue-router
const routes = setupLayouts(generatedRoutes);

console.log(generatedRoutes);
console.log(routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 生成app实例
const app = createApp(App).use(Quasar, quasarConfig).use(router).use(createPinia());

// 挂载app
app.mount("#app");
// 关闭页面前卸载app
window.addEventListener("beforeunload", () => {
  app.unmount();
});
