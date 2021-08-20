const typeFilter = {
  CN: 'China',
  EU: 'Eurozone',
  JP: 'Japan',
  US: 'USA',
}
const statusMap = {
  published: 'success',
  draft: 'info',
  deleted: 'danger',
}

const dict = {
  typeFilter,
  statusMap,
}

export default function useDict(type, key) {
  if (type && key) {
    if (dict[type]) {
      return dict[type][key]
    } else {
      console.error('没有设置此字典 - ' + type)
    }
  } else {
    return ''
  }
}
