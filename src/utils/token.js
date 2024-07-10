// 封装token相关方法
const TOKEN_KEY = 'token_key'
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}