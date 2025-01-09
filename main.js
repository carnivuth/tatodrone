//drone simulator
//idea: move a drone in the screen using realistic controls
// traslation in the normal direction of the drone plane
// rotation around the x and z axis

// DEBUG PARAMETER!!!!!!!!
// set to true to debug webgl in the browser console and enable spector
const DEBUG=true
// DEBUG PARAMETER!!!!!!!!

function debug(obj){if (DEBUG){console.log(obj)}}

function initWebGL(canvas_id){

  //get canvas DOM element
  var canvas = document.getElementById(canvas_id);

  // get webgl context
  if(DEBUG){
    var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
    var spector = new SPECTOR.Spector();
    spector.displayUI();
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
      modelfile="assets/drone.obj"
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

      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.enable(gl.DEPTH_TEST);


      // place objects in the scene, which in this context means updating the webgl parameters, buffers and attributes
      // by getting parameters from dat.GUI controls
      light.place(
        [
          controls.drone_x_ctrl.getValue()+10,
          controls.drone_y_ctrl.getValue()+10,
          controls.drone_z_ctrl.getValue()+10
        ]
      );
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
          0,
          0,
          0
        ]
        //[
        //  controls.drone_x_ctrl.getValue(),
        //  controls.drone_y_ctrl.getValue(),
        //  controls.drone_z_ctrl.getValue()
        //]
      );

      drone.place(
        [
          controls.drone_x_ctrl.getValue(),
          controls.drone_y_ctrl.getValue(),
          controls.drone_z_ctrl.getValue()
        ]);

      drone.rotateX(0.01)
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
