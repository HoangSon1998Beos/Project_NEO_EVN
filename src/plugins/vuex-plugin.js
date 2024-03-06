import { useStore } from 'vuex';

export function setupVuex(app) {
    const store = useStore();
    app.config.globalProperties.$store = store;
}