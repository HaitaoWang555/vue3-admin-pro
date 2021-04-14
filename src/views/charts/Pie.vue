<template>
  <div class="app-container">
    <el-card>
      <template #header> 某站点用户访问来源 </template>
      <div ref="PieCharts" :style="{ height, width }"></div>
    </el-card>
    <el-card style="margin-top: 20px">
      <template #header> 基础南丁格尔玫瑰图 </template>
      <div ref="PieRoseTypeCharts" :style="{ height, width }"></div>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getPieList } from '@/api/charts'
import { useEcharts } from '@/hooks/echarts'
import { PieCommonOptions } from '@/utils/echarts'

export default {
  name: 'EchartsPie',
  setup() {
    const PieCharts = ref()
    const PieRoseTypeCharts = ref()
    const width = '100%'
    const height = window.innerHeight - 84 + 'px'

    const { setOptions: PieChartSetOptions } = useEcharts(PieCharts)
    const { setOptions: PieRoseTypeChartSetOptions } = useEcharts(
      PieRoseTypeCharts
    )

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
      const options = PieCommonOptions(data)
      PieChartSetOptions(options)
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
      PieRoseTypeChartSetOptions(options)
    }

    function getList() {
      getPieList().then((res) => {
        initPieChart(res)
        initPieRoseTypeCharts(res)
      })
    }

    getList()

    return {
      width,
      height,
      PieCharts,
      PieRoseTypeCharts,
    }
  },
}
</script>
