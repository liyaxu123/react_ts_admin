import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import auth from "./modules/auth";

const store = configureStore({
  reducer: {
    auth,
  },
});

// 使用dispatch，需要使用泛型，所以对其进行封装
type Tdispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<Tdispatch>();

export default store;
