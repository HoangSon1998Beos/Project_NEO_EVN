import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue'
import BotManagement from "../views/bot-management/index.vue";
import Home from '../components/Dashboard/Home.vue';
import QuestionBank from '../views/question-bank/index.vue';
import ListCustomer from "../views/list-customer/index.vue";


const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            name: "Login"
        }
    },
    {
        path: '/bot',
        name: 'bot-management',
        component: BotManagement,
    },
    {
        path: '/question-bank',
        name: 'QuestionBank',
        component: QuestionBank,
    },
    {
      path: '/list-customer',
      name: 'ListCustomer',
      component: ListCustomer,
    },

    // Thêm các route khác tại đây
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;