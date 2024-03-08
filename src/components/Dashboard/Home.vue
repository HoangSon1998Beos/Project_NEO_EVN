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
            @click="handleItemClick(index)"
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
  <div class="mx-10">
    <v-row align="start" style="height: 400" no-gutters class="row1">
      <v-col cols="4" class="col1">
        <v-card height="400px">
          <a href="" style="margin-left: 10px"
            >10 kịch bản dùng nhiều nhất trong tháng</a
          >
          <div class="dataQuestion" style="margin-top: 20px">
            <HorizontalBar />
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="400px">
          <a href="" style="margin-left: 10px">
            20 câu hỏi chưa được xử lý trong tháng
          </a>
          <v-card class="dataQuestion">
            <v-data-table-virtual
              v-model="selected"
              :headers="headers"
              :items="desserts"
              height="350"
            >
              <template v-slot:item="{ item, index }">
                <tr :style="{ backgroundColor: getRowColor(index) }">
                  <td>{{ item.questions }}</td>
                  <td v-if="item.chanelCode === 'messenger'">
                    <font-awesome-icon
                      :icon="['fab', 'facebook']"
                      style="color: blueviolet; font-size: 20px"
                    />
                  </td>
                  <td>{{ item.dateChat }}</td>
                  <td>{{ item.cusName }}</td>
                  <td>{{ item.cusName }}</td>
                </tr>
              </template>
            </v-data-table-virtual>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="start" style="height: 400" no-gutters class="row1">
      <v-col cols="4" class="col1">
        <v-card height="300px">
          <a href="" class="title">10 Khách hàng tương tương tác nhiều nhất</a>
          <v-list :lines="false" density="compact" nav>
            <v-list-item
              v-for="(item, i) in listCustomer"
              :key="i"
              :value="item"
              color="primary"
            >
              <v-row>
                <v-col cols="2">
                  <font-awesome-icon
                    :icon="['fab', 'facebook']"
                    style="color: blueviolet; font-size: 20px"
                  />
                </v-col>
                <v-col
                  ><v-list-item-title v-text="item.cusName"></v-list-item-title
                ></v-col>
                <v-col class="turn"
                  ><v-list-item-title v-text="item.count"></v-list-item-title
                ></v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="col1">
        <v-card height="300px">
          <a href="" class="title">5 phiên chat mới nhất </a>
          <v-data-table-virtual
            v-model="chatModel"
            :headers="chat"
            height="400"
            :items="chatItem"
          >
          </v-data-table-virtual>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="300px">
          <a href="" class="title"> Độ hài lòng của khách hàng </a>
          <v-list
            bg-color="transparent"
            class="d-flex flex-column-reverse"
            density="compact"
          >
            <v-list-item v-for="(rating, i) in 5" :key="i">
              <v-progress-linear
                :model-value="rating * 15"
                class="mx-n5"
                color="yellow-darken-3"
                height="20"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span>{{ rating }}</span>
                <v-icon class="mx-3" icon="mdi-star"></v-icon>
              </template>

              <template v-slot:append>
                <div class="rating-values">
                  <span class="d-flex justify-end">
                    {{ rating }}
                  </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="start" style="height: 400" no-gutters>
      <v-col cols="8" class="col1">
        <v-card height="300px">
          <a href="" class="title"
            >4 kịch bản được sử dụng nhiều nhất trong ngày</a
          >
          <v-data-table-virtual
            v-model="kichbanModel"
            :headers="kichban"
            :items="listKichban"
            height="400"
            item-value="name"
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td style="color: orange">{{ item.channelName }}</td>
                <td>{{ item.sessionCount }}</td>
                <td>{{ item.intentName }}</td>
              </tr>
            </template></v-data-table-virtual
          >
        </v-card>
      </v-col>
      <v-col>
        <v-card height="300px">
          <a href=""> Biểu đồ kênh tương tác trong tháng</a>
          <div class="dataQuestion" style="margin-top: 30px">
            <BarChart />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import BarChart from "../chart/BarChart.vue";
import HorizontalBar from "../chart/HorizontalBar.vue";
import axios from "axios";
export default {
  components: { BarChart, HorizontalBar },
  data: () => ({
    token: localStorage.getItem("token"),
    qtht: [
      { title: "Quản lý người dùng" },
      { title: "Quản lý Menu" },
      { title: "Quản lý khách hàng" },
      { title: "Quản lý các phiên bản sao lưu" },
    ],
    dtcb: [
      { title: "Quản lý Bot" , path: '/bot' },
      { title: "Ngân hàng câu hỏi và ý định", path: '/question-bank' },
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
    selected: [],
    chatModel: [],
    headers: [
      { title: "CÂU HỎI", align: "start", key: "questions" },
      { title: "KÊNH CHAT", align: "start", key: "chanelCode" },
      { title: "THỜI GIAN", align: "start", key: "dateChat" },
      { title: "KHÁCH HÀNG", align: "start", key: "cusName" },
      { title: "CHUYỂN XỬ LÝ", align: "start", key: "cusName" },
    ],
    chat: [
      { title: "KÊNH CHAT", align: "center", key: "channelName" },
      { title: "KHÁCH HÀNG", align: "center", key: "cusName" },
    ],
    kichban: [
      { title: "KÊNH CHAT", align: "start", key: "channelName" },
      { title: "SỐ LƯỢNG PHIÊN ĐÃ CHAT", align: "start", key: "sessionCount" },
      { title: "Ý ĐỊNH", align: "start", key: "intentName" },
    ],
    kichbanModel: [],
    desserts: [],
    listCustomer: [],
    listRating: [],
    ratinglive: {},
  }),
  created() {
    this.getListQuestion();
    this.getCustomer();
    this.getRating();
    this.getScript();
  },
  methods: {
    handleItemClick(index) {
      const path = this.dtcb[index].path;
      this.$router.push(path);
    },
    getListQuestion() {
      axios
        .get(
          "http://10.252.10.112:3232/chatbot/dashboard/getQuestionsUnsolved",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.desserts = response.data.content;
          console.log(this.desserts);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },

    getRowColor(index) {
      if (index < 5) {
        // Mỗi hàng trong 5 hàng đầu sẽ có một màu khác nhau
        const colors = ["#c2d4f6", "#c3efd7", "#ffe4ca", "#f9cfcf", "#b8f2f9"];
        return colors[index];
      } else {
        // Các hàng tiếp theo lặp lại màu của 5 hàng đầu
        const colors = ["#c2d4f6", "#c3efd7", "#ffe4ca", "#f9cfcf", "#b8f2f9"];
        return colors[index % 5];
      }
    },
    async getCustomer() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_BASE_URL +
            "/chatbot/dashboard/getCustomerMaxMonth",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.listCustomer = response.data.content;
      } catch (error) {}
    },
    async getRating() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_BASE_URL +
            "/chatbot/dashboard/getCustomerRate",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.listRating = response.data.content;
        this.ratinglive = this.listRating.find((item) => item.rate);
      } catch (error) {
        console.error("API Error:", error);
      }
    },
    async getScript() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_BASE_URL +
            "/chatbot/dashboard/getSessionOnDay",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.listKichban = response.data.content;
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },
  computed: {},
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
.col1 >>> .v-data-table-header__content {
  display: block;
}
.dataQuestion {
  margin: 15px 15px 15px 15px;
}
.title {
  margin-left: 10px;
}
.turn {
  text-align: right;
}
.rating-values {
  width: 25px;
}
</style>
