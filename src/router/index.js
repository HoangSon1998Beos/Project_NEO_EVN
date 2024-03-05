import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import BotManagement from "../views/bot-management/index.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  // Thêm các route khác tại đây
  //   BotManagement,
  {
    path: '/bot',
    name: 'bot-management',
    component: BotManagement,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;