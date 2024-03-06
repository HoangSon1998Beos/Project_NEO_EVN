import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/auth/views/Login.vue';
import HelloWorld from '../components/HelloWorld.vue'
import BotManagement from "../views/bot-management/index.vue";
import QuestionBank from '../components/QuestionBank.vue';

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: HelloWorld,
    },
    {
        path: '/chatbot/login',
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

    // Thêm các route khác tại đây
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;