import Mock from "mockjs";
import { login, getMenuTree } from "./response/auth";

Mock.mock(/\/login/, "post", login);
Mock.mock(/\/menutree/, "get", getMenuTree);

// 配置拦截 Ajax 请求时的行为。支持的配置项有：timeout。
// 例如 '200-600'，表示响应时间介于 200 和 600 毫秒之间。
Mock.setup({
  timeout: "200-600",
});

export default Mock;
