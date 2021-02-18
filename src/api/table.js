import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue3-admin-pro/table/list',
    method: 'get',
    params,
  })
}
