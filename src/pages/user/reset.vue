<template>
  <q-markup-table separator="horizontal" class="q-pa-none q-mx-auto ui-reset-table">
    <tbody>
      <tr>
        <td>旧密码</td>
        <td>
          <q-input v-model="oldPwd" type="password" standout class="float-right ui-reset-input" />
        </td>
      </tr>
      <tr>
        <td>新密码</td>
        <td>
          <q-input v-model="newPwd" type="password" standout class="float-right ui-reset-input" />
        </td>
      </tr>
      <tr>
        <td>确认密码</td>
        <td>
          <q-input v-model="repeatPwd" type="password" standout class="float-right ui-reset-input" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div class="q-mx-auto q-my-lg flex justify-end ui-reset-btn-group">
    <q-btn label="确认" class="bg-primary ui-reset-btn" @click="changePwd" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const $q = useQuasar();
const uS = useUserStore();

const oldPwd = ref("");
const newPwd = ref("");
const repeatPwd = ref("");

async function changePwd() {
  if (newPwd.value !== repeatPwd.value) {
    $q.notify({
      type: "warning",
      message: "确认密码与新密码不一致！",
    });
  } else {
    oldPwd.value = "";
    newPwd.value = "";
    repeatPwd.value = "";
    await uS.changePwd(oldPwd.value, newPwd.value);
    alert("密码修改成功");
  }
}
</script>

<style scoped lang="scss">
.ui-reset-table {
  width: 600px;
  :deep(tbody td) {
    height: 50px;
    padding: 0 25px;
    border-color: var(--q-negative);
  }
}
.ui-reset-input {
  width: 300px;
  height: 36px;
  border-radius: 4px;
  :deep(input) {
    color: white !important;
  }
  :deep(.q-field__control) {
    height: 36px;
    background-color: var(--q-negative) !important;
  }
}
.ui-reset-btn-group {
  width: 600px;
}
.ui-reset-btn {
  width: 200px;
}
</style>
