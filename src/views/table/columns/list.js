import { getStatus } from '@/api/article'

const columnList = [
  {
    dataIndex: 'id',
    width: 80,
    title: 'ID',
    sortable: 'custom',
  },
  {
    dataIndex: 'timestamp',
    width: 180,
    title: 'Date',
    scopedSlots: { customRender: 'date' },
    valueType: 'date-picker',
    pickerType: 'date',
    pickerFormat: 'YYYY-MM-DD HH-mm-ss',
    isSearch: true,
    isForm: true,
    prop: [
      {
        type: 'date',
        required: true,
        message: 'timestamp is required',
        trigger: 'change',
      },
    ],
  },
  {
    dataIndex: 'title',
    width: null,
    minWidth: 450,
    align: 'left',
    title: 'Title',
    scopedSlots: { customRender: 'title' },
    valueType: 'input',
    isSearch: true,
    isForm: true,
    prop: [{ required: true, message: 'title is required', trigger: 'blur' }],
  },
  {
    dataIndex: 'author',
    width: 120,
    title: 'Author',
  },
  {
    dataIndex: 'reviewer',
    width: 120,
    title: 'Reviewer',
  },
  {
    dataIndex: 'importance',
    width: 100,
    title: 'Imp',
    scopedSlots: { customRender: 'importance' },
    valueType: 'select',
    option: [
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
    ],
    isSearch: true,
  },
  {
    dataIndex: 'status',
    width: 110,
    title: 'Status',
    scopedSlots: { customRender: 'status' },
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
  },
  {
    dataIndex: 'pageviews',
    width: 100,
    title: 'Readings',
  },
  {
    dataIndex: 'type',
    width: 110,
    title: 'Type',
    valueType: 'select',
    option: [],
    optionMth: getStatus,
    optionskey: {
      label: 'display_name',
      value: 'key',
    },
    isSearch: true,
    noTable: true,
    isForm: true,
    prop: [{ required: true, message: 'type is required', trigger: 'change' }],
  },
  {
    dataIndex: 'remark',
    title: 'Remark',
    valueType: 'input',
    inpuType: 'textarea',
    noTable: true,
    isForm: true,
  },
  {
    dataIndex: 'actions',
    fixed: 'right',
    width: 230,
    title: 'Actions',
    scopedSlots: { customRender: 'actions' },
  },
]

export { columnList }
