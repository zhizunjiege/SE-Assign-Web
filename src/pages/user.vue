<template>
  <q-page class="q-mx-auto ui-user-page">
    <div class="flex items-center justify-between q-mx-auto ui-user-avatar">
      <q-avatar size="8rem">
        <q-icon name="bi-person-circle" size="8rem" />
      </q-avatar>
      <div class="text-center">
        <h5>{{ uS.name }}</h5>
      </div>
      <q-badge :label="uS.role" class="text-subtitle1" />
    </div>
    <q-splitter v-model="splitterModel" class="ui-user-splitter">
      <template #before>
        <q-tabs v-model="tab" vertical>
          <q-route-tab v-for="tab in generatedTabs" :to="`/user/${tab.name}`" :name="tab.name" :label="tab.label" />
        </q-tabs>
      </template>
      <template #after>
        <q-tab-panels v-model="tab" animated vertical class="transparent">
          <q-tab-panel v-for="tab in generatedTabs" :name="tab.name">
            <router-view />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const uS = useUserStore();

const splitterModel = ref(15);
const tab = ref("detail");

const generatedTabs = [
  { name: "detail", label: "个人信息" },
  { name: "reset", label: "重置密码" },
];
</script>

<style scoped lang="scss">
.ui-user-page {
  width: 1400px;
  height: 1px;
}
.ui-user-avatar {
  width: 320px;
  height: 160px;
}
.ui-user-splitter {
  height: 700px;
}
</style>

<route lang="yaml">
redirect: /user/detail
meta:
  layout: home
</route>
