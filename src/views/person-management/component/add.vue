<template>
  <v-dialog
      transition="dialog-bottom-transition"
      style="width: 1000px"
      v-model="visible"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          style="width: 200px;background: #2666de;color: white;border-color: #2666de"
          v-bind="activatorProps"
          text="Thêm mới"
      ></v-btn>
    </template>

<!--    <template v-slot:default="{ isActive }">-->
<!--      <v-card>-->
<!--        <v-toolbar title="Opening from the Bottom"></v-toolbar>-->

<!--        <v-card-text class="text-h2 pa-12">-->
<!--          Hello world!-->
<!--        </v-card-text>-->

<!--        <v-card-actions class="justify-end">-->
<!--          <v-btn-->
<!--              text="Close"-->
<!--              @click="isActive.value = false"-->
<!--          ></v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->

<!--    </template>-->
    <v-card
        prepend-icon="mdi-account"
        title="Thêm mới người dùng"
    >
      <v-card-text>
        <v-row>
          <v-col
              cols="6"
          >
            <div>Tài khoản</div>
            <v-text-field
                required
            ></v-text-field>
          </v-col>
          <v-col
              cols="6"

          >
            <div>Mật khẩu</div>
            <v-text-field
                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visiblePassword ? 'text' : 'password'"
                @click:append-inner="visiblePassword = !visiblePassword"
                required
            ></v-text-field>
          </v-col>

<!--          <v-col-->
<!--              cols="12"-->
<!--              md="4"-->
<!--              sm="6"-->
<!--          >-->
<!--            <v-text-field-->
<!--                hint="example of persistent helper text"-->
<!--                label="Last name*"-->
<!--                persistent-hint-->
<!--                required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->

<!--          <v-col-->
<!--              cols="12"-->
<!--              md="4"-->
<!--              sm="6"-->
<!--          >-->
<!--            <v-text-field-->
<!--                label="Email*"-->
<!--                required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->

<!--          <v-col-->
<!--              cols="12"-->
<!--              md="4"-->
<!--              sm="6"-->
<!--          >-->
<!--            <v-text-field-->
<!--                label="Password*"-->
<!--                type="password"-->
<!--                required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->

<!--          <v-col-->
<!--              cols="12"-->
<!--              md="4"-->
<!--              sm="6"-->
<!--          >-->
<!--            <v-text-field-->
<!--                label="Confirm Password*"-->
<!--                type="password"-->
<!--                required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->

<!--          <v-col-->
<!--              cols="12"-->
<!--              sm="6"-->
<!--          >-->
<!--            <v-select-->
<!--                :items="['0-17', '18-29', '30-54', '54+']"-->
<!--                label="Age*"-->
<!--                required-->
<!--            ></v-select>-->
<!--          </v-col>-->

<!--          <v-col-->
<!--              cols="12"-->
<!--              sm="6"-->
<!--          >-->
<!--            <v-autocomplete-->
<!--                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"-->
<!--                label="Interests"-->
<!--                auto-select-first-->
<!--                multiple-->
<!--            ></v-autocomplete>-->
<!--          </v-col>-->


<!--        <small class="text-caption text-medium-emphasis">*indicates required field</small>-->
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
        ></v-btn>

        <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!--  <v-dialog-->
<!--  >-->
<!--    <template v-slot:activator="{ props: activatorProps }">-->
<!--      <v-btn-->
<!--          v-bind="activatorProps"-->
<!--          text="Transition from Bottom"-->
<!--          block-->
<!--      ></v-btn>-->
<!--    </template>-->
<!--  </v-dialog>-->
</template>

<script>
import appUtils from '../utils.js';
export default {
  name: "add",
  data(){
    return{
      dialog: true,
      visible: true,
      visiblePassword: false,
      // computed: {
      //   isVisible: appUtils.mapComputed('visible'),
      // },
      // props: {
      //   visible: {
      //     type: Boolean,
      //     default: true,
      //   },
      // },
    }
  }
}
</script>

<style scoped>
.v-card-text {
  text-align: left !important;
}
</style>