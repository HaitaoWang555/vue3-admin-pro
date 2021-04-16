import request from '@/utils/request'

/**
 * 获取图表通用数据
 * @returns
 */
export function getLineList() {
  return request({
    url: '/vue3-admin-pro/charts/common',
    method: 'get',
  })
}

export function getLineStackList() {
  return request({
    url: '/vue3-admin-pro/charts/stack',
    method: 'get',
  })
}
export function getBarList() {
  return request({
    url: '/vue3-admin-pro/charts/common',
    method: 'get',
  })
}

export function getBarStackList() {
  return request({
    url: '/vue3-admin-pro/charts/stack',
    method: 'get',
  })
}
export function getPieList() {
  return request({
    url: '/vue3-admin-pro/charts/common',
    method: 'get',
  })
}

export function getPieRoseTypeList() {
  return request({
    url: '/vue3-admin-pro/charts/stack',
    method: 'get',
  })
}
export function getMapJson(name) {
  return request({
    url: `/vue3-admin-pro/province/${name}.json`,
    method: 'get',
    baseURL: '',
  })
}
