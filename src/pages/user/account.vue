<template>
  <q-markup-table separator="horizontal" class="q-pa-none q-mx-auto ui-account-table">
    <tbody>
      <tr>
        <td>账号</td>
        <td>
          <q-input v-model="userStore.username" standout class="float-right ui-account-input" disable />
        </td>
      </tr>
      <tr>
        <td>密码</td>
        <td>
          <q-input
            v-model="userStore.password"
            type="password"
            standout
            class="float-right ui-account-input"
            :disable="pwdDisabled"
          >
            <template #after>
              <q-icon v-if="!pwdDisabled" name="bi-check2" size="1.5rem" class="q-mr-sm ui-icon" @click="changePwd">
                <q-tooltip anchor="top right" self="center left">确认修改</q-tooltip>
              </q-icon>
              <q-icon
                :name="pwdDisabled ? 'bi-pencil' : 'bi-x-lg'"
                size="1.1rem"
                class="ui-icon"
                @click="pwdDisabled = !pwdDisabled"
              >
                <q-tooltip anchor="top right" self="center left">{{ pwdDisabled ? "修改密码" : "取消修改" }}</q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </td>
      </tr>
      <tr v-if="!pwdDisabled">
        <td>验证码</td>
        <td>
          <q-input v-model="verifyCode" standout class="float-right ui-account-input" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const pwdDisabled = ref(true);
const verifyCode = ref("");

async function changePwd() {
  pwdDisabled.value = true;
  await userStore.changePwd(verifyCode.value);
  alert("密码修改成功");
}
</script>

<style scoped lang="scss">
.ui-account-table {
  width: 600px;
  :deep(tbody td) {
    height: 50px;
    padding: 0 25px;
    border-color: var(--q-negative);
  }
}
.ui-account-input {
  width: 300px;
  height: 36px;
  border-radius: 4px;
  :deep(input) {
    color: white !important;
  }
  :deep(.q-field__control),
  :deep(.q-field__after) {
    height: 36px;
  }
  :deep(.q-field__control) {
    background-color: var(--q-negative) !important;
  }
}
.ui-account-btn {
  width: 300px;
}
</style>
