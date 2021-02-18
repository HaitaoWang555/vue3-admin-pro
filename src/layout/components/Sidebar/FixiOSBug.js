import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export function useFixBug() {
  const store = useStore()
  const device = computed(() => store.state.app.device)

  const subMenu = ref(null)

  function fixBugIniOS() {
    if (subMenu.value) {
      const handleMouseleave = subMenu.value.handleMouseleave
      subMenu.value.handleMouseleave = (e) => {
        if (device.value === 'mobile') {
          return
        }
        handleMouseleave(e)
      }
    }
  }

  onMounted(() => {
    fixBugIniOS()
  })

  return {
    subMenu,
  }
}
