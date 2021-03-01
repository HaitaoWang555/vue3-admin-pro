<!-- table-setting -->
<template>
  <div class="table-setting">
    <i class="el-icon-refresh" @click="refresh" />
    <i class="el-icon-setting" />
    <i class="el-icon-full-screen" @click="fullscreen" />
  </div>
</template>

<script>
import { getScrollBarWidth } from '@/utils'
import { toggleClass, hasClass } from '@/utils'
const scrollBarWidth = getScrollBarWidth()
export default {
  name: 'TableSetting',
  props: {
    refresh: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    function fullscreen() {
      const el = document.querySelector('#app .app-container')
      toggleClass(el, 'content-screenfull')
      if (hasClass(el, 'content-screenfull')) {
        document.documentElement.style.overflow = 'hidden'
        document.body.style.borderRight =
          scrollBarWidth + 'px solid transparent'
      } else {
        document.documentElement.style.overflow = ''
        document.body.style.borderRight = ''
      }
    }

    return {
      fullscreen,
    }
  },
}
</script>
