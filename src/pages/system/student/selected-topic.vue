<template>
  <TopicContent :topic="topicContent" />
</template>

<script setup lang="ts">
import TopicContent from "./topic-content.vue";

import { useTopicStore, Topic } from "~/stores/student/topic";

const tS = useTopicStore();

const topicId = ref(-1);
const topicContent = ref({} as Topic);
(async () => {
  if (tS.list.length) {
    topicContent.value = tS.list.find((e) => e.id === topicId.value)!;
  } else {
    topicContent.value = await tS.getSelectedTopic();
  }
})();
</script>

<style scoped lang="scss"></style>

<route lang="yaml">
alias: selected-topic
</route>
