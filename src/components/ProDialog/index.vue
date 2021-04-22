<template>
  <div class="ProDialogWrap">
    <el-dialog
      v-model="value"
      v-bind="$attrs"
      :append-to-body="
        $attrs['append-to-body'] === undefined ? true : $attrs['append-to-body']
      "
      :close-on-click-modal="false"
      custom-class="ProDialog"
      @close="handleClose"
    >
      <template #title><slot name="title"></slot></template>
      <slot></slot>
      <template v-if="!$attrs['no-footer']" #footer>
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
    confirmText: {
      type: String,
      default: '确 定',
    },
  },
  emits: ['cancle', 'ok', 'update:value'],
  setup(props, { emit }) {
    function handleClose() {
      if (!props.value) return
      emit('cancle')
      emit('update:value', false)
    }
    function handleOk() {
      emit('ok')
    }

    return {
      handleClose,
      handleOk,
    }
  },
}
</script>
