<template>
  <div class="app-container">
    <i v-show="back" class="el-icon-back back" @click="backChina" />
    <CardChart
      ref="MapChinaChart"
      title="中国省市区"
      :options="MapChinaChartOptions"
    />
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

import CardChart from './components/CardChart.vue'
import echarts from '@/core/echarts'

import HK from '@/assets/mapJson/HK.json'
import china from '@/assets/mapJson/china.json'

import { dict } from './data'
import { getMapJson } from '@/api/charts'
import { useStore } from 'vuex'

export default {
  name: 'EchartsMap',
  components: {
    CardChart,
  },
  setup() {
    const MapChinaChart = ref()
    const MapChartOptions = ref()
    const MapChinaChartOptions = ref()
    const back = ref(false)

    const center = [104.114129, 35.950339]

    const store = useStore()

    echarts.registerMap('china', china)
    echarts.registerMap('HK', HK)

    function initMapChart() {
      MapChinaChartOptions.value = MapChinaCommonOptions()
      MapChartOptions.value = MapCommonOptions()
    }

    function reSetMap(map, position) {
      back.value = !back.value
      const options = MapChinaCommonOptions()
      options.geo.map = map
      if (map === 'china') {
        options.geo.zoom = 1.2
      } else {
        options.geo.zoom = 1
      }
      options.geo.center = position
      MapChinaChartOptions.value = options
    }

    function registerEvent() {
      const mapChinaInstance = MapChinaChart.value.getInstance()
      mapChinaInstance.on('click', (param) => {
        if (!param.name) return
        const position = mapChinaInstance.convertFromPixel({ geoIndex: 0 }, [
          param.event.offsetX,
          param.event.offsetY,
        ])
        store.dispatch('charts/addCENTER', position)
        if (!dict[param.name]) return
        const map = dict[param.name].toLowerCase()
        if (!map) return
        if (echarts.getMap(map)) {
          reSetMap(map, position)
        } else {
          getMapJson(map).then((res) => {
            if (!res) return
            echarts.registerMap(map, res)
            reSetMap(map, position)
          })
        }
      })
    }

    function backChina() {
      reSetMap('china', center)
      store.dispatch('charts/addCENTER', [])
    }

    onMounted(() => {
      nextTick(() => {
        initMapChart()
        registerEvent()
      })
    })

    return {
      back,
      backChina,
      MapChinaChart,
      MapChartOptions,
      MapChinaChartOptions,
    }
  },
}
</script>
<style lang="scss" scoped>
.app-container {
  position: relative;
  .back {
    position: absolute;
    left: 50px;
    top: 100px;
    font-size: 40px;
    font-weight: bold;
    color: black;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
