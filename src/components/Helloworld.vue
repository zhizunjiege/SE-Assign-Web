<template>
  <p>Helloworld！</p>
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
