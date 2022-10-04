import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import importAntdIconByName from "@/utils/importAntdIconByName";
import { LogoIcon } from "@/components/MyIcon";
import styles from "./index.module.less";
import { useSelector } from "react-redux";
import { selectorAuth, IauthInitState, ImenuItem } from "@/store/modules/auth";
import { useNavigate, useLocation } from "react-router-dom";
const { Sider } = Layout;

interface IasideProps {
  collapsed: boolean;
}

const Aside: React.FC<IasideProps> = (props: IasideProps) => {
  const { collapsed } = props;
  const navigate = useNavigate();
  const location = useLocation();
  // 当前激活的路由
  const [curRoutePath, setCurRoutePath] = useState([location.pathname]);

  // 监听路由发生变化
  useEffect(() => {
    setCurRoutePath([location.pathname]);
  }, [location]);

  const { menuTree } = useSelector(selectorAuth) as IauthInitState;
  // 导航菜单列表
  const menuItemsArr = transformMenuItem(menuTree!);

  // 递归处理菜单
  function transformMenuItem(arr: Array<ImenuItem>): any[] {
    return arr.map((item) => ({
      key: item.path,
      label: item.title,
      icon: item.icon && importAntdIconByName(item.icon),
      children: item.children && transformMenuItem(item.children),
    }));
  }

  function handleMenuItemClick(data: any) {
    navigate(data.key);
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <a href="/">
        <div className={styles.logo}>
          <LogoIcon
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          />
          <span
            className={styles.logoTitle}
            style={{
              paddingLeft: "5px",
              display: collapsed ? "none" : "block",
            }}
          >
            大黑牛后台管理系统
          </span>
        </div>
      </a>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={curRoutePath}
        defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]}
        items={menuItemsArr}
        onClick={handleMenuItemClick}
      />
    </Sider>
  );
};

export default Aside;
