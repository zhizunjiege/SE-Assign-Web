<template>
  <div class="q-mx-auto ui-student-container">
    <div v-if="tS.studentId >= 0" class="ui-student-section">
      <div class="row flex-center ui-student-section-item">学生信息</div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">姓名</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-student-single">{{ tS.student.name }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">性别</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-student-single">{{ tS.student.gender }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">学号</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-student-single">{{ tS.student.jobNum }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">班级</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-student-single">{{ tS.student.class }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">主修专业</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-student-single">{{ tS.student.major }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">联系邮箱</div>
        <div class="col-8">
          <div class="float-right flex items-center ui-student-single">{{ tS.student.email }}</div>
        </div>
      </div>
      <div class="row items-center justify-between ui-student-section-item">
        <div class="col-4">个人简介</div>
        <div class="col-8">
          <div class="float-right ui-student-multi">{{ tS.student.resume }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <h5 class="text-center text-positive">暂无学生选择此课题</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTopicStore } from "~/stores/teacher/topic";

const tS = useTopicStore();
</script>

<style scoped lang="scss">
.ui-student-container {
  width: 800px;
}
.ui-student-section {
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(--q-primary);
}
.ui-student-section-item {
  min-height: 3rem;
  padding: 0.5rem 1.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--q-negative);
  }
}

@mixin ui-student-info {
  width: 400px;
  border-radius: 4px;
  background-color: var(--q-negative);
}
.ui-student-single {
  @include ui-student-info;
  height: 2rem;
  padding: 0 1rem;
}
.ui-student-multi {
  @include ui-student-info;
  min-height: 200px;
  padding: 1rem;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
</style>

<route lang="yaml">
alias: selected-student
</route>
