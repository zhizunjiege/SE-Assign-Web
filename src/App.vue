<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";

const $q = useQuasar();

// 颜色主题为自动模式
$q.dark.set("auto");

const appStore = useAppStore();

setTimeout(() => {
  appStore.loading = false;
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

::-webkit-scrollbar-track {
  background-color: var(--q-secondary);
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--q-positive);
}
</style>
