<!--  -->
<template>
  <div class="editable-cell">
    <div v-if="record.editimportance" class="editable-cell-input-wrapper">
      <el-rate
        key="edit"
        :model-value="importance"
        :allow-clear="false"
        @change="change"
      />
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
      <el-rate key="default" :model-value="record.importance" disabled />
      <i class="editable-cell-icon el-icon-edit" @click="editView(record)" />
    </div>
  </div>
</template>

<script>
import Message from 'element-plus/lib/el-message'
import { ref } from 'vue'
import { submit } from '@/api/public'
export default {
  name: 'Important',
  props: {
    record: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(prop) {
    const importance = ref(0)

    function edit(params) {
      submit(params).then((res) => {
        Message({ message: res.msg, type: 'success' })
        prop.record.importance = importance.value
        prop.record.editimportance = false
      })
    }

    function save(record) {
      const params = {}
      params.id = record.id
      params.importance = importance.value
      edit(params)
    }
    function change(val) {
      if (!val) return
      importance.value = val
    }
    function close(record) {
      record.editimportance = false
    }
    function editView(record) {
      record.editimportance = true
      importance.value = prop.record.importance
    }

    return {
      importance,
      close,
      change,
      save,
      editView,
    }
  },
}
</script>
