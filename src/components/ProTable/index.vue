<template>
  <div class="pro-table">
    <SearchForm
      :search-list="columns.filter((i) => i.isSearch)"
      :query-param="queryParam"
      :loading="listLoading"
      @search="refresh"
    />
    <div class="table-operator">
      <div class="solt"><slot name="btn"></slot></div>
      <TableSetting
        v-model:columns="tableColumns"
        :refresh="refresh"
        @reRender="updateTable"
      />
    </div>
    <el-table
      :key="key"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :border="border"
      :fit="fit"
      :size="size"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :row-key="rowKey"
      :show-header="showHeader"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :empty-text="emptyText"
      :expand-row-keys="expandRowKeys"
      :default-expand-all="defaultExpandAll"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :tree-props="treeProps"
      :lazy="lazy"
      :load="load"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @current-change="handleCurrentChange"
      @expand-change="handlExpandChange"
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
import { computed, reactive, ref } from 'vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import SearchForm from '@/components/SearchForm' // SearchForm
import TableSetting from '@/components/ProTable/table-setting' // TableSetting
import { useStore } from 'vuex'
export default {
  name: 'ProTable',
  components: { Pagination, SearchForm, TableSetting },
  props: {
    /* eslint-disable vue/require-default-prop */
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
    size: String,
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true,
    },
    stripe: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    rowKey: [String, Function],
    showHeader: {
      type: Boolean,
      default: true,
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    indent: {
      type: Number,
      default: 16,
    },
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children',
        }
      },
    },
    lazy: Boolean,
    load: Function,
  },
  emits: [
    'select',
    'select-all',
    'selection-change', // complete
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change', // complete
    'filter-change',
    'current-change', // complete
    'header-dragend',
    'expand-change', // complete
  ],
  setup(prop, { emit }) {
    const key = ref(0)
    const list = ref(null)
    const listLoading = ref(false)
    const localPagination = reactive({
      total: 0,
      page: 1,
      pageSize: 20,
    })
    const tableColumns = ref(
      prop.columns
        .filter((i) => !i.noTable)
        .map((i) => {
          i.fieldVisible = true
          return i
        })
    )

    const store = useStore()

    const device = computed(() => store.state.app.device)

    function loadData() {
      listLoading.value = true
      const result = prop.data(localPagination)
      // r.page, r.totalCount, r.data
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result.then((r) => {
          if (!r || r.length === 0 || r.data.length === 0) {
            listLoading.value = false
            return null
          }
          list.value = r.data.items // Table Data
          localPagination.total = r.data.total
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
    function handleSelectionChange(data) {
      emit('selection-change', data)
    }
    function sortChange(data) {
      emit('sort-change', data)
    }
    function handleCurrentChange(data) {
      emit('current-change', data)
    }
    function handlExpandChange(data, expandedRows) {
      emit('expand-change', data, expandedRows)
    }

    function updateTable() {
      key.value = key.value += 1
    }

    loadData()

    return {
      key,
      tableColumns,
      list,
      listLoading,
      loadData,
      localPagination,
      refresh,
      device,
      handleSelectionChange,
      sortChange,
      handleCurrentChange,
      handlExpandChange,
      updateTable,
    }
  },
}
</script>
