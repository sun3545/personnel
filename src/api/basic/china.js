import request from "@/router/axios";

export function getCity(pid) {
  return request({
    url: `/admin/common/listCity?pid=${pid}`,
    method: "get"
  });
}

export function getExport(query) {
  return request({
    url: `/admin/clientwork/export`,
    method: "post",
    data: query,
    procgress: true,
    responseType: "blob" //响应类型，避免乱码
  });
}
