<template>
  <div class="app-container">
    <CardChart title="某站点用户访问来源" :options="PieChartOptions" />
    <CardChart
      style="margin-top: 20px"
      title="基础南丁格尔玫瑰图"
      :options="PieRoseTypeChartOptions"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { getPieList } from '@/api/charts'
import { PieCommonOptions } from '@/utils/echarts'
import CardChart from './components/CardChart'

export default {
  name: 'EchartsPie',
  components: {
    CardChart,
  },
  setup() {
    const PieChartOptions = ref()
    const PieRoseTypeChartOptions = ref()

    function initPieChart(res) {
      const legend = [
        '邮件营销',
        '联盟广告',
        '视频广告',
        '直接访问',
        '搜索引擎',
      ]
      const data = []
      legend.forEach((item, index) => {
        data.push({
          value: res.data.yData[index],
          name: item,
        })
      })
      PieChartOptions.value = PieCommonOptions(data)
    }
    function initPieRoseTypeCharts(res) {
      const legend = [
        'rose 1',
        'rose 2',
        'rose 3',
        'rose 4',
        'rose 5',
        'rose 6',
        'rose 7',
        'rose 8',
        'rose 9',
      ]
      const data = []
      legend.forEach((item, index) => {
        data.push({
          value: res.data.yData[index],
          name: item,
        })
      })
      const options = PieCommonOptions(data)
      options.series.roseType = 'area'
      PieRoseTypeChartOptions.value = options
    }

    function getList() {
      getPieList().then((res) => {
        initPieChart(res)
        initPieRoseTypeCharts(res)
      })
    }

    getList()

    return {
      PieChartOptions,
      PieRoseTypeChartOptions,
    }
  },
}
</script>
