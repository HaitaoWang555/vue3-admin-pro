const list = [
  {
    dataIndex: 'name',
    title: '仓库名',
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'input',
  },
  {
    dataIndex: 'url',
    title: '仓库域名',
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'input',
  },
  {
    dataIndex: 'owner',
    title: '仓库管理员',
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'approver',
    title: '审批人',
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'dateRange',
    title: '生效日期',
    valueType: 'date-picker',
    attrs: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      'start-placeholder': '请选择开始日期',
      'end-placeholder': '请选择结束日期',
    },
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
  },
  {
    dataIndex: 'type',
    title: '仓库类型',
    isForm: true,
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'select',
    option: [
      {
        label: '私密',
        value: 'private',
      },
      {
        label: '公开',
        value: 'public',
      },
    ],
  },
  {
    dataIndex: 'roterText',
    isForm: true,
    form_slot: 'roterText',
    row: 0,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
  },
  {
    dataIndex: 'name2',
    title: '任务名',
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'input',
  },
  {
    dataIndex: 'url2',
    title: '任务描述',
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'input',
  },
  {
    dataIndex: 'owner2',
    title: '执行人',
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'approver2',
    title: '责任人',
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'select',
    option: [
      {
        label: '付晓晓',
        value: 'xiao',
      },
      {
        label: '周毛毛',
        value: 'mao',
      },
    ],
  },
  {
    dataIndex: 'dateRange2',
    title: '生效日期',
    valueType: 'date-picker',
    attrs: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      'start-placeholder': '请选择开始日期',
      'end-placeholder': '请选择结束日期',
    },
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
  },
  {
    dataIndex: 'type2',
    title: '任务类型',
    isForm: true,
    row: 1,
    span: 8,
    xl: 6,
    form_span: 8,
    form_xl: 6,
    valueType: 'select',
    option: [
      {
        label: '私密',
        value: 'private',
      },
      {
        label: '公开',
        value: 'public',
      },
    ],
  },
]

export { list }
