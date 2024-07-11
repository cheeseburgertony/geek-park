import { request } from "@/utils";

// 获取-所有频道列表
export const getChannelsAPI = () => request.get('/v1_0/channels')