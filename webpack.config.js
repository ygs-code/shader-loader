const path = require("path");

module.exports = {
  // 设置入口文件
  entry: "./app/index.js",

  // 配置输出
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // 配置加载器
  module: {
    rules: [
      {
        test: /\.(vert|frag)$/,
        exclude: /node_modules/,
        use: {
          loader: path.resolve("./index.js"),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // 开发工具配置
  devtool: "eval-source-map",
  // 开发服务器配置
  devServer: {
    contentBase: "./dist",
    open: true,
  },
};
