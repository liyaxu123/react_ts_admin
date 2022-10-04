import request from "@/utils/request";

export interface IloginForm {
  username: string;
  password: string;
}

/**
 * @description: 用户登录
 */
export const postLogin = (data: IloginForm) => {
  return request({
    method: "post",
    url: "/login",
    data,
  });
};

/**
 * @description: 获取用户菜单列表
 */
export const getMenuTree = () => {
  return request({
    method: "get",
    url: "/menutree",
  });
};
