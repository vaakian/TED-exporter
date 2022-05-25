import { createApp } from 'vue';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import Form from './components/Form.vue';
import Result from './components/Result.vue';
import 'uno.css';
const routes = [
  { path: '/', component: Form },
  { path: '/result/:id', component: Result },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
