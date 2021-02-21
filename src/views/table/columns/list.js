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
    pickerFormat: 'YYYY-MM-DD',
    isSearch: true,
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
    dataIndex: 'pageviews',
    width: 100,
    title: 'Readings',
  },
  {
    dataIndex: 'status',
    width: 110,
    title: 'Status',
    fixed: 'right',
    scopedSlots: { customRender: 'status' },
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
