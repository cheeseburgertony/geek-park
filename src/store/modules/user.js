import { request } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
  name: 'user',
  // 初始化state
  initialState: {
    token: ''
  },
  // 同步方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

// 解构处actionCreator
const { setToken } = userStore.actions
const userReducer = userStore.reducer

// 异步方法
const fetchLogin = (data) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', data)
    dispatch(setToken(res.data.token))
  }
}

export { setToken, fetchLogin }
export default userReducer