<template>
  <div class="mx-10">
    <div>
      <v-breadcrumbs :items="dataBreadC" style="font-size: smaller">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <v-card class="mx-auto">
      <v-container>
        <div class="mb-6 title">Tiêu chí tìm kiếm</div>
        <v-row>
          <v-col cols="6" style="text-align: left">
            <label>Ý định</label>
            <v-combobox
              v-model="selectedIntent"
              :items="intent"
              label="Chọn ý định"
              item-title="intentName"
              item-value="id"
              clearable
              multiple
              chips
            ></v-combobox>
            <label>Thực thể</label>
            <v-combobox
              v-model="selectedEntity"
              :items="entity"
              label="Chọn thực thể"
              item-title="entityName"
              item-value="id"
            ></v-combobox>
            <label>Ngày tạo</label>
            <v-row style="justify-content: space-between">
              <v-col cols="5">
                <v-menu
                  v-model="showPickerStart"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formattedDateStart"
                      prepend-icon="mdi-calendar-range"
                      v-on="on"
                      @click="showPickerStart = !showPickerStart"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDateStart"
                    @input="closeDateMenu"
                    show-adjacent-months
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="5">
                <v-menu v-model="showPickerEnd" :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formattedDateEnd"
                      prepend-icon="mdi-calendar-range"
                      v-on="on"
                      @click="showPickerEnd = !showPickerEnd"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDateEnd"
                    @input="closeDateMenu"
                    show-adjacent-months
                    no-title
                    scrollable
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <label>Loại ý định</label>
            <v-combobox
              v-model="selectedTypeIntent"
              :items="typeIntent"
              label="Chọn loại ý định"
              clearable
              outlined
            ></v-combobox>
          </v-col>
          <v-col cols="6" style="text-align: left">
            <label>Người tạo</label>
            <v-combobox
              v-model="selectedCreator"
              :items="creator"
              item-title="username"
              item-value="id"
              label="Chọn người tạo"
              clearable
              multiple
              chips
            ></v-combobox>
            <label>Câu hỏi</label>
            <v-text-field
              v-model="questionInput"
              placeholder="Nhập câu hỏi cần tìm kiếm"
              multi-line
              rows="4"
            ></v-text-field>
            <label>Từ đồng nghĩa</label>
            <v-combobox
              v-model="selectedSynonym"
              :items="synonym"
              label="Chọn từ đồng nghĩa"
              item-title="sysnonnymContent"
              item-value="id"
            ></v-combobox>
            <label>Nhóm dịch vụ</label>
            <v-combobox
              v-model="selectedServiceGroup"
              :items="serviceGroup"
              label="Chọn nhóm dịch vụ"
              item-title="groupName"
              item-value="id"
            ></v-combobox>
          </v-col>
          <v-col cols=" 12">
            <div class="pa-2 text-center">
              <v-btn
                class="mr-2"
                style="background-color: #164397; color: aliceblue"
                @click="GetListIntent()"
              >
                Tìm kiếm
              </v-btn>
              <v-btn style="background-color: #28c76f; color: aliceblue">
                Tải xuống
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br />
    <v-card class="mx-auto">
      <div class="pa-4">Danh sách câu hỏi - ý định</div>
      <div style="display: flex; flex-direction: row-reverse">
        <div class="pa-4">
          <v-btn
            prepend-icon="$vuetify"
            style="background-color: #ed1c24; color: aliceblue"
          >
            Xóa
          </v-btn>
        </div>
        <div class="pa-4">
          <v-btn
            text="Thêm mới"
            @click="dialog = true"
            style="background-color: #164397; color: aliceblue"
          ></v-btn>

          <v-dialog v-model="dialog" max-width="800">
            <v-card>
              <v-toolbar title="Thêm mới câu hỏi ý định"
                ><span
                  class="material-icons cursor-pointer pa-4"
                  @click="dialog = false"
                  >close</span
                ></v-toolbar
              >
              <v-card-text class="text-h2 pa-12">
                <v-row style="justify-content: space-between">
                  <v-col cols="4">
                    <v-text-field
                      label="Tên ý định"
                      v-model="questionInput"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Mã ý định"
                      v-model="questionInput"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-combobox
                      label="Loại ý định"
                      :items="[
                        'California',
                        'Colorado',
                        'Florida',
                        'Georgia',
                        'Texas',
                        'Wyoming',
                      ]"
                      variant="outlined"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      label="Nhóm dịch vụ"
                      :items="[
                        'California',
                        'Colorado',
                        'Florida',
                        'Georgia',
                        'Texas',
                        'Wyoming',
                      ]"
                      variant="outlined"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card class="mx-auto">
                      <div class="pa-4">
                        <v-text-field
                          v-model="questionInput"
                          placeholder="Nhập câu hỏi"
                          variant="outlined"
                        ></v-text-field>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <v-dialog v-model="visibleModalDetal" max-width="800">
        <v-card>
          <v-toolbar title="Chi tiết câu hỏi ý định">
            <span
              class="material-icons cursor-pointer pa-4"
              @click="visibleModalDetal = false"
              >close</span
            >
          </v-toolbar>
          <v-card-text class="text-h2 pa-12">
            <v-row style="justify-content: space-between">
              <v-col cols="4">
                <v-text-field
                  label="Tên ý định"
                  v-model="dataForm.intentName"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Mã ý định"
                  v-model="dataForm.intentCode"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-combobox
                  label="Loại ý định"
                  :items="[0, 3]"
                  v-model="dataForm.intentType"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-combobox
                  label="Nhóm dịch vụ"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card class="mx-auto">
                  <div class="pa-4">
                    <div class="title">Danh sách câu hỏi ý định</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="visibleModalUpdate" max-width="800">
        <v-card>
          <v-toolbar title="Cập nhật câu hỏi ý định">
            <span
              class="material-icons cursor-pointer pa-4"
              @click="visibleModalUpdate = false"
              >close</span
            >
          </v-toolbar>

          <v-card-text class="text-h2 pa-12">
            <v-row style="justify-content: space-between">
              <v-col cols="4">
                <v-text-field
                  label="Tên ý định"
                  v-model="dataForm.intentName"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Mã ý định"
                  v-model="dataForm.intentCode"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-combobox
                  label="Loại ý định"
                  :items="[0, 3]"
                  v-model="dataForm.intentType"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-combobox
                  label="Nhóm dịch vụ"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card class="mx-auto">
                  <div class="pa-4">
                    <v-text-field
                      v-model="questionInput"
                      placeholder="Nhập câu hỏi"
                      variant="outlined"
                    ></v-text-field>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts.content"
        show-select
        class="elevation-1 pa-4"
        item-key="id"
        :items-per-page="pagination.pageSize"
      >
        <template v-slot:[`item.createdDate`]="{ item }">
          <div>
            {{ moment(item.createdDate).format("DD-MM-YYYY") }}
          </div>
        </template>
        <template v-slot:[`item.stt`]="{ item, index }">
          <div>
            {{ indexRow(index) }}
          </div>
        </template>
        <template v-slot:[`item.updatedDate`]="{ item }">
          <div>
            {{ moment(item.updatedDate).format("DD-MM-YYYY") }}
          </div>
        </template>
        <template v-slot:[`item.intentName`]="{ item }">
          <td>{{ truncateText(item.intentName) }}</td>
        </template>
        <template v-slot:[`item.intentType`]="{ item }">
          <div>
            <td>{{ getTextType(item) }}</td>
          </div>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-tooltip text="Cập nhật">
            <template v-slot:activator="{ props }">
              <span
                v-bind="props"
                class="material-icons cursor-pointer"
                @click="updateQuestion(item)"
                style="color: #ff9f43"
              >
                edit
              </span>
            </template>
          </v-tooltip>
          <v-tooltip text="Xem chi tiết">
            <template v-slot:activator="{ props }">
              <span
                v-bind="props"
                class="material-icons cursor-pointer"
                @click="viewQuestion(item)"
                style="color: #00cfe8"
              >
                error_outline
              </span>
            </template>
          </v-tooltip>
          <v-tooltip text="Triển khai kịch bản">
            <template v-slot:activator="{ props }">
              <span
                v-bind="props"
                class="material-icons cursor-pointer"
                @click="deployBot(item)"
                style="color: #ff9f43"
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
                style="color: #ea5455"
              >
                delete
              </span>
            </template>
          </v-tooltip>
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
      :button-ok-text="X"
    >
      <template #description>
        {{ isDelete ? "abc" : isStart ? "start" : "stop" }}
      </template>
    </ModalDelete>
  </div>
