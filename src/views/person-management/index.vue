
<template>
  <v-container>
    <v-card
        elevation="8"
        rounded="lg"
    >

      <v-card-text style="width: 400px;text-align: left !important;">
        <div class="text-subtitle-1 text-medium-emphasis">Nhập tài khoản họ tên và email</div>

        <v-text-field
            max-width="400"
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Nhập tài khoản, họ tên"
            variant="solo"
            hide-details
            single-line
            v-model="searchValue"
            @click:append-inner="search(true)"
        ></v-text-field>
      </v-card-text>
    </v-card >
    <v-card

        style="background: white;color: yellow;margin-top: 15px;padding: 5px" class="text-right">
      <v-spacer></v-spacer>
      <AddModal/>

<!--      <v-btn @click="" style="color: yellow;">Thêm mới</v-btn>-->
    </v-card>
    <v-data-table
        style="margin-top: 15px"
        :headers="headers"
        :items="items"
        item-key="id"
        v-model:items-per-page="perPage"
    >


      <template v-slot:item.index="{ item , index}">
        <div>
          {{ index + 1 }}
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
            style="color: blue"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            style="color: red">
          mdi-delete
        </v-icon>
        <v-icon
            style="color: yellow"
        >
          mdi-lock-open
        </v-icon>
      </template>
      <template v-slot:item.roleId="{ item }">
        <div>
          {{ filterRole(item.roleId) }}
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <div>
          {{ filterStatus(item.status) }}
        </div>
      </template>


      <template v-slot:item.createdDate="{ item }">
        <span>{{ new Date(item.createdDate).toLocaleString() }}</span>
      </template>
      <template v-slot:item.updatedDate="{ item }">
        <span>{{ new Date(item.updatedDate).toLocaleString() }}</span>
      </template>
      <template v-slot:item.dateLogin="{ item }">
        <span>{{ new Date(item.dateLogin).toLocaleString() }}</span>
      </template>
    </v-data-table>
    <v-pagination
        v-if="totalPages>1"
        v-model="currentPage"
        :length="totalPages"
        @update:model-value="search(false)"
    ></v-pagination>

  </v-container>
</template>

<script>
import axios from "axios";
import AddModal from "./component/add.vue";

export default {
  components: {
    AddModal
  },
  name: "index",
  data() {
    const listStatus= [
      {
        id : 1,
        name: 'Hoạt động'
      },
      {
        id : 2,
        name: 'Khóa'
      },
      {
        id : 3,
        name: 'Hết hạn'
      }
    ]
    return {
      addVisible: true,
      listStatus,
      headers: [
        { title: 'Số thứ tự', key: 'index' },
        { title: 'THAO TÁC', key: 'actions', sortable: false },
        { title: 'Tài khoản', key: 'username' },
        { title: 'Vai Trò', key: 'roleId' },
        { title: 'Email', key: 'email' },
        { title: 'Số điện thoại', key: 'phoneNumber' },
        { title: 'Trạng thái', key: 'status' },
        { title: 'Ngày tạo', key: 'createdDate' },
        { title: 'Ngày cập nhật', key: 'updatedDate' },
        { title: 'Ngày đăng nhập', key: 'dateLogin' },
      ],
      searchValue: 'Test',
      items: [],
      dialog: false,
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJudnF1YW4iLCJuYW1lIjoiTmd1eeG7hW4gVsSDbiBRdcOibiIsInR5cGUiOiJBRE1JTiIsImlkIjoyNSwiaWF0IjoxNzA5NjA1MTk0LCJleHAiOjE3MDk2OTE1OTR9.EmRtJACONc8rOq6j_yUxOQENahtX3B23Xj3Uygab3tjBViLrxoBvwHoCwTJW1gnGSuh8bFamhqeErpKNN1Xl5g',
      loaded: false,
      loading: false,
      editedItem: {
        id: null,
        name: '',
        position: '',
        salary: '',
      },
      currentPage: 1,
      perPage: 10,
      totalPages: 0,
      listRole:[],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      axios.get('http://10.252.10.112:3232/chatbot/roles/get-role', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
          .then(response => {
            // Xử lý dữ liệu khi thành công
            this.listRole = response.data.content;

          })
          .catch(error => {
            // Xử lý lỗi
          });
    },
    formatDate(){

    },
    filterStatus(status){

      const statusInfo = this.listStatus.filter(item => item.id === status)

      if(statusInfo.length === 1){
        return statusInfo[0].name;
      }else{
        return '';
      }
    },
    filterRole(statusId){
      const roleInfo = this.listRole.filter(item => item.id === statusId)

      if(roleInfo.length === 1){
        return roleInfo[0].roleName;
      }else{
        return '';
      }
    },

    search(checkSearch) {
      let currentPage = 0;
      if(!checkSearch){
        currentPage = this.currentPage - 1;
      }
      this.loading = true
      axios.get('http://10.252.10.112:3232/chatbot/user-info?keyword='+ `${this.searchValue}`
          +'&currentPage='+ currentPage + '&perPage='+ `${this.perPage} `, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
          .then(response => {

            setTimeout(() => {
              this.loading = false
              this.loaded = true
            }, 2000)
            // Xử lý dữ liệu khi thành công
            this.items = response.data.content.items;
            this.totalPages = Math.ceil(response.data.content.total / this.perPage)

            console.log(" this.responseData", this.items.content.items);
          })
          .catch(error => {
            // Xử lý lỗi
          });
    },

    openDialog(action, item = null) {
      this.dialog = true;
      if (action === 'edit') {
        this.editedItem = { ...item };
      } else {
        this.editedItem = { id: null, name: '', position: '', salary: '' };
      }
    },

    closeDialog() {
      this.dialog = false;
    },
    saveItem() {
      if (this.editedItem.id !== null) {
        // Update existing item
        const index = this.items.findIndex(item => item.id === this.editedItem.id);
        this.$set(this.items, index, { ...this.editedItem });
      } else {
        // Add new item
        this.items.push({
          ...this.editedItem,
          id: this.items.length + 1,
        });
      }
      this.closeDialog();
    },
    deleteItem(item) {
      const index = this.items.findIndex(i => i.id === item.id);
      this.items.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.v-card-text {
  text-align: left !important;
}
.v-data-table-header {
  background-color: red !important;
}

</style>
