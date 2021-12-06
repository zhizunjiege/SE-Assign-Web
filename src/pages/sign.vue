<template>
  <q-card v-if="mode === 'signIn'" class="ui-sign-card">
    <q-card-section>登陆</q-card-section>
    <q-card-section>
      <q-input v-model="uS.username" autocomplete filled label="账号" class="q-mb-md" />
      <q-input v-model="uS.password" type="password" autocomplete filled label="密码" />
    </q-card-section>
    <q-card-section>
      <q-btn label="登陆" class="full-width" @click="signIn" />
    </q-card-section>
  </q-card>
  <h3 v-else class="text-positive">登出成功！</h3>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const router = useRouter();
const route = useRoute();
const uS = useUserStore();

// 监视用户在线状态
watch(
  () => uS.online,
  (online) => {
    router.push(online ? "/system" : "/sign");
  }
);

// 页面显示模式
const mode = ref("signIn");
if (route.query.mode) {
  mode.value = route.query.mode as string;
}

// 登录
async function signIn() {
  await uS.signIn();
  alert("登陆成功");
}
</script>

<style scoped lang="scss">
.ui-sign-card {
  width: 500px;
  background-color: var(--q-negative);
}
</style>

<route lang="yaml">
meta:
  layout: center
</route>
