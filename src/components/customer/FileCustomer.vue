<template>
  <v-app>
    <div class="grid gap-y-[1px]">
      <v-btn color="#4b4b4b"
             prepend-icon="mdi-file-upload"
             @click="handleUploadClick"
      >
        Thêm tập dữ liệu mới
      </v-btn>
      <v-btn color="#4b4b4b"
             prepend-icon="mdi-file-download"
             @click="downloadFile"
      >
        Tải xuống file mẫu
      </v-btn>
    </div>
    <div class="p-[20px] self-center">
      <v-file-input
          v-model="file"
          type="file"
          ref="fileInput"
          style="display: none"
          @change="handleFileChange"
      />
      <v-btn v-if="!fileSelected" class="dashed-border" @click="handleUploadClick">
        <div class="grid justify-items-center">
          <span>KÉO THẢ FILE HOẶC TỆP TIN</span>
          <v-icon size="150">mdi-download</v-icon>
        </div>
      </v-btn>
      <span v-else>File đã chọn: {{ fileName }}</span>
      <div class="flex justify-center mt-5 gap-2">
        <v-btn @click="uploadFile" color="#164397">Tải lên</v-btn>
        <v-btn @click="clearFile" color="#ea5455">Xoá</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
import {exportFile} from "../../utils/export.js";

export default {
  name: 'FileCustomer',
  data() {
    return {
      file: '',
      fileSelected: false,
      fileName: 'data-table',
      headers: [
        "STT",
        "Mã khách hàng (*)",
        "Họ và tên (*)",
        "Số điện thoại (*)",
        "Email",
        "Địa chỉ sử dụng dịch vụ",
        "ID Zalo",
        "Đăng ký nhận thông tin qua Zalo",
        "ID Facebook",
        "Đăng ký nhận thông tin qua Facebook",
        "Loại khách hàng",
      ],
      notifiedByApp : [
        "Không",
        "Có"
      ],
      customTag: [
         'Type 1' ,
         'Type 2',
      ],
      sheetName: 'Sheet 1',
      objs : [
        {
          cusCode: "KH000",
          cusName: "Khách Hàng 1",
          cusPhoneNumber: "0123456789",
          cusEmail: "kh01@gmail.com",
          cusAddress: "Cầu giấy, HN",
          cusIDZalo: "ZL001",
          cusIDMess: "FB001",
        },
        {
          cusCode: "KH000",
          cusName: "Khách Hàng 1",
          cusPhoneNumber: "0123456789",
          cusEmail: "kh01@gmail.com",
          cusAddress: "Cầu giấy, HN",
          cusIDZalo: "ZL001",
          cusIDMess: "FB001",
        },
        {
          cusCode: "KH000",
          cusName: "Khách Hàng 1",
          cusPhoneNumber: "0123456789",
          cusEmail: "kh01@gmail.com",
          cusAddress: "Cầu giấy, HN",
          cusIDZalo: "ZL001",
          cusIDMess: "FB001",
        },
      ],
    };
  },
  methods: {
    handleFileChange(event) {
      console.log("=>(FileCustomer.vue:89) event", event);
      console.log("=>(FileCustomer.vue:91) event.target.files[0]", event.target.files[0]);
      this.file = event.target.files[0];
      if (this.file) {
        this.fileSelected = true;
        this.fileName = this.file.name;
        this.uploadFile(this.file);
      }
    },
    clearFile() {
      this.fileSelected = false
    },
    uploadFile(file) {
    },
    handleUploadClick() {
      this.$refs.fileInput.click()
    },
    generateRow(d,i){
      return [
        i + 1,
        d.cusCode,
        d.cusName,
        d.cusPhoneNumber,
        d.cusEmail,
        d.cusAddress,
        d.cusIDZalo,
        this.notifiedByApp[0],
        d.cusIDMess,
        this.notifiedByApp[1],
        this.customTag[0],
      ]
    },
    downloadFile() {
      exportFile(this.objs,this.generateRow,this.headers,this.fileName,this.sheetName)
    }
  }
};
</script>
<style scoped lang="css">
.dashed-border {
  border: 2px dashed #000;
  height: 200px;
  width: 400px;
  cursor: pointer;
}
</style>