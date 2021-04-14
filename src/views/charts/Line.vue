<template>
  <div class="app-container">
    <el-card>
      <template #header> 基础平滑折线图 </template>
      <div ref="LineCharts" :style="{ height, width }"></div>
    </el-card>
    <el-card style="margin-top: 20px">
      <template #header> 折线图堆叠 </template>
      <div ref="LineStackDataCharts" :style="{ height, width }"></div>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getLineList, getLineStackList } from '@/api/charts'
import { useEcharts } from '@/hooks/echarts'
import { lineCommonOptions } from '@/utils/echarts'

export default {
  name: 'EchartsLine',
  setup() {
    const LineCharts = ref()
    const LineStackDataCharts = ref()
    const width = '100%'
    const height = window.innerHeight - 84 + 'px'

    const { setOptions: LineChartSetOptions } = useEcharts(LineCharts)
    const { setOptions: LineStackDataChartSetOptions } = useEcharts(
      LineStackDataCharts
    )

    function initLineChart(res) {
      const options = lineCommonOptions(res.data.xData, [res.data.yData])
      LineChartSetOptions(options)
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
      const options = lineCommonOptions(res.data.xData, data, legend)
      LineStackDataChartSetOptions(options)
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
      width,
      height,
      LineCharts,
      LineStackDataCharts,
    }
  },
}
</script>
