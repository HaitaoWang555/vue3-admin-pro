<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const locale = ref(zhCn)

    return {
      locale,
    }
  },
}
</script>
