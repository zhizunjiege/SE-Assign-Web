<template>
  <q-markup-table separator="horizontal" class="q-mx-auto ui-details-table">
    <tbody>
      <tr>
        <td>姓名</td>
        <td>
          <q-input v-model="userStore.name" standout class="float-right ui-details-text" disable />
        </td>
      </tr>
      <tr>
        <td>性别</td>
        <td>
          <q-input v-model="userStore.genderText" standout class="float-right ui-details-text" disable />
        </td>
      </tr>
      <tr>
        <td>{{ userStore.identity === "teacher" ? "工号" : "学号" }}</td>
        <td>
          <q-input v-model="userStore.jobNum" standout class="float-right ui-details-text" disable />
        </td>
      </tr>
      <tr v-if="userStore.identity === 'teacher'">
        <td>职称</td>
        <td>
          <q-input v-model="userStore.title" standout class="float-right ui-details-text" disable />
        </td>
      </tr>
      <tr v-else>
        <td>班级</td>
        <td>
          <q-input v-model="userStore.class" standout class="float-right ui-details-text" disable />
        </td>
      </tr>
      <tr>
        <td>{{ userStore.identity === "teacher" ? "研究方向" : "主修专业" }}</td>
        <td>
          <q-input v-model="userStore.major" standout class="float-right ui-details-text" disable />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div class="flex items-center justify-end ui-details-sep">
    <q-icon v-if="!detDisabled" name="bi-check2" size="1.5rem" class="q-mr-sm ui-icon" @click="changeDetails">
      <q-tooltip anchor="top right" self="center left">确认修改</q-tooltip>
    </q-icon>
    <q-icon :name="detDisabled ? 'bi-pencil' : 'bi-x-lg'" size="1.1rem" class="ui-icon" @click="detDisabled = !detDisabled">
      <q-tooltip anchor="top right" self="center left">{{ detDisabled ? "修改信息" : "取消修改" }}</q-tooltip>
    </q-icon>
  </div>
  <q-markup-table separator="horizontal" class="q-mx-auto ui-details-table">
    <tbody>
      <tr>
        <td>邮箱</td>
        <td>
          <q-input v-model="userStore.email" standout class="float-right ui-details-text" :disable="detDisabled" />
        </td>
      </tr>
      <tr>
        <td>个人简介</td>
        <td>
          <q-input
            v-model="userStore.resume"
            type="textarea"
            standout
            rows="10"
            class="float-right ui-details-textarea"
            :disable="detDisabled"
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const detDisabled = ref(true);
const verifyCode = ref("");

async function changeDetails() {
  detDisabled.value = true;
  await userStore.changeDetails(verifyCode.value);
  alert("邮箱修改成功");
}
</script>

<style scoped lang="scss">
.ui-details-table {
  width: 600px;
  :deep(tbody td) {
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    border-color: var(--q-negative);
  }
}
.ui-details-sep {
  width: 600px;
  height: 1.5rem;
  margin: 1rem auto 1rem auto;
  padding: 0 1.5rem;
}

@mixin ui-details-input {
  width: 300px;
  border-radius: 4px;
  :deep(input),
  :deep(textarea) {
    color: var(--q-positive) !important;
  }
  :deep(.q-field__control) {
    background-color: var(--q-negative) !important;
  }
}
.ui-details-text {
  @include ui-details-input;
  height: 2rem;
  :deep(.q-field__control) {
    height: 2rem;
  }
}
.ui-details-textarea {
  @include ui-details-input;
}
</style>
