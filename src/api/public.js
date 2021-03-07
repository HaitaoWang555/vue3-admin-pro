import request from '@/utils/request'

export function sendSms(params) {
  return request({
    url: '/vue3-admin-pro/public/sendSms',
    method: 'get',
    params,
  })
}
export function submit(data) {
  return request({
    url: '/vue3-admin-pro/public/submit',
    method: 'post',
    data,
  })
}
