import echarts from '@/core/echarts'
import { unref, nextTick, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils'
import { useStore } from 'vuex'

export function useEcharts(elRef) {
  let mychart
  let voptions

  const store = useStore()

  function init() {
    if (!elRef) return
    const el = unref(elRef)
    mychart = echarts.init(el)
  }

  function setOptions(options) {
    if (!mychart) return
    voptions = options
    mychart.setOption(options)
  }

  function resize(obj) {
    mychart && mychart.resize(obj)
    if (voptions.geo && voptions.geo.roam) {
      const center = store.state.charts.center
      if (center && center.length > 0) {
        voptions.geo.center = center
      } else {
        voptions.geo.center = [104.114129, 35.950339]
      }
      mychart.setOption(voptions)
    }
  }

  function getInstance() {
    return mychart
  }

  // sidebar resize
  let $_sidebarElm = null
  let $_resizeHandler = null

  function $_sidebarResizeHandler(e) {
    if (e.propertyName === 'width') {
      $_resizeHandler()
    }
  }
  function initListener() {
    $_resizeHandler = debounce(() => {
      resize()
    }, 100)
    window.addEventListener('resize', $_resizeHandler)

    $_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    $_sidebarElm &&
      $_sidebarElm.addEventListener('transitionend', $_sidebarResizeHandler)
  }
  function destroyListener() {
    window.removeEventListener('resize', $_resizeHandler)
    $_resizeHandler = null

    $_sidebarElm &&
      $_sidebarElm.removeEventListener('transitionend', $_sidebarResizeHandler)
  }

  onMounted(() => {
    nextTick(() => {
      init()
      initListener()
    })
  })

  onUnmounted(() => {
    mychart.dispose()
    mychart = null
    destroyListener()
  })

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
