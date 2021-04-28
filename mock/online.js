const Mock = require('mockjs')

const List = []
const count = 100
const columnList = [
  {
    dataIndex: 'id',
    width: 80,
    title: 'ID',
  },
  {
    dataIndex: 'title',
    width: null,
    minWidth: 450,
    align: 'left',
    title: '模板描述',
  },
  {
    dataIndex: 'status',
    width: 180,
    title: '状态',
    scopedSlots: {
      customRender: 'status',
      dict: 'statusMap',
    },
  },
  {
    dataIndex: 'create_by',
    width: 120,
    title: '创建人',
  },
  {
    dataIndex: 'create_time',
    width: 180,
    title: '创建时间',
    scopedSlots: { customRender: 'date' },
    valueType: 'date-picker',
    pickerType: 'date',
    pickerFormat: 'YYYY-MM-DD HH-mm-ss',
  },
]
module.exports = [
  {
    url: '/vue3-admin-pro/online/options',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        msg: 'success',
        data: {
          columns: columnList,
          searchParams: {
            title: '',
            status: '',
          },
          listUrl: '/vue3-admin-pro/online/list',
          showIndex: true,
        },
      }
    },
  },
  {
    url: '/vue3-admin-pro/online/list',
    type: 'get',
    response: (config) => {
      const MockObj = {}
      const { columns, page = 1, pageSize = 20 } = config.query
      const arr = columns ? JSON.parse(columns) : []

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.scopedSlots && item.scopedSlots.customRender === 'date') {
          MockObj[item.dataIndex] = +Mock.Random.date('T')
        } else if (
          item.scopedSlots &&
          item.scopedSlots.customRender === 'status'
        ) {
          MockObj['status|1'] = ['published', 'draft']
        } else if (item.width && item.width < 200) {
          MockObj[item.dataIndex] = '@increment'
        } else {
          MockObj[item.dataIndex] = '@title(5, 10)'
        }
      }
      console.log(MockObj)
      for (let i = 0; i < count; i++) {
        List.push(Mock.mock(MockObj))
      }
      const pageList = List.filter(
        (item, index) =>
          index < pageSize * page && index >= pageSize * (page - 1)
      )
      return {
        code: 20000,
        msg: 'success',
        data: {
          total: count,
          items: pageList,
        },
      }
    },
  },
]
