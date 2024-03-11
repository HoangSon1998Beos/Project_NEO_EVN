<template>
    <v-breadcrumbs :items="['Trang chủ', 'Quản trị hệ thống', 'Quản lý Khách hàng']"
                   class="mx-10"
    ></v-breadcrumbs>
    <div class="layout" >
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
  components: {DataCustomer, FileCustomer, SearchCustomer}
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