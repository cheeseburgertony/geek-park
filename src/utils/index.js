// 中转导出函数 集中管理utils下的工具函数
// 例如别人在应用request只需要  import { request } from "@/utils"
import { request } from "./request"

export * from './token'
export {
  request
}