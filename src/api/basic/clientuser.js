import request from '@/router/axios'

export function fetchList(query) {
    return request({
      url: '/admin/clientuser/page',
      method: 'get',
      params: query
    })
  }
  export function userList(query) {
    return request({
      url: '/admin/clientuser/page',
      method: 'get',
      params: query
    })
  }

export function addObj(obj) {
  return request({
    url: '/admin/clientuser',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/clientuser/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/clientuser/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/clientuser',
    method: 'put',
    data: obj
  })
}
