<template>
  <v-app class="layout-search">
    <span class="pt-4 pl-10">Tìm kiếm khách hàng</span>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="submitForm" ref="formSearchCustomer">
            <v-row>
              <v-col cols="6">
                <span>Họ tên</span>
                <v-text-field v-model="form.name"
                              label="Nhập họ tên"
                              variant="outlined"
                              class="mt-2"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Mã khách hàng</span>
                <v-text-field v-model="form.code"
                              label="Nhập mã khách hàng"
                              variant="outlined"
                              class="mt-2"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Số điện thoại</span>
                <v-text-field v-model="form.phone"
                              label="Nhập số điện thoại"
                              :rules="[validatePhone]"
                              variant="outlined"
                              class="mt-2"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Email</span>
                <v-text-field v-model="form.email"
                              label="Nhập email"
                              :rules="[validateEmail]"
                              variant="outlined"
                              class="mt-2"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="flex justify-center mt-3 gap-x-2">
              <v-btn @click="resetForm" color="#164397">Tìm kiếm</v-btn>
              <v-btn @click="validateForm">Làm mới</v-btn>
              <v-btn @click="clearForm" color="#164397">Xuất dữ liệu</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
import {validateEmail, validatePhoneNumber} from "../../../validate.js";

export default {
  name: "SearchCustomer",
  data() {
    return {
      form: {
        name: '',
        code: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    validateEmail(value) {
      if(value){
        return validateEmail(value)
      }
    },
    validatePhone(value) {
      if(value) {
        return validatePhoneNumber(value)
      }
    },
    submitForm() {

    },
    resetForm() {

    },
    validateForm(){
      this.form = {
        name: '',
        code: '',
        phone: '',
        email: ''
      }
    },
    clearForm() {

    },
  }
}
</script>

<style scoped>

</style>