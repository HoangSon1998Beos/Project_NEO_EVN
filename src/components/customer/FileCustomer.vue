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
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'file-tai-ve';
      link.click();
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