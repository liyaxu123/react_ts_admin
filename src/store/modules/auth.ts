import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, IloginForm } from "@/api/user";
import { message } from "antd";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    // payload是接收到的token
    upToken(state, { payload }) {
      state.token = payload;
      localStorage.setItem(process.env.REACT_APP_TOKEN_NAME as string, payload);
    },
  },
  // 额外的reducers，帮助我们处理异步
  extraReducers: (builder) => {
    builder
      .addCase(postLoginAsync2.fulfilled, (state, { payload }) => {
        console.log("fulfilled：", payload);
        // 更新状态
        state.token = localStorage[process.env.REACT_APP_TOKEN_NAME as string] =
          payload.data.token;
        message.success(payload.msg);
      })
      .addCase(postLoginAsync2.rejected, (state, action) => {
        console.log("rejected：", action);
      })
      .addCase(postLoginAsync2.pending, (state, action) => {
        console.log("pending：", action);
      });
  },
});

const { upToken } = authSlice.actions;

export const selectorAuth = (state: any) => state.auth;

// 异步action(函数)，通过dispatch可以调用同步/异步action
export const postLoginAsync = (data: IloginForm) => {
  return async (dispatch: any) => {
    // 发送请求
    const res: any = await postLogin(data);
    // 更新状态
    dispatch(upToken(res.data.token));
    message.success(res.msg);
    return res.msg;
  };
};

// createAsyncThunk来自于@reduxjs/toolkit
// 该函数接收的参数：
//  1.自定义标识（字符串）
//  2.回调函数(处理异步逻辑)
export const postLoginAsync2 = createAsyncThunk(
  "postLoginAsync2",
  async (data: IloginForm) => {
    // 发送请求
    const res: any = await postLogin(data);
    return res;
  }
);

export default authSlice.reducer;
