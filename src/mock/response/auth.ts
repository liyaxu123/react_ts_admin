export const TOKEN = "ksdjasdgjasgdjah.12juhh283u234yu4yu2.kjashd8932479238";

// 处理登录
export const login = (options: any) => {
  const body = JSON.parse(options.body);
  if (body.username === "admin" && body.password === "123456") {
    return {
      code: 200,
      data: {
        token: TOKEN,
        username: "admin",
        nickname: "小笑残虹",
        gender: "男",
        avatar: "https://joeschmoe.io/api/v1/random",
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

// 获取菜单列表
export const getMenuTree = (options: any) => {
  const token = localStorage.getItem("DHN_ADMIN_TOKEN");
  if (token) {
    return {
      code: 200,
      data: [
        {
          id: "933d6450-54a1-4d0b-bd3f-0f4db23a15f4",
          path: "/dashboard",
          title: "Dashboard",
          icon: "DashboardOutlined",
          component: "Outlet",
          children: [
            {
              id: "827ed026-3a99-44fe-a0e2-6891bb024c2e",
              path: "/dashboard/analysis",
              title: "分析页",
              component: "Analysis",
            },
            {
              id: "61a60df7-82f0-4bde-84db-6cfcebbc80b4",
              path: "/dashboard/workbench",
              title: "工作台",
              component: "Workbench",
            },
          ],
        },
        {
          id: "3f9b3205-7f63-4143-badf-a84193ea309a",
          path: "/upload",
          title: "文件上传",
          icon: "CloudUploadOutlined",
          component: "Outlet",
          children: [
            {
              id: "c30bb605-d3b6-4b76-90f0-b52ed1a792b0",
              path: "/upload/single",
              title: "单文件上传",
              component: "Outlet",
              children: [
                {
                  id: "9080ff63-70e9-427e-8f5c-f02215f860ba",
                  path: "/upload/single/form_data",
                  title: "form_data格式",
                  component: "Upload/Single/FormData",
                },
                {
                  id: "6609789b-fdd3-41ec-9dcc-9f7c512f81f5",
                  path: "/upload/single/BASE64",
                  title: "BASE64格式",
                  component: "Upload/Single/BASE64",
                },
                {
                  id: "25bdab5f-b137-47c3-bd21-4caf9847c95b",
                  path: "/upload/single/thumbnail",
                  title: "缩略图处理",
                  component: "Upload/Single/Thumbnail",
                },
                {
                  id: "307916f7-f5f2-40c0-85f8-b179dbd3cd43",
                  path: "/upload/single/Progress",
                  title: "进度管控",
                  component: "Upload/Single/Progress",
                },
              ],
            },
            {
              id: "74c1b560-5a79-4fe7-a08a-8827d6530983",
              path: "/upload/multifile",
              title: "多文件上传",
              component: "Upload/Multifile",
            },
            {
              id: "74e5e8e0-8a2e-44d5-929b-5c763a55f215",
              path: "/upload/dragDrop",
              title: "拖拽上传",
              component: "Upload/DragDrop",
            },
            {
              id: "12b6ae8f-ddd2-4850-8d19-b7efb2a2ac81",
              path: "/upload/largefile",
              title: "大文件上传",
              component: "Upload/LargeFile",
            },
          ],
        },
        {
          id: "4785cb30-c9a2-4c5f-96af-f2d3bc180296",
          path: "/system",
          title: "系统管理",
          icon: "FundProjectionScreenOutlined",
          component: "Outlet",
          children: [
            {
              id: "6ca890b9-a76e-4a0c-9aea-c7659973db69",
              path: "/system/account",
              title: "账号管理",
              component: "Account",
            },
            {
              id: "a427c4b1-d070-4627-9e5a-19528e3fdd5a",
              path: "/system/role",
              title: "角色管理",
              component: "Role",
            },
            {
              id: "c20c090a-c164-4a2e-b04e-588e50cc5990",
              path: "/system/menu",
              title: "菜单管理",
              component: "Menu",
            },
            {
              id: "45be309c-2ea0-4edf-bef8-7c572100fd5b",
              path: "/system/dept",
              title: "部门管理",
              component: "Dept",
            },
            {
              id: "48233c91-592f-4937-ae0a-e49acecae40c",
              path: "/system/changePassword",
              title: "修改密码",
              component: "ChangePassword",
            },
          ],
        },
        {
          id: "2e9dd750-8829-4bbb-bb39-de5771b1c17a",
          path: "/level",
          title: "多级菜单",
          icon: "BulbOutlined",
          component: "Outlet",
          children: [
            {
              id: "621f156d-3e4a-42c9-8b2f-85df0cf960a9",
              path: "/level/menu1",
              title: "menu1",
              component: "Outlet",
              children: [
                {
                  id: "3ad25bf8-47eb-4e6f-8b9f-c34b708caa06",
                  path: "/level/menu1/menu1-1",
                  title: "menu1-1",
                  component: "Outlet",
                  children: [
                    {
                      id: "4ff582e2-f61e-4929-9864-fb945051549c",
                      path: "/level/menu1/menu1-1/menu1-1-1",
                      title: "menu111",
                      component: "Menu111",
                    },
                  ],
                },
                {
                  id: "e355dd8c-14fa-40f1-968d-b2b53e5303ed",
                  path: "/level/menu1/menu1-2",
                  title: "menu1-2",
                  component: "Menu12",
                },
              ],
            },
            {
              id: "621f156d-3e4a-42c9-8b2f-85df0cf960a9",
              path: "/level/menu2",
              title: "menu2",
              component: "Menu2",
            },
          ],
        },
        {
          id: "c37d4af2-ac73-4d2c-b9c4-c59cbded894c",
          path: "/about",
          title: "关于",
          icon: "BulbOutlined",
          component: "About",
        },
      ],
      msg: "请求成功",
    };
  } else {
    return {
      code: -1,
      msg: "请先登录！",
    };
  }
};
