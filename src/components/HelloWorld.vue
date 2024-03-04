<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>

  <div class="card">
    <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field  label="User Name"></v-text-field>

      <v-text-field  label="Password"></v-text-field>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
