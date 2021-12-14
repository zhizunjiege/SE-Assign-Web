<template>
  <q-card class="bg-secondary ui-sign-card">
    <q-card-section class="text-h6">登录</q-card-section>
    <q-card-section>
      <q-input v-model="uS.username" autocomplete filled label="账号" placeholder="4到16位大小写字母或数字" class="q-mb-md" />
      <q-input v-model="uS.password" type="password" autocomplete filled label="密码" placeholder="8到16位大小写字母或数字" />
    </q-card-section>
    <q-card-section>
      <q-btn label="登录" color="info" class="full-width" @click="signIn" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { useUserStore } from "~/stores/user";

import { errorHandler } from "~/utils";

const router = useRouter();
const aS = useAppStore();
if (aS.online) {
  router.push("/system");
}

const $q = useQuasar();
const uS = useUserStore();
// 登录
const uReg = /^[a-zA-Z0-9]{4,16}$/;
const pReg = /^[a-zA-Z0-9]{8,16}$/;
async function signIn() {
  if (uReg.test(uS.username) && pReg.test(uS.password)) {
    try {
      await uS.signIn();
      $q.notify({
        type: "info",
        message: "登录成功啦",
      });
    } catch (e) {
      errorHandler(e, {
        401: () => {
          $q.notify({
            type: "error",
            message: "账号或密码错误，请重新输入",
          });
        },
      });
    }
  } else {
    $q.notify({
      type: "warning",
      message: "账号或密码格式不对哦",
    });
  }
}
</script>

<style scoped lang="scss">
.ui-sign-card {
  width: 500px;
}
</style>

<route lang="yaml">
meta:
  layout: center
</route>
