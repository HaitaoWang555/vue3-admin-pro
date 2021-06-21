<template>
  <div class="app-container">
    <ProDialog
      v-model:value="visible"
      title="title"
      :confirm-loading="loading"
      @cancle="handleClose"
      @ok="handleOk"
    >
      封装的Dialog
    </ProDialog>
    <el-button
      style="display: block; margin: 20px auto"
      type="primary"
      @click="visible = true"
      >打开Dialog</el-button
    >
    <ProDialog
      v-model:value="visible1"
      title="title"
      fullscreen
      :confirm-loading="loading"
      :confirm-text="'(≧∇≦)ﾉ'"
      @cancle="handleClose"
      @ok="handleOk"
    >
      <div v-for="index in 40" :key="index" style="margin: 20px auto">
        全屏的Dialog {{ index }}
      </div>
    </ProDialog>
    <el-button
      style="display: block; margin: 20px auto"
      type="primary"
      @click="visible1 = true"
      >打开全屏Dialog</el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'ProDialogPage',
  setup() {
    const visible = ref(false)
    const visible1 = ref(false)
    const loading = ref(false)

    function handleClose() {
      ElMessage.warning('handleClose')
    }
    function handleOk() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        visible.value = false
        visible1.value = false
        ElMessage.success('handleOk')
      }, 2000)
    }

    return {
      visible,
      visible1,
      loading,
      handleClose,
      handleOk,
    }
  },
}
</script>
