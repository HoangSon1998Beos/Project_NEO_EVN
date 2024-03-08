import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue'
import BotManagement from "../views/bot-management/index.vue";
import Home from '../components/Dashboard/Home.vue';
import QuestionBank from '../views/question-bank/index.vue';
import Person from '../views/person-management/index.vue';


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
        path: '/person',
        name: 'person-management',
        component: Person,
    },

    // Thêm các route khác tại đây
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;