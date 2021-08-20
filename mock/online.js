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
    valueType: 'input',
    isSearch: true,
    isForm: true,
    prop: [{ required: true, message: '请填写模板描述', trigger: 'blur' }],
  },
  {
    dataIndex: 'status',
    width: 180,
    title: '状态',
    scopedSlots: {
      customRender: 'status',
      dict: 'statusMap',
    },
    isSearch: true,
    valueType: 'select',
    option: [
      {
        label: 'published',
        value: 'published',
      },
      {
        label: 'draft',
        value: 'draft',
      },
      {
        label: 'deleted',
        value: 'deleted',
      },
    ],
    isForm: true,
    prop: [
      {
        required: true,
        message: '请选择发布状态',
        trigger: 'change',
      },
    ],
  },
  {
    dataIndex: 'remark',
    title: '备注',
    width: null,
    minWidth: 400,
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
    attrs: {
      type: 'date',
      format: 'YYYY-MM-DD HH-mm-ss',
      'start-placeholder': '请选择时间',
    },
    isSearch: true,
    isForm: true,
    prop: [
      {
        type: 'date',
        required: true,
        message: '请选择时间',
        trigger: 'change',
      },
    ],
  },
]
const actions = [
  {
    label: '添加',
    type: 'primary',
    icon: 'el-icon-plus',
    value: 'add',
    url: '/vue3-admin-pro/online/add',
  },
  {
    label: '修改',
    type: 'success',
    icon: 'el-icon-edit',
    value: 'edit',
    otherParams: {
      id: '',
    },
    url: '/vue3-admin-pro/online/edit',
  },
  {
    label: '批量删除',
    type: 'danger',
    icon: 'el-icon-delete',
    value: 'delete',
    otherParams: {
      ids: '',
    },
    needSelect: true,
    twoStepVerification: '确定要删除么？',
    url: '/vue3-admin-pro/online/delete',
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
          listUrl: '/vue3-admin-pro/online/list',
          showIndex: true,
          showSelection: true,
          actions,
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
          MockObj[item.dataIndex] = Mock.Random.date('yyyy-MM-dd HH:mm:ss')
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
  {
    url: '/vue3-admin-pro/online/add',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        msg: 'add success',
      }
    },
  },
  {
    url: '/vue3-admin-pro/online/edit',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        msg: 'edit success',
      }
    },
  },
  {
    url: '/vue3-admin-pro/online/delete',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        msg: 'delete success',
      }
    },
  },
]
