<template>
  <div class="mx-10">
    <v-breadcrumbs :items="['Trang chủ', 'Đào tạo Bot', 'Quản lý Bot']"></v-breadcrumbs>
    <div class="layout">
      <div class="card-layout">
        <v-btn prepend-icon="mdi-plus" color="#2666de" @click="addBot">Thêm mới</v-btn>
        <v-card class="mt-5">
          <v-data-table
              :headers="headers"
              :items="data.items"
              density="compact"
              :sort-asc-icon="'mdi-arrow-down'"
              :sort-desc-icon="'mdi-arrow-up'"
              :items-per-page="pagination.pageSize"
              item-key="name"
              class="custom-table"
          >
            <template v-slot:item.action="{item}">
              <v-tooltip text="Xem thông tin">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="viewBot(item)"
                  >
                    visibility
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip text="Cập nhật">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="editBot(item)"
                  >
                    edit
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip v-if="!item.status" text="Bật bot">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="startBot(item)"
                  >
                    play_arrow
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip v-else text="Tắt bot">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="stopBot(item)"
                  >
                    stop
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip text="Triển khai kịch bản">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="deployBot(item)"
                  >
                    cached
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip text="Xoá">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="deleteBot(item)"
                  >
                    delete
                  </span>
                </template>
              </v-tooltip>
              <v-tooltip text="Kết quả">
                <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                      @click="resultBot(item)"
                  >
                    error_outline
                  </span>
                </template>
              </v-tooltip>
            </template>
            <template v-slot:item.status="{ item }">
              <div>
                <v-chip
                    :color="getColorWork(item)"
                    :text="getTextWork(item)"
                    class="rounded-be-xl font-weight-medium h-25"
                    size="small"
                    label
                ></v-chip>
              </div>
            </template>
            <template v-slot:item.botType="{ item }">
              <div>
                {{ item.botType ? 'Bot khách hàng' : 'Bot đào tạo' }}
              </div>
            </template>
            <template v-slot:item.trainStatus="{ item }">
              <div>
                <v-chip
                    :color="getColorTrain(item)"
                    :text="getTextTrain(item)"
                    class="rounded-be-xl font-weight-medium h-25"
                    size="small"
                    label
                ></v-chip>
              </div>
            </template>
            <template #bottom>
              <Pagination
                :value="pagination.page"
                :total-record="totalItems"
                @input="updatePage"
                @update="updatePerPage"
                :total-pages="totalPage"
              />
            </template>
          </v-data-table>

        </v-card>
        <ModalDelete
          :visible="visibleModal"
          @cancel="cancelModal"
          @ok="confirmModal"
          :button-ok-text="isDelete ? 'Xoá' : isStart ? 'Start' : 'Stop'"
        >
          <template #description>
            {{ isDelete ? 'Bạn có chắc chắn yêu cầu xóa ' + botName+' này không?'
              : isStart ? 'Bạn có chắc chắn khởi động ' + botName + ' không ?'
                  : 'Bạn có chắc chắn tắt '+ botName + 'không ?'}}
          </template>
        </ModalDelete>
        <ModalCreate
          :visible="visibleModalCreate"
          :action="actionCode"
          @cancel="cancelModalCreate"
          @create="saveForm"
          @edit="editForm"
        >

        </ModalCreate>
      </div>
    </div>
    <div class="app">
      <div class="app_chill">
        <div class="custom-text">
          Các phiên đang chat
        </div>
        <div class="container">
          <v-btn width="47%" color="#2666de" style="color: white" @click="zaloClick">
            Zalo({{zalo_count}})
          </v-btn>
          <v-btn width="47%" color="#2666de" style="color: white"@click="messClick">
            Messenge({{mess_count}})
          </v-btn>
        </div>
        <div class="container">
          <v-btn width="47%" color="#2666de" style="color: white"@click="appClick">
            App({{app_count}})
          </v-btn>
          <v-btn width="47%" color="#2666de" style="color: white"@click="webClick">
            Web({{web_count}})
          </v-btn>
        </div>
        <div class="custom-text mt-10">
          Phiên chat thuộc {{ appName }}
        </div>
        <div> Không có phiên chat nào</div>
      </div>
    </div>
  </div>
</template>

<script>


import ModalDelete from "../../components/bot/ModalDelete.vue";
import ModalCreate from "../../components/bot/ModalCreate.vue";
import axios from "axios";
import { COLOR_STATUS_BOT, STATUS_BOT, STATUS_BOT_TRAIN,COLOR_STATUS_BOT_TRAIN } from "../../utils/constants.js";
import Pagination from "../../components/Pagination.vue";

