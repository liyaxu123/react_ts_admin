import axios from "axios";
import { message } from "antd";
import qs from "qs";

const request = axios.create({
  baseURL: process.env.REACT_APP_URL,
  // 请求超时时间
  timeout: 1000 * 60 * 5,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config: any) {
    // console.log("请求拦截器", config);
    // 在发送请求之前给 header 设置 token
    if (!config.url.includes("/userlogin")) {
      config.headers[process.env.REACT_APP_AJAX_HEADER_AUTH_NAME!] =
        localStorage.getItem(process.env.REACT_APP_TOKEN_NAME!);
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // console.log("响应拦截器", response);
    if (response.data.code !== 200) {
      message.error(response.data.msg);
      return Promise.reject(response.data);
    }
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// ====================== 专门处理文件上传的axios实例 ================================
export const request2 = axios.create({
  baseURL: "http://127.0.0.1:8888",
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  transformRequest: (data, headers: any) => {
    const contentType = headers["Content-Type"];
    if (contentType === "application/x-www-form-urlencoded")
      return qs.stringify(data);
    return data;
  },
});
request2.interceptors.response.use((response) => {
  return response.data;
});

export default request;
