<script setup lang="ts">
import { inject } from 'vue';
import { printCurrentPage } from '../composable';
const goHome = inject('goHome') as Provided['goHome'];
</script>
<template>
  <div
    id="tools"
    class="flex left-50% translate-x-[-50%] justify-center bg-blue p-4 gap-2 z-999 fixed bottom-2"
    border="1 cyan rounded-2"
  >
    <button @click="goHome" class="text-4 p-2">返回</button>
    <button @click="printCurrentPage" class="text-4 p-2">打印</button>
  </div>
</template>
