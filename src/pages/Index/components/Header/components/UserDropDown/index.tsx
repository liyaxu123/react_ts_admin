import React from "react";
import { Dropdown, Menu, Avatar, Modal } from "antd";
import {
  LockOutlined,
  PoweroffOutlined,
  FileTextOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { logout, selectorAuth, IauthInitState } from "@/store/modules/auth";
import { useNavigate } from "react-router-dom";

function UserDropDown() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(selectorAuth) as IauthInitState;

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        Modal.confirm({
          title: "温馨提醒",
          icon: <ExclamationCircleOutlined />,
          content: "是否确认退出系统？",
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            dispatch(logout());
            navigate("/login");
          },
          onCancel: () => {},
        });
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          key: "doc",
          icon: <FileTextOutlined />,
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ahooks.js.org/zh-CN"
            >
              文档
            </a>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "profile",
          label: "个人中心",
          icon: <UserOutlined />,
        },
        {
          key: "lockScreen",
          label: "锁定屏幕",
          icon: <LockOutlined />,
        },
        {
          key: "logout",
          icon: <PoweroffOutlined />,
          label: "退出系统",
          danger: true,
        },
      ]}
    />
  );

  return (
    <div className="h-full flex items-center p-3 cursor-pointer hover:bg-gray-50">
      <Dropdown overlay={menu}>
        <div className="h-full flex justify-around items-center">
          {/* 头像 */}
          <Avatar size={30} src={userInfo?.avatar} />
          {/* 昵称 */}
          <div className="h-full flex items-center ml-2">
            {userInfo?.nickname}
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
export default React.memo(UserDropDown);
