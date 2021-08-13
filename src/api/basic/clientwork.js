import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/admin/clientwork/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/clientwork",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/clientwork/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/clientwork/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/clientwork",
    method: "put",
    data: obj
  });
}
export function getHomeSum(year, month) {
  return request({
    url: `/admin/clientwork/getHomeSum/${year}/${month}`,
    method: "get"
  });
}

export function saveBatch(obj) {
  return request({
    url: `/admin/clientwork/saveBatch`,
    method: "post",
    data: obj
  });
}

export function getWorkByGroup(query) {
  return request({
    url: `/admin/clientwork/getWorkByGroup`,
    method: "get",
    params: query
  });
}

