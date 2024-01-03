import axios from "@/utils/axios";

//名片列表接口
export function barcodeLists(params) {
  return axios.get("/nxt/barcode/list", {params});
}

