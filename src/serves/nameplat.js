import axios from "@/utils/axios";

//名片列表接口
export function nameplateLists(params) {
  return axios.get("/nxt/nameplate_border/list", {params});
}

//编码列表接口
export function barcodeLists(params) {
  return axios.get("/nxt/barcode/list", {params});
}

//新增编码接口
export function barcodeAdd(params) {
  return axios.post("/nxt/barcode/add", params);
}

//上传图片
export function upload(params) {
  let formData = new FormData();
  formData.append("file", params);
  return axios.post("/nxt/index/upload", formData);
}

//添加/修改名片或边框接口
export function addOrEdit(params) {
  return axios.post("/nxt/nameplate_border/addOrEdit", params);
}

//修改编码接口
export function barcodeUpdate(params) {
  return axios.post("/nxt/barcode/update", params);
}

//删除编码接口
export function barcodeDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/barcode/delete", formdata);
}

//删除名牌边框接口
export function bareDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/nameplate_border/delete", formdata);
}

//倍率列表
export function bmultiplierLists(params) {
  return axios.get("/nxt/barcode_multiplier/list", {params});
}

//修改或者新增列表
export function maddOrEdit(params) {
  return axios.post("/nxt/barcode_multiplier/addOrEdit", params);
}


//删除名牌边框接口
export function meDelete(params) {
  let formdata=new FormData();
  formdata.append("id",params.id);
  return axios.post("/nxt/barcode_multiplier/delete", formdata);
}

//code关联商品
export function detailByBarcode(params) {
  return axios.get("/nxt/product_detail/detailByBarcode", {params});
}