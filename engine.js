// retrive webGL context and setup shader program
function initWebGL(canvas_id){

  //get webgl context
  var canvas = document.getElementById(canvas_id);
  //var gl = canvas.getContext("webgl");
  // debug
  var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
  if (!gl) {
    throw new Error('No webGL context available with canvas_id: '+ canvas_id);
  }
  return gl

  webglUtils.resizeCanvasToMatchDisplaySize(canvas);
}

function initProgram(){
  program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);
  gl.useProgram(program);
  return program
}

