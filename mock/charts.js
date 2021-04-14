const Mock = require('mockjs')

const data = {
  xData: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  yData: [],
}

const stackData = {
  xData: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  yData: {
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
    data6: [],
    data7: [],
    data8: [],
    data9: [],
  },
}

for (let index = 0; index < 12; index++) {
  data.yData.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data1.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data2.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data3.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data4.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data5.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data6.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data7.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data8.push(Mock.mock('@integer(300, 5000)'))
  stackData.yData.data9.push(Mock.mock('@integer(300, 5000)'))
}

module.exports = [
  {
    url: '/vue3-admin-pro/charts/common',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data,
      }
    },
  },
  {
    url: '/vue3-admin-pro/charts/stack',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: stackData,
      }
    },
  },
]
