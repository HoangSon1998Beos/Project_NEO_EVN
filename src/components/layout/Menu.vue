<template>
  <v-container class="container-bar">
    <div class="d-flex justify-space-around">
      <v-menu class="custom-dropdown">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" href="/home"
            ><v-icon icon="mdi-home" class="icon-home" /> Trang chủ
          </v-btn>
        </template>
      </v-menu>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"
            ><v-icon icon="mdi-gavel" class="icon-home"></v-icon> Quản trị hệ
            thống
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in qtht"
            :key="index"
            :value="index"
          >
            <v-list-item-title ><a :href="item.to">{{ item.title }}</a></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"
            ><v-icon icon="mdi-pencil" class="icon-home"></v-icon> Đào tạo
            Chatbot
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in dtcb"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            <v-icon icon="mdi-pencil" class="icon-home"></v-icon>CSKH tự động
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in cskh"
            :key="index"
            :value="index"
          >
            <router-link :to="item.to">

          <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"
            ><v-icon icon="mdi-widgets" class="icon-home"></v-icon> Báo cáo
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in bc" :key="index" :value="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            <v-icon icon="mdi-folder-open" class="icon-home"></v-icon>
            Khai báo - giám sát hệ thống
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in gsht"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    qtht: [
      { title: "Quản lý người dùng" , to:'/person'},
      { title: "Quản lý Menu", to:'' },
      { title: "Quản lý khách hàng", to:'' },
      { title: "Quản lý các phiên bản sao lưu", to:'' },
    ],
    dtcb: [
      { title: "Quản lý Bot" },
      { title: "Ngân hàng câu hỏi và ý định" },
      { title: "Quản lý ngữ cảnh" },
      { title: "Cấu hình chống spam" },
      { title: "Quản lý Minigame" },
    ],
    cskh: [
      { title: "Quản lý người dùng" },
      { title: "Quản lý Menu" },
      { title: "Quản lý khách hàng" },
      { title: "Quản lý các phiên bản sao lưu" },
    ],
    bc: [
      { title: "Quản lý người dùng" },
      { title: "Quản lý Menu" },
      { title: "Quản lý khách hàng" },
      { title: "Quản lý các phiên bản sao lưu" },
    ],
    gsht: [
      { title: "Quản lý người dùng" },
      { title: "Quản lý Menu" },
      { title: "Quản lý khách hàng" },
      { title: "Quản lý các phiên bản sao lưu" },
    ],
  }),
};
</script>
<style scoped>
.container-bar {
  background-color: #1976d2;
}
.custom-dropdown {
  position: absolute;
  top: 0;
  left: 0;
}
.icon-home {
  padding-right: 5px;
}
</style>