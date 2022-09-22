import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import loginBanner from "@/assets/images/login_banner.jpg";
import { postLogin, IloginForm } from "@/api/user";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

  // 登录
  const onFinish = async (values: IloginForm) => {
    setSubmitBtnLoading(true);
    try {
      const res = await postLogin(values);
      console.log(res);
      // 保存token
      localStorage.setItem(
        process.env.REACT_APP_TOKEN_NAME as string,
        res.data.token
      );
      message.success("登录成功");
      // 跳转到首页
      navigate("/", {
        replace: true,
      });
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
              initialValues={{ remember: true }}
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
