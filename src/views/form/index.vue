<template>
  <div class="app-container">
    <ProForm :formParam="form" :formList="formList" />
  </div>
</template>

<script>
import { submit } from '@/api/public'
import ProForm from '@/components/ProForm'
import { reactive, toRaw } from 'vue'
import { list } from './columns/list'

export default {
  name: 'Form',
  components: { ProForm },
  setup() {
    const form = reactive({
      name: '',
      region: '',
      date: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      subMet: null,
    })
    const formList = list
    const onSubmit = () => {
      const { name } = form
      console.log(name)
      console.log(toRaw(form))
      return submit(form)
    }
    form.subMet = onSubmit

    return {
      form,
      formList,
    }
  },
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
