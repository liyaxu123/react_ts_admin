const path = require("path");

// 项目的配置文件，配置webpack
module.exports = {
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
