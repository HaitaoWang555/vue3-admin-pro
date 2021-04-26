<template>
  <div class="app-container">
    <ProTable border :columns="columns" :data="loadData" sticky>
      <template #importance="slotProps">
        <Important :record="slotProps.row" />
      </template>
      <template #status="slotProps">
        <EditStatus :record="slotProps.row" />
      </template>
    </ProTable>
  </div>
</template>
<script>
import ProTable from '@/components/ProTable/index.vue'
import { fetchList } from '@/api/article'

import { columnList } from './columns/inline'
import { ref } from 'vue'
import { useFilter } from '@/hooks/table'
import Important from './components/editable-cell/Important.vue'
import EditStatus from './components/editable-cell/Status.vue'
export default {
  name: 'InlineEditTable',
  components: {
    ProTable,
    Important,
    EditStatus,
  },
  setup() {
    const columns = ref(columnList)
    // Filter
    const { statusFilter } = useFilter()
    // loadData
    function loadData(parameter) {
      const requestParameters = Object.assign({}, parameter)
      return fetchList(requestParameters).then((res) => {
        // format data
        return res
      })
    }

    function handleUpdate(row) {
      console.log(row)
    }
    return {
      columns,
      statusFilter,
      loadData,
      handleUpdate,
    }
  },
}
</script>
