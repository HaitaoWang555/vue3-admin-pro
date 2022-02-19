import { createApp } from 'vue'

import App from '@/App.vue'
// style
// import 'tailwindcss/tailwind.css' // tailwind
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // global css

// import bootstrap from './core/bootstrap'

// use lazy load element-plus
import { loadPlugins } from '@/core/lazy_use'
// use components
import loadComponents from '@/core/use'
// globalProperties
import globalProperties from '@/core/globalProperties'
// icon
import(/* webpackChunkName: "icon" */ '@/icons')
// vue router
import router from '@/router'
// vue vuex
import store from '@/store'

import '@/permission' // permission control

import * as directive from '@/directive' // global directive

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App)

loadPlugins(app)
loadComponents(app)
globalProperties(app)

// register global directive
Object.keys(directive).forEach((key) => {
  directive[key].install(app)
})

// element-plus config
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

app.use(router).use(store).mount('#app')
