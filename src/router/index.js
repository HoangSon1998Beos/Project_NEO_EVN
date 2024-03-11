import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import BotManagement from "../views/bot-management/index.vue";
import Home from '../components/Dashboard/Home.vue';
import QuestionBank from '../views/question-bank/index.vue';
import Person from '../views/person-management/index.vue';
import ListCustomer from "../views/list-customer/index.vue";


const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/question-bank',
        name: 'QuestionBank',
        component: QuestionBank,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/person',
        name: 'person-management',
        component: Person,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/list-customer',
        name: 'ListCustomer',
        component: ListCustomer,
        meta: {
            requiresAuth: true,
        },
    },

    // Thêm các route khác tại đây
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;