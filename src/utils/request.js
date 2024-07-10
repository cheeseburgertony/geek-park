import axios from "axios"
import { getToken, removeToken } from "./token";
import router from "@/router";

// 封装axios并点实例创建
const request = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取token并且注入请求头相应位置
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // token失效 清除token 跳转到登录页
    removeToken()
    router.navigate('/login')
    // 强制刷新
    window.location.reload()
  }
  return Promise.reject(error);
});

export { request }