export default {
  name: 'BotManagement',
  components: {Pagination, ModalCreate, ModalDelete},
  data() {
    return {
      headers: [
        { title: 'STT', align: 'start', sortable: false, key: 'stt'},
        { title: 'Thao tác', align: 'center', key: 'action', sortable: false,width: '200px'},
        { title: 'Mã bot', align: 'start', key: 'botCode' },
        { title: 'Tên Bot', align: 'start', key: 'botName' },
        { title: 'Loại bot', align: 'start', key: 'botType' },
        { title: 'Trạng thái hoạt động', align: 'start', key: 'status' },
        { title: 'Trạng thái đào tạo', align: 'start', key: 'trainStatus' },
        { title: 'Ngày đào tạo', align: 'start', key: 'trainingDate' },
        { title: 'Phiên bản', align: 'start', key: 'nameModel' },
        { title: 'Máy chủ lưu trữ', align: 'start', key: 'hostName' },
      ],
      data: [],
      zalo_count: 0,
      mess_count: 0,
      app_count: 0,
      web_count: 0,
      visibleModal: false,
      visibleModalCreate: false,
      isDelete: false,
      isStart: false,
      isStop: false,
      botName: '',
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlkIjoxMTksImlhdCI6MTcwOTcwODg5MywiZXhwIjoxNzA5Nzk1MjkzfQ.6Ykyx_gOwIHYsGvw_jEH3-8k8iATY9EUio0hmLUGaYHmP3rgut4RXvEpMlo4GrTBUW1FuExIcqdy7G8bFMuh9g',
      config: {},
      appName:'',
      actionCode: '',
      pagination: {
        page: 1, // Trang hiện tại
        pageSize: 10, // Số mục trên mỗi trang
      },
      totalItems: 0, // Tổng số mục
    }
  },
  created() {
    this.getAllBot()
  },
  watch: {
    data() {
      this.updateSTT(); // Cập nhật chỉ số STT khi có thay đổi trong mảng items
    },
  },
  computed: {
    totalPage() {
      // return Math.ceil(this.totalItems / this.pagination.perPage);
      return 5;
    },
  },
  methods: {
    updateSTT() {
      this.data.items.forEach((item, index) => {
        item.stt = index + 1; // Tính chỉ số STT cho mỗi item dựa trên số lượng các mục trong mảng items
      });
    },
    async getAllBot(){
      try {
        this.config = {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }
        const dataResponse = await axios.get(`http://10.252.10.112:3232/chatbot/bot/get-all?currentPage=${this.pagination.page}&perPage=${this.pagination.pageSize}`, this.config)
        this.data = dataResponse.data.content
        this.totalItems = this.data.total
      } catch (e) {
        console.log("=>(index.vue:268) e", e);
      }
    },
    getColorWork(item) {
      return COLOR_STATUS_BOT.find((x) => x.key === item.status).value
    },
    getColorTrain(item) {
      return COLOR_STATUS_BOT_TRAIN.find((x) => x.key === item.trainStatus).value
    },
    getTextWork(item) {
      return STATUS_BOT.find((x) => x.value === item.status).label
    },
    getTextTrain(item) {
      return STATUS_BOT_TRAIN.find((x) => x.value === item.trainStatus).label
    },
    addBot() {
      this.actionCode = 'isCreate'
      this.visibleModalCreate = true
    },
    viewBot(item){
      this.actionCode = 'isView'
      this.visibleModalCreate = true
    },
    editBot(item){
      this.actionCode = 'isEdit'
      this.visibleModalCreate = true
    },
    startBot(item){
      this.botName = item.name
      this.isStart = true
      this.visibleModal = true
    },
    stopBot(item){
      this.botName = item.name
      this.isStop = true
      this.visibleModal = true
    },
    deployBot(item) {

    },
    deleteBot(item){
      this.botName = item.name
      this.isDelete = true
      this.visibleModal = true
    },
    resultBot(item){

    },
    cancelModal() {
      this.visibleModal = false
      setTimeout(() => {
        this.isDelete = false
        this.isStart = false
        this.isStop = false
      },200)
    },
    cancelModalCreate() {
      this.visibleModalCreate =false
    },
    saveForm(formData) {
    },
    confirmModal() {

    },
    zaloClick() {
      this.appName = 'Zalo'
    },
    messClick() {
      this.appName = 'Messenger'
    },
    appClick() {
      this.appName = 'App'
    },
    webClick() {
      this.appName = 'Web'
    },
    updatePage(page){
      this.pagination.page = page
      this.getAllBot()
    },
    updatePerPage(item) {
      this.pagination.pageSize = item
      this.pagination.page = 1
      this.$nextTick(() => {
        this.getAllBot()
      })
    }
  },
}
</script>

