<template>
  <v-app>
    <v-container class="container">
      <div class="d-flex justify-space-around">
        <v-menu class="custom-dropdown">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"
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
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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
              v-for="(item, index) in items"
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
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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
            <v-list-item
              v-for="(item, index) in items"
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
              <v-icon icon="mdi-folder-open" class="icon-home"></v-icon>
              Khai báo - giám sát hệ thống
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
  methods: {},
};
</script>
<style scoped>
.container{
  background-color: #1976D2;
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