<template>
  <v-app class="layout-search">
    <span class="title-search">Tìm kiếm khách hàng</span>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="submitForm" ref="formSearchCustomer">
            <v-row>
              <v-col cols="6">
                <span>Họ tên</span>
                <v-text-field v-model="form.input1"
                              label="Nhập họ tên"
                              variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Mã khách hàng</span>
                <v-text-field v-model="form.input2"
                              label="Nhập mã khách hàng"
                              variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Số điện thoại</span>
                <v-text-field v-model="form.input3"
                              label="Nhập số điện thoại"
                              variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Email</span>
                <v-text-field v-model="form.input4"
                              label="Nhập email"
                              variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="buttonSearchCustom">
              <v-btn @click="resetForm">Tìm kiếm</v-btn>
              <v-btn @click="validateForm">Làm mới</v-btn>
              <v-btn @click="clearForm">Xuất dữ liệu</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
export default {
  name: "SearchCustomer",
  data() {
    return {
      form: {
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      }
    }
  },
  methods: {
    submitForm() {

    },
    resetForm() {

    },
    validateForm(){

    },
    clearForm() {

    },
  }
}
</script>

<style scoped>
.buttonSearchCustom {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
.title-search {
  padding: 20px 0 0 30px;
}
</style>