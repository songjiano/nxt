import axios from "@/utils/axios";

//管理员列表接口
export function lists(params) {
  return axios.get("/nxt/sys/user/list",{params});
}


//新增管理员接口
export function addOrEdit(parmes) {
  return axios.post("/nxt/sys/user/addOrEdit", parmes);
}

//查询管理员详情接口
export function detail(params) {
  return axios.get("/nxt/sys/user/detail",{params});
}
