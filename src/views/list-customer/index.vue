<template>
  <v-breadcrumbs :items="dataBreadCrumb" style="margin-left:40px; font-size: smaller">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <div class="layout">
    <div class="flex gap-4 pr-8 pb-4 pl-8">
      <div class="search-custom" style="width: 65%">
        <SearchCustomer :items="items"/>
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

export default {
  name: "ListCustomer",
  components: {DataCustomer, FileCustomer, SearchCustomer},
  data() {
    return {
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
    }
  },
}
</script>

<style scoped>
:deep(.v-application__wrap) {
  min-height: 0;
}
</style>