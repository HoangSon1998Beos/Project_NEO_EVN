<template>
  <v-container style="max-width: 100% !important">
    <v-card elevation="8" rounded="lg" style="margin-top: 25vh">
      <v-card-text style="width: 400px; text-align: left !important">
        <div class="text-subtitle-1 text-medium-emphasis">
          Nhập tài khoản họ tên và email
        </div>

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
    </v-card>
    <v-card
      style="background: white; color: yellow; margin-top: 15px; padding: 5px"
      class="text-right"
    >
      <v-spacer></v-spacer>
      <AddModal
        v-model:visible="visibleAdd"
        v-model:list-role="listRole"
        @success="searchAfter(textAddSuccess)"
      />
    </v-card>
    <v-data-table
        style="margin-top: 15px;border: black"
        :headers="headers"
        :items="listUser"
        item-key="id"
        v-model:items-per-page="perPage"
        :pagination.sync="totalPages"

    >
      <template v-slot:item.index="{ item, index }">
        <div>
          {{ indexRow(index) }}
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip location="end">
          <template v-slot:activator="{ props }">

            <v-btn icon @click="getUserInfoFormEdit(item.id)" size="x-small" v-bind="props">
              <v-icon
                  style="color: #2666de"
              >
                mdi-pencil
              </v-icon>

            </v-btn>
          </template>
          <span>Cập nhật</span>
        </v-tooltip>

        <v-tooltip
            location="end"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon @click="deleteUser((item.id))" size="x-small" v-bind="props">
              <v-icon
                  style="color: #ea5455">
                mdi-delete
              </v-icon>

            </v-btn>
          </template>
          <span>Xóa</span>
        </v-tooltip>

        <v-tooltip location="end">
          <template v-slot:activator="{ props }">
            <v-btn icon @click="lockUser(item.id)" size="x-small" v-bind="props">

              <v-icon
                  style="color: #ff9f43"
              >
                mdi-lock-open
              </v-icon>

            </v-btn>
          </template>
          <span>Khóa</span>
        </v-tooltip>
      </template>
      <template v-slot:item.username="{ item }">
        <a @click="getUserInfoFormView(item.id)">
          {{ item.username }}
        </a>

      </template>
      <template v-slot:item.roleId="{ item }">
        <div>
          {{ filterRole(item.roleId) }}
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <div class="text-center">
          <v-chip
            :color="checkColorStatus(item.status)"
            :text="filterStatus(item.status)"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </div>

      </template>

      <template v-slot:item.createdDate="{ item }">
        <span>{{ validateDate(item.createdDate) }}</span>
      </template>
      <template v-slot:item.updatedDate="{ item }">
        <span>{{ validateDate(item.updatedDate) }}</span>
      </template>
      <template v-slot:item.dateLogin="{ item }">
        <span>{{ validateDate(item.dateLogin) }}</span>
      </template>


      <template #bottom>
        <PaginationApi
            ref="pagina"
            @changePage="search"
            v-model:total-pages="totalPages"
            v-model:current-page="currentPage"
            v-model:per-page="perPage"
            v-model:total-record="totalRecord"
        />
      </template>
    </v-data-table>

    <EditModal v-model:user-info="userInfo" v-model:visible="visibleEdit" v-model:list-role="listRole"/>
    <DeleteModal v-model:visible="visibleDelete" @success="searchAfter(textDeleteSuccess)"/>
    <LockModal v-model:visible="visibleLock" @success="searchAfter(textLockSuccess)"/>
    <Successful v-model:visible="visibleSuccessful" v-model:text="textSuccessful"/>
    <ErrorModal v-model:visible="visibleError"/>
    <InfoModal v-model:user-info="userInfo" v-model:visible="visibleInfo"/>

  </v-container>


  <!--  v-model:visible="visibleInfo"-->

</template>

<script>
import axios from "axios";
import AddModal from "./modal-person/add.vue";
import EditModal from "./modal-person/edit.vue";
import DeleteModal from "./modal-person/delete-modal.vue";
import Successful from "./modal-person/successful-modal.vue";
import LockModal from "./modal-person/lock-modal.vue";
import ErrorModal from "./modal-person/error-modal.vue";
import InfoModal from "./modal-person/info-modal.vue";


// import Pagination from "../../components/Pagination.vue";
import PaginationApi from "../../components/Pagination-api.vue";

