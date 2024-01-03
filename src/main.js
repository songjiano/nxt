import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import echarts from "./echarts.js";

import "./assets/css/reset.css";
import 'element-plus/dist/index.css'

if (typeof window.global === "undefined") {
  window.global = window;
}

const app = createApp(App);
app.config.globalProperties.$echarts = echarts; //vue3的挂载echarts

app.use(createPinia());
app.use(router);
app.mount("#app");
