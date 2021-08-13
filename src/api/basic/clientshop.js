import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/clientshop/page',
    method: 'get',
    params: query
  })
}

export function fetchListInTable(query) {
  return request({
    url: '/admin/clientshop/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/clientshop',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/clientshop/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/clientshop/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/clientshop',
    method: 'put',
    data: obj
  })
}

export function getShopCondition(query) {
    return request({
      url: `/admin/clientshop/getShopCondition`,
      method: "get",
      params: query
    });
  }