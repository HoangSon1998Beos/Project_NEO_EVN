<template>
  <div class="container">
    <a target="_blank" class="logo">
      <img
        src="http://10.252.11.112:8080/assets/images/logo/logo-small.svg"
        class="logo-vue"
        alt="Vue logo"
      />
    </a>
    <p class="text">CHATBOT - HỆ THỐNG CHĂM SÓC KHÁCH HÀNG TỰ ĐỘNG</p>
    <i class="icbell fas fa-bell"></i>
    <p class="text1">admin</p>
    <v-menu offset-y open-on-hover class="logOut">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" class="button"
          ><i class="iclogo fas fa-user logo"></i>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in logOut"
          :key="index"
          :value="index"
        >
          <v-list-item-title @click="handleLogOut">
            <i class="fas fa-sign-out-alt"></i>
            {{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logOut: [{ title: "Đăng Xuất" }],
    };
  },
  methods: {
    handleLogOut() {
      const currentRoute = { path: this.$router.currentRoute.value.path };
      localStorage.setItem("currentRoute", JSON.stringify(currentRoute));
      localStorage.removeItem("token");

      this.$router.push("/login");
      setTimeout(() => {
        localStorage.removeItem("currentRoute");
      }, 5000);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: white;
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  min-width: 1350px;
  min-height: 50px;
}
.text {
  color: red;
  padding: 5px 0px 0px 30px;
  font-size: 25px;
  font-weight: 600;
}
.text1 {
  color: red;
  padding: 10px 10px 0px 10px;
  font-weight: 600;
  font-size: 15px;
}
.logo-vue {
  padding: 5px 0px 0px 2px;
}
.icbell {
  margin: 10px 0px 0px 250px;
  padding: 5px 0px 0px 2px;
  color: gray;
}
.iclogo {
  padding: 5px 0px 0px 2px;
}
.logOut {
  border-radius: 60%;
}
.button {
  margin-top: 5px;
}
</style>
