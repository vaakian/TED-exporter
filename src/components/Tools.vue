<script setup lang="ts">
import { computed, inject, reactive, watch } from 'vue';
import { printCurrentPage } from '../composable';
const goHome = inject('goHome') as Provided['goHome'];

// font
const fontList = {
  chinese: [
    ['宋体', 'SongTi SC, Noto Serif SC'],
    ['黑体', 'SimHei, Noto Sans SC'],
    ['系统默认', ''],
  ],
  english: [
    ['Georgia', 'Georgia'],
    ['Arial', 'Arial'],
  ],
};
const currentFontIndex = reactive([0, 0]);
const currentFont = computed(() => {
  const [chineseFontIndex, englishFontIndex] = currentFontIndex;
  return (
    fontList.english[englishFontIndex][1] +
    ', ' +
    fontList.chinese[chineseFontIndex][1]
  );
});
// watch(() => currentFont, () => {
//   printCurrentPage();
// });
</script>
<template>
  <div
    id="tools"
    class="flex left-50% translate-x-[-50%] justify-center bg-blue p-4 gap-2 z-999 fixed bottom-2"
    border="1 cyan rounded-2"
  >
    {{ currentFont }}
    <button @click="goHome" class="text-4 p-2">返回</button>
    <button @click="printCurrentPage" class="text-4 p-2">打印</button>
  </div>
</template>

<style>
.content {
  /* it's a different scope */
  /* font-family: v-bind(currentFont); */
  font-family: Georgia, SongTi SC, Noto Serif SC;
}
</style>
