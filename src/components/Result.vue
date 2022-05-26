<script setup lang="ts">
import { inject, onActivated, onDeactivated, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PrintArea, { Talk } from './PrintArea.vue';
import Tools from './Tools.vue';

const route = useRoute();
const talk = ref<Talk | null>(null);

// control

const noNarrator = ref(true);

// callbacks
const requestTalk = async () => {
  const id = route.params.id;
  const response: Talk = await fetch('/api/' + id).then((res) => res.json());
  //   去掉旁白：（applause）（thanks）（laughter）
  if (noNarrator.value) {
    response.paragraphs = response.paragraphs.filter(
      (p) => !/^\(.*\)$/.test(p[0])
    );
  }
  talk.value = response;
};
const goHome = inject('goHome') as Provided['goHome'];

// effects
watch(talk, () => {
  if (talk.value !== null) {
    document.title = `${talk.value.title} - ${talk.value.author}`;
  }
});
onActivated(() => {
  requestTalk();
});
onDeactivated(() => {
  talk.value = null;
  document.title = 'Bilingual TED-Talk';
});
</script>

<template>
  <div v-if="talk">
    <div text-center v-if="talk.paragraphs.length === 0">
      <h3 text-red>
        未找到演讲稿，可能该条视频没有「中文翻译」<span text-cyan>或</span
        >「中英」无法完全对照。
      </h3>
      <h3>⚠️请尝试换一条TED Talk</h3>
      <button @click="goHome" class="btn shadow bg-blue color-white">
        GO BACK
      </button>
    </div>
    <div class="w-768px mx-auto" v-else>
      <Tools />
      <PrintArea :talk="talk" />
    </div>
  </div>
  <div text-center v-else>
    <p class="rotating" text-8 w-50px mx-auto>🍺</p>
    <p text="blue 8" fw-bold>🚀请稍等，Ted数据加载中🚀</p>
    <p text="cyan 8" fw-bold>Loading...</p>
  </div>
</template>

<style scoped>
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotating {
  animation: rotating 2s linear infinite;
}
</style>
