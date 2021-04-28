<template>
  <div class="app-container">
    <ProTable
      border
      :show-index="showIndex"
      :query-param="queryParam"
      :columns="columns"
      :data="loadData"
      :lazy-load="lazyLoad"
    >
      <template
        v-for="(item, index) in columns.filter((i) => i.scopedSlots)"
        :key="index"
        #[item.scopedSlots.customRender]="slotProps"
      >
        <el-tag :type="dict(item.scopedSlots.dict, slotProps.row.status)">
          {{ slotProps.row.status }}
        </el-tag>
      </template>
    </ProTable>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useDict from '@/hooks/dict'
import { getOnlineListOptions, get } from '@/api/online'
import { nextTick, ref } from 'vue'
export default {
  name: 'OnlineList',
  props: {
    showIndex: {
      type: Boolean,
      default: false,
    },
    api: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const route = useRoute()
    const columns = ref([])
    const lazyLoad = ref(true)
    const queryParam = ref({})
    let listUrl
    const dict = useDict

    function getOptions() {
      getOnlineListOptions({ id: route.params.id }).then((res) => {
        columns.value = res.data.columns
        listUrl = res.data.listUrl
        queryParam.value = res.data.searchParams
        // init ProTable data
        lazyLoad.value = false
      })
    }
    // loadData
    function loadData(parameter) {
      const requestParameters = Object.assign({}, parameter, queryParam.value)
      requestParameters.columns = JSON.stringify(columns.value)
      return get(listUrl, requestParameters).then((res) => {
        // format data
        return res
      })
    }

    nextTick(() => {
      getOptions()
    })

    return {
      lazyLoad,
      loadData,
      columns,
      queryParam,
      dict,
    }
  },
}
</script>
