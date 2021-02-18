import { onMounted, computed, onBeforeMount, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export function useResizeHandler() {
  const store = useStore()
  const route = useRoute()

  const sidebar = computed(() => store.state.app.sidebar)
  const device = computed(() => store.state.app.device)

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  function $_isMobile() {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  function $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    }
  }

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  watch(
    () => route.path,
    () => {
      if (device.value === 'mobile' && sidebar.value.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  )
}
