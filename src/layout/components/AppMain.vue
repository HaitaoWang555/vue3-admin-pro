<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'AppMain',
  setup() {
    const route = useRoute()

    const key = computed(() => route.path)

    return {
      key,
    }
  },
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
