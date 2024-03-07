<template>
  <div class="pagination-custom">
    <span>
    Xem
    </span>
    <v-select
        v-model="selectItem"
        :items="items"
        item-title="value"
        item-value="key"
        class="select-pagination"
        variant="outlined"
    />
    <span class="ml-5"> bản ghi/trang</span>
    <span class="ml-16">Tổng số {{ totalRecord }} bản ghi</span>
    <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="changePage"
        class="ml-16"
        rounded="circle"
        last-icon="mdi-arrow-down"
        first-icon="mdi-arrow-down"
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    value: Number,
    totalPages: Number,
    totalRecord: Number,
  },
  data() {
    return {
      currentPage: this.value, // Trang hiện tại được gán từ props
      selectItem: 10,
      items : [
        {
          key: 10,
          value: 10
        },
        {
          key: 20,
          value: 20
        },
        {
          key: 30,
          value: 30
        },
        {
          key: 40,
          value: 40
        },
        {
          key: 50,
          value: 50
        },
      ]
    };
  },
  watch: {
    selectItem (val) {
      this.currentPage = 1
      this.updatePerPage(val)
    },
    currentPage (val) {
      this.changePage(val)
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.$emit('input', page);
    },
    updatePerPage(val) {
      this.$emit('update', val)
    },
  },
};
</script>
<style lang="css" scoped>
.pagination-custom {
  display: flex;
  align-items: center;
  padding: 10px;
}
.select-pagination {
  max-width: 80px;
  display: -webkit-box;
  margin-left: 20px;
}
</style>