import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue'

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
    }

    // Thêm các route khác tại đây
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;