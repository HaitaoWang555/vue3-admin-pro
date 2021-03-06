const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' },
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export function useFilter() {
  function typeFilter(type) {
    return calendarTypeKeyValue[type]
  }
  function statusFilter(status) {
    const statusMap = {
      published: 'success',
      draft: 'info',
      deleted: 'danger',
    }
    return statusMap[status]
  }
  return {
    typeFilter,
    statusFilter,
  }
}
