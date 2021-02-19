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
  },
  {
    dataIndex: 'title',
    width: null,
    minWidth: 150,
    align: 'left',
    title: 'Title',
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
    dataIndex: 'actions',
    width: 230,
    title: 'Actions',
    scopedSlots: { customRender: 'actions' },
  },
]

export { columnList }
