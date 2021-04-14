import echarts from '@/core/echarts'
import { unref, nextTick, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils'

export function useEcharts(elRef) {
  let mychart

  function init() {
    if (!elRef) return
    const el = unref(elRef)
    mychart = echarts.init(el)
  }

  function setOptions(options) {
    if (!mychart) return
    mychart.setOption(options)
  }

  function resize() {
    mychart && mychart.resize()
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
  }
}
