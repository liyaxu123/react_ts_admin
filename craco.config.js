const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

// 项目的配置文件，配置webpack
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          // 全局主色
          "@primary-color": "#1DA57A",
        },
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new WindiCSSWebpackPlugin({
          virtualModulePath: "src",
        }),
      ],
    },
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    port: 8080,
    // 配置代理，解决跨域
    // proxy: {
    //   "/auth": {
    //     target: "http://xxx.com",
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   "^/api": "",
    //     // },
    //   },
    // },
  },
};
