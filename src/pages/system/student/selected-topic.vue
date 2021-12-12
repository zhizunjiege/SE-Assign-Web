<template>
  <TopicContent v-if="tS.chosen" :topic="tS.chosen" />
  <div v-else>
    <h5 class="text-center text-positive">暂未选择课题</h5>
  </div>
  <div class="q-my-lg"></div>
</template>

<script setup lang="ts">
import TopicContent from "./topic-content.vue";

import { useTopicStore } from "~/stores/student/topic";

const $q = useQuasar();
const tS = useTopicStore();

(async () => {
  try {
    await tS.getChosenTopic();
  } catch (e) {
    if (e instanceof Error) {
      $q.notify({
        type: "error",
        message: "网络出错了(*꒦ິ⌓꒦ີ)",
      });
    }
  }
})();
</script>

<style scoped lang="scss"></style>

<route lang="yaml">
alias: selected-topic
</route>
