<template>
  <div v-if="loading" class="flex flex-center fullscreen">
    <q-spinner-hourglass color="primary" size="100px" />
  </div>
  <q-layout v-else-if="online" view="hHh lpR fFf">
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
    <NotFound />
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
  <div v-else class="flex flex-center fullscreen"></div>
</template>
<script setup lang="ts"></script>
<style></style>
