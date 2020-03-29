import { request } from '../index'
export function login (form) {
  request({
    url: '/login',
    method: 'post',
    data: form
  })
}
