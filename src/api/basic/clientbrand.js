import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/clientbrand/page',
    method: 'get',
    params: query
  })
}
export function brandList(query) {
    return request({
      url: '/admin/clientbrand/page',
      method: 'get',
      params: query
    })
  }

export function addObj(obj) {
  return request({
    url: '/admin/clientbrand',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/clientbrand/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/clientbrand/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/shop/clientbrand',
    method: 'put',
    data: obj
  })
}
