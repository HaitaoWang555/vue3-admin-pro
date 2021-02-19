<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
import { computed } from 'vue'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      },
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, { emit }) {
    const currentPage = computed({
      get: () => prop.page,
      set: (val) => {
        emit('update:page', val)
      },
    })
    const limit = computed({
      get: () => prop.pageSize,
      set: (val) => {
        emit('update:pageSize', val)
      },
    })

    function handleSizeChange(val) {
      emit('pagination', { page: 1, pageSize: val })
      if (prop.autoScroll) {
        scrollTo(0, 800)
      }
    }
    function handleCurrentChange(val) {
      emit('pagination', { page: val, pageSize: limit.value })
      if (prop.autoScroll) {
        scrollTo(0, 800)
      }
    }

    return {
      currentPage,
      limit,
      handleSizeChange,
      handleCurrentChange,
    }
  },
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
