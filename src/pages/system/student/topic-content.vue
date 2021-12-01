<template>
  <h5 class="q-my-lg text-center">{{ content?.title }}</h5>
  <div class="q-mx-auto ui-topic-container">
    <div class="ui-topic-section">
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">课题难度</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.difficulty }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">发布时间</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.createTime }}</div>
        </div>
      </div>
    </div>
    <div class="ui-topic-section">
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">课题简介</div>
        <div class="col-8">
          <div class="float-right ui-topic-multi">{{ content?.description }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">学生要求</div>
        <div class="col-8">
          <div class="float-right ui-topic-multi">{{ content?.requirement }}</div>
        </div>
      </div>
    </div>
    <div class="ui-topic-section">
      <div class="row flex-center ui-topic-section-item">教师信息</div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">姓名</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.teacher.name }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">性别</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.teacher.genderText }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">工号</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.teacher.jobNum }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">职称</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.teacher.title }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">研究方向</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.teacher.major }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">联系邮箱</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-topic-single">{{ content?.teacher.email }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-topic-section-item">
        <div class="col-4">个人简介</div>
        <div class="col-8">
          <div class="float-right ui-topic-multi">{{ content?.teacher.resume }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTopicStore } from "~/stores/student/topic";

const topicStore = useTopicStore();

const props = defineProps({
  topicId: {
    type: Number,
    required: true,
  },
});

const content = computed(() => topicStore.list.find((e) => e.id === props.topicId));
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
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--q-negative);
  }
}

@mixin ui-topic-info {
  width: 400px;
  border-radius: 4px;
  background-color: var(--q-negative);
}
.ui-topic-single {
  @include ui-topic-info;
  height: 2rem;
  padding: 0 1rem;
}
.ui-topic-multi {
  @include ui-topic-info;
  padding: 1rem;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
