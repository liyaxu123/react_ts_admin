import { lazy, Suspense } from "react";
import { useRoutes, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuth, IauthInitState } from "@/store/modules/auth";
import Loading from "@/components/Loading";
import AuthComponent from "@/components/AuthComponent";
import Index from "@/pages/Index";

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
  const { menuTree } = useSelector(selectorAuth) as IauthInitState;

  // 静态路由
  const staticRoutes = [
    {
      path: "/login",
      element: lazyLoad("Login"),
    },
    {
      path: "*",
      element: lazyLoad("NotFound"),
    },
  ];

  // 动态路由
  const asyncRoutes: any[] = [
    {
      path: "/",
      element: (
        <AuthComponent>
          <Index />
        </AuthComponent>
      ),
      // children: [
      //   {
      //     path: "/dashboard",
      //     element: <Outlet />,
      //     children: [
      //       // 重定向
      //       {
      //         path: "/dashboard",
      //         element: <Navigate to="/dashboard/analysis" />,
      //       },
      //       {
      //         path: "/dashboard/analysis",
      //         element: lazyLoad("Analysis"),
      //       },
      //       {
      //         path: "/dashboard/workbench",
      //         element: lazyLoad("Workbench"),
      //       },
      //     ],
      //   },
      //   {
      //     path: "/about",
      //     element: lazyLoad("About"),
      //   },
      // ],
    },
  ];
  // 将动态路由添加到 "/" 路径的子路由中
  asyncRoutes[0].children = transformAsyncRoutes(menuTree);

  function transformAsyncRoutes(arr: any[] | null): any[] {
    if (arr == null) return [];
    return arr.map((item) => ({
      path: item.path,
      element:
        item.component === "Outlet" ? <Outlet /> : lazyLoad(item.component),
      children: item.children && transformAsyncRoutes(item.children),
    }));
  }

  // 完整的路由
  return useRoutes([...asyncRoutes, ...staticRoutes]);
};

export default useRenderRoutes;
