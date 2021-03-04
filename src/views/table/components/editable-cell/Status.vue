<!--  -->
<template>
  <div class="editable-cell">
    <div v-if="record.editstatus" class="editable-cell-input-wrapper">
      <el-select
        v-model="status"
        clearable
        style="width: 110px"
        size="mini"
        @change="change"
      >
        <el-option v-for="item in select" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
      <i
        class="editable-cell-icon-check el-icon-circle-check"
        @click="save(record)"
      />
      <i
        class="editable-cell-icon-close el-icon-circle-close"
        @click="close(record)"
      />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <el-tag :type="statusFilter(record.status)">
        {{ record.status }}
      </el-tag>
      <i class="editable-cell-icon el-icon-edit" @click="editView(record)" />
    </div>
  </div>
</template>

<script>
import Message from 'element-plus/lib/el-message'
import { ref } from 'vue'
import { submit } from '@/api/public'
import { useFilter } from '@/composition/table'

export default {
  name: 'EditStatus',
  props: {
    record: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(prop) {
    const status = ref('')
    const select = ref([
      {
        label: 'published',
        value: 'published',
      },
      {
        label: 'draft',
        value: 'draft',
      },
      {
        label: 'deleted',
        value: 'deleted',
      },
    ])
    // Filter
    const { statusFilter } = useFilter()
    function edit(params) {
      submit(params).then((res) => {
        Message({ message: res.msg, type: 'success' })
        prop.record.status = status.value
        prop.record.editstatus = false
      })
    }

    function save(record) {
      const params = {}
      params.id = record.id
      params.status = status.value
      edit(params)
    }
    function change(val) {
      if (!val) return
      status.value = val
    }
    function close(record) {
      record.editstatus = false
    }
    function editView(record) {
      record.editstatus = true
      status.value = prop.record.status
    }

    return {
      status,
      select,
      statusFilter,
      close,
      change,
      save,
      editView,
    }
  },
}
</script>
