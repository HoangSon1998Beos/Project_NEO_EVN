import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue'
import BotManagement from "../views/bot-management/index.vue";

const routes = [
    {
        path: '',
        name: 'Home',
        component: HelloWorld,
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
    }

    // Thêm các route khác tại đây
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;