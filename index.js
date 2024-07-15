/*
 * @Date: 2022-04-28 10:55:26
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-04-28 13:40:50
 * @FilePath: /webpack-config/user-webpack-config/defineLoader/MyExampleWebpackLoader.js
 * @Description:
 */
const nodeGl = require("./headless-gl");
const {
  initShader,
  createProgram,
  createVertexShader,
  createFragmentShader,
  checkLinkProgram,
} = require("./initShaders");
const [width, height] = [1, 1];
const gl = nodeGl(width, height, { preserveDrawingBuffer: true });
const loaderUtils = require("loader-utils");
const schemaUtils = require("schema-utils");
let vertReg = /\.vert$/;
let fragReg = /\.frag$/;
module.exports = function (source) {
  const callback = this.async();
  let options = this.query;
  const {
    checkError = true // 是否校验错误
  } = options
  if (checkError) {
    //  是 vert 文件
    if (this.resourcePath.match(vertReg)) {
      // 创建程序对象
      var program = createProgram(gl, source, "");
      try {
        // 创建vertexShader
        var vertexShader = createVertexShader(gl, program, source);
      } catch (error) {
        throw `
      Error info ${error}
      `;
      }
    }
    //  是 frag 文件
    if (this.resourcePath.match(fragReg)) {
      // 创建程序对象
      var program = createProgram(gl, "", source);
      try {
        // 创建fragmentShader
        var fragmentShader = createFragmentShader(gl, program, source);
      } catch (error) {
        throw `
      Error info ${error}
      `;
      }
    }
  }
  const json = JSON.stringify(source)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  const esModule =
    typeof options.esModule !== "undefined" ? options.esModule : true;

  source = `${esModule ? "export default" : "module.exports ="} ${json};`;
  callback(null, source);
};
