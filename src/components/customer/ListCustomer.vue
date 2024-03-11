<template>
  <div class="layout">
    <div class="card-layout">
      <v-card class="mt-5">
        <v-data-table
            :headers="headers"
            :items="data.items"
            density="compact"
            :sort-asc-icon="'mdi-arrow-down'"
            :sort-desc-icon="'mdi-arrow-up'"
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

export default {
  name: "ListCustomer",
}
</script>

<style scoped>

</style>