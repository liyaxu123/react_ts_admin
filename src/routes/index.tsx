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
