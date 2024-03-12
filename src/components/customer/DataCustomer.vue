<template>
  <div class="bg-white p-[16px]">
    <span>Danh sách khách hàng</span>
    <v-data-table
        :headers="headers"
        :items="data"
        show-select
        :sort-asc-icon="'mdi-arrow-down'"
        :sort-desc-icon="'mdi-arrow-up'"
        v-model="dataCheckBox"
        item-key="cusCode"
    >

      <template v-slot:item.action = "{ item }" >
        <v-tooltip text="Cập nhật">
          <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="updateCustomer(item)"
                      style="color: #ff9f43"
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
                      style="color: #ea5455"
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
                      style="color: #28c76f"
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
import Api from "../../api/api.js";
import {nextTick} from "vue";
import appUtils from "../../views/person-management/utils.js";
const mapComputed = (propName) => {
  return {
    // getter
    get: function () {
      return this[propName]
    },
    // setter
    set: function (newValue) {
      this.$emit('update:' + propName, newValue);
    }
  }
}
export default {

  name: "DataCustomer",
  components: {Pagination},

  data() {
    return {
      dataCheckBox: [],
      headers: [
        { title: "STT", align: "start", sortable: false, key: "id",value: 'id', },
        { title: "Thao tác", align: "center", key: "action", sortable: false },
        { title: "Mã khách hàng", align: "start", key: "cusCode",value: "cusCode" },
        { title: "Họ và tên", align: "start", key: "cusName" },
        { title: "Số điện thoại", align: "start", key: "cusPhoneNumber" },
        { title: "Email", align: "start", key: "cusEmail" },
        { title: "Địa chỉ sử dụng dịch vụ", align: "start", key: "cusAddress" },
      ],
      config: {},
      data: [],
      a:[],
      customerObject:{
        createdDate: "",
        id: '',
        cusCode: '',
        cusName: '',
        cusAddress: '',
        cusPhoneNumber: '',
        cusEmail: '' ,
        createdBy: '',
      }
    }
  },
  props :{
    items:{
      type: Array,
      value: []
    },
    header: {
      type: Array,
      value: {}
    }
  },
  computed: {
    getHeader: appUtils.mapComputed('header'),
    getItems: appUtils.mapComputed('items')
  },
  created() {
    this.init();
  },
  watch: {
    dataCheckBox(val) {
      console.log('this.data',this.data)
      // const filterArray = filterArray.a;
      this.getItems = this.data.filter(item => val.includes(item['id']));
      console.log('this.getItems',this.getItems)
    }
  },
  methods: {
    handleClick(value){
      console.log('value',value)
    },
    async init() {
      await this.search();
      this.getHeader = this.headers;
    },
    async search() {
      this.config = {
        params: {
          cusName: '',
          cusCode: '',
          cusPhoneNumber: '',
          cusEmail: '',
          currentPage: 0,
          perPage: 10,
        },
      };
      try {
        const dataResponse = await Api.person.indexWidthPath(`customer`,this.config);
        console.log('dataResponse',dataResponse)
        this.data = dataResponse.data.content.items;
        // this.getItems = this.data;
      }catch (e){
        console.log(e)
      }
    },
    updateCustomer(item) {
      console.log("=>(DataCustomer.vue:117) item", item);
    },

  }
}
</script>

<style scoped lang="css">

</style>