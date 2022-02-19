import {
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'
// 图标注册
import { Close } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-infinite-scroll.css'
const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]
const components = [Close]

export const loadPlugins = (app) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
