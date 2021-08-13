import request from "@/router/axios";

export function companyList() {
  return request({
    url: "/admin/basiccompany/list",
    method: "get"
  });
}

export function companyUserList(query) {
  return request({
    url: "/admin/basiccompany/page",
    method: "get",
    params: query
  });
}
export function fetchList(query) {
  return request({
    url: "/admin/basiccompany/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/basiccompany",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/basiccompany/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/basiccompany/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/basiccompany",
    method: "put",
    data: obj
  });
}
