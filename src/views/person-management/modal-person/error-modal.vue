<template>
  <v-container>
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
              Hệ thống lỗi
            </div>
          </v-card-text>
          <!--          <v-card-actions class="button" >-->
          <!--            <v-btn style="color: white;background-color: #164397;border-color: #164397" @click="confirm">Đồng ý</v-btn>-->
          <!--          </v-card-actions>-->
        </div>
      </v-card>

    </v-dialog>
  </v-container>
</template>

<script>
import appUtils from "../utils.js";

export default {
  name: "error",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: '',
    }
  },
  computed: {
    getText: appUtils.mapComputed('text'),
    isVisible: appUtils.mapComputed('visible'),
  },
  methods: {
    confirm() {
      // Xử lý khi người dùng đồng ý
      this.isVisible = false;
    },
  }
}
</script>

<style scoped>
.margin-15 {
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

.button {
  display: flex;
  column-gap: 1rem;
  justify-content: center;
}
</style>