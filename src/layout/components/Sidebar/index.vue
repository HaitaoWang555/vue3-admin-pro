<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variablesV from '@/styles/variables.scss'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Sidebar',
  components: { SidebarItem, Logo },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const sidebar = computed(() => store.getters.sidebar)
    const routes = computed(() => router.options.routes)

    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const variables = computed(() => variablesV)
    const isCollapse = computed(() => !sidebar.value.opened)

    return {
      sidebar,
      routes,
      activeMenu,
      showLogo,
      variables,
      isCollapse,
    }
  },
}
</script>
