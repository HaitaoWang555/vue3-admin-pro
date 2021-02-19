<template>
  <div class="pro-table">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :border="border"
      :fit="fit"
      :size="size"
      :width="width"
      :height="height"
      :maxHeight="maxHeight"
      :stripe="stripe"
      :rowKey="rowKey"
      :showHeader="showHeader"
      :showSummary="showSummary"
      :sumText="sumText"
      :summaryMethod="summaryMethod"
      :rowClassName="rowClassName"
      :rowStyle="rowStyle"
      :cellClassName="cellClassName"
      :cellStyle="cellStyle"
      :headerRowClassName="headerRowClassName"
      :headerRowStyle="headerRowStyle"
      :headerCellClassName="headerCellClassName"
      :headerCellStyle="headerCellStyle"
      :highlightCurrentRow="highlightCurrentRow"
      :currentRowKey="currentRowKey"
      :emptyText="emptyText"
      :expandRowKeys="expandRowKeys"
      :defaultExpandAll="defaultExpandAll"
      :defaultSort="defaultSort"
      :tooltipEffect="tooltipEffect"
      :spanMethod="spanMethod"
      :selectOnIndeterminate="selectOnIndeterminate"
      :indent="indent"
      :treeProps="treeProps"
      :lazy="lazy"
      :load="load"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.dataIndex"
        :label="item.title"
        :min-width="item.minWidth"
        :width="item.width"
        :align="item.align ? item.align : 'center'"
      >
        <template v-slot="scope">
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
      :total="localPagination.total"
      v-model:page="localPagination.page"
      v-model:pageSize="localPagination.pageSize"
      @pagination="loadData"
    />
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'ProTable',
  components: { Pagination },
  props: {
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
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change',
  ],
  setup(prop) {
    const list = ref(null)
    const listLoading = ref(false)
    const localPagination = reactive({
      total: 0,
      page: 1,
      pageSize: 20,
    })

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

    loadData()

    return {
      list,
      listLoading,
      loadData,
      localPagination,
    }
  },
}
</script>