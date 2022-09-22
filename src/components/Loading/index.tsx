import { Spin } from "antd";
import React from "react";
import "./index.less";

const Loading: React.FC = () => (
  <div className="example">
    <Spin />
  </div>
);

export default Loading;
