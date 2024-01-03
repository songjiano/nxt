import axios from "@/utils/axios";


//对换列表
export function eventsLists(params) {
  return axios.get("/nxt/special_events/list", {params});
}

//修改或者新增对换
export function taddOrEdit(params) {
  return axios.post("/nxt/special_events/addOrEdit", params);
}

//删除对换
export function exDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/special_events/delete", formdata);
}
