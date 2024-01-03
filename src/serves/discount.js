import axios from "@/utils/axios";


//对换列表
export function eventsLists(params) {
  return axios.get("/nxt/merch_discount/list", {params});
}

//修改或者新增对换
export function taddOrEdit(params) {
  return axios.post("/nxt/merch_discount/addOrEdit", params);
}

//删除对换
export function exDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/merch_discount/delete", formdata);
}
