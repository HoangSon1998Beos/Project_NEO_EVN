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
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';

export default {
  name: 'FileCustomer',
  data() {
    return {
      file: '',
      fileSelected: false,
      fileName: '',
      customTag: [
        { typeName: 'Type 1' },
        { typeName: 'Type 2' },
      ]
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
    // code download file từ tệp tin trên web, không custom
    // downloadFile(){
    //   const fileUrl = '/duong-dan-den-file';
    //   const link = document.createElement('a');
    //   link.href = fileUrl;
    //   link.download = 'file-tai-ve';
    //   link.click();
    // }
    // code download file tự custom excel
    downloadFile() {
      let objs = [
        {
          cusCode: "KH000",
          cusName: "Khách Hàng 1",
          cusPhoneNumber: "0123456789",
          cusEmail: "kh01@gmail.com",
          cusAddress: "Cầu giấy, HN",
          cusIDZalo: "ZL001",
          cusIDMess: "FB001",
        },
      ];
      let cusTypes = customTag.map((c) => c.typeName);
      let notifiedByChannel = ["Không", "Có"];

      let workbook = new ExcelJS.Workbook();
      let worksheet = workbook.addWorksheet("Sheet1");
      let headerRow = worksheet.addRow([
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
      ]);
      headerRow.eachCell((cell, number) => {
        cell.font = {
          name: "Times New Roman",
          bold: true,
        };
        cell.border = {
          top: {style: "thin"},
          left: {style: "thin"},
          bottom: {style: "thin"},
          right: {style: "thin"},
        };
      });
      // Insert data
      objs.forEach((d, i) => {
        let row = worksheet.addRow([
          i + 1,
          d.cusCode,
          d.cusName,
          d.cusPhoneNumber,
          d.cusEmail,
          d.cusAddress,
          d.cusIDZalo,
          notifiedByChannel[0],
          d.cusIDMess,
          notifiedByChannel[1],
          cusTypes[0],
        ]);
        row.eachCell((cell) => {
          cell.font = {
            name: "Times New Roman",
          };
        });
      });
      // Insert select box for 'notified by zalo' and 'notified by facebook'
      worksheet.getColumn("H").eachCell((cell, i) => {
        if (i > 1)
          cell.dataValidation = {
            type: "list",
            allowBlank: false,
            formulae: ['"' + notifiedByChannel.join(",") + '"'],
            showErrorMessage: false,
          };
      });
      worksheet.getColumn("J").eachCell((cell, i) => {
        if (i > 1)
          cell.dataValidation = {
            type: "list",
            allowBlank: false,
            formulae: ['"' + notifiedByChannel.join(",") + '"'],
            showErrorMessage: false,
          };
      });

      worksheet.getColumn("K").eachCell((cell, i) => {
        if (i > 1)
          cell.dataValidation = {
            type: "list",
            allowBlank: false,
            formulae: ['"' + cusTypes.join(",") + '"'],
            showErrorMessage: false,
          };
      });
      // Auto fit width
      worksheet.columns.forEach((column) => {
        const lengths = column.values.map((v) => v.toString().length);
        const maxLength = Math.max(
            ...lengths.filter((v) => typeof v === "number")
        );
        column.width = maxLength + 10;
        column.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
      });
      workbook.xlsx.writeBuffet().then((data) => {
        let blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "File-Mẫu-Danh-Sách-Khách-Hàng.xlsx");
      });
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