export default {
  components: {
    ErrorModal,
    EditModal,
    AddModal,
    DeleteModal,
    Successful,
    LockModal,
    PaginationApi,
    InfoModal

  },
  name: "index",
  data() {
    const listStatus = [
      {
        id: 1,
        name: 'Hoạt động'
      },
      {
        id: 2,
        name: 'Khóa'
      },
      {
        id: 3,
        name: 'Hết hạn'
      }
    ]

    return {
      textLockSuccess: "Khóa người dùng thành công",
      textDeleteSuccess: "Xóa người dùng thành công",
      textAddSuccess: "Thêm người dùng thành công",
      textSuccessful: '',
      visibleInfo: false,
      visibleError: false,
      visibleLock: false,
      visibleSuccessful: false,
      visibleDelete: false,
      visibleAdd: false,
      visibleEdit: false,
      userInfo: {},
      listStatus,
      headers: [
        {title: 'Số thứ tự', key: 'index', width: 120, align: 'center'},
        {title: 'Thao tác', key: 'actions', sortable: false, width: 500, align: 'center'},
        {title: 'Tài khoản', key: 'username', align: 'center', width: 140},
        {title: 'Vai Trò', key: 'roleId', align: 'center', width: 140},
        {title: 'Email', key: 'email', align: 'center', width: 140},
        {title: 'Số điện thoại', key: 'phoneNumber', align: 'center', width: 200},
        {title: 'Trạng thái', key: 'status', align: 'center', width: 200},
        {title: 'Ngày tạo', key: 'createdDate', align: 'center', width: 200},
        {title: 'Ngày cập nhật', key: 'updatedDate', align: 'center', width: 200},
        {title: 'Ngày đăng nhập', key: 'dateLogin', align: 'center', width: 200},

      ],
      searchValue: "",
      listUser: [],
      dialog: false,
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlkIjoxMTksImlhdCI6MTcwOTgwNDI0NCwiZXhwIjoxNzA5ODkwNjQ0fQ.juYqwYdwcVMQP9r9Li0t6TSe9GmFHvTunWi9LDcLKVln5FYfztm05Gzve8hiX46zZxrS824gzW7uslbs4EGejg',
      loaded: false,
      loading: false,
      editedItem: {
        id: null,
        name: "",
        position: "",
        salary: "",
      },
      totalRecord: 0,
      currentPage: 1,
      perPage: 10,
      totalPages: 0,
      listRole: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    indexRow(index) {
      return index + ((this.currentPage - 1) * this.perPage) + 1;
    },
    returnTotalPage(total) {
      return total;
    },
    checkColorStatus(status) {
      if (status === 1) return 'green';
      if (status === 3) return 'grey';
      if (status === 2) return 'red';
    },
    validateDate(date) {

      if (!date || date === null || date === '') {
        return '';
      } else {
        return new Date(date).toLocaleString();
      }
    },
    async searchAfter(text) {
      this.textSuccessful = text;
      this.visibleSuccessful = true;
      this.searchValue = "";
      await this.search(true);
    },
    getUser(id) {
      const userInfor = this.listUser.filter(item => item.id === id);
      if (userInfor.length === 1) {


        this.userInfo = userInfor[0];
        this.userInfo.roleLabel = this.filterRole(this.userInfo.roleId)
        this.userInfo.statusLabel = this.filterStatus(this.userInfo.status)

        // return userInfor[0];
      } else {
        this.userInfo = {};
      }
    },
    getUserInfoFormEdit(id) {
      this.getUser(id);
      this.visibleEdit = true;
    },
    getUserInfoFormView(id) {
      this.getUser(id);
      this.visibleInfo = true;
    },
    init() {
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
    lockUser(id) {
      // axios.put('http://10.252.10.112:3232/chatbot/user-info/lock/' + id, {
      //   headers: {
      //     'Authorization': `Bearer ${this.token}`,
      //   },
      // })
      //     .then(async response => {
      //       console.log('response', response);
      //       // Xử lý dữ liệu khi thành công
      //       await this.search(true);
      //     })
      //     .catch(error => {
      //       // Xử lý lỗi
      //     });
      this.visibleLock = true;
    },
    deleteUser(id) {
      this.visibleDelete = true;
    },
    filterStatus(status) {
      const statusInfo = this.listStatus.filter(item => item.id === status)
      if (statusInfo.length === 1) {
        return statusInfo[0].name;
      } else {
        return '';
      }
    },
    filterRole(statusId) {
      const roleInfo = this.listRole.filter(item => item.id === statusId)


      if (roleInfo.length === 1) {
        return roleInfo[0].roleName;
      } else {
        return '';

      }
    },

    async search(checkSearch) {
      let currentPage = 0;
      if (!checkSearch) {
        currentPage = this.currentPage - 1;
      }
      this.loading = true
      await axios.get('http://10.252.10.112:3232/chatbot/user-info?keyword=' + `${this.searchValue}`
          + '&currentPage=' + currentPage + '&perPage=' + `${this.perPage} `, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })
          .then(async response => {

            setTimeout(() => {
              this.loading = false
              this.loaded = true
            }, 2000)
            // Xử lý dữ liệu khi thành công
            this.listUser = response.data.content.items;
            this.totalRecord = response.data.content.total;

            this.totalPages = Math.ceil(response.data.content.total / this.perPage)
            // this.$refs.pagina.setTotalPage(this.totalPages)

            // this.returnTotalPage(this.totalPages);
            console.log('this.perPage', this.perPage)
            console.log('this.totalPages', this.totalPages)

          })
          .catch(error => {
            // Xử lý lỗi
            if (error.response.status !== 200) {
              setTimeout(() => {
                this.loading = false
                this.loaded = true
              }, 2000)
              this.visibleError = true;
              return
            }
          });

    },

    openDialog(action, item = null) {
      this.dialog = true;
      if (action === 'edit') {
        this.editedItem = {...item};
      } else {
        this.editedItem = {id: null, name: '', position: '', salary: ''};

      }
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
