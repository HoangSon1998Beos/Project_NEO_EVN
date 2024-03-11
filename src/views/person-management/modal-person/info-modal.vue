<template>
  <v-dialog
      style="width: 900px;max-height: 1000px"
      v-model="isVisible"
      persistent
  >
    <v-card
    >
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Thông tin người dùng
        </div>

        <v-btn
            icon="mdi-close"
            variant="text"
            @click="isVisible = false"
        ></v-btn>
      </v-card-title>
      <v-card-text>
        <div>
          <v-row align="center">
            <v-col cols="4" class="text-center">
              <v-avatar  color="rgba(40,199,111,.12)"  size="250">
                <h1 style="color:#28c76f;">
                  {{ this.getInitials(this.getUserInfo.username) }}
                </h1>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <v-row class="ma-0 pa-0">
                <v-col cols="1">
                  <v-icon
                      color="blue-grey-darken-2"
                      icon="mdi-account"
                      size="small"
                  ></v-icon>
                </v-col>
                <v-col cols="3">
                  Tài khoản
                </v-col>
                <v-col cols="8">
                  {{ this.getUserInfo.username }}
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col cols="1">
                  <v-icon
                      color="blue-grey-darken-2"
                      icon="mdi-tag"
                      size="small"
                  ></v-icon>
                </v-col>
                <v-col cols="3">
                  Họ tên
                </v-col>
                <v-col cols="8">
                  {{ this.getUserInfo.fullname }}
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col cols="1">
                  <v-icon
                      color="blue-grey-darken-2"
                      icon="mdi-email"
                      size="small"
                  ></v-icon>
                </v-col>
                <v-col cols="3">
                  Email
                </v-col>
                <v-col cols="8">
                  {{ this.getUserInfo.email }}
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col cols="1">
                  <v-icon
                      color="blue-grey-darken-2"
                      icon="mdi-phone"
                      size="small"
                  ></v-icon>
                </v-col>
                <v-col cols="3">
                  Số điện thoại
                </v-col>
                <v-col cols="8">
                  {{ this.getUserInfo.phoneNumber }}
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col cols="1">
                  <v-icon
                      color="blue-grey-darken-2"
                      icon="mdi-star"
                      size="small"
                  ></v-icon>
                </v-col>
                <v-col cols="3">
                  Vai trò
                </v-col>
                <v-col cols="8">

                  {{ this.getUserInfo.roleLabel }}
                </v-col>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-col cols="1">
                  <v-icon
                      color="blue-grey-darken-2"
                      icon="mdi-check"
                      size="small"
                  ></v-icon>
                </v-col>
                <v-col cols="3">
                  Trạng thái
                </v-col>
                <v-col cols="8">
                  <div >
                    <v-chip
                        :color="checkColorStatus(getUserInfo.status)"
                        :text="this.getUserInfo.statusLabel"
                        class="text-uppercase"
                        size="small"
                        label
                    ></v-chip>
                  </div>
<!--                  {{ this.getUserInfo.statusLabel }}-->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
import appUtils from "../utils.js";

export default {
  name: "info-modal",
  data() {
    return {
      text: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: {},
    },
  },
  methods: {
    getInitials(name) {
      // Chia chuỗi thành các từ
      const words = name.split(' ');

      // Lặp qua mỗi từ và lấy chữ cái đầu
      const initials = words.map(word => word[0]);

      // Kết hợp các chữ cái đầu thành một chuỗi
      return initials.join('');
    },
    checkColorStatus(status) {
      if (status === 1) return 'green';
      if (status === 3) return 'grey';
      if (status === 2) return 'red';
    },
  },
  computed: {
    isVisible: appUtils.mapComputed('visible'),
    getUserInfo: appUtils.mapComputed('userInfo')
  },
}
</script>

<style scoped>

</style>