<template>
  <v-dialog v-model="visibleDialog" max-width="900px" persistent>
    <v-card>
      <v-card-title>
        Add New Item
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.firstName" :rules="requiredRule" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.lastName" :rules="requiredRule" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.firstName" :rules="requiredRule" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.lastName" :rules="requiredRule" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.firstName" :rules="requiredRule" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.botSave" variant="outlined" disabled></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <span>Mô tả</span>
              <v-textarea v-model="form.description" variant="outlined"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveItem">Save</v-btn>
        <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalCreate',
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      visibleDialog: false,
      form: {
        firstName: '',
        lastName: '',
        // Add more form fields here
      },
      requiredRule: [v => !!v || 'Field is required'],
    };
  },
  watch: {
    visible(val){
      this.visibleDialog =val
    }
  },
  methods: {
    saveItem() {
      // Handle saving logic here
      console.log('Form submitted with data:', this.form);
      // Close the dialog after saving
      this.visibleDialog = false;
    },
    closeDialog() {
      // Reset the form and close the dialog
      this.form = {
        firstName: '',
        lastName: '',
        // Reset other form fields here
      };
      this.dialog = false;
    },
  },
};
</script>