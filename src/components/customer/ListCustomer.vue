<template>
  <div class="layout">
    <div class="card-layout">
      <v-btn prepend-icon="mdi-plus" color="#2666de" @click="addBot">Thêm mới</v-btn>
      <v-card class="mt-5">
        <v-data-table
            :headers="headers"
            :items="data.items"
            density="compact"
            :sort-asc-icon="'mdi-arrow-down'"
            :sort-desc-icon="'mdi-arrow-up'"
            :items-per-page="pagination.pageSize"
            item-key="name"
            class="custom-table"
        >
          <template v-slot:item.action="{item}">
            <v-tooltip text="Cập nhật">
              <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                  >
                    edit
                  </span>
              </template>
            </v-tooltip>
            <v-tooltip text="Xoá">
              <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                  >
                    delete
                  </span>
              </template>
            </v-tooltip>
            <v-tooltip text="Kết quả">
              <template v-slot:activator="{ props }">
                  <span
                      v-bind="props"
                      class="material-icons cursor-pointer"
                  >
                    error_outline
                  </span>
              </template>
            </v-tooltip>
          </template>
<!--          <template #bottom>-->
<!--            <Pagination-->
<!--                :value="pagination.page"-->
<!--                :total-record="totalItems"-->
<!--                @input="updatePage"-->
<!--                @update="updatePerPage"-->
<!--                :total-pages="totalPage"-->
<!--            />-->
<!--          </template>-->
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import ModalCreate from "../bot/ModalCreate.vue";
import ModalDelete from "../bot/ModalDelete.vue";
import Pagination from "../Pagination.vue";

export default {
  name: "ListCustomer",
  components: {Pagination, ModalDelete, ModalCreate}
}
</script>

<style scoped>

</style>