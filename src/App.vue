<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


const $q = useQuasar();
const router = useRouter();
const store = useStore();

// 颜色主题为自动模式
$q.dark.set("auto");

// 应用是否正在加载
const loading = ref(true);

// 侧边导航栏状态
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// 加载页面store，包括持久化存储信息和刷新前保存的临时数据
function loadstore() {
  // 持久化存储
  const systemSettingsJson = localstore.getItem("systemSettings");
  if (systemSettingsJson) {
    store.systemSettings = JSON.parse(systemSettingsJson) as typeof store.systemSettings;
    console.log("加载系统设置信息: ", store.systemSettings);
  } else {
    // 没有存储的系统设置信息，认为是首次使用系统
    initStatus.value = "newbie";
    console.log("没有系统设置信息");
  }
  const recentTasksJson = localstore.getItem("recentTasks");
  if (recentTasksJson) {
    store.recentTasks = JSON.parse(recentTasksJson) as typeof store.recentTasks;
    console.log("加载最近任务信息: ", store.recentTasks);
  } else {
    store.recentTasks = [];
    console.log("没有最近任务信息");
  }
  // 刷新页面时的临时存储
  const tmpDataJson = localstore.getItem("tmpData");
  const tmpDataTimestamp = localstore.getItem("tmpDataTimestamp");
  if (tmpDataJson && tmpDataTimestamp) {
    const duration = Date.now() - new Date(tmpDataTimestamp).valueOf();
    // 如果之前存储的数据时间戳距此时小于5秒，认为用户是在刷新页面，否则为关闭页面
    if (duration < store.systemSettings.cacheDateExpire * 1000) {
      const data = JSON.parse(tmpDataJson);
      store.monitorStatus = data.monitorStatus;
      store.isTaskOpen = data.isTaskOpen;
      store.isTaskNew = data.isTaskNew;
      store.currentTask = data.currentTask; // 对currentTask里scenario、design、entity的引用的修改在初始化想定列表和任务列表后再进行
    } else {
      localstore.removeItem("tmpData");
      localstore.removeItem("tmpDataTimestamp");
    }
  }
}
loadstore();
// 保存页面store，包括持久化存储信息和刷新前保存的临时数据
function savestore() {
  // 持久化存储
  localstore.setItem("systemSettings", JSON.stringify(store.systemSettings));
  localstore.setItem("recentTasks", JSON.stringify(store.recentTasks));
  // 刷新页面时的临时存储
  const tmpData = {
    monitorStatus: store.monitorStatus,
    isTaskOpen: store.isTaskOpen,
    isTaskNew: store.isTaskNew,
    currentTask: store.currentTask,
  };
  localstore.setItem("tmpData", JSON.stringify(tmpData));
  localstore.setItem("tmpDataTimestamp", new Date().toString());
}
onBeforeUnmount(savestore);

// 绑定快捷键，vue的keyup事件绑定不知为何失效，因此手动实现
let keyTimestamp = 0; // 防抖
window.addEventListener("keyup", (e) => {
  const timestamp = Date.now();
  if (timestamp - keyTimestamp > 500) {
    keyTimestamp = timestamp;
    if (e.altKey) {
      const key = e.key.toLowerCase();
        switch (key) {
          case "c":
            router.push("/task-close");
            break;
          case "s":
            if (e.shiftKey) {
              router.push("/task-save-as");
            }
            break;
          case "n":
            router.push("/task-add");
            break;
          case "o":
            router.push("/task-open");
            break;
          case "m":
            router.push("/task-manage");
            break;
          default:
        }
      }
    }
  }
});
</script>

