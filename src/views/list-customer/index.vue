<template>
  <div>
    <v-breadcrumbs :items="['Trang chủ', 'Quản trị hệ thống', 'Quản lý Khách hàng']"
                   class="mx-10"
    ></v-breadcrumbs>
    <div class="layout">
      <div class="layout-top">
        <div class="search-custom" style="width: 60% ; height: 400px">
          <SearchCustomer/>
        </div>
        <div class="file-custom" style="width: 40% ; height: 400px">
          <FileCustomer/>
        </div>
      </div>
      <div class="layout-bottom">
      </div>
    </div>
  </div>

</template>

<script>
import SearchCustomer from "../../components/customer/SearchCustomer.vue";
import FileCustomer from "../../components/customer/FileCustomer.vue";
import ListCustomer from "../../components/customer/ListCustomer.vue";

export default {
  name: "ListCustomer",
  components: {FileCustomer, SearchCustomer, ListCustomer}
}
</script>

<style scoped>
.layout-top {
  display: flex;
  column-gap: 1rem;
  padding: 2rem;
}
.layout-bottom {
  padding: 0 2rem 0 2rem;
}
</style>