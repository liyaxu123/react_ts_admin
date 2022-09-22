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
antd 官网地址：https://ant-design.antgroup.com/index-cn

1. 安装
```shell
yarn add antd
```

2. 自定义主题
- 安装 craco-antd 并修改 craco.config.js 文件
```shell
yarn add craco-antd
```
```js
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1DA57A',
        },
      },
    },
  ],
};
```
- 在 App.tsx中去除App.css

## 五、基本路由的配置
- 安装路由
```shell
yarn add react-router-dom
```
- 在 src/index.tsx 文件中配置路由模式
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
// 路由使用history模式
import { BrowserRouter } from "react-router-dom";
// 在ts中，@别名会报错，修改tsconfig.json
import App from "@/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
- 先增加两个路由页面
  - src -> pages -> Login -> index.tsx
```tsx
import React from "react";
export default function Login() {
  return <div>Login</div>;
}
```
  - src -> pages -> Index -> index.tsx
```tsx
import React from "react";
export default function Index() {
  return <div>Index</div>;
}
```
  - src -> pages -> NotFound -> index.tsx
```tsx
import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉, 该页面不存在！"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
```

- 添加路由：src -> App.tsx
```tsx
import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Index />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
);

export default App;
```
## 六、路由增加配置文件
- 在 src -> routes -> index.tsx
```tsx
import { useRoutes } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const useRenderRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
export default useRenderRoutes;
```
- 修改src -> App.tsx
```tsx
import React, { FC } from "react";
import useRenderRoutes from "./routes";

const App: FC = () => useRenderRoutes();

export default App;
```

## 七、实现路由的懒加载
- src -> routes -> index.tsx
```tsx
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "@/components/Loading";
// 实现路由懒加载
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const useRenderRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Index />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);
};

export default useRenderRoutes;
```
- src -> components -> Loading -> index.tsx
```tsx
import { Spin } from "antd";
import React from "react";
import "./index.less";

const Loading: React.FC = () => (
  <div className="example">
    <Spin />
  </div>
);

export default Loading;
```
- src -> components -> Loading -> index.less
```css
.example {
  height: 100vh;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
```
## 八、路由懒加载优化
- 修改src -> routes -> index.tsx
```tsx
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "@/components/Loading";

// 实现路由懒加载
const lazyLoad = (path: string) => {
  const Comp = lazy(() => import(`@/pages/${path}`));
  return (
    <Suspense fallback={<Loading />}>
      <Comp />
    </Suspense>
  );
};

const useRenderRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: lazyLoad("Index"),
    },
    {
      path: "/login",
      element: lazyLoad("Login"),
    },
    {
      path: "*",
      element: lazyLoad("NotFound"),
    },
  ]);
};

export default useRenderRoutes;
```
## 九、支持module.less
- 在src -> react-app-env.d.ts 中添加.module.less文件声明
```ts
/// <reference types="react-scripts" />
// 添加.module.less的文件声明
declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```
- 在src/pages/Login/index.module.less文件中编写less代码
```less
.login {
  .title {
    color: red;
  }

  :global {
    // 可以直接通过className="my"来使用
    .my {
      background-color: skyblue;
    }
  }
}
```
- 在src/pages/Loagin/index.tsx中使用.module.less
```tsx
import React from "react";
import styles from "./index.module.less";

export default function Login() {
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>登录页面</h1>
      <p className="my">哈哈</p>
    </div>
  );
}
```
## 十、添加路由拦截器组件
1. 可以针对于某一个路由进行设置
```tsx
// src/pages/Index/index.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // 如果用户未登录，则跳转到登录路由
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <div>Index</div>;
}
```
2. 可以增加路由拦截器组件，为需要进行验证的组件增加上该拦截即可
```tsx
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
```
3. 在src/routes/index.tsx中使用路由拦截器组件
```tsx
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "@/components/Loading";
import AuthComponent from "@/components/AuthComponent";

// 实现路由懒加载
const lazyLoad = (path: string) => {
  const Comp = lazy(() => import(`@/pages/${path}`));
  return (
    <Suspense fallback={<Loading />}>
      <Comp />
    </Suspense>
  );
};

const useRenderRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <AuthComponent>{lazyLoad("Index")}</AuthComponent>,
    },
    {
      path: "/login",
      element: lazyLoad("Login"),
    },
    {
      path: "*",
      element: lazyLoad("NotFound"),
    },
  ]);
};

export default useRenderRoutes;
```
## 十一、完成登录界面


