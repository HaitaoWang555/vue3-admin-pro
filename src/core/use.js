// use components
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
import ProDialog from '@/components/ProDialog/index.vue'

export default (app) => {
  app.component('SvgIcon', SvgIcon)
  app.component('ProDialog', ProDialog)
}
