<template>
  <div class="app-container">
    <el-card>
      <template #header> 香港18区人口密度 （2011） </template>
      <div ref="MapCharts" :style="{ height, width }"></div>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import { useEcharts } from '@/hooks/echarts'
import { MapCommonOptions } from '@/utils/echarts'
import HK from '@/assets/mapJson/HK.json'

export default {
  name: 'EchartsMap',
  setup() {
    const MapCharts = ref()
    const width = '100%'
    const height = window.innerHeight - 225 + 'px'

    const { setOptions: MapChartSetOptions, echarts } = useEcharts(MapCharts)
    echarts.registerMap('HK', HK)

    function initMapChart() {
      const options = MapCommonOptions([
        {
          name: '北京',
          value: 563,
          tipData: [545, 590],
        },
        {
          name: '天津',
          value: 515,
          tipData: [558, 135],
        },
        {
          name: '上海',
          value: 191,
          tipData: [218, 224],
        },
        {
          name: '重庆',
          value: 641,
          tipData: [674, 826],
        },
        {
          name: '河北',
          value: 343,
          tipData: [928, 446],
        },
        {
          name: '河南',
          value: 655,
          tipData: [173, 581],
        },
        {
          name: '云南',
          value: 988,
          tipData: [862, 950],
        },
        {
          name: '辽宁',
          value: 495,
          tipData: [958, 790],
        },
        {
          name: '黑龙江',
          value: 628,
          tipData: [431, 170],
        },
        {
          name: '湖南',
          value: 769,
          tipData: [385, 620],
        },
        {
          name: '安徽',
          value: 47,
          tipData: [206, 17],
        },
        {
          name: '山东',
          value: 36,
          tipData: [481, 880],
        },
        {
          name: '新疆',
          value: 297,
          tipData: [43, 659],
        },
        {
          name: '江苏',
          value: 740,
          tipData: [77, 728],
        },
        {
          name: '浙江',
          value: 318,
          tipData: [443, 594],
        },
        {
          name: '江西',
          value: 492,
          tipData: [176, 494],
        },
        {
          name: '湖北',
          value: 511,
          tipData: [275, 618],
        },
        {
          name: '广西',
          value: 311,
          tipData: [196, 790],
        },
        {
          name: '甘肃',
          value: 538,
          tipData: [952, 977],
        },
        {
          name: '山西',
          value: 749,
          tipData: [241, 8],
        },
        {
          name: '内蒙古',
          value: 636,
          tipData: [517, 231],
        },
        {
          name: '陕西',
          value: 712,
          tipData: [696, 743],
        },
        {
          name: '吉林',
          value: 126,
          tipData: [317, 855],
        },
        {
          name: '福建',
          value: 559,
          tipData: [235, 936],
        },
        {
          name: '贵州',
          value: 445,
          tipData: [828, 493],
        },
        {
          name: '广东',
          value: 660,
          tipData: [648, 971],
        },
        {
          name: '青海',
          value: 801,
          tipData: [538, 342],
        },
        {
          name: '西藏',
          value: 717,
          tipData: [539, 981],
        },
        {
          name: '四川',
          value: 67,
          tipData: [691, 674],
        },
        {
          name: '宁夏',
          value: 252,
          tipData: [662, 125],
        },
        {
          name: '海南',
          value: 695,
          tipData: [46, 634],
        },
        {
          name: '台湾',
          value: 189,
          tipData: [306, 500],
        },
        {
          name: '香港',
          value: 561,
          tipData: [716, 377],
        },
        {
          name: '澳门',
          value: 922,
          tipData: [638, 839],
        },
      ])
      MapChartSetOptions(options)
    }

    onMounted(() => {
      nextTick(() => {
        initMapChart()
      })
    })

    return {
      MapCharts,
      width,
      height,
    }
  },
}
</script>
