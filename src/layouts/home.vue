<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar class="justify-between ui-home-header-toolbar">
        <q-toolbar-title shrink class="ui-home-header-title">
          <router-link to="/system" class="ui-router-link"> 本科生毕业设计选题系统 </router-link>
        </q-toolbar-title>
        <div class="full-height flex items-center justify-between cursor-pointer ui-home-header-user">
          <q-avatar size="4rem">
            <q-img v-if="userStore.identity === 'admin'" :src="AVATAR_ADMIN" width="3rem" height="3rem" />
            <q-icon v-else name="bi-person-circle" size="3rem" />
          </q-avatar>
          <div class="text-center">
            <span>{{ userStore.name }}</span>
          </div>
          <q-badge :label="userStore.identityText" />
          <q-menu fit>
            <q-list class="text-center">
              <q-item v-close-popup clickable>
                <q-item-section>
                  <router-link to="/user" class="ui-router-link">个人中心</router-link>
                </q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="signOut">
                  <router-link to="/sign?mode=out" class="ui-router-link">安全登出</router-link>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
      <q-toolbar class="justify-end ui-home-footer-toolbar">
        <q-icon :name="$q.dark.isActive ? 'bi-moon' : 'bi-sun'" @click="$q.dark.toggle()" class="ui-icon" />
        <q-space />
        <q-toolbar-title shrink class="ui-home-footer-title"> © 2021 V1.0 </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

import AVATAR_ADMIN from "~/assets/avatar/admin.svg";

const userStore = useUserStore();

async function signOut() {
  await userStore.signOut();
  alert("成功登出");
}
</script>

<style scoped lang="scss">
/* 定义header样式 */
.ui-home-header-toolbar {
  min-height: 0;
  height: 4rem;
  padding: 0;
}
.ui-home-header-title {
  padding-left: 2rem;
  font-size: 2rem;
}
.ui-home-header-user {
  width: 15rem;
  padding: 0 1rem;
  &:hover {
    background-color: var(--q-negative);
  }
}
/* 定义footer样式 */
.ui-home-footer-toolbar {
  min-height: 0;
  height: 2rem;
}
.ui-home-footer-title {
  font-size: 1rem;
  letter-spacing: 2px;
}
</style>
