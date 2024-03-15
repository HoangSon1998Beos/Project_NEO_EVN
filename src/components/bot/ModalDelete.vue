<template>
  <v-dialog v-model="visibleDialog" max-width="400px" persistent>
    <v-card class="text-center py-4">
      <div class="self-center">
        <warning />
      </div>
      <v-card-text>
        <div>
          <slot name="description"></slot>
        </div>
      </v-card-text>
      <div class="flex justify-center gap-4">
        <v-btn width="20%" color="#ed1c24" @click="ok">
          {{ buttonOkText }}
        </v-btn>
        <v-btn width="20%" color="#82868b" @click="cancel"> Hủy </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Warning from '../../assets/bot/warning.vue'

export default {
  name: 'ModalDelete',
  components: { Warning },
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
    },
  },
  methods: {
    ok() {
      this.$emit('ok')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="css" scoped></style>
