import App from "./App.vue";

import { Quasar, Notify, LocalStorage, SessionStorage } from "quasar";
import iconSet from "quasar/icon-set/bootstrap-icons";
import langCn from "quasar/lang/zh-CN";
import "quasar/src/css/index.sass";
import "@quasar/extras/bootstrap-icons/bootstrap-icons.css";

import { createRouter, createWebHashHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

import "~/css/index.scss";

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
  icon: "bi-exclamation",
});
Notify.registerType("ask", {
  color: "info",
  timeout: 0,
  icon: "bi-question",
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
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 生成app实例
createApp(App).use(Quasar, quasarConfig).use(router).use(createPinia()).mount("#app");
