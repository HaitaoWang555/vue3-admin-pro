<!--  -->
<template>
  <div class="app-container">
    <ProForm
      :form-param="form"
      :form-list="formList"
      :sub-met="onSubmit"
      label-position="top"
      :layout="{ formWidth: '100%', labelWidth: '150px' }"
    >
      <template #title0> 仓库管理 </template>
      <template #title1> 任务管理 </template>
    </ProForm>
  </div>
</template>

<script>
import { submit } from '@/api/public'
import ProForm from '@/components/ProForm'
import { reactive, toRaw } from 'vue'
import { list } from './columns/advance'
export default {
  name: 'AdvancedForm',
  components: { ProForm },
  setup() {
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
    const onSubmit = () => {
      const { name } = form
      console.log(name)
      console.log(toRaw(form))
      return submit(form)
    }

    return {
      form,
      formList,
      onSubmit,
    }
  },
}
</script>
