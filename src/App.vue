<script setup lang="ts">
import { provide } from 'vue';
import { useRouter } from 'vue-router';
import './App.css';
const router = useRouter();
const goHome = () => {
  router.push('/');
};
provide('goHome', goHome);
</script>

<template>
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  margin-inline: auto;
}
* {
  margin: 0;
  padding: 0;
}
</style>
