<template>
  <div class="app-container">
    <el-form
      :model="formParam"
      :label-position="'right'"
      :label-width="'145px'"
    >
      <el-form-item label="字段key">
        <el-input v-model="formParam.dataIndex"></el-input>
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input v-model="formParam.title"></el-input>
      </el-form-item>
      <el-form-item label="是否为列表">
        <el-checkbox v-model="formParam.isTable"></el-checkbox>
      </el-form-item>
      <el-form-item v-if="formParam.isTable" label="列表宽度">
        <el-input v-model="formParam.width"></el-input>
      </el-form-item>
      <el-form-item v-if="formParam.isTable" label="列表最小宽度">
        <el-input v-model="formParam.minWidth"></el-input>
      </el-form-item>
      <el-form-item v-if="formParam.isTable" label="列表对齐方式">
        <el-select v-model="formParam.align" style="width: 100%">
          <el-option label="center" value="center"></el-option>
          <el-option label="left" value="left"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否查询">
        <el-checkbox v-model="formParam.isSearch"></el-checkbox>
      </el-form-item>
      <el-form-item label="是否表单">
        <el-checkbox v-model="formParam.isForm"></el-checkbox>
      </el-form-item>
      <el-form-item
        v-if="formParam.isSearch || formParam.isForm"
        :label="formParam.isSearch ? '查询控件' : '表单控件'"
      >
        <el-select v-model="formParam.valueType" style="width: 100%">
          <el-option label="input" value="input"></el-option>
          <el-option label="check_code" value="check_code"></el-option>
          <el-option label="switch" value="switch"></el-option>
          <el-option label="select" value="select"></el-option>
          <el-option label="checkbox" value="checkbox"></el-option>
          <el-option label="radio" value="radio"></el-option>
          <el-option label="date-picker" value="date-picker"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formParam.isForm" label="Form prop">
        <el-input v-model="formParam.prop" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item
        v-if="formParam.isSearch && formParam.valueType === 'input'"
        label="input type"
      >
        <el-input v-model="formParam.inpuType"> </el-input>
      </el-form-item>
      <el-form-item
        v-if="
          (formParam.isSearch || formParam.isForm) &&
          formParam.valueType === 'select'
        "
        label="select option"
      >
        <el-input v-model="formParam.option" type="textarea"> </el-input>
      </el-form-item>
      <el-form-item
        v-if="
          (formParam.isSearch || formParam.isForm) &&
          formParam.valueType === 'select'
        "
        label="select optionMth"
      >
        <el-input v-model="formParam.optionMth"> </el-input>
      </el-form-item>
      <el-form-item
        v-if="
          (formParam.isSearch || formParam.isForm) &&
          formParam.valueType === 'select'
        "
        label="select optionskey"
      >
        <el-input v-model="formParam.optionskey" type="textarea"> </el-input>
      </el-form-item>
      <template v-if="formParam.isSearch || formParam.isForm">
        <el-form-item label="控件响应布局 span">
          <el-input v-model="formParam.span"> </el-input>
        </el-form-item>
        <el-form-item label="控件响应布局 xs">
          <el-input v-model="formParam.xs"> </el-input>
        </el-form-item>
        <el-form-item label="控件响应布局 sm">
          <el-input v-model="formParam.sm"> </el-input>
        </el-form-item>
        <el-form-item label="控件响应布局 md">
          <el-input v-model="formParam.md"> </el-input>
        </el-form-item>
        <el-form-item label="控件响应布局 lg">
          <el-input v-model="formParam.lg"> </el-input>
        </el-form-item>
        <el-form-item label="控件响应布局 xl">
          <el-input v-model="formParam.xl"> </el-input>
        </el-form-item>
      </template>

      <el-form-item
        label-width="0"
        style="margin-top: 24px; text-align: center"
      >
        <el-button size="large" type="primary" @click="handleSubmit"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRaw } from 'vue'
export default {
  name: 'CreateList',
  setup() {
    const formParam = reactive({
      dataIndex: '',
      title: '',
      isTable: true,
      width: null,
      minWidth: null,
      align: 'center',
      isSearch: false,
      isForm: false,
      prop: '',
      valueType: '',
      inpuType: '',
      option: '',
      optionMth: '',
      optionskey: '',
      span: null,
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
    })

    function handleSubmit() {
      const data = Object.assign({}, toRaw(formParam))
      if (data.prop) {
        data.prop = Function('"use strict";return (' + data.prop + ')')()
      }
      if (data.option) {
        data.option = Function('"use strict";return (' + data.option + ')')()
      }
      console.log(data)
    }
    return {
      handleSubmit,
      formParam,
    }
  },
}
</script>
