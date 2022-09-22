import React, { ReactElement, FC } from "react";
import { Navigate } from "react-router-dom";

// 职责：验证是否登录，如果登录那么渲染内容，否则跳转至登录页面
type TProps = {
  children: ReactElement;
};
const AuthComponent: FC<TProps> = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  // 如果未登录，跳转至登录界面
  return <Navigate to="/login"></Navigate>;
};

export default AuthComponent;
