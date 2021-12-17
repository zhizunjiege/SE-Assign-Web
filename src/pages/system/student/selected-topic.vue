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
import { errorHandler } from "~/utils";

const $q = useQuasar();
const tS = useTopicStore();

(async () => {
  try {
    await tS.getChosenTopic();
  } catch (e) {
    errorHandler(e, {
      400: () => {
        $q.notify({
          type: "warning",
          message: "您尚未选择一个课题",
        });
      },
      401: () => {
        $q.notify({
          type: "error",
          message: "身份验证失败",
        });
      },
    });
  }
})();
</script>

<style scoped lang="scss"></style>

<route lang="yaml">
alias: selected-topic
</route>
