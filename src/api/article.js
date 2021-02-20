import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue3-admin-pro/article/list',
    method: 'get',
    params: query,
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue3-admin-pro/article/detail',
    method: 'get',
    params: { id },
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue3-admin-pro/article/pv',
    method: 'get',
    params: { pv },
  })
}

export function createArticle(data) {
  return request({
    url: '/vue3-admin-pro/article/create',
    method: 'post',
    data,
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue3-admin-pro/article/update',
    method: 'post',
    data,
  })
}
export function getStatus() {
  return request({
    url: '/vue3-admin-pro/article/getStatus',
    method: 'get',
  })
}
