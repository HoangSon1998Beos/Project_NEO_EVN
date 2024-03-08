<template>
  <v-card class="container">
    <v-img
      :width="400"
      aspect-ratio="16/9"
      cover
      src="https://neo.vn/uploads/plugin/custom_img/2021-07-29/1627529494-1931300689-custom.jpg"
    ></v-img>
    <v-sheet class="mx-auto" width="300">
      <a target="_blank" class="logo">
        <img
          src="http://10.252.11.112:8080/assets/images/logo/logo-small.svg"
          class="logo vue"
          alt="Vue logo"
        />
      </a>
      <h3 class="text-center mt-3 dangnhap">Login</h3>
      <v-form fast-fail @submit.prevent="handleSubmit" class="form">
        <v-text-field
          v-model="userName"
          :rules="userNameRules"
          type="email"
          label="User Name"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'password' : 'text'"
          :rules="passWordRules"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-checkbox
          class="custom-checkbox"
          v-model="isChecked"
          label="Forgot password"
        ></v-checkbox>
        <v-btn class="mt-2" color="success" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-card>
</template>
    
    <script>
import Api from "../api/api.js";

export default {
  data() {
    return {
      userName: "",
      password: "",
      showPassword: true,
      isChecked: true,
      userNameRules: [
        (value) => {
          if (value?.length > 3) return true;
          return "User name must be at least 3 characters";
        },
      ],
      passWordRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true;
          return "Password can not contain digits.";
        },
      ],
    };
  },
  methods: {
    async handleSubmit() {
      const data = {
        username: this.userName,
        password: this.password,
      };
      try {
        const response = await Api.login.create(data);
        const token = response.data.content.Bearer.substring(7);
        localStorage.setItem("token", token);
        this.$router.push("/home");
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },
};
</script>
    
    <style scoped>
.logo {
  margin: 30px 0px 60px 30px;
}
.form {
  padding: 0px 10px 0px 10px;
}
.container {
  display: flex;
}
.dangnhap {
  color: #5e5873;
  margin: 20px 0px 20px 0px;
}
.form >>> .v-input__control {
  width: 280px;
}
</style>