<template>
  <div v-if="loading" class="flex flex-center fullscreen">
    <q-spinner-hourglass color="primary" size="100px" />
  </div>
  <div v-else-if="store.online" class="flex flex-center fullscreen">
    <q-spinner-hourglass color="primary" size="100px" />
  </div>
  <q-layout v-else view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="ui-header-toolbar">
        <q-btn dense flat round icon="menu" :class="{ 'text-accent': leftDrawerOpen }" @click="toggleLeftDrawer" />
        <q-toolbar-title shrink class="ui-header-title"> 自动化科学与电气工程学院 </q-toolbar-title>
        <div class="row q-ml-xl bg-secondary shadow-2 ui-header-menus">
          <q-space />
          <q-btn flat label="任务" class="ui-menu">
            <q-menu fit anchor="bottom middle" self="top middle" class="bg-secondary text-center">
              <q-list dense padding class="ui-menu">
                <q-item v-ripple v-close-popup clickable to="/task-add" active-class="">
                  <q-item-section>新建任务</q-item-section>
                </q-item>
                <q-item v-ripple v-close-popup clickable to="/task-open" active-class="">
                  <q-item-section>打开任务</q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  v-close-popup
                  clickable
                  to="/task-close"
                  :disable="!isTaskOpen"
                  :class="{ 'text-disabled': !isTaskOpen }"
                  active-class=""
                >
                  <q-item-section>关闭当前任务</q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  v-close-popup
                  clickable
                  :disable="!isTaskOpen"
                  :class="{ 'text-disabled': !isTaskOpen }"
                  active-class=""
                  @click="saveTask"
                >
                  <q-item-section>保存任务</q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  v-close-popup
                  clickable
                  to="/task-save-as"
                  :disable="!isTaskOpen"
                  :class="{ 'text-disabled': !isTaskOpen }"
                  active-class=""
                >
                  <q-item-section>任务另存为...</q-item-section>
                </q-item>
                <q-item v-ripple v-close-popup clickable to="/task-manage" active-class="">
                  <q-item-section>任务管理</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn flat label="帮助" class="q-mr-lg ui-menu">
            <q-menu fit anchor="bottom middle" self="top middle" class="bg-secondary text-center">
              <q-list dense padding class="ui-menu">
                <q-item v-ripple v-close-popup clickable to="/welcome" active-class="">
                  <q-item-section>启动页</q-item-section>
                </q-item>
                <!-- <q-item v-ripple v-close-popup clickable to="/guide" active-class="">
                  <q-item-section>入门指引</q-item-section>
                </q-item> -->
                <q-item v-ripple v-close-popup clickable tag="a" target="_blank" href="http://www.cqhorizon.com/">
                  <q-item-section>用户文档</q-item-section>
                </q-item>
                <q-item v-ripple v-close-popup clickable tag="a" target="_blank" href="http://www.cqhorizon.com/">
                  <q-item-section>关于我们</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above elevated side="left" :width="256">
      <q-list class="full-height column">
        <q-expansion-item icon="task" label="任务设置" header-class="ui-tab-indent-1" :disable="!isTaskOpen">
          <q-list>
            <q-item
              v-ripple
              clickable
              active-class="ui-tab-active"
              to="/task-info"
              class="ui-tab-indent-2"
              :disable="!isTaskOpen"
            >
              <q-item-section avatar>
                <q-icon name="assignment" />
              </q-item-section>
              <q-item-section>任务基本信息</q-item-section>
            </q-item>
            <q-expansion-item icon="layers" label="智能模型配置" header-class="ui-tab-indent-2" :disable="!isTaskOpen">
              <q-list v-if="isTaskOpen && task.entity">
                <q-expansion-item header-class="ui-tab-indent-3" :disable="!isTaskOpen">
                  <template #header>
                    <q-item-section>
                      <q-item-label lines="1" class="ui-model-name">
                        {{ task.entity.displayName }}
                        <q-tooltip anchor="top right" self="center left">{{ task.entity.displayName }}</q-tooltip>
                      </q-item-label>
                    </q-item-section>
                  </template>
                  <q-list>
                    <q-item
                      v-ripple
                      clickable
                      active-class="ui-tab-active"
                      to="/task-model-data"
                      class="ui-tab-indent-4"
                      :disable="!isTaskOpen"
                    >
                      <q-item-section>数据转换配置</q-item-section>
                    </q-item>
                    <q-item
                      v-ripple
                      clickable
                      active-class="ui-tab-active"
                      to="/task-model-network"
                      class="ui-tab-indent-4"
                      :disable="!isTaskOpen"
                    >
                      <q-item-section>神经网络配置</q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>
              </q-list>
            </q-expansion-item>
            <q-item
              v-ripple
              clickable
              active-class="ui-tab-active"
              to="/task-extra"
              class="ui-tab-indent-2"
              :disable="!isTaskOpen"
            >
              <q-item-section avatar>
                <q-icon name="tune" />
              </q-item-section>
              <q-item-section>其他设置</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- 过程监控 -->
        <q-item
          v-ripple="isTaskOpen"
          clickable
          active-class="ui-tab-active"
          to="/monitor"
          class="ui-tab-indent-1"
          :disable="!isTaskOpen"
        >
          <q-item-section avatar>
            <q-icon name="monitor" />
          </q-item-section>
          <q-item-section>过程监控</q-item-section>
        </q-item>
        <q-space />
        <!-- 系统设置 -->
        <q-item v-ripple clickable to="/settings" active-class="" class="q-mx-auto ui-tab-sys">
          <q-item-section avatar>
            <q-icon name="settings" size="20px" />
          </q-item-section>
          <q-item-section style="">系统设置</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="justify-between ui-footer-toolbar">
        <q-toolbar-title shrink></q-toolbar-title>
        <q-toolbar-title shrink class="ui-footer-title">{{ isTaskOpen ? task.name : "" }}</q-toolbar-title>
        <q-toolbar-title shrink class="ui-footer-title"> © 2021 V1.0 </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<!-- 在定义样式时，尽量使用自定义的类或内联样式覆盖quasar自带的样式，无法满足需求的情况下才考虑重写quasar的样式，并请合理使用:deep() -->
