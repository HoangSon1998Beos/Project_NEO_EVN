<template>
  <v-dialog
    transition="dialog-bottom-transition"
    style="width: 500px"
    v-model="isVisible"
    persistent
  >
    <!--    persistent-->
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Đặt lại mật khẩu cho người dùng {{ this.getUserInfo.username }}
        </div>

        <v-btn icon="mdi-close" variant="text" @click="closeForm"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu mới</div>
          <v-text-field
            v-model="newPassword"
            :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visiblePassword ? 'text' : 'password'"
            @click:append-inner="visiblePassword = !visiblePassword"
            required
            variant="outlined"
            clearable
            class="small-text-field"
            :rules="newPasswordRule"
          ></v-text-field>
          <div class="text-subtitle-1 text-medium-emphasis">
            Nhập lại mật khẩu mới
          </div>
          <v-text-field
            v-model="confirmPassword"
            :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visiblePassword ? 'text' : 'password'"
            @click:append-inner="visiblePassword = !visiblePassword"
            required
            variant="outlined"
            clearable
            class="small-text-field"
            :rules="confirmPassRule"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn
              type="primary"
              text="Cập nhật"
              variant="tonal"
              style="margin-right: 15px"
              class="button-primary"
              @click="success"
            ></v-btn>
            <v-btn text="Nhập lại" variant="tonal" @click="clearForm"></v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import appUtils from '../utils.js'

export default {
  computed: {
    isVisible: appUtils.mapComputed('visible'),
    getUserInfo: appUtils.mapComputed('userInfo'),
    newPasswordRule() {
      return [
        (v) => !!v || 'Chưa nhập mật khẩu',
        (v) =>
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) ||
          'Mật khẩu chưa đúng định dạng',
      ]
    },
    confirmPassRule() {
      return [
        (v) => !!v || 'Chưa nhập mật khẩu',
        (v) =>
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) ||
          'Mật khẩu chưa đúng định dạng',
        (value) => value === this.newPassword || 'Không trùng với password',
      ]
    },
  },
  methods: {
    closeForm() {
      this.isVisible = false
    },
    clearForm() {
      this.newPassword = ''
      this.confirmPassword = ''
    },
    success() {
      this.isVisible = false
      this.$emit('success')
    },
  },
  props: {
    userInfo: {
      type: Object,
      default: {},
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      visiblePassword: false,
    }
  },

  name: 'change-pass-modal',
}
</script>

<style scoped>
.button-primary {
  background: #2666de;
  color: white;
  border-color: #2666de;
}
</style>
