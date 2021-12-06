<template>
  <q-markup-table v-if="showMode" class="text-center">
    <thead>
      <tr>
        <th scope="col">课题名称</th>
        <th scope="col">课题难度</th>
        <th scope="col">教师姓名</th>
        <th scope="col">教师职称</th>
        <th scope="col">发布时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="topic in tS.list" :key="topic.id" class="cursor-pointer" @click="showContent(topic.id)">
        <td>{{ topic.title }}</td>
        <td>{{ topic.difficulty }}</td>
        <td>{{ topic.teacher!.name }}</td>
        <td>{{ topic.teacher!.title }}</td>
        <td>{{ topic.createTime }}</td>
      </tr>
    </tbody>
  </q-markup-table>
  <div v-else>
    <TopicContent :topic="topicContent!" />
    <div class="q-mx-auto q-my-lg flex justify-between ui-list-btn-group">
      <q-btn label="返回" class="bg-primary ui-list-btn" @click="showList" />
      <q-btn label="选择此课题" class="bg-primary ui-list-btn" @click="chooseTopic" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopicContent from "./topic-content.vue";

import { useTopicStore } from "~/stores/student/topic";

const tS = useTopicStore();

const showMode = ref(true);
const topicId = ref(-1);
const topicContent = computed(() => tS.list.find((e) => e.id === topicId.value));
function showList() {
  topicId.value = -1;
  showMode.value = true;
}
function showContent(id: number) {
  topicId.value = id;
  showMode.value = false;
}

async function chooseTopic() {
  await tS.setSelectedTopic(topicId.value);
  alert("选择课题成功");
}

(async () => {
  await tS.getTopicList();
})();
</script>

<style scoped lang="scss">
.ui-list-btn-group {
  width: 800px;
}
.ui-list-btn {
  width: 200px;
}
</style>

<route lang="yaml">
alias: topic-list
</route>
