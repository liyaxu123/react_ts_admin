import { createSlice } from "@reduxjs/toolkit";

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
});

export default authSlice.reducer;
