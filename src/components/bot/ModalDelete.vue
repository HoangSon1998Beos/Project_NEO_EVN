<template>
  <v-dialog v-model="visibleDialog" max-width="500px" persistent>
    <v-card class="text-center">
      <span class="material-icons">error_outline</span>
      <v-card-text>
        <div>
          <slot name="description"></slot>
        </div>
      </v-card-text>
      <div class="button-delete">
        <v-btn width="20%" color="#ed1c24" @click="ok">
          {{ buttonOkText }}
        </v-btn>
        <v-btn width="20%" color="#82868b" @click="cancel">
          Hủy
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalDelete',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    buttonOkText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visibleDialog: false,
    }
  },
  watch: {
    visible(val) {
      this.visibleDialog = val
    }
  },
  methods: {
    ok() {
      this.$emit('ok')
    },
    cancel() {
      this.$emit('cancel')
    },
  }
}
</script>

<style lang="css" scoped>
.button-delete {
  display: flex;
  column-gap: 1rem;
  justify-content: center;
}
</style>
