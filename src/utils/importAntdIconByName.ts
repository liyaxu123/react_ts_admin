import React, { ReactElement } from "react";

/**
 * @description: 根据图标名称加载对应的antd/icon
 */
const importAntdIconByName: (name: string) => ReactElement = (name: string) => {
  return React.createElement(require("@ant-design/icons")[name]);
};

export default importAntdIconByName;
