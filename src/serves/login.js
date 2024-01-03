import axios from "@/utils/axios";

//登录信息
export function rlogin(parmes) {
  return axios.post("/nxt/sys/user/login", parmes);
}
