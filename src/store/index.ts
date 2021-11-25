import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

export default pinia;

export const useStore = defineStore("app", {
  state: () => ({
    online: false,
  }),
});
