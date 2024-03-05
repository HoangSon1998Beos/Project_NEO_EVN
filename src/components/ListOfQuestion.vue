<template>
    <v-card
    class="mx-auto" 
  >
     <v-data-table
     v-model="selected"
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="pa-4 "
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="text-left">Danh sách câu hỏi ý định</v-toolbar-title>   
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2"
              style="background-color: #164397 ; color: aliceblue;"
              v-bind="props"
              prepend-icon="$plus"
            >
              Thêm mới
            </v-btn>
          </template>
          <v-card>
             <v-toolbar > <span class=" ml-4">{{ formTitle }}</span></v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.stt"
                      label="STT"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.tenydinh"
                      label="Tên ý định"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.loaiydinh"
                      label="Loại ý định"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.ngaytao"
                      label="Ngày Tạo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.nguoitao"
                      label="Người tạo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.ngaycapnhat"
                      label="Ngày cập nhật"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.nguoicapnhat"
                      label="Người cập nhật"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
            class="mb-2 ml-4"
            style="background-color: #ed1c24 ; color: aliceblue;"
            v-bind="props"
            >
            <v-icon class="mr-2" size="small" > mdi-delete </v-icon>
            Xóa
        </v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-center">Bạn có chắc chắn muốn xóa?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item)"
        style="color: #ff9f43;"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="me-2"
        size="small"
        style="color: #00cfe8 ;"
      >
        mdi-alert-circle
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
        style="color: #ea5455;"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        selected: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            { title: 'STT', align: 'start', key: 'stt' },
            { title: 'TÊN Ý ĐỊNH', key: 'tenydinh' },
            { title: 'LOẠI Ý ĐỊNH', key: 'loaiydinh' },
            { title: 'NGÀY TẠO', key: 'ngaytao' },
            { title: 'NGƯỜI TẠO', key: 'nguoitao' },
            { title: 'NGÀY CẬP NHẬT', key: 'ngaycapnhat' },
            { title: 'NGƯỜI CẬP NHẬT', key: 'nguoicapnhat' },
          { title: 'THAO TÁC', key: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            stt:0,
            tenydinh: 0,
            loaiydinh: 0,
            ngaytao: 0,
            nguoitao: 0,
            ngaycapnhat: '',
            nguoicapnhat: ''
        },
        defaultItem: {
            stt:0,
            tenydinh: 0,
            loaiydinh: 0,
            ngaytao: 0,
            nguoitao: 0,
            ngaycapnhat: '',
            nguoicapnhat: ''
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Thêm mới câu hỏi - ý định' : 'Cập nhật câu hỏi - ý định'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
           this.selected = [],
          this.desserts = [
            {
            stt:1,
            tenydinh: 200,
            loaiydinh: 6,
            ngaytao: 24,
            nguoitao: 4,
            ngaycapnhat: '1%',
            nguoicapnhat: '1%'
            },
            {
            stt:2,
            
            tenydinh: 200,
            loaiydinh: 9,
            ngaytao: 37,
            nguoitao: 4.3,
            ngaycapnhat: '1%',
            nguoicapnhat: '1%'
            },
            {
            stt:3,
            
            tenydinh: 300,
            loaiydinh: 16,
            ngaytao: 23,
            nguoitao: 6,
            ngaycapnhat: '7%',
            nguoicapnhat: '1%'
            },
            {
            stt:4,
            
            tenydinh: 300,
            loaiydinh: 3.7,
            ngaytao: 67,
            nguoitao: 4.3,
            ngaycapnhat: '8%',
            nguoicapnhat: '1%'
            },
            {
            stt:5,
            
            tenydinh: 400,
            loaiydinh: 16,
            ngaytao: 49,
            nguoitao: 3.9,
            ngaycapnhat: '16%',
            nguoicapnhat: '1%'
            },
            {
            stt:6,
            
            tenydinh: 400,
            loaiydinh: 0,
            ngaytao: 94,
            nguoitao: 0,
            ngaycapnhat: '0%',
            nguoicapnhat: '1%'
            },
            {
            stt:7,
            
            tenydinh: 400,
            loaiydinh: 0.2,
            ngaytao: 98,
            nguoitao: 0,
            ngaycapnhat: '2%',
            nguoicapnhat: '1%'
            },
            {
            stt:8,
            
            tenydinh: 400,
            loaiydinh: 3.2,
            ngaytao: 87,
            nguoitao: 6.5,
            ngaycapnhat: '45%',
            nguoicapnhat: '1%'
            },
            {
            stt:9,
            
            tenydinh: 500,
            loaiydinh: 25,
            ngaytao: 51,
            nguoitao: 4.9,
            ngaycapnhat: '22%',
            nguoicapnhat: '1%'
            },
            {
            stt:10,
            
            tenydinh: 500,
            loaiydinh: 26,
            ngaytao: 65,
            nguoitao: 7,
            ngaycapnhat: '6%',
            nguoicapnhat: '1%'
            },
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>