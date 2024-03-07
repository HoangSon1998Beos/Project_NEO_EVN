<template>
    <v-container >
      <v-dialog v-model="isVisible" max-width="400">
        <v-card class="text-center body-modal">
          <div class="margin-15">
            <div style="margin-top: 10px">
              <v-icon
                  color="error"
                  icon="mdi-alert-circle"
                  style="font-size: 100px;"
              ></v-icon>
            </div>
            <v-card-text>
              <div class="font-text">
                Bạn có chắc chắn muốn khóa không?
              </div>
            </v-card-text>
            <v-card-actions class="button-delete" >
              <v-btn style="color: white;background-color: #164397;border-color: #164397" @click="confirm">Đồng ý</v-btn>
              <v-btn style="color: white;background-color: #ed1c24;border-color: #ed1c24" @click="cancel">Hủy</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
</template>
<script>
import appUtils from "../utils.js";

export default {
  name: "lock-modal",
  props :{
    visible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isVisible: appUtils.mapComputed('visible'),
  },
  methods: {
    cancel() {
      // Xử lý khi người dùng hủy bỏ
      this.isVisible = false;
    },
    confirm() {
      // Xử lý khi người dùng đồng ý
      this.isVisible = false;
      this.$emit('success');
    },
  },
}
</script>

<style scoped>
.margin-15{
  margin: 15px;
}
.font-text {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  font-size: x-large;
  color: #5e5873;
}
.button-delete {
  display: flex;
  column-gap: 1rem;
  justify-content: center;
}
</style>