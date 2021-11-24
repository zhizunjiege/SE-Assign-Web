import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, quasarConfig } from "./quasar";
import router from "./router";
import { store, key } from "./store";

const app = createApp(App).use(Quasar, quasarConfig).use(router).use(store, key);

// 挂载app
app.mount("#app");
// 当关闭页面时先卸载app
window.addEventListener("beforeunload", () => {
  app.unmount();
});