</template>

<script>
import axios from "axios";
import ModalDelete from "../../components/bot/ModalDelete.vue";
import moment from "moment";
import { TYPE_INTENT } from "../../utils/constants.js";
import Pagination from "../../components/Pagination.vue";
import Api from "../../api/api.js";
export default {
  components: {
    ModalDelete,
    Pagination,
  },
  data() {
    return {
      dialog: false,
      visibleModalDetal: false,
      visibleModalUpdate: false,
      visibleModal: false,
      isDelete: false,
      selected: [],
      headers: [
        { title: "STT", align: "start", key: "stt" },
        { title: "THAO TÁC", align: "center", key: "action", sortable: false },
        { title: "TÊN Ý ĐỊNH", key: "intentName" },
        { title: "LOẠI Ý ĐỊNH", key: "intentType" },
        { title: "NGÀY TẠO", key: "createdDate" },
        { title: "NGƯỜI TẠO", key: "createdBy" },
        { title: "NGÀY CẬP NHẬT", key: "updatedDate" },
        { title: "NGƯỜI CẬP NHẬT", key: "updatedBy" },
      ],
      desserts: [],

      dataBreadC: [
        {
          title: "Trang chủ",
          disabled: false,
          href: "home",
        },
        {
          title: "Đào tạo chatbot",
          disabled: true,
        },
        {
          title: "Ngân hàng câu hỏi- ý định",
          disabled: true,
        },
      ],
      showPickerStart: false,
      selectedDateStart: null,
      showPickerEnd: false,
      selectedDateEnd: null,
      date: null,
      token: localStorage.getItem("token"),

      questionInput: "",
      intent: [],
      entity: [],
      typeIntent: [0, 3],
      creator: [],
      synonym: [],
      serviceGroup: [],
      selectedIntent: null,
      selectedEntity: [],
      selectedTypeIntent: [],
      selectedCreator: null,
      selectedSynonym: [],
      selectedServiceGroup: [],
      pagination: {
        page: 1, // Trang hiện tại
        pageSize: 10, // Số mục trên mỗi trang
      },
      totalItems: 0,

      dataForm: [],
    };
  },

  methods: {
    indexRow(index) {
      return index + (this.pagination.page - 1) * this.pagination.pageSize + 1;
    },
    truncateText(text) {
      return text.length > 30 ? text.substring(0, 30) + "..." : text;
    },
    viewQuestion(item) {
      console.log("=>(index.vue:295) item", item);
      this.dataForm = item;
      this.visibleModalDetal = true;
    },
    updateQuestion(item) {
      console.log("=>(index.vue:295) item", item);
      this.dataForm = item;
      this.visibleModalUpdate = true;
    },
    deleteBot(item) {
      this.isDelete = true;
      this.visibleModal = true;
    },
    cancelModal() {
      this.visibleModal = false;
      setTimeout(() => {
        this.isDelete = false;
      }, 200);
    },
    closeDateMenu() {
      this.showPickerEnd = false;
    },
    getTextType(item) {
      return TYPE_INTENT.find((x) => x.key === item.intentType).value;
    },
    updatePage(page) {
      this.pagination.page = page;
      this.GetListIntent();
    },
    updatePerPage(item) {
      this.pagination.pageSize = item;
      this.pagination.page = 1;
      this.$nextTick(() => {
        this.GetListIntent();
      });
    },

    async GetListIntent() {
      const config = {
        params: {
          fromDate: this.formattedDateStart ? this.formattedDateStart : "",
          toDate: this.formattedDateEnd ? this.formattedDateEnd : "",
          intentName: this.selectedIntent
            ? this.selectedIntent.map((item) => item.intentName).join(",")
            : "",
          createdBy: this.selectedCreator
            ? this.selectedCreator.map((creator) => creator.username).join(",")
            : "",
          entityName: this.selectedEntity ? this.selectedEntity : "",
          intentType:
            this.selectedTypeIntent !== "" ? this.selectedTypeIntent : "",
          currentPage: this.pagination.page - 1,
          perPage: this.pagination.pageSize,
        },
      };
      await Api.questionBank
        .indexWidthPath(`Question-Bank-Intent/searchBotIntentDTOList`, config)
        .then((response) => {
          this.desserts = response.data.content;
          this.totalItems = this.desserts.totalElements;
          console.log(this.desserts);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },

    getIntent() {
      Api.questionBank
        .indexWidthPath(`bot-intent/get-all-not-spam`)
        .then((response) => {
          this.intent = response.data.content;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    getEntity() {
      Api.questionBank
        .indexWidthPath("Question-Bank-Intent/getListEntityName")
        .then((response) => {
          this.entity = response.data.content;
          // console.log(this.entity);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    getCreator() {
      Api.questionBank
        .indexWidthPath("user-info/get-all-user")
        .then((response) => {
          this.creator = response.data.content;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    getSynonym() {
      Api.questionBank
        .indexWidthPath("synonym/get-all")
        .then((response) => {
          this.synonym = response.data.content;
          // console.log(this.synonym);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    getServiceGroup() {
      Api.questionBank
        .indexWidthPath("Question-Bank-Intent/get-list-bot-intent-group")
        .then((response) => {
          this.serviceGroup = response.data.content;
          // console.log(this.serviceGroup);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
  filters: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },

  computed: {
    formattedDateEnd() {
      return this.selectedDateEnd
        ? this.$options.filters.formatDate(this.selectedDateEnd)
        : "";
    },
    formattedDateStart() {
      return this.selectedDateStart
        ? this.$options.filters.formatDate(this.selectedDateStart)
        : "";
    },
    moment() {
      return moment;
    },
    totalPage() {
      return Math.ceil(this.totalItems / this.pagination.pageSize);
    },
  },
  created() {
    //this.init();
    this.GetListIntent();
    this.getIntent();
    this.getEntity();
    this.getCreator();
    this.getSynonym();
    this.getServiceGroup();
  },
};
</script>
<style>
.v-container {
  max-width: 95%;
}
.title {
  font-size: 20px;
}
</style>
