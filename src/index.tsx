import React from "react";
import ReactDOM from "react-dom/client";
// 路由使用history模式
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
// 在ts中，@别名会报错，修改tsconfig.json
import App from "@/App";
import "./App.css";
import "./virtual:windi.css";

// 使用mockjs
// import "./mock";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
