import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { postLoginAsync2, getMenuTreeAsync } from "@/store/modules/auth";
import { IloginForm } from "@/api/user";
import styles from "./index.module.less";
import loginBanner from "@/assets/images/login_banner.jpg";
import { useAppDispatch } from "@/store";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

  // 登录
  const onFinish = async (values: IloginForm) => {
    setSubmitBtnLoading(true);
    try {
      // 派发异步action
      const res = await dispatch(postLoginAsync2(values));
      if (res.type === "postLoginAsync2/fulfilled") {
        // 获取菜单列表
        await dispatch(getMenuTreeAsync());

        // 跳转到首页
        navigate("/dashboard/analysis", {
          replace: true,
        });
      }
    } finally {
      setSubmitBtnLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.formWrapper}>
        {/* 登录表单左侧图片 */}
        <div className={styles.left}>
          <img src={loginBanner} alt="loginBanner" />
        </div>
        {/* 登录表单右侧表单 */}
        <div className={styles.right}>
          <h3 className={styles.title}>大黑牛后台管理系统</h3>
          <div className={styles.formContainer}>
            <Form
              name="normal_login"
              className={styles.loginForm}
              initialValues={{
                username: "admin",
                password: "123456",
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入您的用户名！" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入您的密码！" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>

                <a className={styles.loginFormForgot} href="##">
                  忘记密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitBtnLoading}
                  className={styles.loginFormButton}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
