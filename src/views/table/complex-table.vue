<template>
  <div class="app-container">
    <ProTable
      ref="proTable"
      border
      show-selection
      :columns="columns"
      :data="loadData"
      :query-param="queryParam"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <template #btn>
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
          Add
        </el-button>
        <el-button
          type="success"
          :disabled="multipleSelection.length === 0"
          @click="handleBatchModifyStatus('published')"
        >
          Publish
        </el-button>
        <el-button
          :disabled="multipleSelection.length === 0"
          @click="handleBatchModifyStatus('draft')"
        >
          Draft
        </el-button>
      </template>

      <template #title="slotProps">
        <span style="padding-right: 15px" class="link-type">{{
          slotProps.row.title
        }}</span>
        <el-tag>{{ dict('typeFilter', slotProps.row.type) }}</el-tag>
      </template>
      <template #importance="slotProps">
        <el-rate :model-value="slotProps.row.importance" disabled></el-rate>
      </template>
      <template #status="slotProps">
        <el-tag :type="dict('statusMap', slotProps.row.status)">
          {{ slotProps.row.status }}
        </el-tag>
      </template>
      <template #actions="slotProps">
        <span class="fixed-width">
          <el-button type="primary" @click="handleUpdate(slotProps.row)">
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
    <ProDialog
      v-model:value="dialogVisible"
      :title="dialogTitle"
      width="50%"
      :confirm-loading="confirmLoading"
      @ok="handleDialogOk"
    >
      <ProForm
        ref="ProForm"
        :form-param="form"
        :form-list="columns"
        :layout="{ formWidth: '560px', labelWidth: '100px' }"
        @proSubmit="proSubmit"
      >
        <template #importance>
          <el-form-item label="Imp : ">
            <el-rate
              v-model="form.importance"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="3"
              style="margin-top: 8px"
            />
          </el-form-item>
        </template>
      </ProForm>
    </ProDialog>
  </div>
</template>

<script>
import { reactive, ref, toRaw } from 'vue'
import { fetchList, createArticle, updateArticle } from '@/api/article'
import { columnList } from './columns/list'
import Message from 'element-plus/lib/el-message'
import useDict from '@/hooks/dict'
import { parseTime, copyValue } from '@/utils'

export default {
  name: 'ComplexTable',
  setup() {
    // Table
    const proTable = ref(null)
    const columns = ref(columnList)
    const queryParam = reactive({
      sort: '+id',
      importance: '',
      title: '',
      type: '',
      timestamp: '',
    })
    const multipleSelection = ref([])
    // Form
    const dialogTitle = ref('')
    const dialogVisible = ref(false)
    const ProForm = ref()
    const confirmLoading = ref(false)
    const defaultFormParams = {
      id: undefined,
      importance: 1,
      remark: '',
      timestamp: new Date(),
      title: '',
      type: '',
      status: 'published',
    }
    const form = reactive(Object.assign({}, defaultFormParams))
    const isEdit = ref(false)
    let formData = null
    // Filter
    const dict = useDict
    // loadData
    function loadData(parameter) {
      const requestParameters = Object.assign({}, parameter, queryParam)
      return fetchList(requestParameters).then((res) => {
        // format data
        return res
      })
    }
    // Delete
    function handleDelete(row, index) {
      console.log(toRaw(row))
      Message({ message: 'Success', type: 'success' })
      proTable.value.list.splice(index, 1)
    }
    // Sort
    function sortChange(data) {
      console.log(data)
      const { prop, order } = data
      if (prop === 'id') {
        sortByID(order)
      }
    }
    function sortByID(order) {
      if (order === 'ascending') {
        queryParam.sort = '+id'
      } else {
        queryParam.sort = '-id'
      }
      proTable.value.refresh(true)
    }

    // Modify Status
    function handleSelectionChange(data) {
      multipleSelection.value = data
    }
    function handleBatchModifyStatus(status) {
      multipleSelection.value.forEach((i) => {
        i.status = status
      })
      Message({
        message: 'Success',
        type: 'success',
      })
    }
    function handleModifyStatus(row, status) {
      Message({
        message: 'Success',
        type: 'success',
      })
      row.status = status
    }
    // Create
    function handleCreate() {
      // reset FormParams
      Object.assign(form, defaultFormParams)
      dialogTitle.value = 'Create'
      isEdit.value = false
      dialogVisible.value = true
    }
    function create() {
      form.id = parseInt(Math.random() * 100) + 1024 // mock a id
      form.timestamp = parseTime(form.timestamp)
      formData = JSON.parse(JSON.stringify(toRaw(form)))
      return createArticle(form)
    }
    function createSuccess() {
      formData.author = 'vue3'
      formData.reviewer = 'element-plus'
      formData.pageviews = 0
      proTable.value.list.unshift(formData)
      dialogVisible.value = false
    }
    // Update
    function handleUpdate(row) {
      dialogTitle.value = 'Update'
      copyValue(form, row)
      formData = JSON.parse(JSON.stringify(toRaw(row)))
      form.timestamp = parseTime(form.timestamp)
      isEdit.value = true
      dialogVisible.value = true
    }
    function update() {
      return updateArticle(form)
    }
    function updateSuccess() {
      Object.assign(formData, form)
      const index = proTable.value.list.findIndex((v) => v.id === formData.id)
      proTable.value.list.splice(index, 1, formData)
      dialogVisible.value = false
    }
    function handleDialogOk() {
      ProForm.value.handleSubmit()
    }
    function proSubmit() {
      confirmLoading.value = true
      let method = isEdit.value ? update : create
      method(form)
        .then((res) => {
          Message({ message: res.msg, type: 'success' })
          formCB()
        })
        .finally(() => {
          confirmLoading.value = false
        })
    }
    function formCB() {
      return isEdit.value ? updateSuccess() : createSuccess()
    }

    return {
      proTable,
      queryParam,
      columns,
      dialogVisible,
      dialogTitle,
      ProForm,
      confirmLoading,
      isEdit,
      form,
      multipleSelection,
      loadData,
      dict,
      handleUpdate,
      handleModifyStatus,
      handleDelete,
      sortChange,
      handleCreate,
      handleSelectionChange,
      handleBatchModifyStatus,
      handleDialogOk,
      proSubmit,
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
