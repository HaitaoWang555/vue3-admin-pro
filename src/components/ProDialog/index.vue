<template>
  <div class="ProDialogWrap">
    <el-dialog
      ref="ProDialog"
      v-model="value"
      v-bind="$attrs"
      :fullscreen="isFullscreen"
      :append-to-body="
        $attrs['append-to-body'] === undefined ? true : $attrs['append-to-body']
      "
      :close-on-click-modal="false"
      custom-class="ProDialog"
      destroy-on-close
      @close="handleClose"
    >
      <span class="ProDialogFullscreen" @click="changeFullscreen">
        <svg-icon :icon-class="icon" />
      </span>
      <template #title><slot name="title"></slot></template>
      <slot></slot>
      <template v-if="!noFooter" #footer>
        <slot v-if="$slots && $slots.footer" name="footer"></slot>
        <span v-else class="dialog-footer">
          <el-button @click="handleClose">关 闭</el-button>
          <el-button
            :loading="confirmLoading"
            type="primary"
            @click="handleOk"
            >{{ confirmText }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watchEffect, watch } from 'vue'
import draggable from './draggable'
export default {
  name: 'ProDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
    confirmText: {
      type: String,
      default: '确 定',
    },
  },
  emits: ['cancle', 'ok', 'update:value'],
  setup(props, { emit, attrs }) {
    const ProDialog = ref()
    const isFullscreen = ref(false)

    const icon = computed(() => {
      return isFullscreen.value ? 'fullscreen-exit' : 'fullscreen'
    })

    function handleClose() {
      if (!props.value) return
      emit('cancle')
      emit('update:value', false)
    }
    function handleOk() {
      emit('ok')
    }
    function changeFullscreen() {
      isFullscreen.value = !isFullscreen.value
      if (isFullscreen.value) {
        ProDialog.value.dialogRef.style.cssText += ';top:0px;left:0px;'
      }
    }

    onMounted(() => {
      isFullscreen.value = false
    })

    watch(
      () => attrs.fullscreen,
      () => {
        if (attrs.fullscreen || attrs.fullscreen === '')
          isFullscreen.value = true
      }
    )

    watchEffect(() => {
      if (isFullscreen.value) return
      if (props.value && ProDialog.value) {
        nextTick(() => {
          draggable(ProDialog.value.dialogRef)
        })
      }
    })

    return {
      isFullscreen,
      ProDialog,
      handleClose,
      handleOk,
      changeFullscreen,
      icon,
    }
  },
}
</script>
