<template>
  <div class="layout-table">
    <span>Danh sách khách hàng</span>
    <v-data-table
      :headers="headers"
      :items="data"
      show-select
      :sort-asc-icon="'mdi-arrow-down'"
      :sort-desc-icon="'mdi-arrow-up'"
      item-value="customerCode"
    >
      <template v-slot:item.action = "{ item }" >
        <v-tooltip text="Cập nhật">
          <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="updateCustomer(item)"
                  >
                    edit
                  </span>
          </template>
        </v-tooltip>
        <v-tooltip text="Xoá">
          <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                  >
                    delete
                  </span>
          </template>
        </v-tooltip>
        <v-tooltip text="Xem thông tin">
          <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                  >
                    visibility
                  </span>
          </template>
        </v-tooltip>
      </template>
      <template #bottom>
        <Pagination
            :total-record="5"
            :total-pages="1"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Pagination from "../Pagination.vue";
import {nextTick} from "vue";

export default {
  name: "DataCustomer",
  components: {Pagination},
  data() {
    return {
      headers: [
        { title: "STT", align: "start", sortable: false, key: "stt" },
        { title: "Thao tác", align: "center", key: "action", sortable: false },
        { title: "Mã khách hàng", align: "start", key: "customerCode" },
        { title: "Họ và tên", align: "start", key: "customerName" },
        { title: "Số điện thoại", align: "start", key: "customerPhone" },
        { title: "Email", align: "start", key: "customerEmail" },
        { title: "Địa chỉ sử dụng dịch vụ", align: "start", key: "customerPlace" },
      ],
      data: [
        {
          stt: 1,
          customerCode: 'KH001',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0963379256',
          customerEmail: 'abc@gmail.com',
          customerPlace: 'Hà Nội'
        },
        {
          stt: 2,
          customerCode: 'KH002',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0963379256',
          customerEmail: 'abc@gmail.com',
          customerPlace: 'Hà Nội'
        },
        {
          stt: 3,
          customerCode: 'KH003',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0963379256',
          customerEmail: 'abc@gmail.com',
          customerPlace: 'Hà Nội'
        },
        {
          stt: 4,
          customerCode: 'KH004',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0963379256',
          customerEmail: 'abc@gmail.com',
          customerPlace: 'Hà Nội'
        },
        {
          stt: 5,
          customerCode: 'KH005',
          customerName: 'Nguyễn Văn A',
          customerPhone: '0963379256',
          customerEmail: 'abc@gmail.com',
          customerPlace: 'Hà Nội'
        }
      ],
    }
  },
  methods: {
    updateCustomer(item) {
      console.log("=>(DataCustomer.vue:117) item", item);
    },
  }
}
</script>

<style scoped lang="css">
 .layout-table {
  background-color: white;
   padding: 1rem;
 }
</style>