<template>
  <div>
    <ProDialog
      v-model:value="visible"
      title="title"
      @before-close="handleClose"
    >
      封装的Dialog
    </ProDialog>
    <el-button
      style="display: block; margin: 20px auto"
      type="primary"
      @click="visible = true"
      >打开Dialog</el-button
    >
  </div>
</template>

<script>
import ProDialog from '@/components/ProDialog'
import { ref } from 'vue'
export default {
  name: 'ProDialogPage',
  components: { ProDialog },
  setup() {
    const visible = ref(false)

    function handleClose(params) {
      console.log(params)
    }

    return {
      visible,
      handleClose,
    }
  },
}
</script>

<style></style>
