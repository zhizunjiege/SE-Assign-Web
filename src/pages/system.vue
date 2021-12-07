<template>
  <q-page class="q-mx-auto ui-sys-page">
    <q-tabs align="justify" class="ui-sys-tabs">
      <q-route-tab v-for="tab in generatedTabs" :to="`/system/${tab.name}`" :label="tab.label" />
    </q-tabs>
    <q-tab-panels model-value="index" animated class="transparent">
      <q-tab-panel name="index">
        <router-view />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { useUserStore } from "~/stores/user";

const router = useRouter();
const aS = useAppStore();
if (!aS.online) {
  router.push("/sign");
}

const uS = useUserStore();
const generatedTabs = computed(() => {
  switch (uS.role) {
    case "管理员":
      return [
        { name: "notice", label: "系统公告" },
        { name: "user", label: "用户管理" },
        { name: "bysj", label: "课题管理" },
      ];
    case "教师":
      return [
        { name: "notice", label: "系统公告" },
        { name: "my-topic", label: "我的课题" },
        { name: "selected-student", label: "已选学生" },
      ];
    case "学生":
      return [
        { name: "notice", label: "系统公告" },
        { name: "topic-list", label: "课题列表" },
        { name: "selected-topic", label: "已选课题" },
      ];
    default:
      return [];
  }
});
</script>

<style scoped lang="scss">
.ui-sys-page {
  width: 1400px;
  height: 1px;
}
.ui-sys-tabs {
  position: sticky;
  top: 4rem;
  border-bottom: 1px solid var(--q-negative);
}
</style>

<route lang="yaml">
redirect: /system/notice
meta:
  layout: home
</route>
