<!-- eslint-disable vue/no-mutating-props -->
<!-- 搜索条件 -->
<template>
  <div id="search-form-wrap" class="table-page-search-wrapper">
    <el-form
      v-if="searchList"
      :model="queryParam"
      class="search-form"
      :inline="true"
    >
      <slot name="header"> </slot>
      <div
        v-for="(item, index) in searchList"
        v-show="index < 3 || advanced"
        :key="index"
        class="form-item"
      >
        <el-form-item :label="item.title + ' : '">
          <el-input
            v-if="item.valueType === 'input'"
            v-model="queryParam[item.dataIndex]"
            :placeholder="item.placeholder || item.title"
            clearable
          />
          <el-date-picker
            v-else-if="item.valueType === 'date-picker'"
            v-model="queryParam[item.dataIndex]"
            :type="item.pickerType"
            style="width: 100%"
            :format="item.pickerFormat"
          />

          <el-select
            v-else-if="item.valueType === 'select'"
            v-model="queryParam[item.dataIndex]"
            :placeholder="item.placeholder || item.title"
            clearable
          >
            <el-option
              v-for="(s, i) in item.option"
              :key="i"
              :label="s.label"
              :value="s.value"
              >{{ s.label }}</el-option
            >
          </el-select>
        </el-form-item>
      </div>

      <div class="form-item">
        <div class="table-page-search-submitButtons">
          <el-button
            type="primary"
            :loading="loading"
            @click="$emit('search', true)"
            >查询</el-button
          >
          <el-button style="margin-left: 8px" @click="resetQueryParam"
            >重置</el-button
          >
          <a
            v-if="searchList.filter((i) => i.isSearch).length > 3"
            style="margin-left: 8px; font-size: 14px"
            @click="toggleAdvanced"
          >
            {{ advanced ? '收起' : '展开' }}
            <i :class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </a>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'SearchForm',
  props: {
    queryParam: {
      type: Object,
      default: () => {
        return {}
      },
    },
    searchList: {
      type: Array,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['search'],
  setup(prop) {
    // 高级搜索 展开/关闭
    const advanced = ref(false)

    function init() {
      for (let index = 0; index < prop.searchList.length; index++) {
        const element = prop.searchList[index]
        if (
          element.valueType &&
          element.valueType === 'select' &&
          element.optionMth
        ) {
          if (element.option.length === 0) {
            initOption(element)
          }
        }
      }
    }
    function initOption(element) {
      element.optionMth().then((res) => {
        if (!res) return
        element.option = res.data.map((i) => {
          const obj = {}
          obj.label = i[element.optionskey.label]
          obj.value = i[element.optionskey.value]
          return obj
        })
        // element.option.unshift({
        //   label: '全部',
        //   value: '',
        // })
      })
    }

    function toggleAdvanced() {
      advanced.value = !advanced.value
    }

    function resetQueryParam() {
      for (const key in prop.queryParam) {
        let value = prop.queryParam[key]
        if (value instanceof Array) {
          value = []
        } else {
          value = ''
        }
      }
    }

    init()

    return {
      advanced,
      toggleAdvanced,
      resetQueryParam,
    }
  },
}
</script>
<style lang="scss" scoped>
// 数据列表 搜索条件
.table-page-search-wrapper {
  position: relative;
  .search-form {
    padding-right: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    .form-item {
      margin-right: 20px;
      .table-page-search-submitButtons {
        margin-bottom: 18px;
      }
    }
  }
}
</style>
