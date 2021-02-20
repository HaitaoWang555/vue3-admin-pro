<template>
  <div class="app-container">
    <ProTable
      border
      :columns="columns"
      :data="loadData"
      :queryParam="queryParam"
    >
      <template #title="slotProps">
        <span style="padding-right: 15px" class="link-type">{{
          slotProps.row.title
        }}</span>
        <el-tag>{{ typeFilter(slotProps.row.type) }}</el-tag>
      </template>
      <template #importance="slotProps">
        <span v-if="slotProps.row.importance">
          <svg-icon
            v-for="n in Number(slotProps.row.importance)"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </span>
      </template>
      <template #status="slotProps">
        <el-tag :type="statusFilter(slotProps.row.status)">
          {{ slotProps.row.status }}
        </el-tag>
      </template>
      <template #actions="slotProps">
        <span class="fixed-width">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(slotProps.row)"
          >
            Edit
          </el-button>
          <el-button
            v-if="slotProps.row.status != 'published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(slotProps.row, 'published')"
          >
            Publish
          </el-button>
          <el-button
            v-if="slotProps.row.status != 'draft'"
            size="mini"
            @click="handleModifyStatus(slotProps.row, 'draft')"
          >
            Draft
          </el-button>
          <el-button
            v-if="slotProps.row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(slotProps.row, slotProps.index)"
          >
            Delete
          </el-button>
        </span>
      </template>
    </ProTable>
  </div>
</template>

<script>
import ProTable from '@/components/ProTable'
import { reactive, ref, toRaw } from 'vue'
import { fetchList } from '@/api/article'
import { columnList } from './columns/list'

export default {
  name: 'Page',
  components: {
    ProTable,
  },
  setup() {
    const columns = ref(columnList)
    const queryParam = reactive({
      importance: '',
      title: '',
      type: '',
      timestamp: '',
    })

    const calendarTypeOptions = [
      { key: 'CN', display_name: 'China' },
      { key: 'US', display_name: 'USA' },
      { key: 'JP', display_name: 'Japan' },
      { key: 'EU', display_name: 'Eurozone' },
    ]

    // arr to obj, such as { CN : "China", US : "USA" }
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
      acc[cur.key] = cur.display_name
      return acc
    }, {})

    function typeFilter(type) {
      return calendarTypeKeyValue[type]
    }

    function loadData(parameter) {
      const requestParameters = Object.assign({}, parameter, queryParam)
      return fetchList(requestParameters).then((res) => {
        // format data
        return res
      })
    }
    function statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger',
      }
      return statusMap[status]
    }
    function handleUpdate(row) {
      console.log(toRaw(row))
    }
    function handleModifyStatus(row, type) {
      console.log(row.content)
      console.log(type)
    }
    function handleDelete(row, index) {
      console.log(toRaw(row))
      console.log(index)
    }

    return {
      queryParam,
      columns,
      typeFilter,
      loadData,
      statusFilter,
      handleUpdate,
      handleModifyStatus,
      handleDelete,
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
