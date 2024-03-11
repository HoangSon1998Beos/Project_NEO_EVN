<template>
  <v-dialog
      transition="dialog-bottom-transition"
      style="width: 900px"
      v-model="isVisible"
      persistent
  >
    <v-card

    >
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Cập nhật người dùng
        </div>

        <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeForm"
        ></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col
                cols="6"
            >
              <div>Tài khoản</div>
              <v-text-field
                  v-model="formUser.username"
                  required
                  variant="outlined"
                  clearable
                  class="small-text-field"
                  disabled
              ></v-text-field>
            </v-col>
            <v-col
                cols="6"

            >
              <div>Mật khẩu</div>
              <v-text-field
                  v-model="formUser.password"
                  :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visiblePassword ? 'text' : 'password'"
                  @click:append-inner="visiblePassword = !visiblePassword"
                  required
                  variant="outlined"
                  clearable
                  class="small-text-field"

              ></v-text-field>
            </v-col>

          </v-row>
          <v-row>
            <v-col
                cols="6"
            >
              <div>Họ tên</div>
              <v-text-field
                  required
                  variant="outlined"
                  clearable
                  class="small-text-field"
                  v-model="formUser.fullname"
              ></v-text-field>
            </v-col>
            <v-col
                cols="6"
            >
              <div>Email</div>
              <v-text-field
                  required
                  variant="outlined"
                  clearable
                  class="small-text-field"
                  v-model="formUser.email"

              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
                cols="6"
            >
              <div>Số điện thoại</div>
              <v-text-field
                  required
                  variant="outlined"
                  clearable
                  class="small-text-field"
                  v-model="formUser.phoneNumber"

              ></v-text-field>
            </v-col>
            <v-col
                cols="6"
            >
              <div>Vai trò</div>
              <v-select
                  v-model="formUser.roleId"
                  required
                  variant="outlined"
                  clearable
                  class="small-text-field"
                  item-title="roleName"
                  item-value="id"
                  :items="getListRole"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-icon
                  size="70"
                  style="color: #2666de"
              >
                mdi-account
              </v-icon>
            </v-col>
            <v-col
                cols="3"
            >
              <v-file-input
                  accept="image/*"
                  label="Chọn ảnh"
                  style="color: #2666de"
                  class="small-text-field"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="primary"
            text="Cập nhật"
            variant="tonal"
            @click="editUser"
        ></v-btn>

        <v-btn
            text="Làm mới"
            variant="tonal"
            @click="setForm"

        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import appUtils from '../utils.js';
import axios from "axios";

export default {
  name: "edit",
  props: {
    listRole: [],
    userInfo: {
      type: Object,
      default: {},
    },
    visible: {
      type: Boolean,
      default: true,
    },

  },

  watch: {
    visible(val) {
      if (val) {
        this.setForm();
      }
    }
  },

  computed: {
    getListRole: appUtils.mapComputed('listRole'),
    isVisible: appUtils.mapComputed('visible'),
    getUserInfo: appUtils.mapComputed('userInfo')
  },

  data() {
    return {
      visiblePassword: false,
      formUser: {},
    }
  },
  methods: {
    setForm() {
      this.formUser = this.getUserInfo;
      this.formUser.password = '';
    },
    closeForm() {
      this.isVisible = false;
    },
    editUser(){
      this.isVisible = false;
      this.$emit('success')
    }

  }
}
</script>

<style scoped>
.v-card-text {
  text-align: left !important;
}
</style>