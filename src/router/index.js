import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import QuestionBank from '../components/QuestionBank.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  // Thêm các route khác tại đây
  {
    path: '/question-bank',
    name: 'QuestionBank',
    component: QuestionBank,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;