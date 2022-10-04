import React, { useState } from "react";
import { Layout } from "antd";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Content from "./components/Content";
import styles from "./index.module.less";

const Index: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Aside collapsed={collapsed} />
      <Layout className={styles.siteLayout}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content />
      </Layout>
    </Layout>
  );
};

export default Index;
