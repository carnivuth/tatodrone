//drone simulator
//idea: move a drone in the screen using realistic controls
// traslation in the normal direction of the drone plane
// rotation around the x and z axis

// DEBUG PARAMETER!!!!!!!!
// set to true to debug webgl in the browser console
const DEBUG=true
// DEBUG PARAMETER!!!!!!!!

function initWebGL(canvas_id){

  //get canvas DOM element
  var canvas = document.getElementById(canvas_id);

  // get webgl context
  if(DEBUG){
    var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
  }else{
    var gl = canvas.getContext("webgl");
  }

  if (!gl) {
    throw new Error('No webGL context available with canvas_id: '+ canvas_id);
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  return gl
}

function initProgram(){
  program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);
  gl.useProgram(program);
  return program
}

function main(){

  try{
    gl = initWebGL("canvas");
    program = initProgram();
    controls = new Controls();

    if(DEBUG){
      modelfile="assets/cube.obj"
    }else{
      modelfile="assets/drone.obj"
    }
    drone = new Model(program,modelfile,
      [
        controls.drone_x_ctrl.getValue(),
        controls.drone_y_ctrl.getValue(),
        controls.drone_z_ctrl.getValue()

    ],
      [0,0,0],1);
    light = new Light(program);

    // create camera watching towards the drone
    camera = new Camera(program,
      // camera positions
      [
        controls.camera_x_ctrl.getValue(),
        controls.camera_y_ctrl.getValue(),
        controls.camera_z_ctrl.getValue()
      ],
      [
        controls.drone_x_ctrl.getValue(),
        controls.drone_y_ctrl.getValue(),
        controls.drone_z_ctrl.getValue()

    ],
      [0,1,0],controls.fov_ctrl.getValue());

    // render next frame function
    function renderLoop(){

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // place objects in the scene, which in this context means updating the webgl parameters, buffers and attributes
      // by getting parameters from dat.GUI controls
      light.place([1,1,1])
      camera.place(
        [
          controls.camera_x_ctrl.getValue(),
          controls.camera_y_ctrl.getValue(),
          controls.camera_z_ctrl.getValue()
        ],
        controls.fov_ctrl.getValue()
      );

      camera.look(
        [
          controls.drone_x_ctrl.getValue(),
          controls.drone_y_ctrl.getValue(),
          controls.drone_z_ctrl.getValue()
        ]
      );

      drone.place(
        [
          controls.drone_x_ctrl.getValue(),
          controls.drone_y_ctrl.getValue(),
          controls.drone_z_ctrl.getValue()
        ]);

      camera.render()
      light.render()
      drone.render()
      requestAnimationFrame(renderLoop);
}

  requestAnimationFrame(renderLoop);


  }catch(e){
    console.log(e)
  }

}

main()
