<template>
  <v-btn @click="exportData" color="#164397">Xuất dữ liệu</v-btn>
</template>

<script>
import ExcelJS from 'exceljs'

export default {
  name: 'ButtonExport',
  data() {
    return {
      header: [
        { text: 'STT', value: 'id' },
        { text: 'Mã khách hàng', value: 'cusCode' },
        { text: 'Họ và tên', value: 'cusName' },
        { text: 'Số điện thoại', value: 'cusPhoneNumber' },
        { text: 'Email', value: 'cusEmail' },
        { text: 'Địa chỉ sử dụng dịch vụ', value: 'cusAddress' },
      ],
    }
  },
  props: {
    headers: {
      // type: Array,
      // value: [
      //   { text: 'STT', value: 'id' },
      //   { text: 'Mã khách hàng', value: 'cusCode' },
      //   { text: 'Họ và tên', value: 'cusName' },
      //   { text: 'Số điện thoại', value: 'cusPhoneNumber' },
      //   { text: 'Email', value: 'cusEmail' },
      //   { text: 'Địa chỉ sử dụng dịch vụ', value: 'cusAddress' },
      // ]
    },
    items: {
      type: Array,
      value: [],
    },
  },
  methods: {
    async exportData() {
      console.log('ite=m', this.items)
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Data')

      // Add headers to the worksheet
      const headerRow = worksheet.addRow(
        this.header.map((header) => header.text),
      )
      headerRow.font = { bold: true }

      // Add data to the worksheet column by column
      this.header.forEach((header) => {
        const columnData = this.items.map((item) => item[header.value])
        worksheet.getColumn(this.header.indexOf(header) + 1).values = [
          header.text,
          ...columnData,
        ]
      })

      // Export Excel file
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const filename = 'exported_data.xlsx'

      // Create and trigger download link
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
    },
  },
}
</script>

<style scoped></style>
