import React from "react";
import ReactDOM from "react-dom/client";
// 在ts中，@别名会报错，修改tsconfig.json
import App from "@/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
