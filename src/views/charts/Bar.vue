<template>
  <div class="app-container">
    <el-card>
      <template #header> 坐标轴刻度与标签对齐 </template>
      <div ref="BarCharts" :style="{ height, width }"></div>
    </el-card>
    <el-card style="margin-top: 20px">
      <template #header> 堆叠柱状图 </template>
      <div ref="BarStackDataCharts" :style="{ height, width }"></div>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getBarList, getBarStackList } from '@/api/charts'
import { useEcharts } from '@/hooks/echarts'
import { BarCommonOptions } from '@/utils/echarts'

export default {
  name: 'EchartsBar',
  setup() {
    const BarCharts = ref()
    const BarStackDataCharts = ref()
    const width = '100%'
    const height = window.innerHeight - 84 + 'px'

    const { setOptions: BarChartSetOptions } = useEcharts(BarCharts)
    const { setOptions: BarStackDataChartSetOptions } = useEcharts(
      BarStackDataCharts
    )

    function initBarChart(res) {
      const options = BarCommonOptions(res.data.xData, [res.data.yData])
      BarChartSetOptions(options)
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
      const options = BarCommonOptions(res.data.xData, data, legend)
      options.series.forEach((item, index) => {
        if ([1, 2, 3].includes(index)) {
          item.stack = '广告'
        }
        if ([5, 6, 7, 8].includes(index)) {
          item.stack = '搜索引擎'
        }
      })
      BarStackDataChartSetOptions(options)
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
      width,
      height,
      BarCharts,
      BarStackDataCharts,
    }
  },
}
</script>
