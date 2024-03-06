import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from "./router";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { setupVuex } from '@/plugins/vuex-plugin';
import store from '@/store'

const app = createApp(App);
setupVuex(app);

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .mount('#app')
