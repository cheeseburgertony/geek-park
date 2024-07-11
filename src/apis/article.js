import { request } from "@/utils";

// 获取-所有频道列表
export const getChannelsAPI = () => request.get('/v1_0/channels')

// 发布文章
export const postCreateArticlesAPI = (data) => request.post('/v1_0/mp/articles?draft=false', data)

// 获取文章列表
export const getArticlesListAPI = (params) => request.get('/v1_0/mp/articles', { params })