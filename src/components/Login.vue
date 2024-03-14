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
      <h3 class="text-center mt-3 dangnhap">Đăng nhập</h3>

      <v-form fast-fail @submit.prevent="handleSubmit" class="form">
        <v-card v-show="errorMes" color="red" class="errorMessage">
          {{ errorMessage }}
        </v-card>
        <v-text-field
          v-model="userName"
          :rules="[userNameRules]"
          type="email"
          label="Tên đăng nhập"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Mật khẩu"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'password' : 'text'"
          :rules="[passWordRules]"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-checkbox
          class="custom-checkbox"
          v-model="isChecked"
          label="Ghi nhớ đăng nhập"
        ></v-checkbox>
        <v-btn class="mt-2" color="success" type="submit" block
          >Đăng nhập</v-btn
        >
      </v-form>
    </v-sheet>
  </v-card>
</template>
    
    <script>
import Api from "../api/api.js";
import { validateLogUsername, validateLogPassword } from "../../validate.js";

export default {
  data() {
    return {
      userName: "",
      password: "",
      showPassword: true,
      isChecked: true,
      errorMes: false,
      errorMessage: "",
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
        const savedCurrentRoute = JSON.parse(
          localStorage.getItem("currentRoute")
        );
        console.log(savedCurrentRoute);
        if (savedCurrentRoute === null) {
          this.$router.push("/home");
        } else {
          this.$router.push(savedCurrentRoute);
        }
      } catch (error) {
        this.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!";
        this.errorMes = true;
        console.error("API call error:", error);
      }
    },
    userNameRules(value) {
      return validateLogUsername(value);
    },
    passWordRules(value) {
      return validateLogPassword(value);
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
.errorMessage {
  padding: 2px 2px 2px 4px;
  margin: 0px 0px 10px 0px;
}
</style>