<template>
  <div class="app-container">
    <CardChart title="中国省市区" :options="MapChinaChartOptions" />
    <CardChart
      style="margin-top: 20px"
      title="香港18区人口密度 （2011）"
      :options="MapChartOptions"
    />
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue'
import { MapCommonOptions, MapChinaCommonOptions } from '@/utils/echarts'

import CardChart from './components/CardChart'
import echarts from '@/core/echarts'

import HK from '@/assets/mapJson/HK.json'
import china from '@/assets/mapJson/china.json'

export default {
  name: 'EchartsMap',
  components: {
    CardChart,
  },
  setup() {
    const MapChartOptions = ref()
    const MapChinaChartOptions = ref()

    echarts.registerMap('CN', china)
    echarts.registerMap('HK', HK)

    function initMapChart() {
      MapChinaChartOptions.value = MapChinaCommonOptions()
      MapChartOptions.value = MapCommonOptions()
    }

    onMounted(() => {
      nextTick(() => {
        initMapChart()
      })
    })

    return {
      MapChartOptions,
      MapChinaChartOptions,
    }
  },
}
</script>
