import { parseTime } from '@/utils'

export default (app) => {
  // filters
  app.config.globalProperties.$filters = {
    parseTime(value) {
      return parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
    },
  }
}
