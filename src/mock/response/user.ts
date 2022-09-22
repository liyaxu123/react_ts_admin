// 处理登录
export const login = (options: any) => {
  const body = JSON.parse(options.body);
  if (body.username === "admin" && body.password === "123456") {
    return {
      code: 200,
      data: {
        token: "ksdjasdgjasgdjah.12juhh283u234yu4yu2.kjashd8932479238",
      },
      msg: "登录成功",
    };
  } else {
    return {
      code: -1,
      msg: "账号密码不正确",
    };
  }
};