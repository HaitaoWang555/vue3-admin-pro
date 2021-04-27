// use components
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
import ProDialog from '@/components/ProDialog/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'

export default (app) => {
  app.component('SvgIcon', SvgIcon)
  app.component('ProDialog', ProDialog)
  app.component('ProTable', ProTable)
  app.component('ProForm', ProForm)
}
