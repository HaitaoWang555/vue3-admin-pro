import { getStatus } from '@/api/article'

const columnList = [
  {
    dataIndex: 'id',
    width: 80,
    title: 'ID',
  },
  {
    dataIndex: 'timestamp',
    width: 150,
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
    minWidth: 150,
    align: 'left',
    title: 'Title',
    scopedSlots: { customRender: 'title' },
    valueType: 'input',
    isSearch: true,
  },
  {
    dataIndex: 'author',
    width: 110,
    title: 'Author',
  },
  {
    dataIndex: 'reviewer',
    width: 110,
    title: 'Reviewer',
  },
  {
    dataIndex: 'importance',
    width: 80,
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
    width: 95,
    title: 'Readings',
  },
  {
    dataIndex: 'status',
    width: 100,
    title: 'Status',
    scopedSlots: { customRender: 'status' },
  },
  {
    dataIndex: 'type',
    width: 100,
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
    width: 230,
    title: 'Actions',
    scopedSlots: { customRender: 'actions' },
  },
]

export { columnList }
