<template>
  <v-container class="container-bar">
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
            v-for="(item, index) in qtht"
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
  <v-row align="start" style="height: 400" no-gutters class="row1">
    <v-col cols="4" class="col1">
      <v-card height="400px">
        <a href="">10 kịch bản dùng nhiều nhất trong tháng</a>
      </v-card>
    </v-col>
    <v-col>
      <v-card height="400px">
        <a href=""> 20 câu hỏi chưa được xử lý trong tháng </a>
        <v-card class="dataQuestion">
          <v-data-table-virtual
            :headers="headers"
            :items="virtualBoats"
            height="350"
            item-value="name"
          ></v-data-table-virtual>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
  <v-row align="start" style="height: 400" no-gutters class="row1">
    <v-col cols="4" class="col1">
      <v-card height="400px">
        <a href="">10 kịch bản dùng nhiều nhất trong tháng</a>
      </v-card>
    </v-col>
    <v-col class="col1">
      <v-card height="400px">
        <a href=""> 20 câu hỏi chưa được xử lý trong tháng </a>
      </v-card>
    </v-col>
    <v-col>
      <v-card height="400px">
        <a href=""> 20 câu hỏi chưa được xử lý trong tháng </a>
      </v-card>
    </v-col>
  </v-row>
  <v-row align="start" style="height: 400" no-gutters>
    <v-col cols="8" class="col1">
      <v-card height="300px">
        <a href="">10 kịch bản dùng nhiều nhất trong tháng</a>
      </v-card>
    </v-col>
    <v-col>
      <v-card height="300px">
        <a href=""> 20 câu hỏi chưa được xử lý trong tháng </a>
        <v-card class="dataQuestion"> </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    qtht: [
      { title: "Quản lý người dùng" },
      { title: "Quản lý Menu" },
      { title: "Quản lý khách hàng" },
      { title: "Quản lý các phiên bản sao lưu" },
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
    headers: [
      { title: "CÂU HỎI", align: "start", key: "name" },
      { title: "KÊNH CHAT", align: "end", key: "speed" },
      { title: "THỜI GIAN", align: "end", key: "length" },
      { title: "KHÁCH HÀNG", align: "end", key: "price" },
      { title: "CHUYỂN XỬ LÝ", align: "end", key: "year" },
    ],
    boats: [
      {
        name: "Speedster",
        speed: 35,
        length: 22,
        price: 300000,
        year: 2021,
      },
      {
        name: "OceanMaster",
        speed: 25,
        length: 35,
        price: 500000,
        year: 2020,
      },
      {
        name: "Voyager",
        speed: 20,
        length: 45,
        price: 700000,
        year: 2019,
      },
      {
        name: "WaveRunner",
        speed: 40,
        length: 19,
        price: 250000,
        year: 2022,
      },
      {
        name: "SeaBreeze",
        speed: 28,
        length: 31,
        price: 450000,
        year: 2018,
      },
      {
        name: "HarborGuard",
        speed: 18,
        length: 50,
        price: 800000,
        year: 2017,
      },
      {
        name: "SlickFin",
        speed: 33,
        length: 24,
        price: 350000,
        year: 2021,
      },
      {
        name: "StormBreaker",
        speed: 22,
        length: 38,
        price: 600000,
        year: 2020,
      },
      {
        name: "WindSail",
        speed: 15,
        length: 55,
        price: 900000,
        year: 2019,
      },
      {
        name: "FastTide",
        speed: 37,
        length: 20,
        price: 280000,
        year: 2022,
      },
    ],
  }),
  methods: {},
  computed: {
    virtualBoats() {
      return [...Array(20).keys()].map((i) => {
        const boat = { ...this.boats[i % this.boats.length] };
        boat.name = `${boat.name} #${i}`;
        return boat;
      });
    },
  },
};
</script>
<style scoped>
.container-bar {
  background-color: #1976d2;
}
.row1 {
  margin: 20px 0px 20px 0px;
}
.custom-dropdown {
  position: absolute;
  top: 0;
  left: 0;
}
.icon-home {
  padding-right: 5px;
}
.col1 {
  margin-right: 20px;
}
.dataQuestion {
  margin: 15px 15px 15px 15px;
}
</style>