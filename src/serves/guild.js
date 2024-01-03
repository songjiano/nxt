import axios from "@/utils/axios";


//对换列表
export function exchangeLists(params) {
  return axios.get("/nxt/credit_exchange/list", {params});
}

//修改或者新增对换
export function eaddOrEdit(params) {
  return axios.post("/nxt/credit_exchange/addOrEdit", params);
}

//删除对换
export function exDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/credit_exchange/delete", formdata);
}

//导入对换
export function uploadGifts(params) {
  let formdata=new FormData();
  formdata.append("creditExchangeId",params.id);
  formdata.append("file",params.file);
  return axios.post("/nxt/credit_exchange/uploadGifts", formdata);
}