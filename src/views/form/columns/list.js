const list = [
  {
    dataIndex: 'name',
    title: 'Activity name',
    isForm: true,
    valueType: 'input',
    prop: [
      {
        required: true,
        message: 'Please enter the Activity name',
        trigger: 'blur',
      },
    ],
  },
  {
    dataIndex: 'region',
    title: 'Activity zone',
    isForm: true,
    valueType: 'select',
    option: [
      {
        label: 'Zone one',
        value: 'shanghai',
      },
      {
        label: 'Zone two',
        value: 'beijing',
      },
    ],
    prop: [
      {
        required: true,
        message: 'Please select the Activity zone',
        trigger: 'change',
      },
    ],
  },
  {
    dataIndex: 'date',
    title: 'Activity time',
    valueType: 'date',
    pickerType: 'daterange',
    pickerFormat: 'YYYY-MM-DD',
    isForm: true,
  },
  {
    dataIndex: 'delivery',
    title: 'Instant delivery',
    valueType: 'switch',
    isForm: true,
  },
  {
    dataIndex: 'type',
    title: 'Activity type',
    valueType: 'checkbox',
    option: [
      {
        label: 'Online activities',
        value: 'Online activities',
      },
      {
        label: 'Promotion activities',
        value: 'Promotion activities',
      },
      {
        label: 'Offline activities',
        value: 'Offline activities',
      },
      {
        label: 'Simple brand exposure',
        value: 'Simple brand exposure',
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'resource',
    title: 'Resources',
    valueType: 'radio',
    option: [
      {
        label: 'Sponsor',
        value: 'Sponsor',
      },
      {
        label: 'Venue',
        value: 'Venue',
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'desc',
    title: 'Activity form',
    valueType: 'input',
    inpuType: 'textarea',
    isForm: true,
  },
  {
    dataIndex: 'check_code',
    title: 'Verification Code',
    isForm: true,
    valueType: 'check_code',
    sendCode: {
      smsType: 'pay',
      code: 'pay',
    },
    prop: [
      {
        required: true,
        message: 'Please enter the verification code',
        trigger: 'blur',
      },
    ],
  },
]

export { list }
