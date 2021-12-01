<template>
  <div class="row">
    <div class="col-12 text-center">
      <h3>Helloworld！</h3>
    </div>
    <div class="col-12 text-center">
      <h5><router-link to="/system" class="ui-router-link">进入系统</router-link></h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";

const router = useRouter();
const appStore = useAppStore();

watch(
  () => appStore.loading,
  (loading) => {
    router.push(loading ? "/" : "/sign");
  }
);
</script>

<route lang="yaml">
meta:
  layout: center
</route>
