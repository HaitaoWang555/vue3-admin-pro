<template>
  <div class="app-container">
    <CardChart title="基础平滑折线图" :options="LineChartOptions" />
    <CardChart
      style="margin-top: 20px"
      title="折线图堆叠"
      :options="LineStackDataChartOptions"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { getLineList, getLineStackList } from '@/api/charts'
import { lineCommonOptions } from '@/utils/echarts'

import CardChart from './components/CardChart.vue'

export default {
  name: 'EchartsLine',
  components: {
    CardChart,
  },
  setup() {
    let LineChartOptions = ref()
    let LineStackDataChartOptions = ref()

    function initLineChart(res) {
      LineChartOptions.value = lineCommonOptions(res.data.xData, [
        res.data.yData,
      ])
    }
    function initLineStackChart(res) {
      const legend = [
        '邮件营销',
        '联盟广告',
        '视频广告',
        '直接访问',
        '搜索引擎',
      ]
      const data = [
        res.data.yData.data1,
        res.data.yData.data2,
        res.data.yData.data3,
        res.data.yData.data4,
        res.data.yData.data5,
      ]
      LineStackDataChartOptions.value = lineCommonOptions(
        res.data.xData,
        data,
        legend
      )
    }

    function getList() {
      getLineList().then((res) => {
        initLineChart(res)
      })
      getLineStackList().then((res) => {
        initLineStackChart(res)
      })
    }

    getList()

    return {
      LineChartOptions,
      LineStackDataChartOptions,
    }
  },
}
</script>
