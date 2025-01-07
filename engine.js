function initWebGL(canvas_id){

  //get webgl context
  var canvas = document.getElementById(canvas_id);
  var gl = canvas.getContext("webgl");
  if (!gl) {
    throw new Error('No webGL context available with canvas_id: '+ canvas_id);
  }
}
function renderLoop(drawScene){
  while(true){
  requestAnimationFrame(drawScene);
  }
}
