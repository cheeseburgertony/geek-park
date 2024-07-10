import { request } from "@/utils";

// 注册登录
export const postLoginAPI = (data) => request.post('/v1_0/authorizations', data)

// 获取-用户个人简介
export const getUserProfileAPI = () => request.get('/v1_0/user/profile')