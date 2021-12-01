<template>
  <q-card v-if="mode === 'signIn'" class="ui-sign-card">
    <q-card-section>登陆</q-card-section>
    <q-card-section>
      <q-input v-model="userStore.username" autocomplete filled label="账号" class="q-mb-md" />
      <q-input v-model="userStore.password" type="password" autocomplete filled label="密码" />
    </q-card-section>
    <q-card-section>
      <q-btn label="登陆" class="full-width" @click="signIn" />
    </q-card-section>
    <q-card-section class="flex justify-between">
      <span>还没有账号，去<a @click="mode = 'signUp'" class="ui-link">注册</a></span>
      <span><a @click="mode = 'reset'" class="ui-link">忘记密码</a></span>
    </q-card-section>
  </q-card>
  <q-card v-else-if="mode === 'signUp'" class="ui-sign-card">
    <q-card-section>注册</q-card-section>
    <q-card-section>
      <q-input v-model="userStore.username" autocomplete filled label="账号" class="q-mb-md" />
      <q-input v-model="userStore.password" type="password" autocomplete filled label="密码" class="q-mb-md" />
      <q-input v-model="idCardNum" filled label="身份证号" />
    </q-card-section>
    <q-card-section>
      <q-btn label="注册" class="full-width" @click="signUp" />
    </q-card-section>
    <q-card-section class="flex justify-center">
      <span>已有账号，去<a @click="mode = 'signIn'" class="ui-link">登录</a></span>
    </q-card-section>
  </q-card>
  <q-card v-else-if="mode === 'reset'" class="ui-sign-card">
    <q-card-section>重置密码</q-card-section>
    <q-card-section>
      <q-input v-model="userStore.username" autocomplete filled label="账号" class="q-mb-md" />
      <q-input v-model="userStore.password" type="password" autocomplete filled label="密码" class="q-mb-md" />
      <q-input v-model="verifyCode" filled label="验证码" />
    </q-card-section>
    <q-card-section>
      <q-btn label="确定" class="full-width" @click="resetPwd" />
    </q-card-section>
    <q-card-section class="flex justify-center">
      <span><a @click="mode = 'signIn'" class="ui-link">账号密码登录</a></span>
    </q-card-section>
  </q-card>
  <h3 v-else class="text-primary">登出成功！</h3>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 监视用户在线状态
watch(
  () => userStore.online,
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
  await userStore.signIn();
  alert("登陆成功");
  router.push("/system");
}

// 注册
const idCardNum = ref("");
async function signUp() {
  await userStore.signUp();
  alert("注册成功");
}

// 重置密码
const verifyCode = ref("");
async function resetPwd() {
  await userStore.resetPwd();
  alert("重置密码成功");
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
