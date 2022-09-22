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
