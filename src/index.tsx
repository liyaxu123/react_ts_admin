import React from "react";
import ReactDOM from "react-dom/client";
// 路由使用history模式
import { BrowserRouter } from "react-router-dom";
// 在ts中，@别名会报错，修改tsconfig.json
import App from "@/App";
import "./App.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
