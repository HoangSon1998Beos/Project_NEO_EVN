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
                <v-text-field v-model.trim="form.botName"
                              :rules="[validateBot]"
                              variant="outlined"
                              placeholder="Nhập tên bot"
                              clearable
                              :disabled="action === 'isView'"
                              class="custom-tt"
                >
                  <template #prepend-inner>
                    <div :class="{ 'disabled-background': action === 'isView' }"></div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Mã bot</span>
                <Required/>
                <v-text-field v-model="form.botCode"
                              variant="outlined"
                              disabled
                >
                  <template #prepend-inner>
                    <div class="disabled-background"></div>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <span>Loại bot</span>
                <Required/>
                <v-select v-model="form.botType"
                          :rules="[checkRuleServer]"
                          :items="itemsBot"
                          item-title="value"
                          item-value="key"
                          variant="outlined"
                          placeholder="Chọn Loại bot"
                          :disabled="action === 'isView' || action === 'isEdit'"
                          clearable
                >
                  <template #prepend-inner>
                    <div :class="{ 'disabled-background': action === 'isView' || action === 'isEdit'}"></div>
                  </template>
                </v-select>
              </v-col>
              <v-col v-if="action === 'isCreate'" cols="6">
                <span>Máy chủ lưu trữ 1</span>
                <Required/>
                <v-select v-model="form.server1"
                          :rules="[checkRuleServer]"
                          item-title="value"
                          item-value="key"
                          :items="dataServerFake"
                          variant="outlined"
                          placeholder="Máy chủ lưu trữ"
                          clearable
                ></v-select>
              </v-col>
              <v-col v-else cols="6">
                <span>Bot đào tạo</span>
                <Required/>
                <v-select v-model="form.botTrain"
                          variant="outlined"
                          disabled
                >
                  <template #prepend-inner>
                    <div class="disabled-background"></div>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="action === 'isCreate'" cols="6">
                <span>Máy chủ lưu trữ 2</span>
                <Required/>
                <v-select v-model="form.server2"
                          :rules="[checkRuleServer]"
                          variant="outlined"
                          :items="dataServerFake"
                          item-title="value"
                          item-value="key"
                          placeholder="Máy chủ lưu trữ"
                          clearable
                ></v-select>
              </v-col>
              <v-col v-else cols="6">
                <span>Máy chủ lưu trữ</span>
                <Required/>
                <v-select v-model="form.server"
                          variant="outlined"
                          disabled
                >
                  <template #prepend-inner>
                    <div class="disabled-background"></div>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6">
                <span>Thư mục lưu trữ</span>
                <Required/>
                <v-text-field v-model="form.botSave"
                              variant="outlined"
                              disabled
                >
                  <template #prepend-inner>
                    <div class="disabled-background"></div>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="action === 'isView'" cols="6">
                <span>Thông tin bot</span>
                <Required/>
                <v-text-field v-model="form.model"
                              variant="outlined"
                              disabled
                >
                  <template #prepend-inner>
                    <div class="disabled-background"></div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <span>Mô tả</span>
                <v-textarea v-model.trim="form.description"
                            variant="outlined"
                            placeholder="Mô tả"
                            :disabled="action === 'isView'"
                            clearable
                >
                  <template #prepend-inner>
                    <div :class="{ 'disabled-background': action === 'isView'}"></div>
                  </template>
                </v-textarea>
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
import {validateBot, validateServer} from "../../../validate-bot.js";

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
    },
    dataFrom: {
      type: Array,
      default: [],
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
    };
  },
  watch: {
    visible(val){
      if(val && (this.action === 'isView' || 'isEdit')) {
        this.form = this.dataFrom
      }
      this.visibleDialog =val
    }
  },
  methods: {
    validateBot(data){
      return validateBot(data)
    },
    checkRuleServer(value) {
      return validateServer(value)
    },
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
      this.$emit('create',this.form)
    },
    editItem() {
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
.disabled-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  color: black;
  z-index: -1;
}
</style>