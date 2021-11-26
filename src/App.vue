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

.body--light {
  --q-primary: #10253fb2; /* 主色调 */
  --q-secondary: #10253fff; /* 次色调 */

  --q-accent: #00e0ffff; /* 强调，用于active状态前景色 */
  --q-positive: #1f334aff; /* 突出，用于active状态背景色 */

  --ui-darken: #ffffff73; /* 输入组件提示文字 */
  --q-negative: #ffffff0d; /* 输入组件背景 */

  --q-info: #068295ff; /* 提示 */
  --q-warning: #f2c037ff; /* 警告 */
  --ui-error: #c10015ff; /* 错误 */
  --ui-disabled: #040b22ff; /* 禁用 */

  /* 仅支持quasar内部使用，代码中不要使用，有其他替代，如primary替代dark，disabled替代dark-page */
  --q-dark: #10253fb2; /* dark mode下其他组件底色 */
  --q-dark-page: #040b22ff; /* dark mode下body底色 */
}
.body--dark {
  --q-primary: #10253fb2; /* 主色调 */
  --q-secondary: #10253fff; /* 次色调 */

  --q-accent: #00e0ffff; /* 强调，用于active状态前景色 */
  --q-positive: #1f334aff; /* 突出，用于active状态背景色 */

  --ui-darken: #ffffff73; /* 输入组件提示文字 */
  --q-negative: #ffffff0d; /* 输入组件背景 */

  --q-info: #068295ff; /* 提示 */
  --q-warning: #f2c037ff; /* 警告 */
  --ui-error: #c10015ff; /* 错误 */
  --ui-disabled: #040b22ff; /* 禁用 */

  /* 仅支持quasar内部使用，代码中不要使用，有其他替代，如primary替代dark，disabled替代dark-page */
  --q-dark: #10253fb2; /* dark mode下其他组件底色 */
  --q-dark-page: #040b22ff; /* dark mode下body底色 */
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: var($primary);
}

::-webkit-scrollbar-track {
  background-color: var(--q-secondary);
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--q-positive);
}
</style>
