<template>
  <div class="app-container">
    <ProForm
      ref="ProForm"
      :form-param="form"
      :form-list="formList"
      :layout="{ formWidth: '560px', labelWidth: '150px' }"
      @proSubmit="onSubmit"
    >
      <template #footerBtn>
        <el-button :loading="loading" type="primary" @click="handleOk"
          >提交</el-button
        >
        <el-button @click="handleReset">重置</el-button>
      </template>
    </ProForm>
  </div>
</template>

<script>
import { submit } from '@/api/public'
import ProForm from '@/components/ProForm/index.vue'
import { reactive, ref, toRaw } from 'vue'
import { list } from './columns/list'
import Message from 'element-plus/lib/el-message'

export default {
  name: 'Form',
  components: { ProForm },
  setup() {
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
    function handleReset() {
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
      ProForm,
      loading,
      form,
      formList,
      handleReset,
      handleOk,
      onSubmit,
    }
  },
}
</script>
