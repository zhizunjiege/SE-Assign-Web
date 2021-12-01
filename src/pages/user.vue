<template>
  <q-page class="q-mx-auto ui-user-page">
    <div class="flex items-center justify-between q-mx-auto ui-user-avatar">
      <q-avatar size="8rem">
        <q-img v-if="userStore.identity === 'admin'" :src="AVATAR_ADMIN" width="8rem" height="8rem" />
        <q-icon v-else name="bi-person-circle" size="8rem" />
      </q-avatar>
      <div class="text-center">
        <h5>{{ userStore.name }}</h5>
      </div>
      <q-badge :label="userStore.identityText" class="text-subtitle1" />
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

import AVATAR_ADMIN from "~/assets/avatar/admin.svg";

const userStore = useUserStore();

const splitterModel = ref(15);
const tab = ref("account");

const generatedTabs = computed(() => {
  switch (userStore.identity) {
    case "admin":
      return [
        { name: "account", label: "账户信息" },
        { name: "permission", label: "权限信息" },
      ];
    case "teacher":
    case "student":
      return [
        { name: "account", label: "账户信息" },
        { name: "details", label: "详细信息" },
      ];
    default:
      return [];
  }
});
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
redirect: /user/account
meta:
  layout: home
</route>
