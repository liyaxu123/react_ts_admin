import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { selectorAuth, IauthInitState } from "@/store/modules/auth";

function HeaderBreadcrumb() {
  const location = useLocation();

  // 获取菜单列表
  const { menuTree } = useSelector(selectorAuth) as IauthInitState;

  // 将树拉平
  const flatTree = (arr: any[], res: any[] = []) => {
    arr.forEach((item) => {
      res.push(item);
      item.children && flatTree(item.children, res);
    });
    return res;
  };

  function getBreadcrumbItemList() {
    const breadcrumbItemList: any[] = [];
    if (location.pathname === "/") return breadcrumbItemList;
    // 获取当前路径的组成部分
    const curRoutePathArr = location.pathname.split("/");
    curRoutePathArr.splice(0, 1);
    // 获取拉平后的menu数据
    const flatMenuList = flatTree(menuTree!);

    for (let i = 1; i <= curRoutePathArr.length; i++) {
      const joinStr = "/" + [...curRoutePathArr].splice(0, i).join("/");
      const findObj = flatMenuList.find((item) => item.path === joinStr);
      breadcrumbItemList.push(findObj.title);
    }

    return breadcrumbItemList;
  }

  const breadcrumbItemList = getBreadcrumbItemList();

  return (
    <Breadcrumb>
      {breadcrumbItemList.map((item) => (
        <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default React.memo(HeaderBreadcrumb);
