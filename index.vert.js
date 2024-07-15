module.exports = `
  attribute vec4 a_Position;
  void main() {
  11
    gl_Position = a_Position;
    gl_PointSize = 10.0; 
  } `;
