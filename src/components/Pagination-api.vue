<template>
  <div class="pagination-custom">
    <span style="margin-right: 20px">
    Xem
    </span>
    <v-select
        v-model="getPerPage"
        :items="items"
        item-title="value"
        item-value="key"
        class="select-pagination"
        variant="outlined"
    />
    <span class="ml-5"> bản ghi/trang</span>
    <span class="ml-16">Tổng số {{ getTotalRecord }} bản ghi</span>
    <!--      <div>-->
    <!--        <v-pagination-->
    <!--            class="ml-16"-->
    <!--            rounded="circle"-->
    <!--            last-icon="mdi-arrow-down"-->
    <!--            first-icon="mdi-arrow-down"-->
    <!--            v-model="getCurrentPage"-->
    <!--            :length="getTotalPages"-->
    <!--            @update:model-value="changePage"-->
    <!--        ></v-pagination>-->
    <!--      </div>-->
  </div>
  <v-pagination
      v-if="getTotalPages > 1"
      style="margin-top: -80px"
      class="ml-16"
      rounded="circle"
      last-icon="mdi-arrow-down"
      first-icon="mdi-arrow-down"
      v-model="getCurrentPage"
      :length="getTotalPages"
      @update:model-value="changePage"
  ></v-pagination>
</template>

<script>
import appUtils from "../views/person-management/utils.js";

const mapComputed = (propName) => {
  return {
    // getter
    get: function () {
      return this[propName]
    },
    // setter
    set: function (newValue) {
      this.$emit('update:' + propName, newValue);
    }
  }
}
export default {
  mapComputed,
  name: "Pagination-api",
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
    totalPages: {
      type: Number,
      default: 0,

    },
    currentPage: {
      type: Number,
      default: 0,
    },
    totalRecord: {
      type: Number,
    },
  },
  computed: {
    getPerPage: mapComputed('perPage'),
    getTotalPages: mapComputed('totalPages'),
    getCurrentPage: mapComputed('currentPage'),
    getTotalRecord: mapComputed('totalRecord'),
  },
  data() {
    return {
      totalPage: 0,
      item: 4,
      items: [
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
    perPage(val) {
      this.$emit('changePage', true)
    },

  },
  methods: {
    changePage(page) {
      this.$emit('changePage', false);
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
}
</style>