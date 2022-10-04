import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./index.module.less";

export default function Content() {
  return (
    <Layout.Content className={styles.content}>
      <Outlet />
    </Layout.Content>
  );
}
