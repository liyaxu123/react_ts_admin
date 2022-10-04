import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import FullScreen from "@/components/FullScreen";
import UserDropDown from "./components/UserDropDown";
import HeaderBreadcrumb from "./components/HeaderBreadcrumb";
import styles from "./index.module.less";

interface IheaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Header(props: IheaderProps) {
  const { collapsed, setCollapsed } = props;

  return (
    <Layout.Header
      className={styles.siteLayoutBackground}
      style={{ padding: 0, height: "54px" }}
    >
      <div className="h-full flex justify-between items-center">
        {/* 左侧 */}
        <div className="h-full flex items-center">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: styles.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <HeaderBreadcrumb />
        </div>
        {/* 右侧 */}
        <div className="h-full flex items-center">
          <FullScreen />
          <UserDropDown />
        </div>
      </div>
    </Layout.Header>
  );
}
