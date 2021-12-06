<template>
  <q-markup-table separator="horizontal" class="q-mx-auto q-mb-md ui-topic-table">
    <tbody>
      <tr>
        <td>标题</td>
        <td>
          <q-input v-model="tS.title" standout class="float-right ui-topic-text" />
        </td>
      </tr>
      <tr>
        <td>课题难度</td>
        <td>
          <q-input v-model="tS.difficulty" standout class="float-right ui-topic-text" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <q-markup-table separator="horizontal" class="q-mx-auto q-mb-md ui-topic-table">
    <tbody>
      <tr>
        <td>课题简介</td>
        <td>
          <q-input v-model="tS.description" type="textarea" standout rows="10" class="float-right ui-topic-textarea" />
        </td>
      </tr>
      <tr>
        <td>学生要求</td>
        <td>
          <q-input v-model="tS.requirement" type="textarea" standout rows="10" class="float-right ui-topic-textarea" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div class="q-mx-auto q-my-lg flex justify-end ui-topic-btn-group">
    <q-btn :label="tS.id < 0 ? '新建课题' : '修改课题'" class="bg-primary ui-topic-btn" @click="setTopic" />
  </div>
</template>

<script setup lang="ts">
import { useTopicStore } from "~/stores/teacher/topic";

const tS = useTopicStore();

async function setTopic() {
  await tS.setTopic();
  alert("课题修改成功");
}
</script>

<style scoped lang="scss">
.ui-topic-table {
  width: 800px;
  :deep(tbody td) {
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    border-color: var(--q-negative);
  }
}

@mixin ui-topic-input {
  width: 400px;
  border-radius: 4px;
  :deep(input),
  :deep(textarea) {
    color: var(--q-positive) !important;
  }
  :deep(.q-field__control) {
    background-color: var(--q-negative) !important;
  }
}
.ui-topic-text {
  @include ui-topic-input;
  height: 2rem;
  :deep(.q-field__control) {
    height: 2rem;
  }
}
.ui-topic-textarea {
  @include ui-topic-input;
}
.ui-topic-btn-group {
  width: 800px;
}
.ui-topic-btn {
  width: 200px;
}
</style>

<route lang="yaml">
alias: my-topic
</route>
