<template>
  <TopicContent :topic-id="topicId" />
</template>

<script setup lang="ts">
import TopicContent from "./topic-content.vue";

import { useTopicStore } from "~/stores/student/topic";

const topicStore = useTopicStore();

const topicId = ref(-1);
(async () => {
  topicId.value = await topicStore.getSelectedTopicId();
})();
</script>

<style scoped lang="scss">
.ui-topic-container {
  width: 800px;
}
.ui-topic-section {
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(--q-primary);
}
.ui-topic-section-item {
  height: 3rem;
  padding: 0.5rem 1.5rem;
}
.ui-topic-section-item:not(:last-child) {
  border-bottom: 1px solid var(--q-negative);
}
.ui-topic-input {
  width: 300px;
  height: 2rem;
  border-radius: 4px;
  background-color: var(--q-negative);
}
</style>

<route lang="yaml">
alias: selected-topic
</route>
