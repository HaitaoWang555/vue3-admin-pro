<template>
  <el-card
    v-fullscreen:top="18"
    v-fullscreen:big="fullscreenBig"
    v-fullscreen:normal="fullscreenNormal"
    class="CardChart"
  >
    <template #header> {{ title }} </template>
    <div :style="{ height, width }">
      <div ref="Charts" style="width: 100%; height: 100%"></div>
    </div>
  </el-card>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useEcharts } from '@/hooks/echarts'

export default {
  name: 'CardChart',
  props: {
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const Charts = ref()

    const width = '100%'
    const height = ref(window.innerHeight - 180 + 'px')

    const {
      setOptions: chartSetOptions,
      resize,
      getInstance,
    } = useEcharts(Charts)

    watchEffect(() => {
      if (Object.keys(props.options).length > 0) {
        chartSetOptions(props.options)
      }
    })

    function fullscreenBig() {
      height.value = window.innerHeight - 58 + 'px'
      resize({ height: height.value })
    }
    function fullscreenNormal() {
      height.value = window.innerHeight - 185 + 'px'
      resize({ height: height.value })
    }

    return {
      Charts,
      getInstance,
      width,
      height,
      fullscreenBig,
      fullscreenNormal,
    }
  },
}
</script>
