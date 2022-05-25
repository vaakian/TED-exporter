<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { matchID } from '../composable';

const id = ref('reshma_saujani_teach_girls_bravery_not_perfection');
const router = useRouter();
const go = () => {
  let destination = id.value;
  if (destination.includes('/')) {
    const matchedID = matchID(id.value);
    destination = matchedID || '';
  }
  if (destination) router.push('/result/' + destination);
};
</script>

<template>
  <div class="form">
    <h1>TED-Exporter</h1>
    <input type="text" v-model="id" />
    <button @click="go">Load</button>
  </div>
</template>

<style>
.form > * {
  margin-inline: auto;
  text-align: center;
  display: block;
}
.form > h1 {
  color: red;
  font-family: Arial, Helvetica, sans-serif;
}
.form > input {
  padding: 10px;
  background: #eee;
  outline: 1px solid #a3bcce;
  border: none;
  border-radius: 2px;
  font-size: 18px;
  width: 80%;
  margin-block: 15px;
}
.form > button {
  padding: 10px 20px;
  font-size: 24px;
}
</style>
