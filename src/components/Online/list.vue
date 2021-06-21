<template>
  <div class="app-container">
    <ProTable
      ref="OnlineProTable"
      border
      :show-index="showIndex"
      :show-selection="showSelection"
      :query-param="queryParam"
      :columns="columns"
      :data="loadData"
      :lazy-load="lazyLoad"
      @selection-change="handleSelectionChange"
    >
      <template v-if="actions && actions.length > 0" #btn>
        <el-button
          v-for="(item, index) in actions"
          :key="index"
          :type="item.type"
          :icon="item.icon"
          @click="handleActions(item)"
        >
          {{ item.label }}
        </el-button>
      </template>

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

    <ProDialog
      v-model:value="dialogVisible"
      :title="dialogTitle"
      :confirm-loading="loading"
      @ok="handleSubmit"
    >
      <ProForm
        ref="OnlineProForm"
        :dialog-val="dialogVisible"
        :form-param="form"
        :form-list="columns"
        :no-footer="true"
        :layout="{ formWidth: '560px', labelWidth: '100px' }"
      >
      </ProForm>
    </ProDialog>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useDict from '@/hooks/dict'
import { getOnlineListOptions, get, post } from '@/api/online'
import { nextTick, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { copyValue } from '@/utils'
export default {
  name: 'OnlineList',
  setup() {
    const route = useRoute()

    const OnlineProForm = ref()
    const OnlineProTable = ref()

    const columns = ref([])
    const lazyLoad = ref(true)
    const queryParam = ref({})
    const actions = ref([])

    const dialogVisible = ref(false)
    const dialogTitle = ref('')
    const form = ref({})
    const defaultFormParams = {}

    const showIndex = ref(false)
    const showSelection = ref(false)

    const loading = ref(false)

    let listUrl, record, actionItem, multipleSelection
    const dict = useDict

    function init(res) {
      if (res.data.columns) {
        res.data.columns.forEach((i) => {
          if (i.isForm) {
            defaultFormParams[i.dataIndex] = i.defaultFormVal || ''
          } else if (i.isSearch) {
            queryParam.value[i.dataIndex] = i.defaultSearchVal || ''
          }
        })
        form.value = Object.assign({}, defaultFormParams)
      }
    }
    function initFormVal(params) {
      form.value = Object.assign({}, form.value, params)
      copyValue(form.value, record)
    }

    function getOptions() {
      getOnlineListOptions({ id: route.params.id }).then((res) => {
        columns.value = res.data.columns
        listUrl = res.data.listUrl
        showIndex.value = Boolean(res.data.showIndex)
        showSelection.value = Boolean(res.data.showSelection)
        actions.value = res.data.actions
        init(res)
        // init ProTable data
        lazyLoad.value = false
      })
    }
    // loadData
    function loadData(parameter) {
      const requestParameters = Object.assign({}, parameter, queryParam.value)
      // columns only mock
      requestParameters.columns = JSON.stringify(columns.value)
      return get(listUrl, requestParameters).then((res) => {
        // format data
        return res
      })
    }

    function handleActions(item) {
      actionItem = item
      switch (item.value) {
        case 'add':
          form.value = Object.assign({}, defaultFormParams)
          dialogTitle.value = '添加'
          dialogVisible.value = true
          break
        case 'edit':
          if (multipleSelection.length !== 1) {
            ElMessage.error('请选择一条数据')
            return
          }
          record = multipleSelection[0]
          initFormVal(item.otherParams)
          dialogTitle.value = '修改'
          dialogVisible.value = true
          break

        default:
          handleOtherActions()
          break
      }
    }
    function handleSelectionChange(data) {
      multipleSelection = data
    }

    function handleSubmit() {
      OnlineProForm.value.ProForm.validate((valid) => {
        if (valid) {
          loading.value = true
          post(actionItem.url, form.value)
            .then((res) => {
              ElMessage.success(res.msg)
              loading.value = false
              handleClose()
            })
            .finally(() => {
              loading.value = false
            })
        }
      })
    }
    function handleClose() {
      dialogVisible.value = false
      record = null
      if (actionItem.value === 'add') {
        OnlineProTable.value.refresh(true)
      } else {
        OnlineProTable.value.refresh()
      }
    }
    function handleOtherActions() {
      const params = {}
      if (actionItem.needSelect && multipleSelection.length === 0) {
        ElMessage.error('请至少选择一条数据')
        return
      }
      multipleSelection.forEach((item) => {
        for (const key in actionItem.otherParams) {
          const recordKey = key.replace('s', '')
          if (params[key]) {
            params[key] += ',' + item[recordKey]
          } else {
            params[key] = item[recordKey]
          }
        }
      })
      runOtherActions(params)
    }
    function runOtherActions(params) {
      if (actionItem.twoStepVerification) {
        ElMessageBox.confirm(actionItem.twoStepVerification, '确认信息', {
          distinguishCancelAndClose: true,
        }).then(() => {
          post(actionItem.url, params).then((res) => {
            ElMessage.success(res.msg)
            OnlineProTable.value.ProElTable.clearSelection()
          })
        })
      } else {
        post(actionItem.url, params).then((res) => {
          ElMessage.success(res.msg)
          OnlineProTable.value.ProElTable.clearSelection()
        })
      }
    }

    nextTick(() => {
      getOptions()
    })

    return {
      OnlineProForm,
      OnlineProTable,
      dialogVisible,
      dialogTitle,
      form,
      showIndex,
      showSelection,
      lazyLoad,
      loadData,
      columns,
      queryParam,
      dict,
      actions,
      loading,
      handleActions,
      handleSelectionChange,
      handleSubmit,
    }
  },
}
</script>
