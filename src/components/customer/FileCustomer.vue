<template>
  <v-app>
    <div class="button-upload">
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
    <div class="upload-file-custom">
      <v-file-input
          v-model="file"
          type="file"
          ref="fileInput"
          style="display: none"
          @change="handleFileChange"
      />
      <v-btn v-if="!fileSelected" class="dashed-border" @click="handleUploadClick">
        <div class="config">
          <span>KÉO THẢ FILE HOẶC TỆP TIN</span>
          <v-icon size="150">mdi-download</v-icon>
        </div>
      </v-btn>
      <span v-else>File đã chọn: {{ fileName }}</span>
      <div class="button-upload-bottom">
        <v-btn @click="uploadFile" color="#164397">Tải lên</v-btn>
        <v-btn @click="clearFile" color="#ea5455">Xoá</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'FileCustomer',
  data() {
    return {
      file: '',
      fileSelected: false,
      fileName: ''
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      console.log("=>(FileCustomer.vue:43) this.file", this.file);
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
    downloadFile(){
      const fileUrl = '/duong-dan-den-file';
      // Tạo một thẻ a ẩn
      const link = document.createElement('a');
      // Gán thuộc tính href của thẻ a với đường link của file
      link.href = fileUrl;
      // Đặt tên file khi tải xuống
      link.download = 'file-tai-ve';
      // Kích hoạt sự kiện click cho thẻ a để bắt đầu quá trình tải xuống
      link.click();
    }
  }
};
</script>
<style scoped lang="css">
.button-upload {
  display: grid;
  row-gap: 1px;
}
.dashed-border {
  border: 2px dashed #000;
  height: 200px;
  width: 400px;
  cursor: pointer;
}
.upload-file-custom {
  align-self: center;
  padding: 20px;
}
.button-upload-bottom {
  margin-top: 20px;
  display: flex;
  column-gap: 10px;
  justify-content: center;
}
.config {
  display: grid;
  justify-items: center;
}
</style>