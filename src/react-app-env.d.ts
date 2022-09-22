/// <reference types="react-scripts" />
// 添加.module.less的文件声明
declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
