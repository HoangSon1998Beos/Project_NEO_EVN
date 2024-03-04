<template>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="username" label="User Name"></v-text-field>
  
        <v-text-field v-model="password" label="Password"></v-text-field>
  
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </template>
    
    <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        // Add your login logic here
        console.log("Login clicked");
      },
    },
  };
  </script>
    
    <style scoped>
  </style>