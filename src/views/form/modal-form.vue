<template>
  <div class="app-container">
    <el-button
      style="display: block; margin: 20px auto"
      type="primary"
      @click="open1"
      >打开 modal-form</el-button
    >
    <el-button
      style="display: block; margin: 20px auto"
      type="primary"
      @click="open2"
      >打开全屏 modal-form</el-button
    >

    <ProDialog
      v-model:value="dialogVisible"
      width="50%"
      title="ModalForm title"
      :confirm-loading="loading"
      :fullscreen="fullscreen"
      @ok="handleOk"
    >
      <ProForm
        ref="ProForm"
        :form-param="form"
        :form-list="formList"
        :no-footer="true"
        :layout="{ formWidth: '560px', labelWidth: '150px' }"
        @pro-submit="onSubmit"
      />
    </ProDialog>
  </div>
</template>

<script>
import { submit } from '@/api/public'
import { reactive, ref } from 'vue'
import { list } from './columns/list'
import { ElMessage as Message } from 'element-plus'

export default {
  name: 'ModalForm',
  setup() {
    const dialogVisible = ref(false)
    const fullscreen = ref(false)
    const loading = ref(false)
    const ProForm = ref()
    const form = reactive({
      name: '',
      region: '',
      date: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })
    const formList = list
    function handleOk() {
      ProForm.value.handleSubmit()
    }
    function onSubmit() {
      loading.value = false
      submit(form)
        .then((res) => {
          Message({ message: res.msg, type: 'success' })
        })
        .finally(() => {
          loading.value = false
        })
    }
    function open1() {
      fullscreen.value = false
      dialogVisible.value = true
    }
    function open2() {
      fullscreen.value = true
      dialogVisible.value = true
    }
    return {
      ProForm,
      dialogVisible,
      fullscreen,
      loading,
      form,
      formList,
      handleOk,
      onSubmit,
      open1,
      open2,
    }
  },
}
</script>
