<template>
  <v-dialog
    style="width: 900px"
    v-model="isVisible"
    activator="parent"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        style="
          width: 200px;
          background: #2666de;
          color: white;
          border-color: #2666de;
        "
        prepend-icon="mdi-account"
        v-bind="activatorProps"
        text="Thêm mới"
      ></v-btn>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">Thêm mới người dùng</div>

        <v-btn icon="mdi-close" variant="text" @click="closeForm"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
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
                  :rules="userNameRules"
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
                  :rules="passwordRules"
                  autocomplete="null"
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
                  :rules="fullNameRules"
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
                  :rules="emailRules"
                  autocomplete="null"
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
                  :rules="phoneNumberRules"
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
                  :rules="roleRules"
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
          text="Thêm mới"
          variant="tonal"
          @click="addUser"
        ></v-btn>

        <v-btn text="Làm mới" variant="tonal" @click="clearForm"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import appUtils from "../utils.js";
import axios from "axios";

export default {
  name: "add",
  props: {
    listRole: [],
    visible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getListRole: appUtils.mapComputed("listRole"),
    isVisible: appUtils.mapComputed("visible"),

    userNameRules() {
      return [(v) => !!v || "Chưa nhập tên tài khoản"];
    },

    fullNameRules() {
      return [(v) => !!v || "Chưa nhập họ tên"];
    },

    roleRules() {
      return [(v) => !!v || "Chưa chọn vai trò"];
    },

    phoneNumberRules() {
      return [
        (v) => !!v || "Chưa nhập số điện thoại",
        (v) => /^\d+$/.test(v) || "thông tin nhập vào không hợp lệ",
        (v) => v.length <= 10 || "Số điện thoại nhập không được quá 10 kí tự",
        (v) => /^0\d+/.test(v) || "Số điện thoại không đúng định dạng",
      ];
    },

    emailRules() {
      return [
        (v) => !!v || "Chưa nhập email",
        (v) => /.+@.+\..+/.test(v) || "Email không đúng định dạng",
      ];
    },

    passwordRules() {
      return [
        (v) => !!v || "Chưa nhập mật khẩu",
        (v) =>
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) ||
          "Mật khẩu chưa đúng định dạng",
      ];
    },
  },
  data() {
    return {
      //token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlkIjoxMTksImlhdCI6MTcwOTcxNzA2OSwiZXhwIjoxNzA5ODAzNDY5fQ.tmS02wJrYvhmXKgss96NUj4rm_ue5Ez2UxsXCymoRRlcp6kV0w_yxa94h7uQUNR7r0VG6JRcyi7cNnOmlFTnLg',
      token: localStorage.getItem("token"),
      formUser: {},
      visiblePassword: false,
      formMock: {
        action: "insert",
        traceCall:
          "add-user.component.ts -> addUser() -> UserInfoController.doCreate()",
        tableName: "USER_INFO",
        currentMenuURL: "admin/user/list-user",
        role: {
          createdBy: "admin",
          createdDate: "2022-02-08T15:48:42",
          id: 5,
          roleCode: "LEADER",
          roleName: "Lãnh đạo",
          status: 1,
        },
      },
    };
  },
  methods: {

    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // Xử lý gửi form khi nó được xác thực thành công
          return true;
        } else {
          // Hiển thị thông báo hoặc thực hiện hành động khi form không hợp lệ
          console.log("Form không hợp lệ");
          return false;
        }
      });
    },
    addUser() {
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      const formAddUser = {...this.formUser, ...this.formMock};
      const now = new Date().getTime();
      formAddUser.createDate = now;
      // Thực hiện POST request sử dụng Axios
      axios
        .post("http://10.252.10.112:3232/chatbot/user-info", formAddUser, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          // Xử lý dữ liệu trả về nếu cần
        })
        .catch((error) => {
          console.error("Error:", error);
          // Xử lý lỗi nếu cần
        });
      this.clearForm();
      this.isVisible = false;
      this.$emit("success");
    },
    closeForm() {
      this.isVisible = false;
      this.clearForm();
    },
    clearForm() {
      this.$refs.form.resetValidation();
      this.formUser = {};
    }
  }
}

</script>

<style scoped>
.v-card-text {
  text-align: left !important;
}
</style>