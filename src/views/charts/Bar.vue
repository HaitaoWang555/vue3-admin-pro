<template>
  <div class="app-container">
    <CardChart title="坐标轴刻度与标签对齐" :options="BarChartSetOptions" />
    <CardChart
      style="margin-top: 20px"
      title="堆叠柱状图"
      :options="BarStackDataChartSetOptions"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { getBarList, getBarStackList } from '@/api/charts'
import { BarCommonOptions } from '@/utils/echarts'

import CardChart from './components/CardChart.vue'

export default {
  name: 'EchartsBar',
  components: { CardChart },
  setup() {
    const BarChartSetOptions = ref()
    const BarStackDataChartSetOptions = ref()

    function initBarChart(res) {
      BarChartSetOptions.value = BarCommonOptions(res.data.xData, [
        res.data.yData,
      ])
    }
    function initBarStackChart(res) {
      const legend = [
        '直接访问',
        '邮件营销',
        '联盟广告',
        '视频广告',
        '搜索引擎',
        '百度',
        '谷歌',
        '必应',
        '其他',
      ]
      const data = [
        res.data.yData.data1,
        res.data.yData.data2,
        res.data.yData.data3,
        res.data.yData.data4,
        res.data.yData.data5,
        res.data.yData.data6,
        res.data.yData.data7,
        res.data.yData.data8,
        res.data.yData.data9,
      ]
      BarStackDataChartSetOptions.value = BarCommonOptions(
        res.data.xData,
        data,
        legend
      )
      BarStackDataChartSetOptions.value.series.forEach((item, index) => {
        if ([1, 2, 3].includes(index)) {
          item.stack = '广告'
        }
        if ([5, 6, 7, 8].includes(index)) {
          item.stack = '搜索引擎'
        }
      })
    }

    function getList() {
      getBarList().then((res) => {
        initBarChart(res)
      })
      getBarStackList().then((res) => {
        initBarStackChart(res)
      })
    }

    getList()

    return {
      BarChartSetOptions,
      BarStackDataChartSetOptions,
    }
  },
}
</script>
