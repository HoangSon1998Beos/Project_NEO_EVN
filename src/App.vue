<script setup>
import { useRoute } from "vue-router";
import Header from "./components/layout/Header.vue";
import Menu from "./components/layout/Menu.vue";
import Footer from "./components/layout/Footer.vue";

const route = useRoute();
</script>

<template>
  <Header v-if="route.name !== 'Login'" />
  <Menu v-if="route.name !== 'Login'" />
  <router-view></router-view>
  <Footer v-if="route.name !== 'Login'" />
</template>

<style scoped>
.id {
  background-color: rgb(186, 186, 233);
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
