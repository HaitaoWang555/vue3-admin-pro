import request from '@/utils/request'

export function getOnlineListOptions(query) {
  return request({
    url: '/vue3-admin-pro/online/options',
    method: 'get',
    params: query,
  })
}
export function getOnlineList(query) {
  return request({
    url: '/vue3-admin-pro/online/list',
    method: 'get',
    params: query,
  })
}
export function get(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query,
  })
}
export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
  })
}
