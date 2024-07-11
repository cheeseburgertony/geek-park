import { request } from "@/utils";

// 获取-所有频道列表
export const getChannelsAPI = () => request.get('/v1_0/channels')

// 发布文章
export const postCreateArticlesAPI = (data) => request.post('/v1_0/mp/articles?draft=false', data)

// 获取文章列表
export const getArticlesListAPI = (params) => request.get('/v1_0/mp/articles', { params })

// 删除文章
export const deleteArticlesAPI = (id) => request.delete(`/v1_0/mp/articles/${id}`)

// 获取文章详情
export const getArticleDetailByIdAPI = (id) => request.get(`/v1_0/mp/articles/${id}`)

// 编辑文章
export const putUpdateArticlesAPI = (id, data) => request.put(`/v1_0/mp/articles/${id}?draft=false`, data)