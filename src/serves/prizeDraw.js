import axios from "@/utils/axios";


//抽奖列表
export function lotteryLists(params) {
  return axios.get("/nxt/lottery/list", {params});
}

//奖项列表
export function lotteryPrizeLists(params,id) {
  return axios.get("/nxt/lottery_prize/list/"+id, {params});
}

//导出日志列表
export function logExport(id) {
  return axios.get("/nxt/lottery/logExport/"+id);
}

//查询日志列表
export function viewLog(params,id) {
  return axios.get("/nxt/lottery/viewLog/"+id, {params});
}


//修改奖项
export function addOrEdit(params) {
  return axios.post("/nxt/lottery/addOrEdit", params);
}


//修改或者新增奖品
export function lotAddOrEdit(params) {
  return axios.post("/nxt/lottery_prize/addOrEdit", params);
}

//激活或关闭
export function statusEdit(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  formdata.append("status",params.status);
  return axios.post("/nxt/lottery/statusEdit", formdata);
}

//删除奖品
export function loDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/lottery_prize/delete", formdata);
}

//删除奖池
export function losDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/lottery/delete", formdata);
}
