<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { computed, inject, reactive, ref } from 'vue';
import { printCurrentPage } from '../composable';
const goHome = inject('goHome') as Provided['goHome'];
// TODO: cache the setting options to localStorage

// line-height
const CN_lineHeight = useLocalStorage('CN_lineHeight', 1.5);
const EN_lineHeight = useLocalStorage('EN_lineHeight', 1.3);

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
    ['Poppins', 'Poppins'],
  ],
};
const currentFontIndex = [
  useLocalStorage('CN_fontIndex', 0),
  useLocalStorage('EN_fontIndex', 0),
];
const currentFont = computed(() => {
  const [cn, en] = currentFontIndex;
  return [
    ...fontList.english[en.value][1].split(','),
    ...fontList.chinese[cn.value][1].split(','),
  ]
    .filter((s) => s)
    .join(',');
});
const handleChineseChange = (event: Event) => {
  currentFontIndex[0].value = (
    event.target! as HTMLSelectElement
  ).selectedIndex;
};
const handleEnglishChange = (event: Event) => {
  currentFontIndex[1].value = (
    event.target! as HTMLSelectElement
  ).selectedIndex;
};
</script>
<template>
  <div
    id="tools"
    class="flex left-50% flex-col translate-x-[-50%] shadow-2xl justify-center bg-indigo-100 p-4 gap-2 z-999 fixed bottom-4"
    border="1 cyan rounded-2"
  >
    <div class="flex flex-col gap-2">
      <span>行高[EN]:</span>
      <input
        v-model="EN_lineHeight"
        type="range"
        max="3"
        min="0.8"
        step="0.1"
      />
      <span>行高[CN]:</span>
      <input
        v-model="CN_lineHeight"
        type="range"
        max="3"
        min="0.8"
        step="0.1"
      />
    </div>
    <!-- font control -->
    <div class="flex gap-2">
      <select @change="handleChineseChange" name="font">
        <option
          v-for="([font, value], index) in fontList.chinese"
          :value="value"
          :key="value"
          :selected="index === currentFontIndex[0].value"
        >
          {{ font }}
        </option>
      </select>
      <select @change="handleEnglishChange" name="font">
        <option
          v-for="([font, value], index) in fontList.english"
          :value="value"
          :key="value"
          :selected="index === currentFontIndex[1].value"
        >
          {{ font }}
        </option>
      </select>
    </div>
    <!-- btn(s) -->
    <div class="flex gap-2">
      <button @click="goHome" class="text-4 py-1 px-4">返回</button>
      <button @click="printCurrentPage" class="text-4 py-1 px-4">打印</button>
    </div>
  </div>
  <!-- to control its style -->
  <!-- PrintArea.vue -->
  <slot></slot>
</template>

<style>
.content {
  font-family: v-bind(currentFont);
}
.content > .paragraph > p:nth-child(2) {
  line-height: v-bind(CN_lineHeight);
}
.content > .paragraph > p:nth-child(1) {
  line-height: v-bind(EN_lineHeight);
}
</style>
