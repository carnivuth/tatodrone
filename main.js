// DEBUG PARAMETER!!!!!!!!
// this parameter will enable debug of the program:
// - spector to debug webgl calls
// - dat.GUI for parameter manipolation
// - log calls
//
const DEBUG=true
// DEBUG PARAMETER!!!!!!!!

function main(){

  try{
    gl = initWebGL("canvas");
    program = initProgram();

    // set drone at the origin, and give a default rotation to match axis
    drone = new Drone(program, [ 0,10,0 ], [4.5,3.09,0],1);
    tree = new Model(program,"assets/tree/tree.obj", [0,0,20],[0,0,0],0.5)
    floor = new Model(program,"assets/floor/floor.obj", [0,0,0],[0,0,0],1)
    leftWall = new Model(program,"assets/wall/wall.obj", [-50,50,0],[0,0,90],1)
    frontWall = new Model(program,"assets/wall/wall.obj", [0,50,50],[90,0,0],1)
    backWall = new Model(program,"assets/wall/wall.obj", [0,50,-50],[90,0,0],1)
    rightWall = new Model(program,"assets/wall/wall.obj", [50,50,0],[0,0,90],1)

    // create light over the drone
    light = new Light(program,
      [
          drone.position[0] +10,
          drone.position[1]+ 10,
          drone.position[2] + 10
      ]
    );

    // create camera watching towards the drone
    camera = new Camera(program,
      // camera positions
      [
          drone.position[0],
          drone.position[1]+ 5,
          drone.position[2] - 5
      ],
      drone.position,
      [0,1,0],30);

    // creates debugView
    if(DEBUG){debugView = new DebugView(drone,light,camera);}
    //setup controls
    keyboard= new Keyboard(drone,light,camera)

    // render next frame function
    function renderLoop(){

      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.enable(gl.DEPTH_TEST);

      //render objects
      camera.render()
      light.render()

      // models
      floor.render()
      frontWall.render()
      backWall.render()
      leftWall.render()
      rightWall.render()
      tree.render()
      drone.render()

      requestAnimationFrame(renderLoop);
}

  requestAnimationFrame(renderLoop);


  }catch(e){
    console.log(e)
  }

}

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

main()
