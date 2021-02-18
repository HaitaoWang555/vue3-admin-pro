import { createApp } from 'vue'

import App from '@/App.vue'
// style
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // global css

// import bootstrap from './core/bootstrap'

// use lazy load element-plus
import loadElementPlus from '@/core/lazy_use'
// use components
import loadComponents from '@/core/use'
// icon
import '@/icons'

// vue router
import router from '@/router'
// vue vuex
import store from '@/store'

import '@/permission' // permission control

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

loadElementPlus(app)
loadComponents(app)

// element-plus config
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

app.use(router).use(store).mount('#app')
