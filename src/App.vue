<template>
  <router-view />
</template>

<script setup lang="ts">
import { AxiosError } from "axios";
import api from "~/api";

import { useAppStore } from "~/stores/app";

const $q = useQuasar();
// 颜色主题为自动模式
$q.dark.set(true);

const router = useRouter();
const aS = useAppStore();
// 监视用户在线状态
aS.$subscribe(
  (mutation, store) => {
    let target = "";
    if (store.loading) {
      target = "/";
    } else if (store.online) {
      target = "/system";
    } else {
      target = "/sign";
    }
    router.push(target);
  },
  {
    immediate: true,
    detached: true,
  }
);

// 统一拦截器
api.instance.interceptors.response.use(undefined, (error: AxiosError) => {
  console.log("Error from response");
  console.log(error);
  if (!error.response) {
    $q.notify({
      type: "error",
      message: "网络出错了(*꒦ິ⌓꒦ີ)",
    });
  }
  return Promise.reject(error);
});

// 模拟加载数据的耗时过程
setTimeout(() => {
  aS.$patch({
    loading: false,
  });
}, 1000);
</script>

<style lang="scss">
html,
body,
button,
label,
input,
textarea,
select,
option {
  font-family: "Microsoft YaHei" !important;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: var(--q-primary);
}
::-webkit-scrollbar-track,
::-webkit-scrollbar-corner {
  background-color: var(--q-secondary);
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--q-info);
}
</style>
