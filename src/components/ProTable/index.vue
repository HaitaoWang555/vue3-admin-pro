<template>
  <div class="pro-table" :class="sticky ? 'sticky' : ''">
    <SearchForm
      :search-list="columns.filter((i) => i.isSearch)"
      :query-param="queryParam"
      :loading="listLoading"
      @search="refresh"
    >
      <template #header>
        <slot name="searchHeader"></slot>
      </template>
      <template #footer>
        <slot name="searchFooter"></slot>
      </template>
    </SearchForm>
    <div class="table-operator">
      <div class="solt"><slot name="btn"></slot></div>
      <TableSetting
        v-model:columns="tableColumns"
        :refresh="refresh"
        @re-render="updateTable"
      />
    </div>
    <el-table
      ref="ProElTable"
      :key="key"
      v-loading="listLoading"
      :data="list"
      v-bind="$attrs"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column v-if="showIndex" label="#" align="center" type="index" />
      <el-table-column
        v-for="item in tableColumns.filter((i) => i.fieldVisible)"
        :key="item.dataIndex"
        :label="item.title"
        :min-width="item.minWidth"
        :width="item.width"
        :fixed="device === 'mobile' ? false : item.fixed"
        :align="item.align ? item.align : 'center'"
        :sortable="item.sortable || null"
        :prop="item.sortable ? item.dataIndex : null"
      >
        <template #default="scope">
          <span v-if="!item.scopedSlots">{{ scope.row[item.dataIndex] }}</span>
          <span v-else-if="item.scopedSlots.customRender === 'date'">
            {{ $filters.parseTime(scope.row[item.dataIndex]) }}
          </span>
          <slot
            v-else
            :name="item.scopedSlots.customRender"
            :row="scope.row"
            :index="scope.$index"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="showPagination && localPagination.total"
      v-model:page="localPagination.page"
      v-model:pageSize="localPagination.pageSize"
      :total="localPagination.total"
      @pagination="loadData"
    />
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import Pagination from '@/components/Pagination/index.vue' // secondary package based on el-pagination
import SearchForm from '@/components/SearchForm/index.vue' // SearchForm
import TableSetting from '@/components/ProTable/table-setting.vue' // TableSetting
import { useStore } from 'vuex'
export default {
  name: 'ProTable',
  components: { Pagination, SearchForm, TableSetting },
  props: {
    /* eslint-disable vue/require-default-prop */
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    queryParam: {
      type: Object,
      default: () => {
        return {}
      },
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    showSelection: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Function,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup(prop) {
    const ProElTable = ref()
    const key = ref(0)
    const list = ref(null)
    const listLoading = ref(false)
    const localPagination = reactive({
      total: 0,
      page: 1,
      pageSize: 20,
    })
    const tableColumns = ref([])

    const store = useStore()

    const device = computed(() => store.state.app.device)

    function initColumns() {
      tableColumns.value = prop.columns
        .filter((i) => !i.noTable)
        .map((i) => {
          i.fieldVisible = true
          return i
        })
    }

    function loadData() {
      listLoading.value = true
      const result = prop.data(localPagination)
      // r.page, r.totalCount, r.data
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result
          .then((r) => {
            if (!r || r.length === 0 || r.data.length === 0) {
              return null
            }
            list.value = r.data.items // Table Data
            localPagination.total = r.data.total
          })
          .finally(() => {
            listLoading.value = false
          })
      }
    }
    function refresh(bool = false) {
      if (bool) {
        localPagination.page = 1
      }
      loadData()
    }

    function updateTable() {
      key.value = key.value += 1
    }

    if (!prop.lazyLoad) {
      initColumns()
      loadData()
    }

    watch(
      () => prop.lazyLoad,
      () => {
        if (!prop.lazyLoad) {
          initColumns()
          loadData()
        }
      }
    )

    return {
      ProElTable,
      key,
      tableColumns,
      list,
      listLoading,
      loadData,
      localPagination,
      refresh,
      device,
      updateTable,
    }
  },
}
</script>
