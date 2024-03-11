<template>
  <v-breadcrumbs :items="dataBreadCrumb" style="margin-left:40px; font-size: smaller">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <div class="layout">
    <div class="layout-top">
      <div class="search-custom" style="width: 65%">
        <SearchCustomer/>
      </div>
      <div class="file-custom" style="width: 35%">
        <FileCustomer/>
      </div>
    </div>
    <div class="layout-bottom">
      <DataCustomer/>
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
          href: "trang-chu",
        },
        {
          title: "Quản trị hệ thống",
        },
        {
          title: "Quản lý khách hàng",
        },
      ],
    }
  }
}
</script>

<style scoped>
.layout-top {
  display: flex;
  column-gap: 1rem;
  padding: 0 2rem 1rem 2rem;
}
.layout-bottom {
  padding: 0 2rem 0 2rem;
}
:deep(.v-application__wrap) {
  min-height: 0;
}
</style>