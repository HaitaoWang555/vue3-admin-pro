<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <Settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Navbar, Sidebar, AppMain, Settings, TagsView } from './components'
import RightPanel from '@/components/RightPanel/index.vue'
import { useResizeHandler } from './mixin/ResizeHandler'
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    RightPanel,
    Settings,
    TagsView,
  },
  setup() {
    useResizeHandler()
    const store = useStore()

    const sidebar = computed(() => store.state.app.sidebar)
    const device = computed(() => store.state.app.device)
    const fixedHeader = computed(() => store.state.settings.fixedHeader)
    const showSettings = computed(() => store.state.settings.showSettings)
    const needTagsView = computed(() => store.state.settings.tagsView)
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile',
      }
    })

    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }

    return {
      sidebar,
      device,
      fixedHeader,
      classObj,
      handleClickOutside,
      showSettings,
      needTagsView,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
