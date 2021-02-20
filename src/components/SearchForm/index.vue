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
        v-show="index < 2 || advanced"
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
          <el-button type="primary" @click="search(true)">查询</el-button>
          <el-button style="margin-left: 8px" @click="resetQueryParam"
            >重置</el-button
          >
          <a
            v-if="searchList.filter((i) => i.isSearch).length > 2"
            style="margin-left: 8px; font-size: 14px"
            @click="toggleAdvanced"
          >
            {{ advanced ? '收起' : '展开' }}
            <i :class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
          </a>
        </div>
      </div>
    </el-form>
    <span class="fullscreen" @click="fullscreen">
      <i class="el-icon-full-screen" style="font-size: 22px" />
    </span>
  </div>
</template>

<script>
import { getScrollBarWidth } from '@/utils'
import { toggleClass, hasClass } from '@/utils'
import { ref } from 'vue'
const scrollBarWidth = getScrollBarWidth()
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
    search: {
      type: Function,
      default: () => {},
    },
  },
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
    function resetQueryParam() {
      for (const key in prop.queryParam) {
        if (key !== 'searchMet') {
          // eslint-disable-next-line vue/no-mutating-props
          prop.queryParam[key] = ''
        }
      }
    }

    init()

    return {
      advanced,
      toggleAdvanced,
      fullscreen,
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
  .fullscreen {
    line-height: 51px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 15px;
    cursor: pointer;
  }
  .fullscreen:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
