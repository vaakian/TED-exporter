<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { matchID } from '../composable';
import Note from './Note.vue';
import TestCases from './TestCases.vue';

// reshma_saujani_teach_girls_bravery_not_perfection
const id = ref('');
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
    <h1 fw-bold text-red>Bilingual TED-Talk</h1>
    <input type="text" placeholder="在此处粘贴Ted Talk的网址" v-model="id" />
    <button @click="go" class="btn shadow bg-blue color-white">Load</button>
  </div>
  <div text-center>
    <TestCases />
    <Note />
  </div>
</template>

<style>
.form > * {
  margin-inline: auto;
  text-align: center;
  display: block;
}

.form > input {
  padding: 10px;
  background: #f9fffe;
  color: #666;
  outline: 1px solid #a3bcce;
  border: none;
  border-radius: 2px;
  font-size: 18px;
  width: 80%;
  margin-block: 15px;
}
/* .form > button {
  padding: 10px 20px;
  font-size: 24px;
} */
</style>
