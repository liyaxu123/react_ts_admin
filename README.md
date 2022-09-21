# React_Ts_Admin

## 一、创建项目
```bash
npx create-react-app react_ts_admin --template typescript
```

## 二、配置webpack
1. 第一种方式通过执行 `npm run eject` 暴露出webpack的配置文件来修改，这种方式不推荐使用。
2. 第二种方式通过使用第三方模块 **craco** 来二次配置webpack，在项目中推荐使用。

> craco npm官网：https://www.npmjs.com/package/@craco/craco

3. 安装 craco
```bash
npm i @craco/craco
```
4. 修改 package.json 文件
```json
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```
5. 配置webpack：在项目根目录中创建一个文件：craco.config.js
```ts
// 项目的配置文件，配置webpack
module.exports = {
  devServer: {
    port: 8080,
  },
};
```
6. 配置完毕后，重启项目

## 三、配置地址别名
- 修改 craco.config.js 文件
```js
const path = require("path");

// 项目的配置文件，配置webpack
module.exports = {
  webpack: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    port: 8080,
  },
};
```
配置完路径别名后，在ts项目中使用“@”会报错，所以还需配置tsconfig.json文件
- 别名方案一：
  - 修改 tsconfig.json 文件，添加如下配置：
```json
  {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    },
  }
}
```

- 别名方案二：
  - 在项目根目录中新建一个名字为 **path.tsconfig.json** 的文件

 ```json
 {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
 ```
  - 修改 tsconfig.json 文件
```json
{
  "extends": "./path.tsconfig.json",
  "compilerOptions": {}
}
```
- 重启项目

## 四、使用antd组件库

