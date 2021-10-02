<!--  -->
<template>
  <div class="app-container">
    <ProForm
      ref="ProForm"
      :form-param="form"
      :form-list="formList"
      label-position="top"
      :layout="{ formWidth: '100%', labelWidth: '150px' }"
      @proSubmit="onSubmit"
    >
      <template #title0> 仓库管理 </template>
      <template #roterText>
        <router-link
          to="/dashboard"
          style="position: relative; top: 50px; color: #1890ff"
          >添加仓库</router-link
        >
      </template>
      <template #title1> 任务管理 </template>
      <template #footerBtn>
        <div class="pro-form-footer-bar">
          <el-button @click="handleReset">重置</el-button>
          <el-button :loading="loading" type="primary" @click="handleOk"
            >提交</el-button
          >
        </div>
      </template>
    </ProForm>
  </div>
</template>

<script>
import { submit } from '@/api/public'
import ProForm from '@/components/ProForm/index.vue'
import { ref, reactive, toRaw } from 'vue'
import { list } from './columns/advance'
import Message from 'element-plus/lib/el-message'

export default {
  name: 'AdvancedForm',
  components: { ProForm },
  setup() {
    const loading = ref(false)
    const ProForm = ref()
    const form = reactive({
      name: 'sssssss',
      url: '',
      owner: '',
      approver: '',
      dateRange: '',
      type: '',
      name2: 'ssssssssss',
      url2: '',
      owner2: '',
      approver2: '',
      dateRange2: '',
      type2: '',
    })
    const formList = list
    function handleOk() {
      ProForm.value.handleSubmit()
    }
    function handleReset() {
      console.log(ProForm.value)
      ProForm.value.resetFormParam()
    }
    function onSubmit(callback) {
      const { name } = form
      console.log(name)
      console.log(toRaw(form))
      loading.value = true
      submit(form)
        .then((res) => {
          Message({ message: res.msg, type: 'success' })
          callback('fulfilled') // reset form
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      loading,
      ProForm,
      form,
      formList,
      handleReset,
      handleOk,
      onSubmit,
    }
  },
}
</script>
