// https://www.ted.com/talks/reshma_saujani_teach_girls_bravery_not_perfection

import { useStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// https://www.ted.com/talks/reshma_saujani_teach_girls_bravery_not_perfection/translation
export const matchID = (url: string) => {
  // match `reshma_saujani_teach_girls_bravery_not_perfection`
  const reg = /\/\/www\.ted\.com\/talks\/(.+)/;
  const match = reg.exec(url);
  return match ? match[1].split('/')[0] : null;
};

export const useColors = (colors: string[]) => {
  // const colors = ['#f6f6f6', 'aliceblue', 'transparent'];
  const colorIndex = ref(0);
  const switchColor = () => {
    colorIndex.value = (colorIndex.value + 1) % colors.length;
  };
  const currentColor = computed(() => colors[colorIndex.value]);
  return {
    currentColor,
    switchColor,
  };
};

export const printCurrentPage = () => {
  window.print();
};