<style>
/* 定义全局样式 */
body,
button {
  font-family: "Microsoft YaHei" !important;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
}

.ui-main-container {
  width: 100%;
  height: calc(100vh - 80px);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: var(--q-primary);
}

::-webkit-scrollbar-track {
  margin: 50px 0 30px 0;
  background-color: var(--q-secondary);
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--q-positive);
}

input::placeholder,
textarea::placeholder {
  color: var(--ui-darken) !important;
}

/* 定义颜色变量，优先使用变量中的颜色，变量颜色无法满足的情况下才考虑使用直接的颜色 */
.body--dark {
  --q-primary: #10253fb2; /* 主色调 */
  --q-secondary: #10253fff; /* 次色调 */

  --q-accent: #00e0ffff; /* 强调，用于active状态前景色 */
  --q-positive: #1f334aff; /* 突出，用于active状态背景色 */

  --ui-darken: #ffffff73; /* 输入组件提示文字 */
  --q-negative: #ffffff0d; /* 输入组件背景 */

  --q-info: #068295ff; /* 提示 */
  --q-warning: #f2c037ff; /* 警告 */
  --ui-error: #c10015ff; /* 错误 */
  --ui-disabled: #040b22ff; /* 禁用 */

  /* 仅支持quasar内部使用，代码中不要使用，有其他替代，如primary替代dark，disabled替代dark-page */
  --q-dark: #10253fb2; /* dark mode下其他组件底色 */
  --q-dark-page: #040b22ff; /* dark mode下body底色 */
}
.bg-darken {
  background-color: var(--ui-darken) !important;
}
.text-darken {
  color: var(--ui-darken) !important;
}
.bg-error {
  background-color: var(--ui-error) !important;
}
.text-error {
  color: var(--ui-error) !important;
}
.bg-disabled {
  background-color: var(--ui-disabled) !important;
}
.text-disabled {
  color: var(--ui-disabled) !important;
}
.ui-select-popup {
  background-color: var(--q-secondary) !important;
}
</style>

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
