<template>
  <v-dialog
      style="width: 900px"
      v-model="isVisible"
      activator="parent"
  >

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          style="width: 200px;background: #2666de;color: white;border-color: #2666de"
          v-bind="activatorProps"
          text="Thêm mới"
      ></v-btn>
    </template>
    <v-card
        title="Thêm mới người dùng"

    >

      <v-card-text>
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
                v-model="formUser.fullname"
                required
                variant="outlined"
                clearable
                class="small-text-field"

            ></v-text-field>
          </v-col>
          <v-col
              cols="6"
          >
            <div>Email</div>
            <v-text-field
                v-model="formUser.email"
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
            <div>Số điện thoại</div>
            <v-text-field
                v-model="formUser.phoneNumber"
                required
                variant="outlined"
                clearable
                class="small-text-field"

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
          <v-col  cols="1">
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
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="primary"
            text="Thêm mới"
            variant="tonal"
            @click="addUser"
        ></v-btn>

        <v-btn
            text="Làm mới"
            variant="tonal"
            @click="clearForm"

        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import appUtils from '../utils.js';
import axios from "axios";

export default {
  name: "add",
  props: {
    listRole : [],
    visible: {
      type: Boolean,
      default: true,
    },

  },
  computed: {
    getListRole: appUtils.mapComputed('listRole'),
    isVisible: appUtils.mapComputed('visible'),
  },
  data(){
    return{
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlkIjoxMTksImlhdCI6MTcwOTcxNzA2OSwiZXhwIjoxNzA5ODAzNDY5fQ.tmS02wJrYvhmXKgss96NUj4rm_ue5Ez2UxsXCymoRRlcp6kV0w_yxa94h7uQUNR7r0VG6JRcyi7cNnOmlFTnLg',
      formUser:{},
      visiblePassword: false,
      formMock: {
        action: "insert",
        traceCall: "add-user.component.ts -> addUser() -> UserInfoController.doCreate()",
        tableName: "USER_INFO",
        currentMenuURL: "admin/user/list-user",
        role: {
          createdBy: "admin",
          createdDate: "2022-02-08T15:48:42",
          id: 5,
          roleCode: "LEADER",
          roleName: "Lãnh đạo",
          status: 1
        }

      }

    }
  },
  methods: {
    addUser() {
      console.log('formUser', this.formUser)
      const formAddUser = {...this.formUser,...this.formMock};
      const now = new Date().getTime();
      formAddUser.createDate = now;
      // Thực hiện POST request sử dụng Axios
      axios.post('http://10.252.10.112:3232/chatbot/user-info', formAddUser, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
          .then(response => {
            console.log('Response:', response.data);
            // Xử lý dữ liệu trả về nếu cần
          })
          .catch(error => {
            console.error('Error:', error);
            // Xử lý lỗi nếu cần
          });
      this.clearForm();
      this.isVisible = false;
    },
    clearForm() {
      this.formUser = {};
    }
}
}
</script>

<style scoped>
.v-card-text {
  text-align: left !important;
}
/*.small-text-field {*/
/*  height: 20px !important;*/
/*  width: 300px; !* Điều chỉnh chiều rộng theo nhu cầu của bạn *!*/
/*  font-size: 14px; !* Điều chỉnh kích thước chữ *!*/
/*}*/
</style>