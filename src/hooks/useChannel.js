// 封装获取频道列表数据的逻辑

import { getChannelsAPI } from "@/apis/article"
import { useEffect, useState } from "react"

export const useChannel = () => {
  // 1.封装业务逻辑
  // 频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    // 封装获取数据函数
    const getChannelsData = async () => {
      const res = await getChannelsAPI()
      setChannelList(res.data.channels)
    }
    getChannelsData()
  }, [])
  // 2.return出组件中要用到状态数据(以对象或数组的形式)
  return {
    channelList
  }
}