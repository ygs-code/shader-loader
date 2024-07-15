const FSHADER_SOURCE = require("./index.frag.js");
const VSHADER_SOURCE = require("./index.vert.js");
const nodeGl = require("./index");
const {
  initShader,
  createProgram,
  createVertexShader,
  createFragmentShader,
  checkLinkProgram,
} = require("./initShaders");
const [width, height] = [512, 512];
const gl = nodeGl(width, height, { preserveDrawingBuffer: true });

// 创建和连接Program
function createLinkProgram(gl, vshader, fshader) {
  // 创建程序对象
  var program = createProgram(gl, vshader, fshader);
  try {
    // 创建vertexShader
    var vertexShader = createVertexShader(gl, program, vshader);
  } catch (error) {
    console.log("vertexShader error=====", error);
  }
  try {
    // // 创建fragmentShader
    var fragmentShader = createFragmentShader(gl, program, fshader);
  } catch (error) {
    console.log("fragmentShader error=====", error);
  }

  // if (!vertexShader || !fragmentShader) {
  //   return null;
  // }
  // // 检查 checkLinkProgram 把 vertexShader 和 fragmentShader 连接起来检查
  // return checkLinkProgram(gl, program, vertexShader, fragmentShader);
}

createLinkProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);

// 创建一个简单的WebGL程序
const render = () => {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 设置颜色为红色
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  var pixels = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  // process.stdout.write(
  //   ["P3\n# gl.ppm\n", width, " ", height, "\n255\n"].join("")
  // );

  for (var i = 0; i < pixels.length; i += 4) {
    for (var j = 0; j < 3; ++j) {
      // process.stdout.write(pixels[i + j] + " ");
    }
  }
};

render();
