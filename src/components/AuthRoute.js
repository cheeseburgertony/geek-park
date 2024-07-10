// 封装高阶组件
// 核心逻辑：有token正常跳转 无token则取登录

const { getToken } = require("@/utils")
const { Navigate } = require("react-router-dom")

export const AuthRoute = ({ children }) => {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}