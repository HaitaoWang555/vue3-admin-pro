<!-- 通用Form -->
<template>
  <el-form
    v-if="showForm"
    ref="ProForm"
    :model="formParam"
    :label-width="layout.labelWidth"
    :rules="rules"
    :style="{ width: layout.formWidth }"
    style="margin: 0 auto"
  >
    <slot name="header"></slot>
    <el-form-item
      v-for="(item, index) in formList.filter((i) => i.isForm)"
      :key="index"
      :prop="item.prop ? item.dataIndex : ''"
      :label="item.title + ' : '"
    >
      <el-input
        v-if="item.valueType === 'input'"
        v-model="formParam[item.dataIndex]"
        :type="item.inpuType || 'text'"
        :placeholder="item.placeholder || item.title"
      />
      <template v-else-if="item.valueType === 'check_code'">
        <el-row :gutter="16">
          <el-col class="gutter-row" :span="16">
            <el-input v-model="formParam[item.dataIndex]" />
          </el-col>
          <el-col class="gutter-row" :span="8">
            <SendCode :params="item.sendCode" />
          </el-col>
        </el-row>
      </template>
      <el-switch
        v-else-if="item.valueType === 'switch'"
        v-model="formParam[item.dataIndex]"
      />
      <el-date-picker
        v-else-if="item.valueType === 'date-picker'"
        v-model="formParam[item.dataIndex]"
        :type="item.pickerType"
        :format="item.pickerFormat"
        clearable
        style="width: 100%"
      />
      <el-select
        v-else-if="item.valueType === 'select'"
        v-model="formParam[item.dataIndex]"
        :placeholder="item.placeholder || item.title"
        filterable
        :multiple="item.multiple ? true : false"
        clearable
        style="width: 100%"
      >
        <el-option
          v-for="s in item.option.filter((i) => i.value !== '')"
          :key="'select' + s.value"
          :value="s.value"
          :label="s.label"
          >{{ s.label }}</el-option
        >
      </el-select>
      <el-checkbox-group
        v-else-if="item.valueType === 'checkbox'"
        v-model="formParam[item.dataIndex]"
      >
        <el-checkbox v-for="(s, i) in item.option" :key="i" :label="s.value">{{
          s.label
        }}</el-checkbox>
      </el-checkbox-group>
      <el-radio-group
        v-else-if="item.valueType === 'radio'"
        v-model="formParam[item.dataIndex]"
      >
        <el-radio v-for="(s, i) in item.option" :key="i" :label="s.value">{{
          s.label
        }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <slot name="footer"></slot>
    <el-form-item label-width="0" style="margin-top: 24px; text-align: center">
      <el-button
        size="large"
        type="primary"
        :disabled="btnDisabled"
        :loading="loading"
        @click="handleSubmit"
        >{{ isEdit ? '修改' : '确定' }}</el-button
      >
      <slot name="btn"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import SendCode from '@/components/sendCode'
import { ref } from 'vue'
import Message from 'element-plus/lib/el-message'

export default {
  name: 'ProForm',
  components: { SendCode },
  props: {
    formParam: {
      type: Object,
      default: () => {
        return {}
      },
    },
    layout: {
      type: Object,
      default: () => {
        return {
          formWidth: '560px',
          labelWidth: '145px',
        }
      },
    },
    formList: {
      type: Array,
      default: () => {},
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    btnDisabled: {
      type: Boolean,
      default: false,
    },
    subMet: {
      type: Function,
      default: () => {},
    },
    formCB: {
      type: Function,
      default: () => {},
    },
  },
  setup(prop) {
    const loading = ref(false)
    const showForm = ref(false)
    const rules = {}

    const ProForm = ref()
    const originalFormParams = JSON.parse(JSON.stringify(prop.formParam))

    function init() {
      for (let index = 0; index < prop.formList.length; index++) {
        const element = prop.formList[index]
        if (
          element.valueType &&
          element.valueType === 'select' &&
          element.optionMth
        ) {
          element.option = []
          initOption(element)
        }
      }
      initRules()
      showForm.value = true
    }
    function initOption(element) {
      element.optionMth().then((res) => {
        if (!res) return
        const arr = res.data.map((i) => {
          const obj = {}
          obj.label = i[element.optionskey.label]
          obj.value = i[element.optionskey.value]
          return obj
        })
        element.defaultOption = element.defaultOption
          ? element.defaultOption
          : []
        element.option = element.defaultOption.concat(arr)
      })
    }
    function initRules() {
      prop.formList.map((i) => {
        if (i.prop) {
          rules[i.dataIndex] = i.prop
        }
      })
    }
    init()

    function resetFormParam() {
      Object.assign(prop.formParam, originalFormParams)
      ProForm.value.resetFields()
    }
    function handleSubmit() {
      ProForm.value.validate((valid) => {
        if (valid) {
          loading.value = true
          prop
            .subMet()
            .then((res) => {
              Message({ message: res.msg, type: 'success' })
              prop.formCB()
              resetFormParam()
            })
            .finally(() => {
              loading.value = false
            })
        }
      })
    }

    return {
      ProForm,
      loading,
      showForm,
      rules,
      handleSubmit,
    }
  },
}
</script>
