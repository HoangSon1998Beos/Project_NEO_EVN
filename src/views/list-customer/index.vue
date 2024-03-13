<template>
  <v-breadcrumbs :items="dataBreadCrumb" style="margin-left:40px; font-size: smaller">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <div class="layout">
    <div class="flex gap-4 pr-8 pb-4 pl-8">
      <div class="search-custom" style="width: 65%">
        <SearchCustomer :items="items" @exportData="exportData"/>
      </div>
      <div class="file-custom" style="width: 35%">
        <FileCustomer/>
      </div>
    </div>
    <div class="px-8">
      <DataCustomer v-model:items="items"/>
    </div>
  </div>
</template>

<script>
import SearchCustomer from "../../components/customer/SearchCustomer.vue";
import FileCustomer from "../../components/customer/FileCustomer.vue";
import DataCustomer from "../../components/customer/DataCustomer.vue";
import { exportDataExcel } from '../../ExportExcel.js';

export default {
  name: "ListCustomer",
  components: {DataCustomer, FileCustomer, SearchCustomer},
  data() {
    return {
      exportDataExcel,
      dataBreadCrumb: [
        {
          title: "Trang chủ",
          disabled: false,
          href: "home",
        },
        {
          title: "Quản trị hệ thống",
        },
        {
          title: "Quản lý khách hàng",
        },
      ],
      items: [],
      header: [
        { text: 'STT', value: 'id' },
        { text: 'Mã khách hàng', value: 'cusCode' },
        { text: 'Họ và tên', value: 'cusName' },
        { text: 'Số điện thoại', value: 'cusPhoneNumber' },
        { text: 'Email', value: 'cusEmail' },
        { text: 'Địa chỉ sử dụng dịch vụ', value: 'cusAddress' },
      ]
    }

  },
  methods: {
    exportData() {
      this.exportDataExcel(this.items, this.header, 'export-file');
    }
  }
}
</script>

<style scoped>
:deep(.v-application__wrap) {
  min-height: 0;
}
</style>