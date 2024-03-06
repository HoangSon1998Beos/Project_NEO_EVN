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
                  v-model="showPicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="50px"
                  max-width="50px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedDate"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      v-on="on"
                      @click="showPicker = !showPicker"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    @input="closeDateMenu"
                    show-adjacent-months
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="5">
                <v-menu
                  v-model="showPicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="50px"
                  max-width="50px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedDate"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      v-on="on"
                      @click="showPicker = !showPicker"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    @input="closeDateMenu"
                    show-adjacent-months
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
      <div>Danh sách câu hỏi ý định</div>
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
              <v-toolbar title="Thêm mới câu hỏi ý định"></v-toolbar>
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text="Close"
                  variant="text"
                  @click="dialog = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts.content"
        show-select
        class="elevation-1 pa-4"
      >
        <template v-slot:[`item.stt`]="{ item, index }">
          <td>{{ index + 1 }}</td>
        </template>
        <template v-slot:[`item.intentType`]="{ item }">
          <td v-if="item.intentType === 0">Loại thông thường</td>
          <td v-else-if="item.intentType === 3">Loại ẩn</td>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-tooltip text="Cập nhật">
            <template v-slot:activator="{ props }">
              <span
                v-bind="props"
                class="material-icons cursor-pointer"
                @click="editBot(item)"
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
                @click="resultBot(item)"
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
export default {
  components: {
    ModalDelete,
  },
  data() {
    return {
      dialog: false,
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
          href: "trang-chu",
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
      showPicker: false,
      selectedDate: null,
      date: null,
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJudnF1YW4iLCJuYW1lIjoiTmd1eeG7hW4gVsSDbiBRdcOibiIsInR5cGUiOiJBRE1JTiIsImlkIjoyNSwiaWF0IjoxNzA5Njg4MzQ4LCJleHAiOjE3MDk3NzQ3NDh9.F9ZPgK_4eaHTM6PFAjoPE6vL0dJx1e36sMnoUeG6Jo3wJ1LTQL7mhsJXJbDKUV7W1JxdbB2KtOSaWnnnJwN1Gg",

      questionInput: "",
      intent: [],
      entity: [],
      typeIntent: [0, 3],
      creator: [],
      synonym: [],
      serviceGroup: [],
      selectedIntent: "",
      selectedEntity: "",
      selectedTypeIntent: "",
      selectedCreator: "",
      selectedSynonym: "",
      selectedServiceGroup: "",
    };
  },

  methods: {
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
      this.showPicker = false;
    },
    init() {
      axios
        .get("http://10.252.10.112:3232/chatbot/roles/get-role", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          // Xử lý dữ liệu khi thành công
          this.listRole = response.data.content;
        })
        .catch((error) => {
          // Xử lý lỗi
        });
    },

    GetListIntent() {
      axios
        .get(
          "http://10.252.10.112:3232/chatbot/Question-Bank-Intent/searchBotIntentDTOList?fromDate=&toDate=&intentName=&createdBy=&entityName=&questionSearch=&intentType=&intentGroup=&synonymContent=&currentPage=0&perPage=10&",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.desserts = response.data.content;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    GetIntent() {
      axios
        .get("http://10.252.10.112:3232/chatbot/bot-intent/get-all-not-spam", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.intent = response.data.content;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    GetEntity() {
      axios
        .get(
          "http://10.252.10.112:3232/chatbot/Question-Bank-Intent/getListEntityName",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.entity = response.data.content;
          console.log(this.entity);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    Getcreator() {
      axios
        .get("http://10.252.10.112:3232/chatbot/user-info/get-all-user", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.creator = response.data.content;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    GetSynonym() {
      axios
        .get("http://10.252.10.112:3232/chatbot/synonym/get-all", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.synonym = response.data.content;
          console.log(this.synonym);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    GetServiceGroup() {
      axios
        .get(
          "http://10.252.10.112:3232/chatbot/Question-Bank-Intent/get-list-bot-intent-group",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.serviceGroup = response.data.content;
          console.log(this.serviceGroup);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
  mounted() {},
  created() {
    this.init();
    this.GetListIntent();
    this.GetIntent();
    this.GetEntity();
    this.Getcreator();
    this.GetSynonym();
    this.GetServiceGroup();
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
