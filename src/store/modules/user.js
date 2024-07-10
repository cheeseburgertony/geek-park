import { getToken, request, setToken as _setToken } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
  name: 'user',
  // 初始化state
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 存储到本地
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构处actionCreator
const { setToken, setUserInfo } = userStore.actions
const userReducer = userStore.reducer

// 异步方法
const fetchLogin = (data) => {
  return async (dispatch) => {
    const res = await request.post('/v1_0/authorizations', data)
    dispatch(setToken(res.data.token))
  }
}

// 获取用户信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/v1_0/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { setToken, fetchLogin, fetchUserInfo }
export default userReducer