import axios from "axios";
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // baseURL: "http://10.224.101.32:8081",
  timeout: 10000,
  validateStatus: (status) => true, // 允许所有状态码
});

service.interceptors.request.use(
  (config) => {
    
    const isLogin=config.url==="/nxt/sys/user/login"
    const nxtToken = window.localStorage.getItem("nxtToken")
    const userToken = isLogin?"":(nxtToken&&JSON.parse(nxtToken).token);
    if (userToken) {config.headers.token = userToken;config.headers.loginType = 1}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http响应拦截器
service.interceptors.response.use(
  (data) => {
    if (data.data.code===401) {
      localStorage.removeItem("nxtToken");
      
      return window.location.reload()
    }
    if (data.status == 200) {
      // http请求状态
      if (data.request.responseType == "blob") {
        //导出
        let filename = data.headers['content-disposition']
        && data.headers['content-disposition'].split(';')[1].split('filename=')[1]
          if (filename) {
              if (filename.indexOf('%') < 0) {
                  filename = decodeURIComponent(escape(filename))
                  data.data.filename = filename
              } else {
                  filename = decodeURIComponent(filename)
                  data.data.filename = filename
              }
          }
          return data.data
      } else if (data.config.responseTypess == "blob") {
        return data;
      } else {
        let _data = data.data;
        return _data;
      }
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("请求已被取消:", error);
    } else if (error.message.startsWith("timeout"))
      return Promise.reject(error);
  }
);


export default service;
