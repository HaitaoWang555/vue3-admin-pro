const columnList = [
  {
    dataIndex: 'id',
    width: 80,
    title: 'ID',
  },
  {
    dataIndex: 'timestamp',
    width: 180,
    title: 'Date',
    scopedSlots: { customRender: 'date' },
    valueType: 'date-picker',
    pickerType: 'date',
    pickerFormat: 'YYYY-MM-DD HH-mm-ss',
  },
  {
    dataIndex: 'author',
    width: 120,
    title: 'Author',
  },
  {
    dataIndex: 'importance',
    width: 200,
    title: 'Imp',
    scopedSlots: { customRender: 'importance' },
  },
  {
    dataIndex: 'status',
    width: 180,
    title: 'Status',
    scopedSlots: { customRender: 'status' },
  },
  {
    dataIndex: 'title',
    width: null,
    minWidth: 450,
    align: 'left',
    title: 'Title',
  },
]

export { columnList }
