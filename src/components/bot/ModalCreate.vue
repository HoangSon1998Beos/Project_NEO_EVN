<template>
  <v-dialog v-model="visibleDialog" max-width="900px" persistent>
    <v-card>
      <v-card-title class="title-modal">
        {{ action === 'isView' ? 'Thông tin bot' : action === 'isCreate' ? 'Thêm mới bot' : 'Cập nhật bot'}}
        <span class="material-icons cursor-pointer" @click="closeModal">close</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form @submit.prevent="submitForm" ref="form">
            <v-row>
              <v-col cols="6">
                <span>Tên bot</span>
                <Required/>
                <v-text-field v-model="form.botName"
                              :rules="requiredRule"
                              variant="outlined"
                              placeholder="Nhập tên bot"
                              :disabled="action === 'isView'"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Mã bot</span>
                <Required/>
                <v-text-field v-model="form.botCode"
                              variant="outlined"
                              disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span>Loại bot</span>
                <Required/>
                <v-select v-model="form.botType"
                          :rules="requiredRule"
                          :items="itemsBot"
                          item-title="value"
                          item-value="key"
                          variant="outlined"
                          placeholder="Chọn Loại bot"
                          :disabled="action === 'isView' || action === 'isEdit'"
                ></v-select>
              </v-col>
              <v-col v-if="action === 'isCreate'" cols="6">
                <span>Máy chủ lưu trữ 1</span>
                <Required/>
                <v-select v-model="form.server1"
                          :rules="requiredRule"
                          item-title="value"
                          item-value="key"
                          :items="dataServerFake"
                          variant="outlined"
                          placeholder="Máy chủ lưu trữ"
                ></v-select>
              </v-col>
              <v-col v-else cols="6">
                <span>Bot đào tạo</span>
                <Required/>
                <v-select v-model="form.botTrain"
                          variant="outlined"
                          disabled
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="action === 'isCreate'" cols="6">
                <span>Máy chủ lưu trữ 2</span>
                <Required/>
                <v-select v-model="form.server2"
                          :rules="requiredRule"
                          variant="outlined"
                          :items="dataServerFake"
                          item-title="value"
                          item-value="key"
                          placeholder="Máy chủ lưu trữ"
                ></v-select>
              </v-col>
              <v-col v-else cols="6">
                <span>Máy chủ lưu trữ</span>
                <Required/>
                <v-select v-model="form.server"
                          variant="outlined"
                          disabled
                ></v-select>
              </v-col>
              <v-col cols="6">
                <span>Thư mục lưu trữ</span>
                <Required/>
                <v-text-field v-model="form.botSave"
                              variant="outlined"
                              disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="action === 'isView'" cols="6">
                <span>Thông tin bot</span>
                <Required/>
                <v-text-field v-model="form.model"
                              variant="outlined"
                              disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Mô tả</span>
                <v-textarea v-model="form.description"
                            variant="outlined"
                            placeholder="Mô tả"
                            :disabled="action === 'isView'"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <div class="button-modal-create">
        <v-btn v-if="action === 'isCreate'"
               color="#2666de"
               @click="submitForm"
        >
          Thêm mới
        </v-btn>
        <v-btn v-if="action === 'isEdit'"
               color="#28c76f"
               @click="submitForm"
               style="color: white"
        >
          Cập nhật
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Required from "./Required.vue";

export default {
  name: 'ModalCreate',
  components: {Required},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      visibleDialog: false,
      form: {
        botName: '',
        botCode: '',
        botType: '',
        server: '',
        server1: '',
        server2: '',
        botSave: '',
        botTrain: '',
        mode: '',
        description: '',
      },
      itemsBot : [
        {
          key: 1,
          value: 'Bot khách hàng'
        },
        {
          key: 2,
          value: 'Bot đào tạo'
        },
      ],
      dataServerFake: [
        {
          key: 'api',
          value: 'api'
        },
        {
          key: 'api_server',
          value: 'api_server'
        }
      ],
      requiredRule: [v => !!v || 'Field is required'],
    };
  },
  watch: {
    visible(val){
      this.visibleDialog =val
    }
  },
  methods: {
    submitForm(){
      this.$refs.form.validate().then(valid => {
        if(valid){
          if(this.action === 'isCreate'){
            this.saveItem()
          } else {
            this.editItem()
          }
        } else {
          return false
        }
      })
    },
    saveItem() {
      console.log("create")
      this.$emit('create',this.form)
    },
    editItem() {
      console.log("edit")
      this.$emit('edit',this.form)
    },
    closeModal () {
      this.form = {
        botName: '',
        botCode: '',
        botType: '',
        server: '',
        server1: '',
        server2: '',
        botSave: '',
        botTrain: '',
        mode: '',
        description: '',
      }
      this.$emit('cancel')
    }
  },
};
</script>
<style lang="css" scoped>
.title-modal {
  display: flex;
  justify-content: space-between;
}
.button-modal-create {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}
</style>