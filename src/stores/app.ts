export const useAppStore = defineStore("app", {
  state: () => ({
    loading: true, // 是否正在加载
    online: false, // 用户是否在线
  }),
});
