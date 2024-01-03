import axios from "@/utils/axios";

//用户列表接口
export function lists(params) {
  return axios.get("/nxt/user/list", {params});
}

//用户列表导出
export function userListExport(params) {
  return axios.get("/nxt/user/userListExport", {params,responseType:"blob"});
}

//用户详情
export function detail(params) {
  return axios.get("/nxt/user/detail", {params});
}

//用户修改
export function update(params) {
  return axios.post("/nxt/user/update", params);
}

//用户货币记录
export function currencyLogList(params) {
  return axios.get("/nxt/user/currencyLog/list", {params});
}