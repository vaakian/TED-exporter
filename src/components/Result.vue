<script setup lang="ts">
import { onActivated, onDeactivated, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useColors } from '../composable';

// type definition
type Paragraphs = string[][];
type Talk = {
  paragraphs: Paragraphs;
  title: string;
  author: string;
  id: string;
};

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
const router = useRouter();
const goBack = () => {
  router.push('/');
};

const printPage = () => {
  window.print();
};
// note colors
const { switchColor: switchNoteColor, currentColor: noteColor } = useColors([
  '#f6f6f6',
  '#e8f4f9',
  'aliceblue',
  'transparent',
]);

// transcript colors
const { switchColor: switchTranscriptColor, currentColor: transcriptColor } =
  useColors(['#e8f4f9', '#f6f6f6', 'aliceblue', 'transparent']);

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
      <button @click="goBack" class="btn shadow bg-blue color-white">
        GO BACK
      </button>
    </div>

    <div class="w-768px mx-auto" v-else>
      <div class="header">
        <!-- LOGO -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="54"
          viewBox="0, 0, 96, 54"
          class="logo"
          @click="goBack"
        >
          <path
            d="M21.244 21.053h-6.761V14.85h21.012v6.203h-6.762V39.15h-7.489V21.053zm15.414-6.203h20.43v6.203H44.147v2.992h12.941v5.837H44.147v3.065h12.941v6.203h-20.43v-24.3zm21.666 0h12.287c8.071 0 10.906 6.984 10.906 12.114 0 7.443-3.926 12.186-12.36 12.186H58.324v-24.3zm7.489 18.097h2.908c4.653 0 5.308-3.794 5.308-6.056 0-1.533-.509-5.765-5.89-5.765H65.74l.073 11.821z"
            fill="#E62B1E"
          ></path>
        </svg>
        <!-- TITLE  -->
        <div></div>
      </div>
      <div class="detail">
        <p>
          题目：<a
            :href="'https://www.ted.com/talks/' + talk.id"
            target="_blank"
            class="title"
            v-html="talk.title.trim()"
          ></a>
        </p>
        <p @click="printPage">
          作者：<span class="author" v-html="talk.author"></span>
        </p>
      </div>
      <div class="result">
        <!-- left side -->
        <div class="content">
          <div
            class="paragraph"
            v-for="([origin, target], i) in talk.paragraphs"
            :key="i"
          >
            <p>{{ origin }}</p>
            <p @click="switchTranscriptColor">{{ target }}</p>
          </div>
        </div>
        <!-- right side -->
        <div class="note" @click="switchNoteColor"></div>
      </div>
    </div>
  </div>
  <div text-center v-else>
    <p class="rotating" text-8 w-50px mx-auto>🍺</p>
    <p text="blue 8" fw-bold>🚀请稍等，Ted数据加载中🚀</p>
    <p text="cyan 8" fw-bold>Loading...</p>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap');
a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
.header svg {
  cursor: pointer;
}
.logo {
  transform: scale(1.5);
  padding: 20px;
  margin-left: -18px;
}
.detail {
  margin-inline: auto;
  margin-left: calc(2em + 10px);
  margin-block: 20px;
  background-color: #e8f4f9;
  display: inline-block;
  padding: 5px 20px;
  border-radius: 4px;
}
.result,
.header {
  display: flex;
}
.header {
  line-height: 0.3em;
}
.author {
  font-style: italic;
  font-family: Georgia;
  color: #555;
}
.title {
  font-family: 'Arial';
  font-weight: bolder;
}
.content {
  border-right: 3px solid #e6e6e6;
  font-size: 20px;
  font-family: Georgia, 'SongTi SC',
    'Noto Serif SC' /* 'Noto Serif SC', serif, '宋体' */;
  padding-right: 20px;
  width: 70%;
  line-height: 1.3em;
}
.note {
  flex: 1;
  background-color: v-bind(noteColor);
}
.paragraph p:nth-child(2) {
  /* color: #00086d; */
  line-height: 1.5em;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: v-bind(transcriptColor);
  padding-left: 5px;
  margin-left: -5px;
}

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
