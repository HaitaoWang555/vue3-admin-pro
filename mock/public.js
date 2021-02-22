const Mock = require('mockjs')

const data = Mock.mock('@integer(999, 9999)')
const code = Mock.mock('@pick([20000, 0])')

module.exports = [
  {
    url: '/vue3-admin-pro/public/sendSms',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        msg: 'success',
        data,
      }
    },
  },
  // submit
  {
    url: '/vue3-admin-pro/public/submit',
    type: 'post',
    response: () => {
      return {
        code: code,
        msg: code ? 'success' : 'fail',
      }
    },
  },
]
