<script setup lang="ts">
import { useQuasar } from "quasar";
const $q = useQuasar();
// const router = useRouter();

// 侧边导航栏状态
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="ui-header-toolbar">
        <q-btn dense flat round icon="menu" :class="{ 'text-accent': leftDrawerOpen }" @click="toggleLeftDrawer" />
        <q-toolbar-title shrink class="ui-header-title"> 自动化科学与电气工程学院 </q-toolbar-title>
        <div class="row q-ml-xl bg-secondary shadow-2 ui-header-menus"></div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above elevated side="left" :width="256">
      <q-list class="full-height column"> </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
      <q-toolbar class="justify-end ui-footer-toolbar">
        <q-toolbar-title shrink class="ui-footer-title"> © 2021 V1.0 </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped>
/* 定义header样式 */
.ui-header-toolbar {
  min-height: 0;
  height: 50px;
}
.ui-header-title {
  min-width: 240px !important;
  padding-left: 18px;
  line-height: 0;
}
.ui-header-menus {
  width: 1198px;
  height: 36px;
  margin-left: 20px;
  border-radius: 18px;
}
.ui-menu {
  min-width: 125px;
}
.ui-menu > :deep(.q-item:not(.disabled):hover > .q-focus-helper) {
  background-color: var(--q-positive);
}
.ui-menu > :deep(.q-item:not(.disabled):hover > .q-item__section) {
  color: var(--q-accent);
}

/* 定义drawer样式 */
:deep(.q-drawer) {
  position: fixed;
  margin: 2px 0;
}
:deep(.q-drawer .q-item__section--avatar) {
  min-width: 28px;
  padding-right: 10px;
}
.ui-tab-active {
  background-color: var(--q-positive);
  color: var(--q-accent);
}
.ui-tab-sys {
  min-height: 0;
  height: 36px;
  width: 133px;
  font-size: 14px !important;
  margin-bottom: 18px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: var(--ui-disabled);
  color: var(--q-accent);
}
:deep(.ui-tab-indent-1) {
  padding-left: 27px;
  font-size: 16px;
}
:deep(.ui-tab-indent-2) {
  padding-left: 38px;
  font-size: 16px;
}
:deep(.ui-tab-indent-3) {
  padding-left: 86px;
  font-size: 14px;
}
:deep(.ui-tab-indent-4) {
  padding-left: 106px;
  font-size: 14px;
}
.ui-model-name {
  max-width: 110px;
}

/* 定义footer样式 */
.ui-footer-toolbar {
  min-height: 0;
  height: 30px;
}
.ui-footer-title {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 2px;
}

/* 定义其他样式 */
.ui-btn {
  width: 180px;
  height: 36px;
  margin-top: 100px;
  border-radius: 4px;
  letter-spacing: 2px;
}
</style>
