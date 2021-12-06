<template>
  <q-markup-table separator="horizontal" class="q-mx-auto ui-detail-table">
    <tbody>
      <tr>
        <td>账号</td>
        <td>
          <q-input v-model="uS.username" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
      <tr>
        <td>姓名</td>
        <td>
          <q-input v-model="uS.name" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
      <tr>
        <td>性别</td>
        <td>
          <q-input v-model="uS.gender" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
      <tr>
        <td>{{ uS.role === "teacher" ? "工号" : "学号" }}</td>
        <td>
          <q-input v-model="uS.jobNum" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
      <tr v-if="uS.role === 'teacher'">
        <td>职称</td>
        <td>
          <q-input v-model="uS.title" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
      <tr v-else>
        <td>班级</td>
        <td>
          <q-input v-model="uS.class" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
      <tr>
        <td>{{ uS.role === "teacher" ? "研究方向" : "主修专业" }}</td>
        <td>
          <q-input v-model="uS.major" standout class="float-right ui-detail-text" disable />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div class="flex items-center justify-end ui-detail-sep">
    <q-icon v-if="!detDisabled" name="bi-check2" size="1.5rem" class="q-mr-sm ui-icon" @click="changeDetails">
      <q-tooltip anchor="top right" self="center left">确认修改</q-tooltip>
    </q-icon>
    <q-icon :name="detDisabled ? 'bi-pencil' : 'bi-x-lg'" size="1.1rem" class="ui-icon" @click="detDisabled = !detDisabled">
      <q-tooltip anchor="top right" self="center left">{{ detDisabled ? "修改信息" : "取消修改" }}</q-tooltip>
    </q-icon>
  </div>
  <q-markup-table separator="horizontal" class="q-mx-auto ui-detail-table">
    <tbody>
      <tr>
        <td>邮箱</td>
        <td>
          <q-input v-model="uS.email" standout class="float-right ui-detail-text" :disable="detDisabled" />
        </td>
      </tr>
      <tr>
        <td>个人简介</td>
        <td>
          <q-input
            v-model="uS.resume"
            type="textarea"
            standout
            rows="10"
            class="float-right ui-detail-textarea"
            :disable="detDisabled"
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const uS = useUserStore();

const detDisabled = ref(true);

async function changeDetails() {
  detDisabled.value = true;
  await uS.changeDetails();
  alert("信息修改成功");
}
</script>

<style scoped lang="scss">
.ui-detail-table {
  width: 600px;
  :deep(tbody td) {
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    border-color: var(--q-negative);
  }
}
.ui-detail-sep {
  width: 600px;
  height: 1.5rem;
  margin: 1rem auto 1rem auto;
  padding: 0 1.5rem;
}

@mixin ui-detail-input {
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
.ui-detail-text {
  @include ui-detail-input;
  height: 2rem;
  :deep(.q-field__control) {
    height: 2rem;
  }
}
.ui-detail-textarea {
  @include ui-detail-input;
}
</style>
