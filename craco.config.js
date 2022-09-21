const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");

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
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    port: 8080,
  },
};
