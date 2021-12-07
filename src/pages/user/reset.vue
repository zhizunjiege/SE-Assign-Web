<template>
  <q-markup-table separator="horizontal" class="q-pa-none q-mx-auto ui-reset-table">
    <tbody>
      <tr>
        <td>旧密码</td>
        <td>
          <q-input
            v-model="oldPwd"
            type="password"
            standout
            placeholder="8到16位大小写字母或数字"
            class="float-right ui-reset-input"
          />
        </td>
      </tr>
      <tr>
        <td>新密码</td>
        <td>
          <q-input
            v-model="newPwd"
            type="password"
            standout
            placeholder="8到16位大小写字母或数字"
            class="float-right ui-reset-input"
          />
        </td>
      </tr>
      <tr>
        <td>确认密码</td>
        <td>
          <q-input
            v-model="repeatPwd"
            type="password"
            standout
            placeholder="8到16位大小写字母或数字"
            class="float-right ui-reset-input"
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div class="q-mx-auto q-my-lg flex justify-end ui-reset-btn-group">
    <q-btn label="确认" class="bg-primary ui-reset-btn" @click="updatePassword" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const $q = useQuasar();
const uS = useUserStore();

const oldPwd = ref("");
const newPwd = ref("");
const repeatPwd = ref("");

const pReg = /^[a-zA-Z0-9]{8,16}$/;
async function updatePassword() {
  if (!pReg.test(oldPwd.value) || !pReg.test(newPwd.value)) {
    $q.notify({
      type: "warning",
      message: "旧密码或新密码格式不对哦",
    });
  } else if (newPwd.value !== repeatPwd.value) {
    $q.notify({
      type: "warning",
      message: "确认密码与新密码不一致呀",
    });
  } else {
    try {
      await uS.updatePassword(oldPwd.value, newPwd.value);
      oldPwd.value = "";
      newPwd.value = "";
      repeatPwd.value = "";
      $q.notify({
        type: "info",
        message: "密码修改成功啦",
      });
    } catch (e) {
      if (e instanceof Error) {
        $q.notify({
          type: "error",
          message: "网络出错了(*꒦ິ⌓꒦ີ)",
        });
      }
    }
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
