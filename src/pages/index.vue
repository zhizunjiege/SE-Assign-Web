<template>
  <div class="row">
    <div class="col-12 text-center">
      <h3>Helloworld！</h3>
    </div>
    <div v-if="!aS.loading" class="col-12 text-center">
      <h5><router-link to="/sign" class="ui-link">进入系统</router-link></h5>
    </div>
    <div v-else class="col-12 text-center">
      <q-spinner-hourglass color="accent" size="3rem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/stores/app";

const aS = useAppStore();
</script>

<route lang="yaml">
meta:
  layout: center
</route>
