<!-- table-setting -->
<template>
  <div class="table-setting">
    <i class="el-icon-refresh" @click="refresh" />
    <i class="el-icon-setting" @click="dialogVisible = true" />
    <i class="el-icon-full-screen" @click="fullscreen" />
    <el-dialog
      v-model="dialogVisible"
      title="表格列展示"
      @close="dialogVisible = false"
    >
      <draggable
        v-model="columns"
        class="list-group"
        item-key="dataIndex"
        tag="transition-group"
        :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <span>{{ element.title }}</span>
            <div class="btnWrap">
              <el-switch
                v-model="element.fieldVisible"
                @change="element.fieldVisible = !element.fieldVisible"
              />
              <span v-if="element.fieldVisible">显示</span>
              <span v-else>隐藏</span>
            </div>
          </div>
        </template>
      </draggable>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import { getScrollBarWidth } from '@/utils'
import { toggleClass, hasClass } from '@/utils'
import { computed, ref } from 'vue'
const scrollBarWidth = getScrollBarWidth()
export default {
  name: 'TableSetting',
  components: { draggable },
  props: {
    refresh: {
      type: Function,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup() {
    const dialogVisible = ref(false)

    const dragOptions = computed(() => {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    })

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
      dialogVisible,
      dragOptions,
      fullscreen,
    }
  },
}
</script>
<style lang="scss" scoped>
.list-group-item {
  max-width: 80%;
  min-width: 40%;
  margin: 5px auto;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  span {
    vertical-align: middle;
  }
}
</style>
