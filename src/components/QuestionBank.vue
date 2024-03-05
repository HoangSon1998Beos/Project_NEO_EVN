<template>
   <div>
    <v-breadcrumbs :items="dataBreadC">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
   <v-card
    class="mx-auto"
    
  >
    <v-container>
        <v-row>
            <v-col cols="6" style="text-align: left;">
                <label>Ý định</label>
                <v-text-field v-model="inputText" label="Input Text 1" multi-line rows="4"></v-text-field>
                <label>Thực thể</label>
                <v-text-field v-model="inputText" label="Input Text 1" multi-line rows="4"></v-text-field>
                <label>Ngày tạo</label>
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
                  <v-date-picker v-model="selectedDate" @input="closeDateMenu" show-adjacent-months></v-date-picker>
                </v-menu>
                <label>Loại ý định</label>
                <v-combobox
                  v-model="selectedItem"
                  :items="items"
                  label="Chọn một mục"
                  clearable
                  outlined
                ></v-combobox>  
            </v-col>
            <v-col cols="6" style="text-align: left;">
                <label>Người tạo</label>
                <v-combobox
                  v-model="selectedItem"
                  :items="items"
                  label="Chọn một mục"
                  clearable
                  outlined
                ></v-combobox>
                <label>Câu hỏi</label>
                <v-text-field v-model="inputText2" label="Input Text 2" multi-line rows="4"></v-text-field>
                <label>Từ đồng nghĩa</label>
                <v-combobox
                  v-model="selectedItem"
                  :items="items"
                  label="Chọn một mục"
                  clearable
                  outlined
                ></v-combobox>
                <label>Nhóm dịch vụ</label>
                <v-combobox
                  v-model="selectedItem"
                  :items="items"
                  label="Chọn một mục"
                  clearable
                  outlined
                ></v-combobox>
            </v-col>
            <v-col cols=" 12">
              <div class="pa-4 ">
              <v-btn prepend-icon="$vuetify" style="background-color: #164397 ; color: aliceblue;">
                  Tìm kiếm
                </v-btn>
              </div>
              <div class="pa-4 ">
                <v-btn prepend-icon="$vuetify" style="background-color: #28c76f; color: aliceblue;">
                  Tải xuống
                </v-btn>
              </div>
            </v-col>
            
        </v-row>
    </v-container>
  </v-card>
  <br>
  <ListOfQuestion />
</template>
  
<script>
  import ListOfQuestion from "./ListOfQuestion.vue";
  export default {
    components: {
      ListOfQuestion
    },
    data() {
      return {
        dataBreadC: [
          {
            title: 'Trang chủ',
            disabled: false,
            href: 'breadcrumbs_dashboard',
          },
          {
            title: 'Đào tạo chatbot',
            disabled: false,
            href: 'breadcrumbs_link_1',
          },
          {
            title: 'Ngân hàng câu hỏi- ý định',
            disabled: true,
            href: 'breadcrumbs_link_2',
          },
        ],
        showPicker: false,
        selectedDate: null,
        date:null,


        //date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        inputText: '',
        inputText2:'',
        selectedItem: 'Mục 1',
        items: [
          'Mục 1',
          'Mục 2',
          'Mục 3',
          'Mục 4',
        ]
      }
    },
    
    methods: {
      closeDateMenu (){
        this.showPicker = false;
      },
    }
  }
  </script>