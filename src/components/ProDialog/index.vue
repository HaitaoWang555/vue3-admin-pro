<template>
  <div class="ProDialogWrap">
    <el-dialog
      v-model="value"
      :title="title"
      :width="width"
      append-to-body
      :close-on-click-modal="false"
      custom-class="ProDialog"
      @close="handleClose"
    >
      <template #title><slot name="title"></slot></template>
      <slot></slot>
      <template #footer>
        <slot v-if="$slots && $slots.footer" name="footer"></slot>
        <span v-else class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
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
    title: {
      type: String,
      default: '提示',
    },
    width: {
      type: String,
      default: '30%',
    },
  },
  setup(props, { emit }) {
    function handleClose() {
      emit('update:value', false)
    }

    return {
      handleClose,
    }
  },
}
</script>