<style scoped lang="css">
.layout {
  background-color: white;
  border-radius: 5px;
}
.app {
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNjAgMjYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNjAgMjYwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0UxRTBFOTt9Cjwvc3R5bGU+CjxnPgoJPGcgaWQ9ImktbGlrZS1mb29kIj4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjQuNCwxNmMwLjIsMC42LDAuNCwxLjMsMC41LDJoLTMuN2wxLjIsMi4zbDAuNSwwLjlsLTAuMiwwLjFWMjhjMi4yLDEuNywyLjcsNC44LDEsNwoJCQljLTAuOCwxLTEuOSwxLjctMy4yLDEuOVYzN2MtMC45LDMuNS00LjEsNi03LjgsNmgtMjBjLTMuNiwwLTYuOC0yLjUtNy43LTZ2LTAuMWMtMi43LTAuNC00LjYtMy00LjItNS43YzAuMi0xLjMsMC45LTIuNSwxLjktMy4yCgkJCXYtNi44bC0wLjgtMS42bC0wLjQtMC45bDAuOS0wLjRMLTE3LDE4aC0zQy0xNy4yLDUuNi00LjktMi4yLDcuNSwwLjZDMTUuNCwyLjMsMjEuOSw4LjIsMjQuNCwxNnogTS0xMi40LDE4Yy0wLjIsMC0wLjMsMC0wLjQsMC4xCgkJCWwtMy4xLDEuNmwwLjksMS44bDEuMy0wLjdjMC44LTAuNCwxLjgtMC40LDIuNywwbDIuMiwxLjFjMC4zLDAuMSwwLjYsMC4xLDAuOSwwbDIuMi0xLjFjMC44LTAuNCwxLjgtMC40LDIuNywwbDIuMiwxLjEKCQkJYzAuMywwLjEsMC42LDAuMSwwLjksMGwyLjItMS4xYzAuOC0wLjQsMS44LTAuNCwyLjcsMGwyLjIsMS4xQzcuNCwyMiw3LjcsMjIsOCwyMS45bDIuOS0xLjNjMC44LTAuMywxLjctMC4zLDIuNCwwbDIuOSwxLjMKCQkJYzAuMywwLjEsMC42LDAuMSwwLjksMGwzLjEtMS41bC0wLjktMS44bC0xLjQsMC43Yy0wLjgsMC40LTEuNywwLjQtMi42LDAuMWwtMi44LTEuMkMxMi4zLDE4LDEyLjIsMTgsMTIuMSwxOGwwLDAKCQkJYy0wLjEsMC0wLjMsMC0wLjQsMC4xbC0yLjgsMS4yYy0wLjgsMC40LTEuOCwwLjMtMi42LTAuMUw0LDE4LjFDMy45LDE4LDMuNywxOCwzLjYsMThsMCwwYy0wLjIsMC0wLjMsMC0wLjQsMC4xTDEsMTkuMgoJCQljLTAuOCwwLjQtMS44LDAuNC0yLjcsMEwtNCwxOC4xQy00LjEsMTgtNC4zLDE4LTQuNCwxOGwwLDBjLTAuMiwwLTAuMywwLTAuNCwwLjFMLTcsMTkuMmMtMC44LDAuNC0xLjgsMC40LTIuNywwbC0yLjItMS4xCgkJCUMtMTIuMSwxOC0xMi4zLDE4LTEyLjQsMThMLTEyLjQsMThMLTEyLjQsMTh6IE0tMTIuNCwxNmgtNC45Qy0xMy41LDUuMS0xLjUtMC43LDkuNSwzLjJjNiwyLjEsMTAuNyw2LjgsMTIuOCwxMi44aC0yLjFsLTAuMS0wLjEKCQkJTDE5LjksMTZILTEyLjRMLTEyLjQsMTZ6IE0xNy45LDIzLjdsMS40LTAuN2gxLjN2MmgtMzZ2LTEuMWwwLjMtMC4ybDEuNC0wLjdoMi42bDEuNCwwLjdjMC44LDAuNCwxLjgsMC40LDIuNywwbDEuNC0wLjdILTMKCQkJbDEuNCwwLjdjMC44LDAuNCwxLjgsMC40LDIuNywwTDIuMywyM2gyLjZsMS40LDAuN2MwLjcsMC40LDEuNywwLjQsMi41LDBsMS43LTAuN2gzLjJsMS43LDAuN0MxNi4yLDI0LjEsMTcuMSwyNC4xLDE3LjksMjMuN3oKCQkJIE0tMTMuOCwyN2wxNi40LDQuOUwxOC45LDI3SC0xMy44eiBNLTE0LjQsMjloMC4zbDE2LjcsNWwxNi43LTVoMC4zYzEuNywwLDMsMS4zLDMsM3MtMS4zLDMtMywzaC0zNGMtMS43LDAtMy0xLjMtMy0zCgkJCUMtMTcuNCwzMC4zLTE2LjEsMjktMTQuNCwyOXogTS0xMy4xLDM3YzAuOCwyLjQsMy4xLDQsNS43LDRoMjBjMi41LDAsNC44LTEuNiw1LjctNEMxOC4yLDM3LTEzLjEsMzctMTMuMSwzN3oiLz4KCQk8cGF0aCBpZD0icGF0aDZfZmlsbC1jb3B5IiBjbGFzcz0ic3QwIiBkPSJNMjg0LjQsMTZjMC4yLDAuNiwwLjQsMS4zLDAuNSwyaC0zLjdsMS4yLDIuM2wwLjUsMC45bC0wLjIsMC4xVjI4YzIuMiwxLjcsMi43LDQuOCwxLDcKCQkJYy0wLjgsMS0xLjksMS43LTMuMiwxLjlWMzdjLTAuOSwzLjUtNC4xLDYtNy44LDZoLTIwYy0zLjYsMC02LjgtMi41LTcuNy02di0wLjFjLTIuNy0wLjQtNC42LTMtNC4yLTUuN2MwLjItMS4zLDAuOS0yLjUsMS45LTMuMgoJCQl2LTYuOGwtMC44LTEuNmwtMC40LTAuOWwwLjktMC40TDI0MywxOGgtM2MyLjgtMTIuNCwxNS4xLTIwLjIsMjcuNS0xNy40QzI3NS40LDIuMywyODEuOSw4LjIsMjg0LjQsMTZ6IE0yNDcuNSwxOAoJCQljLTAuMiwwLTAuMywwLTAuNCwwLjFsLTMuMSwxLjZsMC45LDEuOGwxLjMtMC43YzAuOC0wLjQsMS44LTAuNCwyLjcsMGwyLjIsMS4xYzAuMywwLjEsMC42LDAuMSwwLjksMGwyLjItMS4xCgkJCWMwLjgtMC40LDEuOC0wLjQsMi43LDBsMi4yLDEuMWMwLjMsMC4xLDAuNiwwLjEsMC45LDBsMi4yLTEuMWMwLjgtMC40LDEuOC0wLjQsMi43LDBsMi4yLDEuMWMwLjMsMC4xLDAuNiwwLjEsMC45LDBsMi45LTEuMwoJCQljMC44LTAuMywxLjctMC4zLDIuNCwwbDIuOSwxLjNjMC4zLDAuMSwwLjYsMC4xLDAuOSwwbDMuMS0xLjVsLTAuOS0xLjhsLTEuNCwwLjdjLTAuOCwwLjQtMS43LDAuNC0yLjYsMC4xbC0yLjgtMS4yCgkJCWMtMC4xLTAuMS0wLjMtMC4xLTAuNC0wLjFsMCwwYy0wLjEsMC0wLjMsMC0wLjQsMC4xbC0yLjgsMS4yYy0wLjgsMC40LTEuOCwwLjMtMi42LTAuMWwtMi4zLTEuMWMtMC4xLTAuMS0wLjMtMC4xLTAuNS0wLjFsMCwwCgkJCWMtMC4yLDAtMC4zLDAtMC40LDAuMWwtMi4yLDEuMWMtMC44LDAuNC0xLjgsMC40LTIuNywwbC0yLjItMS4xYy0wLjEtMC4xLTAuMy0wLjEtMC40LTAuMWwwLDBjLTAuMiwwLTAuMywwLTAuNCwwLjFsLTIuMiwxLjEKCQkJYy0wLjgsMC40LTEuOCwwLjQtMi43LDBsLTIuMi0xLjFDMjQ3LjksMTgsMjQ3LjcsMTgsMjQ3LjUsMThMMjQ3LjUsMThMMjQ3LjUsMTh6IE0yNDcuNSwxNmgtNC45YzMuOS0xMC45LDE1LjktMTYuNywyNi44LTEyLjgKCQkJYzYsMi4xLDEwLjcsNi44LDEyLjgsMTIuOGgtMi4xbC0wLjEtMC4xbC0wLjMsMC4xSDI0Ny41TDI0Ny41LDE2eiBNMjc3LjksMjMuN2wxLjQtMC43aDEuM3YyaC0zNnYtMS4xbDAuMy0wLjJsMS40LTAuN2gyLjYKCQkJbDEuNCwwLjdjMC44LDAuNCwxLjgsMC40LDIuNywwbDEuNC0wLjdoMi42bDEuNCwwLjdjMC44LDAuNCwxLjgsMC40LDIuNywwbDEuNC0wLjdoMi42bDEuNCwwLjdjMC44LDAuNCwxLjcsMC40LDIuNiwwLjFsMS43LTAuNwoJCQloMy4ybDEuNywwLjdDMjc2LjIsMjQuMSwyNzcuMSwyNC4xLDI3Ny45LDIzLjdMMjc3LjksMjMuN3ogTTI0Ni4yLDI3bDE2LjQsNC45TDI3OSwyN0gyNDYuMnogTTI0NS41LDI5aDAuM2wxNi43LDVsMTYuNy01aDAuMwoJCQljMS43LDAsMywxLjMsMywzcy0xLjMsMy0zLDNoLTM0Yy0xLjcsMC0zLTEuMy0zLTNTMjQzLjksMjksMjQ1LjUsMjl6IE0yNDYuOSwzN2MwLjgsMi40LDMuMSw0LDUuNiw0aDIwYzIuNSwwLDQuOC0xLjYsNS43LTQKCQkJSDI0Ni45eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTkuNSwyMWMtMS4zLTMuNi00LjctNi04LjUtNmgtNDJjLTMuOCwwLTcuMiwyLjQtOC41LDZjLTMuMywwLjMtNS44LDMuMi01LjUsNi41YzAuMiwyLjksMi42LDUuMiw1LjUsNS41CgkJCWMtMS43LDQuNywwLjgsOS44LDUuNCwxMS41YzEsMC4zLDIsMC41LDMsMC41aDQyYzUsMCw5LTQsOS05YzAtMS0wLjItMi4xLTAuNS0zYzMuMy0wLjMsNS44LTMuMiw1LjUtNi41CgkJCUMxNjQuNywyMy42LDE2Mi40LDIxLjMsMTU5LjUsMjF6IE0xNTEsMTdoLTQyYy0yLjcsMC01LjIsMS42LTYuMyw0aDU0LjdDMTU2LjIsMTguNiwxNTMuNywxNywxNTEsMTd6IE0xNDEuNyw0MwoJCQljMi4xLTEuNywzLjMtNC4zLDMuMy03aC0yYzAsMy45LTMuMSw3LTcsN2gtNC4zYzIuMS0xLjcsMy4zLTQuMywzLjMtN2gtMmMwLDMuOS0zLjEsNy03LDdoLTQuM2MyLjEtMS43LDMuMy00LjMsMy4zLTdoLTIKCQkJYzAsMy45LTMuMSw3LTcsN2gtN2MtMy45LDAtNy0zLjEtNy03czMuMS03LDctN2g0MmMzLjksMCw3LDMuMSw3LDdzLTMuMSw3LTcsN0gxNDEuN3ogTTEwOSwyN2MtMywwLTUuOCwxLjUtNy41LDRIMTAxCgkJCWMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNGg1OGMyLjIsMCw0LDEuOCw0LDRzLTEuOCw0LTQsNGgtMC41Yy0xLjctMi41LTQuNS00LTcuNS00SDEwOXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzksMTE1YzQuNCwwLDgtMy42LDgtOHMtMy42LTgtOC04cy04LDMuNi04LDhTMzQuNiwxMTUsMzksMTE1eiBNNDUsMTA3YzAsMy4zLTIuNyw2LTYsNnMtNi0yLjctNi02CgkJCXMyLjctNiw2LTZTNDUsMTAzLjcsNDUsMTA3eiBNNDIsNzh2LTJoOHYtNkg0MGMtMi4yLDAtNCwxLjgtNCw0djEwSDIybC0xLjMsNEwyMCw5MGgyLjJsMy44LDQwaDI2bDMuOC00MEg1OGwtMC43LTJMNTYsODRINDJWNzh6CgkJCSBNMzgsNzR2MTBoMlY3NGg4di0yaC04QzM4LjksNzIsMzgsNzIuOSwzOCw3NHogTTQwLDg2aDE0LjZsMC43LDJIMjIuOGwwLjctMkg0MHogTTUzLjgsOTBIMjQuMmwzLjYsMzhoMjIuNEw1My44LDkweiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjksOTJoLTZ2NGgtNnY0aC02djE0aC0zbDAuMiwybDMuOCwzMmgzNmwzLjgtMzJsMC4yLTJoLTN2LTE0aC02di00aC02di00SDEyOXogTTE0NywxMTR2LTEyaC00djRoM3Y4SDE0NwoJCQl6IE0xNDQsMTE0di02aC00djZIMTQ0eiBNMTM4LDEyMHYtMTZoLTR2MTkuMkMxMzUuNiwxMjIuNSwxMzcsMTIxLjQsMTM4LDEyMHogTTEzMiwxMjMuOFYxMDBoLTR2MjMuOAoJCQlDMTI5LjMsMTI0LjEsMTMwLjcsMTI0LjEsMTMyLDEyMy44eiBNMTI2LDEyMy4yVjEwNGgtNHYxNkMxMjMsMTIxLjQsMTI0LjQsMTIyLjUsMTI2LDEyMy4yeiBNMTIwLDExNHYtNmgtNHY2SDEyMHogTTExNCwxMTR2LThoMwoJCQl2LTRoLTR2MTJIMTE0eiBNMTQxLDEwMnYtNGgtNHY0aDN2NGgxVjEwMnogTTEzNSwxMDJ2LThoLTR2NGgzdjRIMTM1eiBNMTI5LDk4di00aC00djhoMXYtNEgxMjl6IE0xMjMsMTAydi00aC00djhoMXYtNEgxMjN6CgkJCSBNMTMwLDEyNmM1LjksMCwxMC45LTQuMiwxMS44LTEwaDcuOWwtMy41LDMwaC0zMi40bC0zLjUtMzBoNy45QzExOS4xLDEyMS44LDEyNC4xLDEyNiwxMzAsMTI2eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMTIsODZ2MmgtNHYtMkgyMTJ6IE0yMTYsODZoLTJ2MmgyVjg2eiBNMTk2LDg2TDE5Niw4NmMtMi43LDAuNy00LjUsMy4zLTMuOSw2YzAuNCwxLjgsMS42LDMuMiwzLjMsMy44CgkJCWwwLjEsMC4ybDEuMSw0LjVjMC4yLDAuOSwxLDEuNSwxLjksMS41bDAsMGw3LDI0LjZjMC4yLDAuOSwxLDEuNCwxLjksMS40aDVjMC45LDAsMS43LTAuNiwxLjktMS40bDctMjQuNmMwLjksMCwxLjctMC42LDEuOS0xLjUKCQkJbDEuMS00LjVsMC4xLTAuMmMyLjYtMC45LDQuMS0zLjcsMy4yLTYuM2MtMC42LTEuNy0yLTMtMy44LTMuM1Y4NmMwLTcuNy02LjMtMTQtMTQtMTRTMTk2LDc4LjMsMTk2LDg2eiBNMjAwLDg2aDZ2MmgtOQoJCQljLTEuNywwLTMsMS4zLTMsM3MxLjMsMywzLDNoMjZjMS43LDAsMy0xLjMsMy0zcy0xLjMtMy0zLTNoLTN2LTJoMmMwLTYuNi01LjQtMTItMTItMTJzLTEyLDUuNC0xMiwxMkgyMDB6IE0xOTguNiwxMDBsLTEtNGgyNC45CgkJCWwtMSw0SDE5OC42eiBNMjA3LjUsMTI2bC02LjktMjRoMTguN2wtNi45LDI0SDIwNy41eiBNMTUwLDI0MmMxMi4yLDAsMjItOS44LDIyLTIycy05LjgtMjItMjItMjJzLTIyLDkuOC0yMiwyMgoJCQlTMTM3LjgsMjQyLDE1MCwyNDJ6IE0xNzQsMjIwYzAsMTMuMy0xMC43LDI0LTI0LDI0cy0yNC0xMC43LTI0LTI0bDAsMGMwLTEzLjMsMTAuNy0yNCwyNC0yNFMxNzQsMjA2LjcsMTc0LDIyMHogTTE0NS42LDIzNy43CgkJCWwyLTAuOWMxLjUtMC42LDMuMi0wLjYsNC43LDBsMiwwLjljMC45LDAuNCwyLDAsMi41LTAuOGwxLjEtMS45YzAuOC0xLjQsMi4yLTIuNCwzLjgtMi44bDIuMS0wLjVjMS0wLjIsMS42LTEuMSwxLjUtMi4xbC0wLjItMi4yCgkJCWMtMC4xLTEuNiwwLjQtMy4yLDEuNC00LjVsMS40LTEuN2MwLjctMC44LDAuNy0xLjksMC0yLjZsLTEuNC0xLjdjLTEuMS0xLjItMS42LTIuOC0xLjQtNC41bDAuMi0yLjJjMC4xLTEtMC42LTEuOS0xLjYtMi4xCgkJCWwtMi4xLTAuNWMtMS42LTAuNC0zLTEuNC0zLjgtMi44bC0xLjEtMS45Yy0wLjUtMC45LTEuNi0xLjItMi41LTAuOGwtMiwwLjljLTEuNSwwLjYtMy4yLDAuNi00LjcsMGwtMi0wLjljLTAuOS0wLjQtMiwwLTIuNSwwLjgKCQkJbC0xLDIuMWMtMC44LDEuNC0yLjIsMi40LTMuOCwyLjhsLTIuMSwwLjVjLTEsMC4yLTEuNiwxLjEtMS41LDIuMWwwLjIsMi4yYzAuMSwxLjYtMC40LDMuMi0xLjQsNC41bC0xLjQsMS43CgkJCWMtMC43LDAuOC0wLjcsMS45LDAsMi42bDEuNCwxLjdjMS4xLDEuMiwxLjYsMi44LDEuNCw0LjVsLTAuMiwyLjJjLTAuMSwxLDAuNiwxLjksMS42LDIuMWwyLjEsMC41YzEuNiwwLjQsMywxLjQsMy44LDIuOGwxLjEsMS45CgkJCUMxNDMuNiwyMzcuOCwxNDQuNywyMzguMSwxNDUuNiwyMzcuN0wxNDUuNiwyMzcuN3ogTTE0OC40LDIzOC43YzEtMC40LDIuMS0wLjQsMy4xLDBsMiwwLjljMS44LDAuOCw0LDAuMSw1LTEuNmwxLjEtMS45CgkJCWMwLjYtMC45LDEuNS0xLjYsMi41LTEuOGwyLjEtMC41YzEuOS0wLjQsMy4zLTIuMywzLjEtNC4ybC0wLjItMi4yYy0wLjEtMS4xLDAuMy0yLjIsMS0zbDEuNC0xLjdjMS4zLTEuNSwxLjMtMy43LDAtNS4ybC0xLjQtMS43CgkJCWMtMC43LTAuOC0xLjEtMS45LTEtM2wwLjItMi4yYzAuMi0yLTEuMS0zLjgtMy4xLTQuMmwtMi4xLTAuNWMtMS4xLTAuMi0yLTAuOS0yLjUtMS44bC0xLjEtMS45Yy0xLTEuNy0zLjItMi40LTUtMS42bC0yLDAuOQoJCQljLTEsMC40LTIuMSwwLjQtMy4xLDBsLTItMC45Yy0xLjgtMC44LTQtMC4xLTUsMS42bC0xLjEsMS45Yy0wLjYsMC45LTEuNSwxLjYtMi41LDEuOGwtMi4xLDAuNWMtMS45LDAuNC0zLjMsMi4zLTMuMSw0LjJsMC4yLDIuMgoJCQljMC4xLDEuMS0wLjMsMi4yLTEsM2wtMS40LDEuN2MtMS4zLDEuNS0xLjMsMy43LDAsNS4ybDEuNCwxLjdjMC43LDAuOCwxLjEsMS45LDEsM2wtMC4yLDIuMmMtMC4yLDIsMS4xLDMuOCwzLjEsNC4ybDIuMSwwLjUKCQkJYzEuMSwwLjIsMiwwLjksMi41LDEuOGwxLjEsMS45YzEsMS43LDMuMiwyLjQsNSwxLjZMMTQ4LjQsMjM4Ljd6IE0xNTIsMjA3YzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDFzLTAuNCwxLTEsMQoJCQlTMTUyLDIwNy42LDE1MiwyMDd6IE0xNTgsMjA5YzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDFzLTAuNCwxLTEsMVMxNTgsMjA5LjYsMTU4LDIwOXogTTE0NywyMTBjMC0wLjYsMC40LTEsMS0xczEsMC40LDEsMQoJCQlzLTAuNCwxLTEsMVMxNDcsMjEwLjYsMTQ3LDIxMHogTTE0MSwyMTBjMC0wLjYsMC40LTEsMS0xczEsMC40LDEsMXMtMC40LDEtMSwxUzE0MSwyMTAuNiwxNDEsMjEweiBNMTQ0LDIwNWMwLTAuNiwwLjQtMSwxLTEKCQkJczEsMC40LDEsMXMtMC40LDEtMSwxUzE0NCwyMDUuNiwxNDQsMjA1eiBNMTM2LDIxM2MwLTAuNiwwLjQtMSwxLTFzMSwwLjQsMSwxcy0wLjQsMS0xLDFTMTM2LDIxMy42LDEzNiwyMTN6IE0xMzksMjE5CgkJCWMwLTAuNiwwLjQtMSwxLTFzMSwwLjQsMSwxcy0wLjQsMS0xLDFTMTM5LDIxOS42LDEzOSwyMTl6IE0xMzksMjI1YzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDFzLTAuNCwxLTEsMVMxMzksMjI1LjYsMTM5LDIyNXoKCQkJIE0xNDMsMjMyYzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDFzLTAuNCwxLTEsMVMxNDMsMjMyLjYsMTQzLDIzMnogTTE0OCwyMzBjMC0wLjYsMC40LTEsMS0xczEsMC40LDEsMXMtMC40LDEtMSwxCgkJCVMxNDgsMjMwLjYsMTQ4LDIzMHogTTE1MywyMzRjMC0wLjYsMC40LTEsMS0xczEsMC40LDEsMXMtMC40LDEtMSwxUzE1MywyMzQuNiwxNTMsMjM0eiBNMTU3LDIyOGMwLTAuNiwwLjQtMSwxLTFzMSwwLjQsMSwxCgkJCXMtMC40LDEtMSwxUzE1NywyMjguNiwxNTcsMjI4eiBNMTYzLDIyNGMwLTAuNiwwLjQtMSwxLTFzMSwwLjQsMSwxcy0wLjQsMS0xLDFTMTYzLDIyNC42LDE2MywyMjR6IE0xNTksMjIxYzAtMC42LDAuNC0xLDEtMQoJCQlzMSwwLjQsMSwxcy0wLjQsMS0xLDFTMTU5LDIyMS42LDE1OSwyMjF6IE0xNjMsMjE4YzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDFzLTAuNCwxLTEsMVMxNjMsMjE4LjYsMTYzLDIxOHogTTE1OCwyMTQKCQkJYzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDFzLTAuNCwxLTEsMVMxNTgsMjE0LjYsMTU4LDIxNHogTTEzNCwyMjBjMC0wLjYsMC40LTEsMS0xczEsMC40LDEsMXMtMC40LDEtMSwxUzEzNCwyMjAuNiwxMzQsMjIwegoJCQkgTTE1MCwyMjVjMi44LDAsNS0yLjIsNS01cy0yLjItNS01LTVzLTUsMi4yLTUsNVMxNDcuMiwyMjUsMTUwLDIyNXogTTE1NywyMjBjMCwzLjktMy4xLDctNyw3cy03LTMuMS03LTdzMy4xLTcsNy03CgkJCVMxNTcsMjE2LjEsMTU3LDIyMHogTTI0MywxOTFjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFoMmMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMUgyNDN6IE0yNjIsMjAwYzAtMC42LDAuNC0xLDEtMWgyCgkJCWMwLjYsMCwxLDAuNCwxLDFzLTAuNCwxLTEsMWgtMkMyNjIuNCwyMDEsMjYyLDIwMC42LDI2MiwyMDB6IE0yNDgsMjA1Yy0wLjYsMC0xLDAuNC0xLDFzMC40LDEsMSwxaDJjMC42LDAsMS0wLjQsMS0xcy0wLjQtMS0xLTEKCQkJSDI0OHogTTIyMywyMDZjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFoMmMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMUgyMjN6IE0yMjgsMjEwYy0wLjYsMC0xLDAuNC0xLDFzMC40LDEsMSwxaDIKCQkJYzAuNiwwLDEtMC40LDEtMXMtMC40LTEtMS0xSDIyOHogTTIzNywyMTBjMC0wLjYsMC40LTEsMS0xaDJjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFoLTJDMjM3LjQsMjExLDIzNywyMTAuNiwyMzcsMjEwegoJCQkgTTI1MiwyMTFjMC0wLjYsMC40LTEsMS0xaDJjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFoLTJDMjUyLjQsMjEyLDI1MiwyMTEuNiwyNTIsMjExeiBNMjY0LDIwOWMtMC42LDAtMSwwLjQtMSwxczAuNCwxLDEsMWgyCgkJCWMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMUgyNjR6IE0yNTMsMTk1YzAtMC42LDAuNC0xLDEtMWgyYzAuNiwwLDEsMC40LDEsMXMtMC40LDEtMSwxaC0yQzI1My40LDE5NiwyNTMsMTk1LjYsMjUzLDE5NXoKCQkJIE0yMzQsMTk1Yy0wLjYsMC0xLDAuNC0xLDFzMC40LDEsMSwxaDJjMC42LDAsMS0wLjQsMS0xcy0wLjQtMS0xLTFIMjM0eiBNMjQwLDIwMGMwLTAuNiwwLjQtMSwxLTFoMmMwLjYsMCwxLDAuNCwxLDFzLTAuNCwxLTEsMQoJCQloLTJDMjQwLjQsMjAxLDI0MCwyMDAuNiwyNDAsMjAweiBNMjE1LDIxNWMwLTAuNSwwLTAuOSwwLTEuNGMtMi41LTEuMS0zLjctNC0yLjYtNi42YzAuMi0wLjUsMC41LTEsMC45LTEuNGMtMC45LTIsMC00LjIsMS45LTUuMgoJCQljLTAuOC0yLjYsMC43LTUuNCwzLjQtNi4ybDAsMGMwLjQtMC41LDAuOS0wLjksMS41LTEuMWMwLjUtMi43LDMuMS00LjUsNS44LTQuMWMwLjcsMC4xLDEuNCwwLjQsMiwwLjhjNS4zLTMuOCwxMS42LTUuOSwxOC4yLTUuOQoJCQljNi44LDAsMTMuMSwyLjIsMTguMiw1LjljMi4zLTEuNiw1LjQtMSw3LDEuM2MwLjQsMC42LDAuNywxLjMsMC44LDJjMC42LDAuMiwxLjEsMC42LDEuNSwxLjFjMi43LDAuOCw0LjIsMy41LDMuNCw2LjJsMCwwCgkJCWMxLjksMSwyLjcsMy4yLDEuOSw1LjJjMS45LDIsMS44LDUuMi0wLjIsN2MtMC40LDAuNC0wLjksMC43LTEuNSwxYzAsMC41LDAsMC45LDAsMS40djFoLTYydi0xSDIxNXogTTIxNS44LDIwNy44CgkJCWMtMC4zLDEuMi0wLjUsMi40LTAuNiwzLjZjLTEuMy0xLTEuNi0yLjktMC42LTQuMmwwLDBDMjE1LDIwNy41LDIxNS40LDIwNy43LDIxNS44LDIwNy44TDIxNS44LDIwNy44eiBNMjE3LjMsMjAzLjIKCQkJYy0wLjQsMC45LTAuNywxLjgtMSwyLjdjLTEtMC40LTEuNi0xLjUtMS4zLTIuNWMwLjItMC41LDAuNi0wLjksMS4xLTEuMkMyMTYuNSwyMDIuNiwyMTYuOSwyMDIuOSwyMTcuMywyMDMuMkwyMTcuMywyMDMuMnoKCQkJIE0yMTkuNiwxOTguN2MtMC41LDAuOS0xLDEuOC0xLjUsMi43Yy0xLjMtMS0xLjUtMi45LTAuNS00LjJjMC4xLTAuMiwwLjMtMC4zLDAuNC0wLjVDMjE4LjMsMTk3LjYsMjE4LjksMTk4LjMsMjE5LjYsMTk4LjcKCQkJTDIxOS42LDE5OC43eiBNMjIwLjgsMTk3YzAuNC0wLjUsMC43LTEsMS4xLTEuNWMtMC4zLTAuNS0wLjktMC43LTEuNC0wLjRzLTAuNywwLjktMC40LDEuNEMyMjAuMywxOTYuNywyMjAuNSwxOTYuOSwyMjAuOCwxOTcKCQkJTDIyMC44LDE5N3ogTTIyNi4xLDE5MS4yYy0xLDAuOS0yLDEuOC0yLjksMi44Yy0wLjMtMC4zLTAuNy0wLjYtMS4xLTAuOGMwLjQtMS42LDIuMS0yLjUsMy43LTIuMQoJCQlDMjI1LjksMTkxLjEsMjI2LDE5MS4yLDIyNi4xLDE5MS4yTDIyNi4xLDE5MS4yeiBNMjY4LjgsMTk0Yy0wLjktMS0xLjktMS45LTIuOS0yLjhjMS41LTAuNiwzLjMsMC4xLDMuOSwxLjcKCQkJYzAsMC4xLDAuMSwwLjIsMC4xLDAuM0MyNjkuNSwxOTMuNCwyNjkuMSwxOTMuNiwyNjguOCwxOTRMMjY4LjgsMTk0eiBNMjcwLjEsMTk1LjVjMC40LDAuNSwwLjgsMSwxLjEsMS40CgkJCWMwLjUtMC4xLDAuOS0wLjcsMC44LTEuMnMtMC43LTAuOS0xLjItMC44QzI3MC41LDE5NS4xLDI3MC4zLDE5NS4zLDI3MC4xLDE5NS41eiBNMjczLjksMjAxLjRjLTAuNS0wLjktMS0xLjgtMS41LTIuNwoJCQljMC44LTAuNCwxLjQtMS4xLDEuNi0yYzEuMywxLjEsMS40LDMsMC40LDQuMkMyNzQuMiwyMDEuMSwyNzQsMjAxLjIsMjczLjksMjAxLjR6IE0yNzUuNiwyMDUuOWMtMC4zLTAuOS0wLjYtMS44LTEtMi43CgkJCWMwLjQtMC4zLDAuOC0wLjYsMS4yLTFjMSwwLjUsMS40LDEuNywxLDIuN0MyNzYuNiwyMDUuMywyNzYuMiwyMDUuNywyNzUuNiwyMDUuOXogTTI3Ni44LDIxMS40Yy0wLjEtMS4yLTAuNC0yLjQtMC42LTMuNgoJCQljMC41LTAuMSwwLjktMC40LDEuMi0wLjZDMjc4LjQsMjA4LjUsMjc4LjEsMjEwLjQsMjc2LjgsMjExLjRMMjc2LjgsMjExLjRMMjc2LjgsMjExLjR6IE0yNzUsMjE0Yy0wLjUtMTYtMTMuOS0yOC42LTI5LjktMjguMQoJCQljLTE1LjMsMC41LTI3LjYsMTIuOC0yOC4xLDI4LjFIMjc1TDI3NSwyMTR6IE03Mi4zLDE5OC4xYy0wLjItMC4zLTAuMy0wLjctMC4zLTEuMXYtMTJoLTJ2MTJjMCwyLjIsMS44LDQsNCw0CgkJCWMxLjIsMCwyLjMtMC41LDMuMS0xLjRjMC42LTAuNywwLjktMS42LDAuOS0yLjV2LTEyaC0ydjEyYzAsMS4xLTAuOSwyLTIsMmwwLDBDNzMuMywxOTksNzIuNywxOTguNyw3Mi4zLDE5OC4xeiBNNzUsMTc2CgkJCWMwLjQsMCwwLjcsMCwxLjEtMC4xYzAuNSwyLjIsMi42LDMuNSw0LjgsM2MwLjUtMC4xLDEtMC4zLDEuNC0wLjZjMS4xLDIuMSwxLjcsNC40LDEuNyw2Ljd2MjRjMCwzLjMtMi43LDYtNiw2aC0zdjkKCQkJYzAsMi44LTIuMiw1LTUsNXMtNS0yLjItNS01di05aC0zYy0zLjMsMC02LTIuNy02LTZ2LTI0YzAtNy43LDYuMy0xNCwxNC0xNEM3MCwxNzMuOCw3Mi4yLDE3Niw3NSwxNzZ6IE01OCwxOTF2MTIKCQkJYzAsMC44LDAuNSwxLjUsMS4yLDEuOGMwLjksMC40LDEuOSwwLjEsMi40LTAuN2MwLjItMC4zLDAuMy0wLjcsMC4zLTEuMXYtMTJoMnYxMmMwLDIuMi0xLjcsNC0zLjksNGMtMC41LDAtMS0wLjEtMS40LTAuMgoJCQljLTAuMi0wLjEtMC40LTAuMi0wLjctMC4zdjIuNWMwLDIuMiwxLjgsNCw0LDRoMTZjMi4yLDAsNC0xLjgsNC00di0yNGMwLTEuNS0wLjItMi45LTAuNy00LjJjLTAuNCwwLjEtMC45LDAuMi0xLjMsMC4yCgkJCWMtMi4xLDAtNC4xLTEuMS01LjItM2MtMy0wLjEtNS42LTItNi41LTQuOUM2Mi40LDE3NCw1OCwxNzksNTgsMTg1VjE5MXogTTY3LDIxNXY5YzAsMS43LDEuMywzLDMsM3MzLTEuMywzLTN2LTlINjd6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTS0xNywxOTFjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFoMmMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMUgtMTd6IE0yLDIwMGMwLTAuNiwwLjQtMSwxLTFoMgoJCQljMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFIM0MyLjQsMjAxLDIsMjAwLjYsMiwyMDB6IE0tMTIsMjA1Yy0wLjYsMC0xLDAuNC0xLDFzMC40LDEsMSwxaDJjMC42LDAsMS0wLjQsMS0xcy0wLjQtMS0xLTFILTEyegoJCQkgTS0zNywyMDZjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFoMmMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMUgtMzd6IE0tMzIsMjEwYy0wLjYsMC0xLDAuNC0xLDFzMC40LDEsMSwxaDJjMC42LDAsMS0wLjQsMS0xCgkJCXMtMC40LTEtMS0xSC0zMnogTS0yMywyMTBjMC0wLjYsMC40LTEsMS0xaDJjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFoLTJDLTIyLjYsMjExLTIzLDIxMC42LTIzLDIxMHogTS04LDIxMWMwLTAuNiwwLjQtMSwxLTEKCQkJaDJjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFoLTJDLTcuNiwyMTItOCwyMTEuNi04LDIxMXogTTQsMjA5Yy0wLjYsMC0xLDAuNC0xLDFzMC40LDEsMSwxaDJjMC42LDAsMS0wLjQsMS0xcy0wLjQtMS0xLTFINHoKCQkJIE0tNywxOTVjMC0wLjYsMC40LTEsMS0xaDJjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFoLTJDLTYuNiwxOTYtNywxOTUuNi03LDE5NXogTS0yNiwxOTVjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFoMgoJCQljMC42LDAsMS0wLjQsMS0xcy0wLjQtMS0xLTFILTI2eiBNLTIwLDIwMGMwLTAuNiwwLjQtMSwxLTFoMmMwLjYsMCwxLDAuNCwxLDFzLTAuNCwxLTEsMWgtMkMtMTkuNiwyMDEtMjAsMjAwLjYtMjAsMjAweiBNLTQ1LDIxNQoJCQljMC0wLjUsMC0wLjksMC0xLjRjLTIuNS0xLjEtMy43LTQtMi42LTYuNmMwLjItMC41LDAuNS0xLDAuOS0xLjRjLTAuOS0yLDAtNC4yLDEuOS01LjJjLTAuOC0yLjYsMC43LTUuNCwzLjQtNi4ybDAsMAoJCQljMC40LTAuNSwwLjktMC45LDEuNS0xLjFjMC41LTIuNywzLjEtNC41LDUuOC00LjFjMC43LDAuMSwxLjQsMC40LDIsMC44YzUuMy0zLjgsMTEuNi01LjksMTguMi01LjljNi44LDAsMTMuMSwyLjIsMTguMiw1LjkKCQkJYzIuMy0xLjYsNS40LTEsNywxLjNjMC40LDAuNiwwLjcsMS4zLDAuOCwyYzAuNiwwLjIsMS4xLDAuNiwxLjUsMS4xYzIuNywwLjgsNC4yLDMuNSwzLjQsNi4ybDAsMGMxLjksMSwyLjcsMy4yLDEuOSw1LjIKCQkJYzEuOSwyLDEuOCw1LjItMC4yLDdjLTAuNCwwLjQtMC45LDAuNy0xLjUsMWMwLDAuNSwwLDAuOSwwLDEuNHYxaC02MnYtMUgtNDV6IE0tNDQuMiwyMDcuOGMtMC4zLDEuMi0wLjUsMi40LTAuNiwzLjYKCQkJYy0xLjMtMS0xLjYtMi45LTAuNi00LjJsMCwwQy00NSwyMDcuNS00NC42LDIwNy43LTQ0LjIsMjA3LjhMLTQ0LjIsMjA3Ljh6IE0tNDIuNywyMDMuMmMtMC40LDAuOS0wLjcsMS44LTEsMi43CgkJCWMtMS0wLjQtMS42LTEuNS0xLjMtMi41YzAuMi0wLjUsMC42LTAuOSwxLjEtMS4yQy00My41LDIwMi42LTQzLjEsMjAyLjktNDIuNywyMDMuMkwtNDIuNywyMDMuMnogTS00MC40LDE5OC43CgkJCWMtMC41LDAuOS0xLDEuOC0xLjUsMi43Yy0xLjMtMS0xLjUtMi45LTAuNS00LjJjMC4xLTAuMiwwLjMtMC4zLDAuNC0wLjVDLTQxLjcsMTk3LjYtNDEuMSwxOTguMy00MC40LDE5OC43eiBNLTM5LjIsMTk3CgkJCWMwLjMtMC41LDAuNy0xLDEuMS0xLjVjLTAuMy0wLjUtMC45LTAuNy0xLjQtMC40cy0wLjcsMC45LTAuNCwxLjRDLTM5LjcsMTk2LjctMzkuNSwxOTYuOS0zOS4yLDE5N0wtMzkuMiwxOTd6IE0tMzMuOSwxOTEuMgoJCQljLTEsMC45LTIsMS44LTIuOSwyLjhjLTAuMy0wLjMtMC43LTAuNi0xLjEtMC44YzAuNC0xLjYsMi4xLTIuNSwzLjctMi4xQy0zNC4xLDE5MS4xLTM0LDE5MS4yLTMzLjksMTkxLjJMLTMzLjksMTkxLjJ6IE04LjgsMTk0CgkJCWMtMC45LTEtMS45LTEuOS0yLjktMi44YzEuNS0wLjYsMy4zLDAuMSwzLjksMS43YzAsMC4xLDAuMSwwLjIsMC4xLDAuM0M5LjUsMTkzLjQsOS4xLDE5My42LDguOCwxOTRMOC44LDE5NHogTTEwLjEsMTk1LjUKCQkJYzAuNCwwLjUsMC44LDEsMS4xLDEuNGMwLjUtMC4xLDAuOS0wLjcsMC44LTEuMmMtMC4xLTAuNS0wLjctMC45LTEuMi0wLjhDMTAuNSwxOTUuMSwxMC4zLDE5NS4zLDEwLjEsMTk1LjV6IE0xMy45LDIwMS40CgkJCWMtMC41LTAuOS0wLjktMS44LTEuNS0yLjdjMC44LTAuNCwxLjQtMS4xLDEuNi0yYzEuMywxLjEsMS40LDMsMC40LDQuMkMxNC4yLDIwMS4xLDE0LDIwMS4yLDEzLjksMjAxLjR6IE0xNS43LDIwNS45CgkJCWMtMC4zLTAuOS0wLjYtMS44LTEtMi43YzAuNC0wLjMsMC44LTAuNiwxLjItMWMxLDAuNSwxLjQsMS43LDEsMi43QzE2LjYsMjA1LjMsMTYuMiwyMDUuNywxNS43LDIwNS45eiBNMTYuOCwyMTEuNAoJCQljLTAuMS0xLjItMC40LTIuNC0wLjYtMy42YzAuNS0wLjEsMC45LTAuNCwxLjItMC42QzE4LjQsMjA4LjUsMTguMSwyMTAuNCwxNi44LDIxMS40TDE2LjgsMjExLjRMMTYuOCwyMTEuNHogTTE1LDIxNAoJCQljLTAuNS0xNi0xMy45LTI4LjYtMjkuOS0yOC4xYy0xNS4zLDAuNS0yNy42LDEyLjgtMjguMSwyOC4xSDE1TDE1LDIxNHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K");
  background-color: white;
  border-radius: 5px;
  margin-top: 20px;
  background-size: cover;
  .app_chill {
    background-color: white;
    height: 500px;
    width: 30%;
    padding: 1rem;
  }
}
.card-layout {
  padding: 1rem;
}
.container {
  display: flex;
  column-gap: 1rem;
  margin-top: 10px;
}
.custom-text {
  color: #2666de;
  font-size: 1.286rem;
  font-weight: 500;
}
</style>