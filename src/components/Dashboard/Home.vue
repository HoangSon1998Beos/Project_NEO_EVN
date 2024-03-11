<template>
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
              :fixed-header="true"
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
                  <td>
                    {{ moment(item.dateChat).format("DD-MM-YYYY HH:mm:ss") }}
                  </td>
                  <td>{{ item.cusName }}</td>
                  <td>
                    <v-combobox
                      placeholder="--Chọn xử lý--"
                      :items="[
                        'California',
                        'Colorado',
                        'Florida',
                        'Georgia',
                        'Texas',
                        'Wyoming',
                      ]"
                      variant="outlined"
                      class="mt-4"
                    ></v-combobox>
                  </td>
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
          <div class="ml-2">
            <div v-for="index in 5" :key="index" style="display: flex">
              <div>
                <v-rating
                  style="color: #ff9f43"
                  v-model="ratings[5 - index]"
                  readonly
                ></v-rating>
              </div>
              <div class="rating-count">
                {{ ratingCounts[5 - index] }}
              </div>
            </div>
          </div>
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
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
      <v-col>
        <v-card height="300px">
          <a href="" class="title"> Biểu đồ kênh tương tác trong tháng</a>
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
import Api from "../../api/api.js";
import moment from "moment";
import { nextTick } from "vue";
export default {
  components: { BarChart, HorizontalBar },
  data: () => ({
    token: localStorage.getItem("token"),
    ratings: [1, 2, 3, 4, 5],
    ratingCounts: [0, 0, 0, 0, 0],
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
    listKichban: [],
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
    getListQuestion() {
      Api.dashbroard
        .indexWidthPath("getQuestionsUnsolved")
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
        const response = await Api.dashbroard.indexWidthPath(
          "getCustomerMaxMonth"
        );

        this.listCustomer = response.data.content;
      } catch (error) {}
    },
    async getRating() {
      try {
        const response = await Api.dashbroard.indexWidthPath("getCustomerRate");
        this.listRating = response.data.content;
        this.listRating.forEach((item) => {
          // Gán số lượng lượt đánh giá vào mảng ratingsData theo số sao tương ứng
          this.ratingCounts[item.rate - 1] = item.amount;
        });
        console.log(this.listRating, "than");
      } catch (error) {
        console.error("API Error:", error);
      }
    },
    async getScript() {
      try {
        const response = await Api.dashbroard.indexWidthPath("getSessionOnDay");
        this.listKichban = response.data.content;
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },
  computed: {
    moment() {
      return moment;
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
.rating-count {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff9f43;
  font-weight: 500;
  padding-bottom: 2px;
  margin-left: 100px;
}
</style>
